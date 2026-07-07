import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"
import type { CreateConversationInput, SendMessageInput } from "@doctor/validators"

import type { RequestUser } from "../common/current-user.decorator"
import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class ConversationsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  private async assertParticipant(user: RequestUser, conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { patient: true, doctor: true },
    })
    if (!conversation) throw new NotFoundException("Conversation not found")

    const isParticipant =
      user.role === "ADMIN" ||
      conversation.patient.userId === user.id ||
      conversation.doctor.userId === user.id
    if (!isParticipant) throw new ForbiddenException("You are not part of this conversation")

    return conversation
  }

  async findAllForUser(user: RequestUser) {
    const where =
      user.role === "DOCTOR"
        ? { doctor: { userId: user.id } }
        : user.role === "PATIENT"
          ? { patient: { userId: user.id } }
          : {}

    const conversations = await this.prisma.conversation.findMany({
      where,
      include: {
        patient: { include: { user: true } },
        doctor: { include: { user: true } },
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    })

    return Promise.all(
      conversations.map(async (conversation) => {
        const unreadCount = await this.prisma.message.count({
          where: { conversationId: conversation.id, read: false, senderId: { not: user.id } },
        })
        return { ...conversation, unreadCount, lastMessage: conversation.messages[0] ?? null }
      })
    )
  }

  async create(user: RequestUser, input: CreateConversationInput) {
    if (user.role !== "PATIENT") throw new ForbiddenException("Only patients can start a conversation")

    const patientProfile = await this.prisma.patientProfile.findUnique({ where: { userId: user.id } })
    if (!patientProfile) throw new NotFoundException("Patient profile not found")

    return this.prisma.conversation.upsert({
      where: { patientId_doctorId: { patientId: patientProfile.id, doctorId: input.doctorId } },
      update: {},
      create: { patientId: patientProfile.id, doctorId: input.doctorId },
    })
  }

  async findMessages(user: RequestUser, conversationId: string) {
    await this.assertParticipant(user, conversationId)

    await this.prisma.message.updateMany({
      where: { conversationId, senderId: { not: user.id }, read: false },
      data: { read: true },
    })

    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    })
  }

  async sendMessage(user: RequestUser, conversationId: string, input: SendMessageInput) {
    await this.assertParticipant(user, conversationId)

    return this.prisma.message.create({
      data: { conversationId, senderId: user.id, text: input.text },
    })
  }
}

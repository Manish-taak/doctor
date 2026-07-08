import { prisma } from "@doctor/database"
import type { CreateConversationInput, SendMessageInput } from "@doctor/validators"

import { ForbiddenError, NotFoundError } from "../errors"
import type { RequestUser } from "../session"

async function assertParticipant(user: RequestUser, conversationId: string) {
  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: { patient: true, doctor: true },
  })
  if (!conversation) throw new NotFoundError("Conversation not found")

  const isParticipant =
    user.role === "ADMIN" || conversation.patient.userId === user.id || conversation.doctor.userId === user.id
  if (!isParticipant) throw new ForbiddenError("You are not part of this conversation")

  return conversation
}

export async function findConversationsForUser(user: RequestUser) {
  const where =
    user.role === "DOCTOR"
      ? { doctor: { userId: user.id } }
      : user.role === "PATIENT"
        ? { patient: { userId: user.id } }
        : {}

  const conversations = await prisma.conversation.findMany({
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
      const unreadCount = await prisma.message.count({
        where: { conversationId: conversation.id, read: false, senderId: { not: user.id } },
      })
      return { ...conversation, unreadCount, lastMessage: conversation.messages[0] ?? null }
    })
  )
}

export async function createConversation(user: RequestUser, input: CreateConversationInput) {
  if (user.role !== "PATIENT") throw new ForbiddenError("Only patients can start a conversation")

  const patientProfile = await prisma.patientProfile.findUnique({ where: { userId: user.id } })
  if (!patientProfile) throw new NotFoundError("Patient profile not found")

  return prisma.conversation.upsert({
    where: { patientId_doctorId: { patientId: patientProfile.id, doctorId: input.doctorId } },
    update: {},
    create: { patientId: patientProfile.id, doctorId: input.doctorId },
  })
}

export async function findMessages(user: RequestUser, conversationId: string) {
  await assertParticipant(user, conversationId)

  await prisma.message.updateMany({
    where: { conversationId, senderId: { not: user.id }, read: false },
    data: { read: true },
  })

  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  })
}

export async function sendMessage(user: RequestUser, conversationId: string, input: SendMessageInput) {
  await assertParticipant(user, conversationId)

  return prisma.message.create({
    data: { conversationId, senderId: user.id, text: input.text },
  })
}

import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"
import type { CreateTransactionInput, UpdateTransactionInput } from "@doctor/validators"

import type { RequestUser } from "../common/current-user.decorator"
import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class TransactionsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async findAllForUser(user: RequestUser) {
    if (user.role === "ADMIN") {
      return this.prisma.transaction.findMany({
        include: { patient: { include: { user: true } } },
        orderBy: { date: "desc" },
      })
    }

    const patientProfile = await this.prisma.patientProfile.findUnique({ where: { userId: user.id } })
    if (!patientProfile) return []
    return this.prisma.transaction.findMany({
      where: { patientId: patientProfile.id },
      orderBy: { date: "desc" },
    })
  }

  create(input: CreateTransactionInput) {
    return this.prisma.transaction.create({ data: input })
  }

  async updateStatus(id: string, input: UpdateTransactionInput) {
    const transaction = await this.prisma.transaction.findUnique({ where: { id } })
    if (!transaction) throw new NotFoundException("Transaction not found")

    return this.prisma.transaction.update({ where: { id }, data: { status: input.status } })
  }
}

import { prisma } from "@doctor/database"
import type { CreateTransactionInput, UpdateTransactionInput } from "@doctor/validators"

import { NotFoundError } from "../errors"
import type { RequestUser } from "../session"

export async function findTransactionsForUser(user: RequestUser) {
  if (user.role === "ADMIN") {
    return prisma.transaction.findMany({
      include: { patient: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  const patientProfile = await prisma.patientProfile.findUnique({ where: { userId: user.id } })
  if (!patientProfile) return []
  return prisma.transaction.findMany({
    where: { patientId: patientProfile.id },
    orderBy: { date: "desc" },
  })
}

export function createTransaction(input: CreateTransactionInput) {
  return prisma.transaction.create({ data: input })
}

export async function updateTransactionStatus(id: string, input: UpdateTransactionInput) {
  const transaction = await prisma.transaction.findUnique({ where: { id } })
  if (!transaction) throw new NotFoundError("Transaction not found")

  return prisma.transaction.update({ where: { id }, data: { status: input.status } })
}

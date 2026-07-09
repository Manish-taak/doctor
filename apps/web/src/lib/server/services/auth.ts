import * as bcrypt from "bcrypt"
import { prisma } from "@/lib/db"
import type { RegisterInput } from "@/lib/validators"

import { ConflictError, UnauthorizedError } from "../errors"

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } })
  if (existing) throw new ConflictError("An account with this email already exists")

  const passwordHash = await bcrypt.hash(input.password, 10)

  return prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role,
      ...(input.role === "PATIENT" ? { patientProfile: { create: {} } } : {}),
      ...(input.role === "DOCTOR"
        ? {
            doctorProfile: {
              create: {
                specialty: "General Medicine",
                qualification: "MD",
                location: "Not set",
              },
            },
          }
        : {}),
    },
  })
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } })

  const valid = await bcrypt.compare(currentPassword, user.passwordHash)
  if (!valid) throw new UnauthorizedError("Current password is incorrect")

  const passwordHash = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({ where: { id: userId }, data: { passwordHash } })

  return { success: true }
}

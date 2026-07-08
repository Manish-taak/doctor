import { prisma, type Role } from "@doctor/database"
import type { UpdateProfileInput } from "@doctor/validators"

import { BadRequestError, NotFoundError } from "../errors"
import type { RequestUser } from "../session"

const ME_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  patientProfile: {
    select: {
      phone: true,
      dob: true,
      gender: true,
      insuranceProvider: true,
      insurancePolicyNumber: true,
      insuranceGroupNumber: true,
      insuranceValidThrough: true,
    },
  },
} as const

export function findAllUsers() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  })
}

export function findMe(userId: string) {
  return prisma.user.findUniqueOrThrow({ where: { id: userId }, select: ME_SELECT })
}

export async function updateProfile(userId: string, input: UpdateProfileInput) {
  if (input.name) {
    await prisma.user.update({ where: { id: userId }, data: { name: input.name } })
  }

  const {
    phone,
    dob,
    gender,
    insuranceProvider,
    insurancePolicyNumber,
    insuranceGroupNumber,
    insuranceValidThrough,
  } = input
  const hasPatientFields = [
    phone,
    dob,
    gender,
    insuranceProvider,
    insurancePolicyNumber,
    insuranceGroupNumber,
    insuranceValidThrough,
  ].some((value) => value !== undefined)

  if (hasPatientFields) {
    const patientProfile = await prisma.patientProfile.findUnique({ where: { userId } })
    if (patientProfile) {
      await prisma.patientProfile.update({
        where: { userId },
        data: {
          ...(phone !== undefined ? { phone } : {}),
          ...(dob !== undefined ? { dob: new Date(dob) } : {}),
          ...(gender !== undefined ? { gender } : {}),
          ...(insuranceProvider !== undefined ? { insuranceProvider } : {}),
          ...(insurancePolicyNumber !== undefined ? { insurancePolicyNumber } : {}),
          ...(insuranceGroupNumber !== undefined ? { insuranceGroupNumber } : {}),
          ...(insuranceValidThrough !== undefined ? { insuranceValidThrough: new Date(insuranceValidThrough) } : {}),
        },
      })
    }
  }

  return findMe(userId)
}

export async function updateUserRole(id: string, role: Role, currentUser: RequestUser) {
  if (id === currentUser.id) {
    throw new BadRequestError("You cannot change your own role")
  }

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    throw new NotFoundError("User not found")
  }

  return prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  })
}

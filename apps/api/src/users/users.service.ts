import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaClient, Role } from "@doctor/database"
import type { UpdateProfileInput } from "@doctor/validators"

import { PRISMA } from "../prisma/prisma.module"

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

@Injectable()
export class UsersService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })
  }

  findMe(userId: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id: userId }, select: ME_SELECT })
  }

  async updateProfile(userId: string, input: UpdateProfileInput) {
    if (input.name) {
      await this.prisma.user.update({ where: { id: userId }, data: { name: input.name } })
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
      const patientProfile = await this.prisma.patientProfile.findUnique({ where: { userId } })
      if (patientProfile) {
        await this.prisma.patientProfile.update({
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

    return this.findMe(userId)
  }

  async updateRole(id: string, role: Role, currentUserId: string) {
    if (id === currentUserId) {
      throw new BadRequestException("You cannot change your own role")
    }

    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException("User not found")
    }

    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })
  }
}

import { Inject, Injectable } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import type { PrismaClient } from "@doctor/database"
import type { CreateDoctorInput } from "@doctor/validators"

import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class DoctorsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.doctorProfile.findMany({
      include: { user: { select: { name: true, email: true } } },
    })
  }

  findOne(id: string) {
    return this.prisma.doctorProfile.findUnique({
      where: { id },
      include: { user: { select: { name: true, email: true } } },
    })
  }

  async create(input: CreateDoctorInput) {
    const passwordHash = await bcrypt.hash(input.password, 10)

    return this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: "DOCTOR",
        doctorProfile: {
          create: {
            specialty: input.specialty,
            qualification: input.qualification,
            bio: input.bio,
            experienceYears: input.experienceYears,
            price: input.price,
            location: input.location,
            telehealth: input.telehealth,
            education: input.education,
            languages: input.languages,
          },
        },
      },
      include: { doctorProfile: true },
    })
  }
}

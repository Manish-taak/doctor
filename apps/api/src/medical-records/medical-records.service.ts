import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"
import type { CreateMedicalRecordInput } from "@doctor/validators"

import type { RequestUser } from "../common/current-user.decorator"
import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class MedicalRecordsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async findAllForUser(user: RequestUser) {
    if (user.role === "ADMIN") {
      return this.prisma.medicalRecord.findMany({
        include: { patient: { include: { user: true } }, doctor: { include: { user: true } } },
        orderBy: { date: "desc" },
      })
    }

    if (user.role === "DOCTOR") {
      const doctorProfile = await this.prisma.doctorProfile.findUnique({ where: { userId: user.id } })
      if (!doctorProfile) return []
      return this.prisma.medicalRecord.findMany({
        where: { doctorId: doctorProfile.id },
        include: { patient: { include: { user: true } } },
        orderBy: { date: "desc" },
      })
    }

    const patientProfile = await this.prisma.patientProfile.findUnique({ where: { userId: user.id } })
    if (!patientProfile) return []
    return this.prisma.medicalRecord.findMany({
      where: { patientId: patientProfile.id },
      include: { doctor: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  async create(user: RequestUser, input: CreateMedicalRecordInput) {
    const doctorProfile = await this.prisma.doctorProfile.findUnique({ where: { userId: user.id } })
    if (!doctorProfile) throw new ForbiddenException("Only doctors can create medical records")

    const patient = await this.prisma.patientProfile.findUnique({ where: { id: input.patientId } })
    if (!patient) throw new NotFoundException("Patient not found")

    return this.prisma.medicalRecord.create({
      data: {
        patientId: input.patientId,
        doctorId: doctorProfile.id,
        title: input.title,
        type: input.type,
        fileSize: input.fileSize,
        summary: input.summary,
      },
    })
  }
}

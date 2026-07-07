import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"
import type { CreatePrescriptionInput, UpdatePrescriptionInput } from "@doctor/validators"

import type { RequestUser } from "../common/current-user.decorator"
import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class PrescriptionsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async findAllForUser(user: RequestUser) {
    if (user.role === "ADMIN") {
      return this.prisma.prescription.findMany({
        include: { patient: { include: { user: true } }, doctor: { include: { user: true } } },
        orderBy: { date: "desc" },
      })
    }

    if (user.role === "DOCTOR") {
      const doctorProfile = await this.prisma.doctorProfile.findUnique({ where: { userId: user.id } })
      if (!doctorProfile) return []
      return this.prisma.prescription.findMany({
        where: { doctorId: doctorProfile.id },
        include: { patient: { include: { user: true } } },
        orderBy: { date: "desc" },
      })
    }

    const patientProfile = await this.prisma.patientProfile.findUnique({ where: { userId: user.id } })
    if (!patientProfile) return []
    return this.prisma.prescription.findMany({
      where: { patientId: patientProfile.id },
      include: { doctor: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  async create(user: RequestUser, input: CreatePrescriptionInput) {
    const doctorProfile = await this.prisma.doctorProfile.findUnique({ where: { userId: user.id } })
    if (!doctorProfile) throw new ForbiddenException("Only doctors can create prescriptions")

    const patient = await this.prisma.patientProfile.findUnique({ where: { id: input.patientId } })
    if (!patient) throw new NotFoundException("Patient not found")

    return this.prisma.prescription.create({
      data: {
        patientId: input.patientId,
        doctorId: doctorProfile.id,
        medication: input.medication,
        dosage: input.dosage,
        frequency: input.frequency,
        refillsLeft: input.refillsLeft,
      },
    })
  }

  async updateStatus(user: RequestUser, id: string, input: UpdatePrescriptionInput) {
    const prescription = await this.prisma.prescription.findUnique({
      where: { id },
      include: { doctor: true },
    })
    if (!prescription) throw new NotFoundException("Prescription not found")

    const isOwner = user.role === "ADMIN" || prescription.doctor.userId === user.id
    if (!isOwner) throw new ForbiddenException("You cannot modify this prescription")

    return this.prisma.prescription.update({ where: { id }, data: { status: input.status } })
  }
}

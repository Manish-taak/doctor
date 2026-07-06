import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"
import type { CreateAppointmentInput, UpdateAppointmentInput } from "@doctor/validators"

import type { RequestUser } from "../common/current-user.decorator"
import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class AppointmentsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async findAllForUser(user: RequestUser) {
    if (user.role === "ADMIN") {
      return this.prisma.appointment.findMany({
        include: { patient: { include: { user: true } }, doctor: { include: { user: true } } },
        orderBy: { date: "desc" },
      })
    }

    if (user.role === "DOCTOR") {
      const doctorProfile = await this.prisma.doctorProfile.findUnique({ where: { userId: user.id } })
      if (!doctorProfile) return []
      return this.prisma.appointment.findMany({
        where: { doctorId: doctorProfile.id },
        include: { patient: { include: { user: true } } },
        orderBy: { date: "desc" },
      })
    }

    const patientProfile = await this.prisma.patientProfile.findUnique({ where: { userId: user.id } })
    if (!patientProfile) return []
    return this.prisma.appointment.findMany({
      where: { patientId: patientProfile.id },
      include: { doctor: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  async create(user: RequestUser, input: CreateAppointmentInput) {
    if (user.role !== "PATIENT") throw new ForbiddenException("Only patients can book appointments")

    const patientProfile = await this.prisma.patientProfile.findUnique({ where: { userId: user.id } })
    if (!patientProfile) throw new NotFoundException("Patient profile not found")

    return this.prisma.appointment.create({
      data: {
        patientId: patientProfile.id,
        doctorId: input.doctorId,
        date: input.date,
        type: input.type,
        location: input.location,
      },
    })
  }

  async updateStatus(user: RequestUser, id: string, input: UpdateAppointmentInput) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { doctor: true, patient: true },
    })
    if (!appointment) throw new NotFoundException("Appointment not found")

    const isOwner =
      user.role === "ADMIN" ||
      (user.role === "DOCTOR" && appointment.doctor.userId === user.id) ||
      (user.role === "PATIENT" && appointment.patient.userId === user.id)
    if (!isOwner) throw new ForbiddenException("You cannot modify this appointment")

    return this.prisma.appointment.update({ where: { id }, data: { status: input.status } })
  }
}

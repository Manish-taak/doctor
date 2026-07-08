import { prisma } from "@doctor/database"
import type { CreateAppointmentInput, UpdateAppointmentInput } from "@doctor/validators"

import { ForbiddenError, NotFoundError } from "../errors"
import type { RequestUser } from "../session"

export async function findAppointmentsForUser(user: RequestUser) {
  if (user.role === "ADMIN") {
    return prisma.appointment.findMany({
      include: { patient: { include: { user: true } }, doctor: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  if (user.role === "DOCTOR") {
    const doctorProfile = await prisma.doctorProfile.findUnique({ where: { userId: user.id } })
    if (!doctorProfile) return []
    return prisma.appointment.findMany({
      where: { doctorId: doctorProfile.id },
      include: { patient: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  const patientProfile = await prisma.patientProfile.findUnique({ where: { userId: user.id } })
  if (!patientProfile) return []
  return prisma.appointment.findMany({
    where: { patientId: patientProfile.id },
    include: { doctor: { include: { user: true } } },
    orderBy: { date: "desc" },
  })
}

export async function createAppointment(user: RequestUser, input: CreateAppointmentInput) {
  if (user.role !== "PATIENT") throw new ForbiddenError("Only patients can book appointments")

  const patientProfile = await prisma.patientProfile.findUnique({ where: { userId: user.id } })
  if (!patientProfile) throw new NotFoundError("Patient profile not found")

  return prisma.appointment.create({
    data: {
      patientId: patientProfile.id,
      doctorId: input.doctorId,
      date: input.date,
      type: input.type,
      location: input.location,
    },
  })
}

export async function updateAppointmentStatus(user: RequestUser, id: string, input: UpdateAppointmentInput) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { doctor: true, patient: true },
  })
  if (!appointment) throw new NotFoundError("Appointment not found")

  const isOwner =
    user.role === "ADMIN" ||
    (user.role === "DOCTOR" && appointment.doctor.userId === user.id) ||
    (user.role === "PATIENT" && appointment.patient.userId === user.id)
  if (!isOwner) throw new ForbiddenError("You cannot modify this appointment")

  return prisma.appointment.update({ where: { id }, data: { status: input.status } })
}

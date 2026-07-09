import { prisma } from "@/lib/db"
import type { CreateAppointmentInput, UpdateAppointmentInput } from "@/lib/validators"

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

  const doctorProfile = await prisma.doctorProfile.findUnique({ where: { id: input.doctorId } })
  if (!doctorProfile) throw new NotFoundError("Doctor not found")

  const appointment = await prisma.appointment.create({
    data: {
      patientId: patientProfile.id,
      doctorId: input.doctorId,
      date: input.date,
      type: input.type,
      location: input.location,
      status: "PENDING",
    },
  })

  await prisma.notification.create({
    data: {
      userId: doctorProfile.userId,
      type: "APPOINTMENT",
      title: "New appointment request",
      description: `${user.name} requested an appointment on ${input.date.toDateString()}.`,
    },
  })

  return appointment
}

export async function updateAppointmentStatus(user: RequestUser, id: string, input: UpdateAppointmentInput) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: { doctor: true, patient: true },
  })
  if (!appointment) throw new NotFoundError("Appointment not found")

  const isDoctorOrAdmin = user.role === "ADMIN" || (user.role === "DOCTOR" && appointment.doctor.userId === user.id)
  const isPatient = user.role === "PATIENT" && appointment.patient.userId === user.id
  if (!isDoctorOrAdmin && !isPatient) throw new ForbiddenError("You cannot modify this appointment")
  if (isPatient && input.status !== "CANCELLED") {
    throw new ForbiddenError("Patients can only cancel appointments")
  }

  const updated = await prisma.appointment.update({ where: { id }, data: { status: input.status } })

  if (isDoctorOrAdmin && (input.status === "UPCOMING" || input.status === "CANCELLED")) {
    await prisma.notification.create({
      data: {
        userId: appointment.patient.userId,
        type: "APPOINTMENT",
        title: input.status === "UPCOMING" ? "Appointment confirmed" : "Appointment declined",
        description:
          input.status === "UPCOMING"
            ? "Your doctor confirmed your appointment request."
            : "Your doctor was unable to accept this appointment request.",
      },
    })
  }

  return updated
}

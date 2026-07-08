import { prisma } from "@doctor/database"
import type { CreateMedicalRecordInput } from "@doctor/validators"

import { ForbiddenError, NotFoundError } from "../errors"
import type { RequestUser } from "../session"

export async function findMedicalRecordsForUser(user: RequestUser) {
  if (user.role === "ADMIN") {
    return prisma.medicalRecord.findMany({
      include: { patient: { include: { user: true } }, doctor: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  if (user.role === "DOCTOR") {
    const doctorProfile = await prisma.doctorProfile.findUnique({ where: { userId: user.id } })
    if (!doctorProfile) return []
    return prisma.medicalRecord.findMany({
      where: { doctorId: doctorProfile.id },
      include: { patient: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  const patientProfile = await prisma.patientProfile.findUnique({ where: { userId: user.id } })
  if (!patientProfile) return []
  return prisma.medicalRecord.findMany({
    where: { patientId: patientProfile.id },
    include: { doctor: { include: { user: true } } },
    orderBy: { date: "desc" },
  })
}

export async function createMedicalRecord(user: RequestUser, input: CreateMedicalRecordInput) {
  const doctorProfile = await prisma.doctorProfile.findUnique({ where: { userId: user.id } })
  if (!doctorProfile) throw new ForbiddenError("Only doctors can create medical records")

  const patient = await prisma.patientProfile.findUnique({ where: { id: input.patientId } })
  if (!patient) throw new NotFoundError("Patient not found")

  return prisma.medicalRecord.create({
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

import { prisma } from "@/lib/db"
import type { CreatePrescriptionInput, UpdatePrescriptionInput } from "@/lib/validators"

import { BadRequestError, ForbiddenError, NotFoundError } from "../errors"
import type { RequestUser } from "../session"

export async function findPrescriptionsForUser(user: RequestUser) {
  if (user.role === "ADMIN") {
    return prisma.prescription.findMany({
      include: { patient: { include: { user: true } }, doctor: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  if (user.role === "DOCTOR") {
    const doctorProfile = await prisma.doctorProfile.findUnique({ where: { userId: user.id } })
    if (!doctorProfile) return []
    return prisma.prescription.findMany({
      where: { doctorId: doctorProfile.id },
      include: { patient: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  const patientProfile = await prisma.patientProfile.findUnique({ where: { userId: user.id } })
  if (!patientProfile) return []
  return prisma.prescription.findMany({
    where: { patientId: patientProfile.id },
    include: { doctor: { include: { user: true } } },
    orderBy: { date: "desc" },
  })
}

export async function createPrescription(user: RequestUser, input: CreatePrescriptionInput) {
  const doctorProfile = await prisma.doctorProfile.findUnique({ where: { userId: user.id } })
  if (!doctorProfile) throw new ForbiddenError("Only doctors can create prescriptions")

  const patient = await prisma.patientProfile.findUnique({ where: { id: input.patientId } })
  if (!patient) throw new NotFoundError("Patient not found")

  return prisma.prescription.create({
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

export async function updatePrescriptionStatus(user: RequestUser, id: string, input: UpdatePrescriptionInput) {
  const prescription = await prisma.prescription.findUnique({
    where: { id },
    include: { doctor: true },
  })
  if (!prescription) throw new NotFoundError("Prescription not found")

  const isOwner = user.role === "ADMIN" || prescription.doctor.userId === user.id
  if (!isOwner) throw new ForbiddenError("You cannot modify this prescription")

  return prisma.prescription.update({ where: { id }, data: { status: input.status } })
}

export async function requestPrescriptionRefill(user: RequestUser, id: string) {
  const patientProfile = await prisma.patientProfile.findUnique({ where: { userId: user.id } })
  if (!patientProfile) throw new ForbiddenError("Only patients can request refills")

  const prescription = await prisma.prescription.findUnique({ where: { id } })
  if (!prescription) throw new NotFoundError("Prescription not found")
  if (prescription.patientId !== patientProfile.id) {
    throw new ForbiddenError("You cannot request a refill for this prescription")
  }
  if (prescription.status !== "ACTIVE") {
    throw new BadRequestError("Only active prescriptions can be refilled")
  }
  if (prescription.refillsLeft <= 0) {
    throw new BadRequestError("No refills remaining — contact your doctor for a new prescription")
  }

  return prisma.prescription.update({
    where: { id },
    data: { refillsLeft: { decrement: 1 } },
    include: { doctor: { include: { user: true } } },
  })
}

import * as bcrypt from "bcrypt"
import { prisma } from "@/lib/db"
import type { CreateDoctorInput, UpdateDoctorProfileInput } from "@/lib/validators"

import { NotFoundError } from "../errors"

export function findAllDoctors() {
  return prisma.doctorProfile.findMany({
    include: { user: { select: { name: true, email: true } } },
  })
}

export function findOneDoctor(id: string) {
  return prisma.doctorProfile.findUnique({
    where: { id },
    include: { user: { select: { name: true, email: true } } },
  })
}

export async function findMyDoctorProfile(userId: string) {
  const doctorProfile = await prisma.doctorProfile.findUnique({
    where: { userId },
    include: { user: { select: { name: true, email: true } } },
  })
  if (!doctorProfile) throw new NotFoundError("Doctor profile not found")
  return doctorProfile
}

export async function updateMyDoctorProfile(userId: string, input: UpdateDoctorProfileInput) {
  const doctorProfile = await prisma.doctorProfile.findUnique({ where: { userId } })
  if (!doctorProfile) throw new NotFoundError("Doctor profile not found")

  return prisma.doctorProfile.update({
    where: { userId },
    data: input,
    include: { user: { select: { name: true, email: true } } },
  })
}

export async function createDoctor(input: CreateDoctorInput) {
  const passwordHash = await bcrypt.hash(input.password, 10)

  return prisma.user.create({
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

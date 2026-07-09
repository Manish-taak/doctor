import { prisma } from "@/lib/db"
import type { CreateReviewInput } from "@/lib/validators"

import { ForbiddenError, NotFoundError } from "../errors"
import type { RequestUser } from "../session"

export function findReviewsForDoctor(doctorId: string) {
  return prisma.review.findMany({
    where: { doctorId },
    include: { patient: { include: { user: true } } },
    orderBy: { date: "desc" },
  })
}

export async function createReview(user: RequestUser, input: CreateReviewInput) {
  if (user.role !== "PATIENT") throw new ForbiddenError("Only patients can leave reviews")

  const patientProfile = await prisma.patientProfile.findUnique({ where: { userId: user.id } })
  if (!patientProfile) throw new NotFoundError("Patient profile not found")

  const review = await prisma.review.create({
    data: {
      doctorId: input.doctorId,
      patientId: patientProfile.id,
      rating: input.rating,
      comment: input.comment,
    },
  })

  const aggregate = await prisma.review.aggregate({
    where: { doctorId: input.doctorId },
    _avg: { rating: true },
    _count: true,
  })

  await prisma.doctorProfile.update({
    where: { id: input.doctorId },
    data: {
      rating: aggregate._avg.rating ?? input.rating,
      reviewCount: aggregate._count,
    },
  })

  return review
}

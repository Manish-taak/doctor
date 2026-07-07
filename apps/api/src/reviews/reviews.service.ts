import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"
import type { CreateReviewInput } from "@doctor/validators"

import type { RequestUser } from "../common/current-user.decorator"
import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class ReviewsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  findForDoctor(doctorId: string) {
    return this.prisma.review.findMany({
      where: { doctorId },
      include: { patient: { include: { user: true } } },
      orderBy: { date: "desc" },
    })
  }

  async create(user: RequestUser, input: CreateReviewInput) {
    if (user.role !== "PATIENT") throw new ForbiddenException("Only patients can leave reviews")

    const patientProfile = await this.prisma.patientProfile.findUnique({ where: { userId: user.id } })
    if (!patientProfile) throw new NotFoundException("Patient profile not found")

    const review = await this.prisma.review.create({
      data: {
        doctorId: input.doctorId,
        patientId: patientProfile.id,
        rating: input.rating,
        comment: input.comment,
      },
    })

    const aggregate = await this.prisma.review.aggregate({
      where: { doctorId: input.doctorId },
      _avg: { rating: true },
      _count: true,
    })

    await this.prisma.doctorProfile.update({
      where: { id: input.doctorId },
      data: {
        rating: aggregate._avg.rating ?? input.rating,
        reviewCount: aggregate._count,
      },
    })

    return review
  }
}

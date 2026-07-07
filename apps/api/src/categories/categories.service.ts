import { Inject, Injectable } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"
import type { CreateCategoryInput } from "@doctor/validators"

import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class CategoriesService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: { _count: { select: { doctors: true } } },
    })

    return Promise.all(
      categories.map(async (category) => {
        const appointmentCount = await this.prisma.appointment.count({
          where: { doctor: { categoryId: category.id } },
        })
        return {
          id: category.id,
          name: category.name,
          icon: category.icon,
          doctorCount: category._count.doctors,
          appointmentCount,
        }
      })
    )
  }

  create(input: CreateCategoryInput) {
    return this.prisma.category.create({ data: input })
  }
}

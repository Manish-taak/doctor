import { prisma } from "@/lib/db"
import type { CreateCategoryInput, UpdateCategoryInput } from "@/lib/validators"

import { BadRequestError } from "../errors"

export async function findAllCategories() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { doctors: true } } },
  })

  return Promise.all(
    categories.map(async (category) => {
      const appointmentCount = await prisma.appointment.count({
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

export function createCategory(input: CreateCategoryInput) {
  return prisma.category.create({ data: input })
}

export function updateCategory(id: string, input: UpdateCategoryInput) {
  return prisma.category.update({ where: { id }, data: input })
}

export async function deleteCategory(id: string) {
  const doctorCount = await prisma.doctorProfile.count({ where: { categoryId: id } })
  if (doctorCount > 0) {
    throw new BadRequestError(
      `Cannot delete this category — ${doctorCount} doctor${doctorCount === 1 ? "" : "s"} still assigned to it.`
    )
  }
  await prisma.category.delete({ where: { id } })
}

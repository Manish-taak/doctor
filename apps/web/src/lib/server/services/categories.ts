import { prisma } from "@doctor/database"
import type { CreateCategoryInput } from "@doctor/validators"

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

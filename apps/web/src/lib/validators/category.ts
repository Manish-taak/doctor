import { z } from "zod"

export const createCategorySchema = z.object({
  name: z.string().trim().min(2),
  icon: z.string().trim().min(1),
})
export type CreateCategoryInput = z.infer<typeof createCategorySchema>

export const updateCategorySchema = z.object({
  name: z.string().trim().min(2).optional(),
  icon: z.string().trim().min(1).optional(),
})
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>

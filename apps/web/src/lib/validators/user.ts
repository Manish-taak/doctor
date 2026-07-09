import { z } from "zod"

import { roleSchema } from "./role"

export const updateUserRoleSchema = z.object({
  role: roleSchema,
})
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).optional(),
  phone: z.string().trim().min(1).optional(),
  dob: z.string().date().optional(),
  gender: z.string().trim().min(1).optional(),
  insuranceProvider: z.string().trim().min(1).optional(),
  insurancePolicyNumber: z.string().trim().min(1).optional(),
  insuranceGroupNumber: z.string().trim().min(1).optional(),
  insuranceValidThrough: z.string().date().optional(),
})
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

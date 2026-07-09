import { z } from "zod"

import { selfServiceRoleSchema } from "./role"

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: selfServiceRoleSchema,
})
export type RegisterInput = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})
export type LoginInput = z.infer<typeof loginSchema>

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
})
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

export const authUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["PATIENT", "DOCTOR", "ADMIN"]),
})
export type AuthUser = z.infer<typeof authUserSchema>

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: authUserSchema,
})
export type AuthResponse = z.infer<typeof authResponseSchema>

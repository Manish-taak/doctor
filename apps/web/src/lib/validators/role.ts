import { z } from "zod"

export const roleSchema = z.enum(["PATIENT", "DOCTOR", "ADMIN"])
export type Role = z.infer<typeof roleSchema>

// Roles a person can pick for themselves when creating an account.
// ADMIN accounts are seeded/promoted directly in the database, never self-service.
export const selfServiceRoleSchema = z.enum(["PATIENT", "DOCTOR"])
export type SelfServiceRole = z.infer<typeof selfServiceRoleSchema>

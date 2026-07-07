import { z } from "zod"

export const prescriptionStatusSchema = z.enum(["ACTIVE", "COMPLETED", "EXPIRED"])

export const createPrescriptionSchema = z.object({
  patientId: z.string().min(1),
  medication: z.string().trim().min(1),
  dosage: z.string().trim().min(1),
  frequency: z.string().trim().min(1),
  refillsLeft: z.number().int().min(0).default(0),
})
export type CreatePrescriptionInput = z.infer<typeof createPrescriptionSchema>

export const updatePrescriptionSchema = z.object({
  status: prescriptionStatusSchema,
})
export type UpdatePrescriptionInput = z.infer<typeof updatePrescriptionSchema>

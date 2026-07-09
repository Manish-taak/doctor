import { z } from "zod"

export const recordTypeSchema = z.enum(["LAB_RESULT", "PRESCRIPTION", "VISIT_SUMMARY", "IMAGING"])

export const createMedicalRecordSchema = z.object({
  patientId: z.string().min(1),
  title: z.string().trim().min(1),
  type: recordTypeSchema,
  fileSize: z.string().trim().min(1),
  summary: z.string().trim().min(1),
})
export type CreateMedicalRecordInput = z.infer<typeof createMedicalRecordSchema>

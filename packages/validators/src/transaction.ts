import { z } from "zod"

export const transactionStatusSchema = z.enum(["PAID", "PENDING", "FAILED"])

export const createTransactionSchema = z.object({
  patientId: z.string().min(1),
  description: z.string().trim().min(1),
  amount: z.number().min(0),
  method: z.string().trim().min(1),
  invoiceId: z.string().trim().min(1),
})
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>

export const updateTransactionSchema = z.object({
  status: transactionStatusSchema,
})
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>

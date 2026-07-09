import { z } from "zod"

export const appointmentTypeSchema = z.enum(["IN_PERSON", "VIDEO"])
export const appointmentStatusSchema = z.enum(["PENDING", "UPCOMING", "COMPLETED", "CANCELLED"])

export const createAppointmentSchema = z.object({
  doctorId: z.string().min(1, "Select a doctor"),
  date: z.coerce.date(),
  type: appointmentTypeSchema,
  location: z.string().trim().min(1),
})
export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>

export const updateAppointmentSchema = z.object({
  status: appointmentStatusSchema,
})
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>

import { z } from "zod"

export const updateSettingsSchema = z.object({
  platformName: z.string().trim().min(2).optional(),
  supportEmail: z.string().trim().toLowerCase().email().optional(),
  enforce2fa: z.boolean().optional(),
  sessionTimeoutMinutes: z.number().int().min(5).max(480).optional(),
})
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>

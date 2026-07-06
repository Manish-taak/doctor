import { z } from "zod"

export const createDoctorSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
  specialty: z.string().trim().min(2),
  qualification: z.string().trim().min(1),
  bio: z.string().trim().optional(),
  experienceYears: z.number().int().min(0),
  price: z.number().min(0),
  location: z.string().trim().min(1),
  telehealth: z.boolean().default(false),
  education: z.array(z.string()).default([]),
  languages: z.array(z.string()).default([]),
})
export type CreateDoctorInput = z.infer<typeof createDoctorSchema>

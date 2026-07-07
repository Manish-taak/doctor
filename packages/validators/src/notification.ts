import { z } from "zod"

export const notificationTypeSchema = z.enum(["APPOINTMENT", "MESSAGE", "PAYMENT", "SYSTEM"])

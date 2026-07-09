import { z } from "zod"

export const createConversationSchema = z.object({
  doctorId: z.string().min(1),
})
export type CreateConversationInput = z.infer<typeof createConversationSchema>

export const sendMessageSchema = z.object({
  text: z.string().trim().min(1, "Message cannot be empty"),
})
export type SendMessageInput = z.infer<typeof sendMessageSchema>

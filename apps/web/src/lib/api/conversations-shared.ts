import { format } from "date-fns"

import type { Message } from "@/types"

export interface ApiMessage {
  id: string
  conversationId: string
  senderId: string
  text: string
  createdAt: string
}

export function mapMessage(api: ApiMessage, currentUserId: string): Message {
  return {
    id: api.id,
    conversationId: api.conversationId,
    sender: api.senderId === currentUserId ? "me" : "them",
    text: api.text,
    time: format(new Date(api.createdAt), "h:mm a"),
  }
}

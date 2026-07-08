import type { Message } from "@/types"

import { mapMessage, type ApiMessage } from "./conversations-shared"

// Called from "use client" components — relies on the browser automatically
// attaching the NextAuth session cookie to this same-origin request.
export async function getMessagesClient(
  _token: string,
  currentUserId: string,
  conversationId: string
): Promise<Message[]> {
  const response = await fetch(`/api/conversations/${conversationId}/messages`)
  const messages: ApiMessage[] = await response.json()
  return messages.map((m) => mapMessage(m, currentUserId))
}

export async function sendMessage(
  _token: string,
  currentUserId: string,
  conversationId: string,
  text: string
): Promise<Message> {
  const response = await fetch(`/api/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })
  const message: ApiMessage = await response.json()
  return mapMessage(message, currentUserId)
}

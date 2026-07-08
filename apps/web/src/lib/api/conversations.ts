import { formatDistanceToNow } from "date-fns"

import { accentForId } from "@/lib/accent"
import { findConversationsForUser, findMessages as findMessagesService } from "@/lib/server/services/conversations"
import { requireUser } from "@/lib/server/session"
import { getInitials } from "@/lib/utils"
import type { Conversation, Message } from "@/types"

import { mapMessage, type ApiMessage } from "./conversations-shared"

export interface ApiConversation {
  id: string
  patient: { user: { name: string } }
  doctor: { specialty: string; user: { name: string } }
  unreadCount: number
  lastMessage: { text: string; createdAt: string } | null
}

export function mapConversation(api: ApiConversation, viewerRole: "patient" | "doctor"): Conversation {
  const other = viewerRole === "patient" ? api.doctor.user : api.patient.user
  const role = viewerRole === "patient" ? api.doctor.specialty : "Patient"

  return {
    id: api.id,
    name: other.name,
    initials: getInitials(other.name),
    accent: accentForId(api.id),
    role,
    lastMessage: api.lastMessage?.text ?? "",
    lastMessageAt: api.lastMessage
      ? formatDistanceToNow(new Date(api.lastMessage.createdAt), { addSuffix: true })
      : "",
    unreadCount: api.unreadCount,
    online: false,
  }
}

export async function getConversations(): Promise<Conversation[]> {
  const user = await requireUser()
  const viewerRole = user.role === "DOCTOR" ? "doctor" : "patient"

  const conversations = await findConversationsForUser(user)
  return conversations.map((c) => mapConversation(c as unknown as ApiConversation, viewerRole))
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const user = await requireUser()
  const messages = await findMessagesService(user, conversationId)
  return messages.map((m) => mapMessage(m as unknown as ApiMessage, user.id))
}

import { format, formatDistanceToNow } from "date-fns"

import { accentForId } from "@/lib/accent"
import { auth } from "@/lib/auth"
import { getInitials } from "@/lib/utils"
import type { Conversation, Message } from "@/types"

import { apiFetch, serverAuthHeaders } from "./client"

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

interface ApiConversation {
  id: string
  patient: { user: { name: string } }
  doctor: { specialty: string; user: { name: string } }
  unreadCount: number
  lastMessage: { text: string; createdAt: string } | null
}

interface ApiMessage {
  id: string
  conversationId: string
  senderId: string
  text: string
  createdAt: string
}

function mapConversation(api: ApiConversation, viewerRole: "patient" | "doctor"): Conversation {
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

function mapMessage(api: ApiMessage, currentUserId: string): Message {
  return {
    id: api.id,
    conversationId: api.conversationId,
    sender: api.senderId === currentUserId ? "me" : "them",
    text: api.text,
    time: format(new Date(api.createdAt), "h:mm a"),
  }
}

export async function getConversations(): Promise<Conversation[]> {
  const session = await auth()
  const headers = await serverAuthHeaders()
  const viewerRole = session?.user?.role === "doctor" ? "doctor" : "patient"

  const conversations = await apiFetch<ApiConversation[]>("/conversations", { headers })
  return conversations.map((c) => mapConversation(c, viewerRole))
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const session = await auth()
  const headers = await serverAuthHeaders()

  const messages = await apiFetch<ApiMessage[]>(`/conversations/${conversationId}/messages`, { headers })
  return messages.map((m) => mapMessage(m, session?.user?.id ?? ""))
}

// Client-safe versions — take the access token + current user id directly instead of
// using the server-only `auth()` helper, so these can be called from "use client" components.
export async function getMessagesClient(
  token: string,
  currentUserId: string,
  conversationId: string
): Promise<Message[]> {
  const response = await fetch(`${PUBLIC_API_URL}/conversations/${conversationId}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const messages: ApiMessage[] = await response.json()
  return messages.map((m) => mapMessage(m, currentUserId))
}

export async function sendMessage(
  token: string,
  currentUserId: string,
  conversationId: string,
  text: string
): Promise<Message> {
  const response = await fetch(`${PUBLIC_API_URL}/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text }),
  })
  const message: ApiMessage = await response.json()
  return mapMessage(message, currentUserId)
}

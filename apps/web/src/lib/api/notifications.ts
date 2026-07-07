import { formatDistanceToNow } from "date-fns"

import type { Notification, NotificationType } from "@/types"

import { apiFetch, serverAuthHeaders } from "./client"

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

interface ApiNotification {
  id: string
  type: "APPOINTMENT" | "MESSAGE" | "PAYMENT" | "SYSTEM"
  title: string
  description: string
  read: boolean
  createdAt: string
}

function mapNotification(api: ApiNotification): Notification {
  return {
    id: api.id,
    type: api.type.toLowerCase() as NotificationType,
    title: api.title,
    description: api.description,
    time: formatDistanceToNow(new Date(api.createdAt), { addSuffix: true }),
    read: api.read,
  }
}

export async function getNotifications(): Promise<Notification[]> {
  const headers = await serverAuthHeaders()
  const notifications = await apiFetch<ApiNotification[]>("/notifications", { headers })
  return notifications.map(mapNotification)
}

// Client-safe mutations — take the access token directly instead of using the
// server-only `auth()` helper, so these can be called from "use client" components.
export async function markNotificationRead(token: string, id: string): Promise<void> {
  await fetch(`${PUBLIC_API_URL}/notifications/${id}/read`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function markAllNotificationsRead(token: string): Promise<void> {
  await fetch(`${PUBLIC_API_URL}/notifications/read-all`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  })
}

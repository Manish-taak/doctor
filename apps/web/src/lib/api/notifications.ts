import { formatDistanceToNow } from "date-fns"

import { findNotificationsForUser } from "@/lib/server/services/notifications"
import { requireUser } from "@/lib/server/session"
import type { Notification, NotificationType } from "@/types"

export interface ApiNotification {
  id: string
  type: "APPOINTMENT" | "MESSAGE" | "PAYMENT" | "SYSTEM"
  title: string
  description: string
  read: boolean
  createdAt: string
}

export function mapNotification(api: ApiNotification): Notification {
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
  const user = await requireUser()
  const notifications = await findNotificationsForUser(user)
  return notifications.map((n) => mapNotification(n as unknown as ApiNotification))
}

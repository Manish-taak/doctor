"use client"

import { useState } from "react"
import { Bell, CalendarDays, CreditCard, MessageSquare, type LucideIcon } from "lucide-react"
import { useSession } from "next-auth/react"

import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { markAllNotificationsRead } from "@/lib/api/notifications-client"
import { cn } from "@/lib/utils"
import type { Notification, NotificationType } from "@/types"

const typeIcons: Record<NotificationType, LucideIcon> = {
  appointment: CalendarDays,
  message: MessageSquare,
  payment: CreditCard,
  system: Bell,
}

export function NotificationsList({ notifications: initial }: { notifications: Notification[] }) {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState(initial)
  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    if (session?.accessToken) {
      await markAllNotificationsRead(session.accessToken)
    }
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button variant="outline" size="sm" disabled={unreadCount === 0} onClick={handleMarkAllRead}>
          Mark all as read
        </Button>
      </div>

      {notifications.length > 0 ? (
        <div className="flex flex-col gap-3">
          {notifications.map((notification) => {
            const Icon = typeIcons[notification.type]
            return (
              <Card
                key={notification.id}
                className={cn("ring-foreground/5", !notification.read && "bg-primary/3 ring-primary/15")}
              >
                <CardContent className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-sm",
                      notification.read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{notification.title}</p>
                      {!notification.read && <span className="size-1.5 shrink-0 rounded-sm bg-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{notification.time}</span>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
      )}
    </>
  )
}

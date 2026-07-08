import { Bell, CalendarDays, MessageSquare, Settings as SettingsIcon, Wallet } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { notifications } from "@/lib/mock/notifications"
import { cn } from "@/lib/utils"
import type { NotificationType } from "@/types"

const typeIcon: Record<NotificationType, LucideIcon> = {
  appointment: CalendarDays,
  message: MessageSquare,
  payment: Wallet,
  system: SettingsIcon,
}

const typeStyles: Record<NotificationType, string> = {
  appointment: "bg-primary/10 text-primary",
  message: "bg-coral/10 text-coral",
  payment: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  system: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

export default function DoctorNotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description="Stay up to date with appointments, messages, and payments." />

      <Card className="ring-foreground/5">
        <CardContent className="flex flex-col gap-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => {
              const Icon = typeIcon[notification.type]
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 rounded-sm p-3 transition-colors",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-sm", typeStyles[notification.type])}>
                    <Icon className="size-4.5" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("text-sm", notification.read ? "font-medium text-foreground/80" : "font-semibold text-foreground")}>
                        {notification.title}
                      </p>
                      {!notification.read && <span className="size-2 shrink-0 rounded-sm bg-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="mt-0.5 text-[0.7rem] text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
          )}
        </CardContent>
      </Card>
    </>
  )
}

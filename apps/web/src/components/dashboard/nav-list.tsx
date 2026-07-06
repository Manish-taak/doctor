"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { dashboardNav } from "@/lib/dashboard-nav"
import { conversations } from "@/lib/mock/messages"
import { notifications } from "@/lib/mock/notifications"
import type { UserRole } from "@/types"

const unreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0)
const unreadNotifications = notifications.filter((n) => !n.read).length

function navBadgeCount(href: string) {
  if (href.endsWith("/messages")) return unreadMessages
  if (href.endsWith("/notifications")) return unreadNotifications
  return 0
}

export function DashboardNavList({
  role,
  onNavigate,
}: {
  role: UserRole
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const items = dashboardNav[role]

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active = pathname === item.href
        const badgeCount = navBadgeCount(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-foreground/70 hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="size-4.5 shrink-0" strokeWidth={2} />
            {item.label}
            {badgeCount > 0 && (
              <Badge className="ml-auto bg-coral text-coral-foreground">{badgeCount}</Badge>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

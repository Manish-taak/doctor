"use client"

import { useState } from "react"
import Link from "next/link"
import { Activity, Bell, LogOut, Menu, Search, Settings, User as UserIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DashboardNavList } from "@/components/dashboard/nav-list"
import { dashboardRoleLabel } from "@/lib/dashboard-nav"
import { notifications } from "@/lib/mock/notifications"
import { siteConfig } from "@/lib/site-config"
import { getInitials } from "@/lib/utils"
import type { UserRole } from "@/types"

export function DashboardTopbar({ role }: { role: UserRole }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data: session } = useSession()
  const user = {
    name: session?.user?.name ?? "Guest",
    email: session?.user?.email ?? "",
    initials: session?.user?.name ? getInitials(session.user.name) : "?",
  }
  const unread = notifications.filter((n) => !n.read)

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-lg sm:px-6 lg:pl-70">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger render={<Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />}>
          <Menu className="size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader className="border-b border-border">
            <SheetTitle className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/70 text-primary-foreground">
                <Activity className="size-4.5" strokeWidth={2.5} />
              </span>
              {siteConfig.name}
            </SheetTitle>
          </SheetHeader>
          <div className="px-3 py-2">
            <DashboardNavList role={role} onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden max-w-sm flex-1 items-center gap-2.5 rounded-lg border border-border bg-muted/40 px-3 py-1.5 sm:flex">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" className="relative" aria-label="Notifications" />}
          >
            <Bell className="size-5" />
            {unread.length > 0 && (
              <Badge className="absolute -top-1 -right-1 size-4.5 justify-center bg-coral p-0 text-[10px] text-coral-foreground">
                {unread.length}
              </Badge>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.slice(0, 4).map((n) => (
                <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2">
                  <span className="text-sm font-medium text-foreground">{n.title}</span>
                  <span className="text-xs text-muted-foreground">{n.description}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              render={<Link href={`/${role}/notifications`} />}
              className="justify-center text-primary"
            >
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={<button className="flex items-center gap-2 rounded-full outline-none" />}>
            <Avatar>
              <AvatarFallback className="bg-linear-to-br from-primary to-primary/60 font-semibold text-white">
                {user.initials}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex flex-col gap-0.5 py-1">
                <span className="text-sm font-medium text-foreground">{user.name}</span>
                <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href={`/${role}/profile`} />}>
              <UserIcon /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href={`/${role}/settings`} />}>
              <Settings /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} variant="destructive">
              <LogOut /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export function DashboardRoleBadge({ role }: { role: UserRole }) {
  return <span className="text-xs text-muted-foreground">{dashboardRoleLabel[role]} portal</span>
}

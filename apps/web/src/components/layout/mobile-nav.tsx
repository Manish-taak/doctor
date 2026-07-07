"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, LogOut, Menu, Settings } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { Logo } from "@/components/layout/logo"
import { mainNav } from "@/lib/site-config"
import { getInitials } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-xs">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="flex">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-1 px-4">
          {mainNav.map((link) => (
            <SheetClose
              key={link.href}
              render={
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>
        <div className="flex flex-col gap-2 border-t border-border p-4">
          {status === "authenticated" && session?.user ? (
            <>
              <div className="flex items-center gap-3 px-1 pb-1">
                <Avatar>
                  <AvatarFallback className="bg-linear-to-br from-primary to-primary/60 font-semibold text-white">
                    {session.user.name ? getInitials(session.user.name) : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{session.user.name}</span>
                  <span className="text-xs text-muted-foreground">{session.user.email}</span>
                </div>
              </div>
              <Separator />
              <SheetClose
                render={
                  <Link
                    href={`/${session.user.role}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  />
                }
              >
                <LayoutDashboard className="size-4.5" /> Dashboard
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href={`/${session.user.role}/settings`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                  />
                }
              >
                <Settings className="size-4.5" /> Settings
              </SheetClose>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => {
                  setOpen(false)
                  signOut({ callbackUrl: "/" })
                }}
              >
                <LogOut className="size-4.5" /> Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="lg" className="w-full" render={<Link href="/login" />}>
                Sign in
              </Button>
              <Button size="lg" className="w-full" render={<Link href="/signup" />}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

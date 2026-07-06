"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
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

export function MobileNav() {
  const [open, setOpen] = useState(false)

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
                  className="rounded-sm px-3 py-2.5 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                />
              }
            >
              {link.label}
            </SheetClose>
          ))}
        </nav>
        <div className="flex flex-col gap-2 border-t border-border p-4">
          <Button variant="outline" size="lg" className="w-full" render={<Link href="/login" />}>
            Sign in
          </Button>
          <Button size="lg" className="w-full" render={<Link href="/signup" />}>
            Get Started
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

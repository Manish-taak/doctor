import Link from "next/link"
import { Activity } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-linear-to-br from-primary to-primary/70 text-primary-foreground shadow-sm shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
        <Activity className="size-4.5" strokeWidth={2.5} />
      </span>
      <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
        {siteConfig.name}
      </span>
    </Link>
  )
}

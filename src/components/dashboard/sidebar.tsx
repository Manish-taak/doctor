import { Activity } from "lucide-react"

import { DashboardNavList } from "@/components/dashboard/nav-list"
import { dashboardRoleLabel } from "@/lib/dashboard-nav"
import { siteConfig } from "@/lib/site-config"
import type { UserRole } from "@/types"

export function DashboardSidebar({ role }: { role: UserRole }) {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/70 text-primary-foreground shadow-sm shadow-primary/30">
          <Activity className="size-4.5" strokeWidth={2.5} />
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-heading text-sm font-semibold text-foreground">{siteConfig.name}</span>
          <span className="text-xs text-muted-foreground">{dashboardRoleLabel[role]} portal</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <DashboardNavList role={role} />
      </div>
    </aside>
  )
}

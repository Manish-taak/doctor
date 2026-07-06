import type { ReactNode } from "react"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"
import { PageTransition } from "@/components/motion/page-transition"
import type { UserRole } from "@/types"

export function DashboardShell({ role, children }: { role: UserRole; children: ReactNode }) {
  return (
    <div className="min-h-svh bg-secondary/30">
      <DashboardSidebar role={role} />
      <div className="flex min-h-svh flex-col lg:pl-64">
        <DashboardTopbar role={role} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  )
}

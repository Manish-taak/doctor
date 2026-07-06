import type { ReactNode } from "react"

import { DashboardShell } from "@/components/dashboard/shell"

export default function DoctorLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="doctor">{children}</DashboardShell>
}

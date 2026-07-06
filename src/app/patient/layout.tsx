import type { ReactNode } from "react"

import { DashboardShell } from "@/components/dashboard/shell"

export default function PatientLayout({ children }: { children: ReactNode }) {
  return <DashboardShell role="patient">{children}</DashboardShell>
}

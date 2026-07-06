"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UserRole } from "@/types"

const roleLabels: Record<UserRole, string> = {
  patient: "Patient",
  doctor: "Doctor",
  admin: "Admin",
}

export function RoleTabs({
  roles,
  value,
  onChange,
}: {
  roles: UserRole[]
  value: UserRole
  onChange: (role: UserRole) => void
}) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as UserRole)}>
      <TabsList className="w-full">
        {roles.map((role) => (
          <TabsTrigger key={role} value={role} className="flex-1">
            {roleLabels[role]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

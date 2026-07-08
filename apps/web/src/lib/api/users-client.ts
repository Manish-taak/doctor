import type { UserRole } from "@/types"

import type { MyProfile } from "./users"

// Called from "use client" components — relies on the browser automatically
// attaching the NextAuth session cookie to this same-origin request.
export async function updateUserRole(_token: string, id: string, role: UserRole): Promise<void> {
  const response = await fetch(`/api/users/${id}/role`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: role.toUpperCase() }),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update role")
  }
}

export interface UpdateProfileInput {
  name?: string
  phone?: string
  dob?: string
  gender?: string
  insuranceProvider?: string
  insurancePolicyNumber?: string
  insuranceGroupNumber?: string
  insuranceValidThrough?: string
}

export async function updateProfile(_token: string, input: UpdateProfileInput): Promise<MyProfile> {
  const response = await fetch("/api/users/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update profile")
  }

  return response.json()
}

import { format } from "date-fns"

import { accentForId } from "@/lib/accent"
import { getInitials } from "@/lib/utils"
import type { PlatformUser, UserRole } from "@/types"

import { apiFetch, serverAuthHeaders } from "./client"

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

interface ApiUser {
  id: string
  name: string
  email: string
  role: "PATIENT" | "DOCTOR" | "ADMIN"
  createdAt: string
}

function mapUser(api: ApiUser): PlatformUser {
  return {
    id: api.id,
    name: api.name,
    initials: getInitials(api.name),
    email: api.email,
    role: api.role.toLowerCase() as UserRole,
    status: "active",
    joinedDate: format(new Date(api.createdAt), "yyyy-MM-dd"),
    accent: accentForId(api.id),
  }
}

export async function getUsers(): Promise<PlatformUser[]> {
  const headers = await serverAuthHeaders()
  const users = await apiFetch<ApiUser[]>("/users", { headers })
  return users.map(mapUser)
}

// Client-safe mutation — takes the access token directly since it's called from
// a "use client" component (the Admin Users table).
export async function updateUserRole(token: string, id: string, role: UserRole): Promise<void> {
  const response = await fetch(`${PUBLIC_API_URL}/users/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ role: role.toUpperCase() }),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update role")
  }
}

export interface MyProfile {
  id: string
  name: string
  email: string
  role: "PATIENT" | "DOCTOR" | "ADMIN"
  patientProfile: {
    phone: string | null
    dob: string | null
    gender: string | null
    insuranceProvider: string | null
    insurancePolicyNumber: string | null
    insuranceGroupNumber: string | null
    insuranceValidThrough: string | null
  } | null
}

export async function getMyProfile(): Promise<MyProfile> {
  const headers = await serverAuthHeaders()
  return apiFetch<MyProfile>("/users/me", { headers })
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

// Client-safe mutation — takes the access token directly since it's called from
// the "use client" Profile/Settings forms.
export async function updateProfile(token: string, input: UpdateProfileInput): Promise<MyProfile> {
  const response = await fetch(`${PUBLIC_API_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update profile")
  }

  return response.json()
}

import { format } from "date-fns"

import { accentForId } from "@/lib/accent"
import { findAllUsers, findMe } from "@/lib/server/services/users"
import { requireRole, requireUser } from "@/lib/server/session"
import { getInitials } from "@/lib/utils"
import type { PlatformUser, UserRole } from "@/types"

export interface ApiUser {
  id: string
  name: string
  email: string
  role: "PATIENT" | "DOCTOR" | "ADMIN"
  createdAt: string
}

export function mapUser(api: ApiUser): PlatformUser {
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
  const user = await requireUser()
  requireRole(user, "ADMIN")
  const users = await findAllUsers()
  return users.map((u) => mapUser(u as unknown as ApiUser))
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
  const user = await requireUser()
  const profile = await findMe(user.id)
  return profile as unknown as MyProfile
}

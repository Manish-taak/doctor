import { accentForId } from "@/lib/accent"
import { getInitials } from "@/lib/utils"
import type { Doctor } from "@/types"

import type { ApiDoctorProfile } from "./doctors"

function mapDoctor(api: ApiDoctorProfile): Doctor {
  return {
    id: api.id,
    name: api.user.name,
    specialty: api.specialty,
    qualification: api.qualification,
    rating: api.rating,
    reviewCount: api.reviewCount,
    experienceYears: api.experienceYears,
    location: api.location,
    price: api.price,
    availableToday: api.availableToday,
    telehealth: api.telehealth,
    initials: getInitials(api.user.name),
    accent: accentForId(api.id),
    bio: api.bio ?? undefined,
    education: api.education,
    languages: api.languages,
    email: api.user.email,
  }
}

export interface UpdateDoctorProfileInput {
  bio?: string
  experienceYears?: number
  price?: number
  location?: string
  telehealth?: boolean
  availableToday?: boolean
  education?: string[]
  languages?: string[]
}

// Called from "use client" components — relies on the browser automatically
// attaching the NextAuth session cookie to this same-origin request.
export async function updateDoctorProfile(_token: string, input: UpdateDoctorProfileInput): Promise<Doctor> {
  const response = await fetch("/api/doctors/me", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update profile")
  }

  return mapDoctor(await response.json())
}

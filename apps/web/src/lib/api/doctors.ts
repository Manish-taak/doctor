import { accentForId } from "@/lib/accent"
import { getInitials } from "@/lib/utils"
import type { Doctor } from "@/types"

import { apiFetch } from "./client"

interface ApiDoctorProfile {
  id: string
  specialty: string
  qualification: string
  bio: string | null
  experienceYears: number
  price: number
  rating: number
  reviewCount: number
  telehealth: boolean
  availableToday: boolean
  location: string
  education: string[]
  languages: string[]
  user: { name: string; email: string }
}

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

export async function getDoctors(): Promise<Doctor[]> {
  const doctors = await apiFetch<ApiDoctorProfile[]>("/doctors")
  return doctors.map(mapDoctor)
}

export async function getDoctor(id: string): Promise<Doctor | null> {
  try {
    const doctor = await apiFetch<ApiDoctorProfile>(`/doctors/${id}`)
    return doctor ? mapDoctor(doctor) : null
  } catch {
    return null
  }
}

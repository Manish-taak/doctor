import { accentForId } from "@/lib/accent"
import { findAllDoctors, findMyDoctorProfile, findOneDoctor } from "@/lib/server/services/doctors"
import { requireRole, requireUser } from "@/lib/server/session"
import { getInitials } from "@/lib/utils"
import type { Doctor } from "@/types"

export interface ApiDoctorProfile {
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

export function mapDoctor(api: ApiDoctorProfile): Doctor {
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
  const doctors = await findAllDoctors()
  return doctors.map((d) => mapDoctor(d as unknown as ApiDoctorProfile))
}

export async function getDoctor(id: string): Promise<Doctor | null> {
  try {
    const doctor = await findOneDoctor(id)
    return doctor ? mapDoctor(doctor as unknown as ApiDoctorProfile) : null
  } catch {
    return null
  }
}

export async function getMyDoctorProfile(): Promise<Doctor> {
  const user = await requireUser()
  requireRole(user, "DOCTOR")
  const doctor = await findMyDoctorProfile(user.id)
  return mapDoctor(doctor as unknown as ApiDoctorProfile)
}

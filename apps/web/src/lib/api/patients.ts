import { differenceInYears, format } from "date-fns"

import { accentForId } from "@/lib/accent"
import { findMyDoctorProfile } from "@/lib/server/services/doctors"
import { findPatientsForDoctor } from "@/lib/server/services/patients"
import { requireRole, requireUser } from "@/lib/server/session"
import { getInitials } from "@/lib/utils"
import type { Accent } from "@/types"

export interface DoctorPatient {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  age: number | null
  gender: string
  lastVisit: string
  visitType: "in-person" | "video"
  appointmentCount: number
  status: "active" | "inactive"
  accent: Accent
}

export async function getMyPatients(): Promise<DoctorPatient[]> {
  const user = await requireUser()
  requireRole(user, "DOCTOR")

  const doctorProfile = await findMyDoctorProfile(user.id)
  const patients = await findPatientsForDoctor(doctorProfile.id)

  return patients
    .map((p) => ({
      id: p.id,
      name: p.name,
      initials: getInitials(p.name),
      email: p.email,
      phone: p.phone ?? "—",
      age: p.dob ? differenceInYears(new Date(), p.dob) : null,
      gender: p.gender ?? "—",
      lastVisit: format(p.lastVisitDate, "yyyy-MM-dd"),
      visitType: p.lastVisitType === "IN_PERSON" ? ("in-person" as const) : ("video" as const),
      appointmentCount: p.appointmentCount,
      status: p.active ? ("active" as const) : ("inactive" as const),
      accent: accentForId(p.id),
    }))
    .sort((a, b) => (a.lastVisit < b.lastVisit ? 1 : -1))
}

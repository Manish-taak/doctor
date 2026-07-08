import { format } from "date-fns"

import { accentForId } from "@/lib/accent"
import { findAppointmentsForUser } from "@/lib/server/services/appointments"
import { requireUser } from "@/lib/server/session"
import { getInitials } from "@/lib/utils"
import type { Appointment, AppointmentStatus } from "@/types"

export interface ApiAppointment {
  id: string
  date: string
  type: "IN_PERSON" | "VIDEO"
  status: "UPCOMING" | "COMPLETED" | "CANCELLED"
  location: string
  patient?: { user: { name: string } }
  doctor?: { specialty: string; user: { name: string } }
}

export function mapAppointment(api: ApiAppointment): Appointment {
  const patientName = api.patient?.user.name ?? ""
  const doctorName = api.doctor?.user.name ?? ""
  const date = new Date(api.date)

  return {
    id: api.id,
    patientName,
    patientInitials: patientName ? getInitials(patientName) : "",
    doctorName,
    doctorInitials: doctorName ? getInitials(doctorName) : "",
    specialty: api.doctor?.specialty ?? "",
    date: format(date, "yyyy-MM-dd"),
    time: format(date, "h:mm a"),
    type: api.type === "IN_PERSON" ? "in-person" : "video",
    status: api.status.toLowerCase() as AppointmentStatus,
    location: api.location,
    accent: accentForId(api.id),
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  const user = await requireUser()
  const appointments = await findAppointmentsForUser(user)
  return appointments.map((a) => mapAppointment(a as unknown as ApiAppointment))
}

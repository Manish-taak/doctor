import { format } from "date-fns"

import { accentForId } from "@/lib/accent"
import { getInitials } from "@/lib/utils"
import type { Appointment, AppointmentStatus } from "@/types"

import { apiFetch, serverAuthHeaders } from "./client"

interface ApiAppointment {
  id: string
  date: string
  type: "IN_PERSON" | "VIDEO"
  status: "UPCOMING" | "COMPLETED" | "CANCELLED"
  location: string
  patient?: { user: { name: string } }
  doctor?: { specialty: string; user: { name: string } }
}

function mapAppointment(api: ApiAppointment): Appointment {
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
  const headers = await serverAuthHeaders()
  const appointments = await apiFetch<ApiAppointment[]>("/appointments", { headers })
  return appointments.map(mapAppointment)
}

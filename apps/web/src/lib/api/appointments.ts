import { format } from "date-fns"

import { accentForId } from "@/lib/accent"
import { getInitials } from "@/lib/utils"
import type { Appointment, AppointmentStatus } from "@/types"

import { apiFetch, serverAuthHeaders } from "./client"

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

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

export interface CreateAppointmentInput {
  doctorId: string
  date: string
  type: "IN_PERSON" | "VIDEO"
  location: string
}

// Client-safe mutation — takes the access token directly since it's called from
// the "use client" booking panel on the public doctor profile page.
export async function createAppointment(token: string, input: CreateAppointmentInput): Promise<void> {
  const response = await fetch(`${PUBLIC_API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to book appointment")
  }
}

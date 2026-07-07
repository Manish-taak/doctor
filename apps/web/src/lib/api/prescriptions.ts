import { format } from "date-fns"

import type { Prescription, PrescriptionStatus } from "@/types"

import { apiFetch, serverAuthHeaders } from "./client"

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

interface ApiPrescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  date: string
  status: "ACTIVE" | "COMPLETED" | "EXPIRED"
  refillsLeft: number
  doctor?: { user: { name: string } }
}

function mapPrescription(api: ApiPrescription): Prescription {
  return {
    id: api.id,
    medication: api.medication,
    dosage: api.dosage,
    frequency: api.frequency,
    prescribedBy: api.doctor?.user.name ?? "",
    date: format(new Date(api.date), "yyyy-MM-dd"),
    status: api.status.toLowerCase() as PrescriptionStatus,
    refillsLeft: api.refillsLeft,
  }
}

export async function getPrescriptions(): Promise<Prescription[]> {
  const headers = await serverAuthHeaders()
  const prescriptions = await apiFetch<ApiPrescription[]>("/prescriptions", { headers })
  return prescriptions.map(mapPrescription)
}

// Client-safe mutation — takes the access token directly since it's called from
// the "use client" Prescriptions table.
export async function requestRefill(token: string, id: string): Promise<Prescription> {
  const response = await fetch(`${PUBLIC_API_URL}/prescriptions/${id}/request-refill`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to request refill")
  }

  return mapPrescription(await response.json())
}

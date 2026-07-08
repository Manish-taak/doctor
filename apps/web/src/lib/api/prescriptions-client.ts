import { format } from "date-fns"

import type { Prescription, PrescriptionStatus } from "@/types"

import type { ApiPrescription } from "./prescriptions"

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

// Called from "use client" components — relies on the browser automatically
// attaching the NextAuth session cookie to this same-origin request.
export async function requestRefill(_token: string, id: string): Promise<Prescription> {
  const response = await fetch(`/api/prescriptions/${id}/request-refill`, { method: "PATCH" })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to request refill")
  }

  return mapPrescription(await response.json())
}

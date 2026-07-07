import { format } from "date-fns"

import type { Prescription, PrescriptionStatus } from "@/types"

import { apiFetch, serverAuthHeaders } from "./client"

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

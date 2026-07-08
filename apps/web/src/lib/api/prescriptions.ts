import { format } from "date-fns"

import { findPrescriptionsForUser } from "@/lib/server/services/prescriptions"
import { requireUser } from "@/lib/server/session"
import type { Prescription, PrescriptionStatus } from "@/types"

export interface ApiPrescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  date: string
  status: "ACTIVE" | "COMPLETED" | "EXPIRED"
  refillsLeft: number
  doctor?: { user: { name: string } }
}

export function mapPrescription(api: ApiPrescription): Prescription {
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
  const user = await requireUser()
  const prescriptions = await findPrescriptionsForUser(user)
  return prescriptions.map((p) => mapPrescription(p as unknown as ApiPrescription))
}

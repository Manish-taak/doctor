import { format } from "date-fns"

import { findMedicalRecordsForUser } from "@/lib/server/services/medical-records"
import { requireUser } from "@/lib/server/session"
import type { MedicalRecord, RecordType } from "@/types"

interface ApiMedicalRecord {
  id: string
  title: string
  type: "LAB_RESULT" | "PRESCRIPTION" | "VISIT_SUMMARY" | "IMAGING"
  date: string
  fileSize: string
  summary: string
  doctor?: { user: { name: string } }
}

const RECORD_TYPE_MAP: Record<ApiMedicalRecord["type"], RecordType> = {
  LAB_RESULT: "Lab Result",
  PRESCRIPTION: "Prescription",
  VISIT_SUMMARY: "Visit Summary",
  IMAGING: "Imaging",
}

function mapMedicalRecord(api: ApiMedicalRecord): MedicalRecord {
  return {
    id: api.id,
    title: api.title,
    type: RECORD_TYPE_MAP[api.type],
    doctorName: api.doctor?.user.name ?? "",
    date: format(new Date(api.date), "yyyy-MM-dd"),
    fileSize: api.fileSize,
    summary: api.summary,
  }
}

export async function getMedicalRecords(): Promise<MedicalRecord[]> {
  const user = await requireUser()
  const records = await findMedicalRecordsForUser(user)
  return records.map((r) => mapMedicalRecord(r as unknown as ApiMedicalRecord))
}

import { getMyPatients } from "@/lib/api/patients"

import { DoctorPatientsTable } from "./patients-table"

export default async function DoctorPatientsPage() {
  const patients = await getMyPatients()

  return <DoctorPatientsTable patients={patients} />
}

import { getDoctors } from "@/lib/api/doctors"

import { AdminDoctorsTable } from "./doctors-table"

export default async function AdminDoctorsPage() {
  const doctors = await getDoctors()

  return <AdminDoctorsTable doctors={doctors} />
}

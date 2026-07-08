import { getDoctors } from "@/lib/api/doctors"

import { AdminDoctorsTable } from "./doctors-table"

// Reads directly from the database now (no cache-busting fetch to signal this
// to Next.js), so force dynamic rendering to avoid serving a stale build-time snapshot.
export const dynamic = "force-dynamic"

export default async function AdminDoctorsPage() {
  const doctors = await getDoctors()

  return <AdminDoctorsTable doctors={doctors} />
}

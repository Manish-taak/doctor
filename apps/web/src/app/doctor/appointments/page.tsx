import { PageHeader } from "@/components/dashboard/page-header"
import { getAppointments } from "@/lib/api/appointments"

import { DoctorAppointmentsList } from "./appointments-list"

export default async function DoctorAppointmentsPage() {
  const appointments = await getAppointments()

  return (
    <>
      <PageHeader title="Appointments" description="Manage your upcoming, completed, and cancelled visits." />
      <DoctorAppointmentsList appointments={appointments} />
    </>
  )
}

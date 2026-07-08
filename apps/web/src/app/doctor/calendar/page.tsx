import { getAppointments } from "@/lib/api/appointments"

import { DoctorCalendarView } from "./calendar-view"

export default async function DoctorCalendarPage() {
  const appointments = await getAppointments()

  return <DoctorCalendarView appointments={appointments} />
}

import { getAppointments } from "@/lib/api/appointments"
import { getCategories } from "@/lib/api/categories"
import { getDoctors } from "@/lib/api/doctors"
import { getTransactions } from "@/lib/api/transactions"
import { getUsers } from "@/lib/api/users"
import { groupByMonth } from "@/lib/stats"

import { ReportsGrid, type ReportsData } from "./reports-grid"

export default async function AdminReportsPage() {
  const [users, doctors, appointments, transactions, categories] = await Promise.all([
    getUsers(),
    getDoctors(),
    getAppointments(),
    getTransactions(),
    getCategories(),
  ])

  const revenueSeries = groupByMonth(
    transactions.filter((t) => t.status === "paid"),
    (t) => t.date,
    (t) => t.amount
  )
  const signupSeries = groupByMonth(
    users,
    (u) => u.joinedDate,
    () => 1
  )
  const appointmentSeries = groupByMonth(
    appointments,
    (a) => a.date,
    () => 1
  )

  const data: ReportsData = {
    revenue: revenueSeries.map((p) => [p.label, p.value]),
    signups: signupSeries.map((p) => [p.label, p.value]),
    doctors: doctors.map((d) => [d.name, d.specialty, d.rating, d.reviewCount, d.experienceYears, d.location]),
    appointments: appointmentSeries.map((p) => [p.label, p.value]),
    categories: categories.map((c) => [c.name, c.doctorCount, c.appointmentCount]),
  }

  return <ReportsGrid data={data} />
}

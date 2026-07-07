import { CalendarDays, CreditCard, Stethoscope, UserPlus, Users, Wallet } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { Card, CardContent } from "@/components/ui/card"
import { getAppointments } from "@/lib/api/appointments"
import { getDoctors } from "@/lib/api/doctors"
import { getTransactions } from "@/lib/api/transactions"
import { getUsers } from "@/lib/api/users"
import { groupByMonth, trendFor } from "@/lib/stats"

interface ActivityItem {
  icon: LucideIcon
  text: string
  date: Date
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`
}

export default async function AdminDashboardPage() {
  const [users, doctors, appointments, transactions] = await Promise.all([
    getUsers(),
    getDoctors(),
    getAppointments(),
    getTransactions(),
  ])

  const now = new Date()
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
  const appointmentsThisMonth = appointments.filter((a) => a.date.startsWith(currentMonthKey)).length

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
  const latestRevenue = revenueSeries[revenueSeries.length - 1]?.value ?? 0

  const activityFeed: ActivityItem[] = [
    ...users.slice(0, 3).map((u) => ({
      icon: UserPlus,
      text: `${u.name} signed up as a ${u.role}`,
      date: new Date(u.joinedDate),
    })),
    ...appointments.slice(0, 3).map((a) => ({
      icon: CalendarDays,
      text: `${a.patientName} booked with ${a.doctorName}`,
      date: new Date(a.date),
    })),
    ...transactions.slice(0, 3).map((t) => ({
      icon: CreditCard,
      text: `${t.description} — ${formatCurrency(t.amount)}`,
      date: new Date(t.date),
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5)

  return (
    <>
      <PageHeader
        title="Platform overview"
        description="Monitor users, doctors, appointments, and revenue across Vitalis."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total users"
          value={users.length.toLocaleString("en-US")}
          icon={Users}
          trend={trendFor(signupSeries)}
        />
        <MetricCard label="Total doctors" value={doctors.length.toLocaleString("en-US")} icon={Stethoscope} />
        <MetricCard
          label="Appointments this month"
          value={appointmentsThisMonth.toLocaleString("en-US")}
          icon={CalendarDays}
        />
        <MetricCard
          label="Platform revenue"
          value={formatCurrency(latestRevenue)}
          icon={Wallet}
          trend={trendFor(revenueSeries)}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">Platform revenue</h2>
              <LineChart data={revenueSeries} />
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">New signups</h2>
              <BarChart data={signupSeries} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">Recent activity</h2>
              {activityFeed.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {activityFeed.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <activity.icon className="size-4" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-sm font-medium text-foreground">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(activity.date, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

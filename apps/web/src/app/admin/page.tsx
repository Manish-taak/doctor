import {
  AlertTriangle,
  CalendarDays,
  CreditCard,
  ShieldCheck,
  Stethoscope,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { Card, CardContent } from "@/components/ui/card"
import { appointments } from "@/lib/mock/appointments"
import { monthlySignups, platformRevenue } from "@/lib/mock/charts"
import { doctors } from "@/lib/mock/doctors"
import { platformUsers } from "@/lib/mock/users"

const activityFeed: { icon: LucideIcon; text: string; time: string }[] = [
  { icon: UserPlus, text: "142 new patients signed up today", time: "2 hours ago" },
  { icon: ShieldCheck, text: "New doctor approved: Dr. Ryo Tanaka", time: "5 hours ago" },
  { icon: AlertTriangle, text: "Account suspended: Tom Walker", time: "Yesterday" },
  { icon: CreditCard, text: "Payout processed: $18,400 to providers", time: "Yesterday" },
  { icon: CalendarDays, text: "312 appointments booked this week", time: "2 days ago" },
]

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`
}

export default function AdminDashboardPage() {
  const appointmentsThisMonth = appointments.filter((a) => a.date.startsWith("2026-07")).length
  const latestRevenue = platformRevenue[platformRevenue.length - 1]?.value ?? 0

  return (
    <>
      <PageHeader
        title="Platform overview"
        description="Monitor users, doctors, appointments, and revenue across Vitalis."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total users"
          value={platformUsers.length.toLocaleString("en-US")}
          icon={Users}
          trend={{ value: "+12% this month", positive: true }}
        />
        <MetricCard label="Total doctors" value={doctors.length.toLocaleString("en-US")} icon={Stethoscope} />
        <MetricCard
          label="Appointments this month"
          value={appointmentsThisMonth.toLocaleString("en-US")}
          icon={CalendarDays}
          trend={{ value: "+8% vs last month", positive: true }}
        />
        <MetricCard label="Platform revenue" value={formatCurrency(latestRevenue)} icon={Wallet} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">Platform revenue</h2>
              <LineChart data={platformRevenue} />
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">New signups</h2>
              <BarChart data={monthlySignups} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">Recent activity</h2>
              <div className="flex flex-col gap-4">
                {activityFeed.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <activity.icon className="size-4" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

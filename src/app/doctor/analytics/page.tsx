import { Activity, CalendarDays, TrendingUp, Users } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { categories } from "@/lib/mock/categories"
import { monthlyEarnings, weeklyVisits } from "@/lib/mock/charts"
import { patients } from "@/lib/mock/patients"

export default function DoctorAnalyticsPage() {
  const totalVisitsThisWeek = weeklyVisits.reduce((sum, d) => sum + d.value, 0)
  const revenueGrowth =
    monthlyEarnings.length > 1
      ? (
          ((monthlyEarnings[monthlyEarnings.length - 1].value - monthlyEarnings[monthlyEarnings.length - 2].value) /
            monthlyEarnings[monthlyEarnings.length - 2].value) *
          100
        ).toFixed(1)
      : "0"

  return (
    <>
      <PageHeader title="Analytics" description="Understand your practice's patient volume and revenue trends." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Visits this week" value={String(totalVisitsThisWeek)} icon={CalendarDays} />
        <MetricCard label="Active patients" value={String(patients.filter((p) => p.status === "active").length)} icon={Users} />
        <MetricCard
          label="Revenue growth"
          value={`${revenueGrowth}%`}
          icon={TrendingUp}
          trend={{ value: "vs previous month", positive: Number(revenueGrowth) >= 0 }}
        />
        <MetricCard label="Categories served" value={String(categories.length)} icon={Activity} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Patient volume trend</h2>
            <BarChart data={weeklyVisits} />
          </CardContent>
        </Card>

        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Revenue trend</h2>
            <LineChart data={monthlyEarnings} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 ring-foreground/5">
        <CardContent className="flex flex-col gap-4">
          <h2 className="font-heading text-base font-semibold text-foreground">Category breakdown</h2>
          <div className="flex flex-col divide-y divide-border">
            {categories.slice(0, 5).map((category) => {
              const Icon = category.icon
              return (
                <div key={category.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4.5" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{category.name}</p>
                  </div>
                  <div className="flex items-center gap-6 text-xs text-muted-foreground">
                    <span>{category.doctorCount} doctors</span>
                    <span>{category.appointmentCount.toLocaleString()} visits</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

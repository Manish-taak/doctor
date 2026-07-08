import { CalendarDays, MapPin, TrendingUp, Users, Video } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { getAppointments } from "@/lib/api/appointments"
import { getMyDoctorProfile } from "@/lib/api/doctors"
import { getMyPatients } from "@/lib/api/patients"
import { groupByMonth, trendFor, weeklyCounts } from "@/lib/stats"

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`
}

export default async function DoctorAnalyticsPage() {
  const [doctor, appointments, patients] = await Promise.all([
    getMyDoctorProfile(),
    getAppointments(),
    getMyPatients(),
  ])

  const completed = appointments.filter((a) => a.status === "completed")
  const weeklyVisits = weeklyCounts(appointments, (a) => a.date)
  const revenueSeries = groupByMonth(completed, (a) => a.date, () => doctor.price)
  const totalVisitsThisWeek = weeklyVisits.reduce((sum, d) => sum + d.value, 0)
  const activePatients = patients.filter((p) => p.status === "active").length
  const videoVisits = appointments.filter((a) => a.type === "video").length
  const inPersonVisits = appointments.length - videoVisits

  return (
    <>
      <PageHeader title="Analytics" description="Understand your practice's patient volume and revenue trends." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Visits this week" value={String(totalVisitsThisWeek)} icon={CalendarDays} />
        <MetricCard label="Active patients" value={String(activePatients)} icon={Users} />
        <MetricCard
          label="Revenue trend"
          value={formatCurrency(revenueSeries[revenueSeries.length - 1]?.value ?? 0)}
          icon={TrendingUp}
          trend={trendFor(revenueSeries)}
        />
        <MetricCard label="Total appointments" value={String(appointments.length)} icon={CalendarDays} />
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
            <LineChart data={revenueSeries} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 ring-foreground/5">
        <CardContent className="flex flex-col gap-4">
          <h2 className="font-heading text-base font-semibold text-foreground">Visit type breakdown</h2>
          <div className="flex flex-col divide-y divide-border">
            <div className="flex items-center justify-between gap-4 py-3 first:pt-0">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <MapPin className="size-4.5" />
                </div>
                <p className="text-sm font-medium text-foreground">In-person</p>
              </div>
              <span className="text-xs text-muted-foreground">{inPersonVisits.toLocaleString()} visits</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <Video className="size-4.5" />
                </div>
                <p className="text-sm font-medium text-foreground">Video</p>
              </div>
              <span className="text-xs text-muted-foreground">{videoVisits.toLocaleString()} visits</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

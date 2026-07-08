import { CalendarCheck, DollarSign, TrendingUp, Wallet } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/empty-state"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart } from "@/components/charts/bar-chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { getAppointments } from "@/lib/api/appointments"
import { getMyDoctorProfile } from "@/lib/api/doctors"
import { groupByMonth, trendFor } from "@/lib/stats"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)

export default async function DoctorEarningsPage() {
  const [doctor, appointments] = await Promise.all([getMyDoctorProfile(), getAppointments()])

  const completed = appointments
    .filter((a) => a.status === "completed")
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  const revenueSeries = groupByMonth(completed, (a) => a.date, () => doctor.price)
  const totalEarnings = revenueSeries.reduce((sum, m) => sum + m.value, 0)
  const thisMonth = revenueSeries[revenueSeries.length - 1]?.value ?? 0

  return (
    <>
      <PageHeader title="Earnings" description="Track your revenue from completed visits." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total earnings" value={formatCurrency(totalEarnings)} icon={Wallet} />
        <MetricCard label="This month" value={formatCurrency(thisMonth)} icon={TrendingUp} trend={trendFor(revenueSeries)} />
        <MetricCard label="Completed visits" value={String(completed.length)} icon={CalendarCheck} />
        <MetricCard label="Rate per visit" value={formatCurrency(doctor.price)} icon={DollarSign} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6">
        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Monthly earnings</h2>
            <BarChart data={revenueSeries} formatValue={(v) => formatCurrency(v)} />
          </CardContent>
        </Card>

        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Recent completed visits</h2>
            {completed.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completed.slice(0, 10).map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium text-foreground">{appointment.patientName}</TableCell>
                      <TableCell className="text-muted-foreground">{appointment.date}</TableCell>
                      <TableCell className="text-muted-foreground capitalize">{appointment.type}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">
                        {formatCurrency(doctor.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState
                icon={CalendarCheck}
                title="No completed visits yet"
                description="Earnings from completed appointments will show up here."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

import { CalendarDays, LayoutGrid, UserPlus, Wallet } from "lucide-react"

import { BarChart } from "@/components/charts/bar-chart"
import { LineChart } from "@/components/charts/line-chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { appointments } from "@/lib/mock/appointments"
import { monthlySignups, platformRevenue } from "@/lib/mock/charts"
import { categories } from "@/lib/mock/categories"

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`
}

export default function AdminAnalyticsPage() {
  const totalRevenue = platformRevenue.reduce((sum, point) => sum + point.value, 0)
  const totalSignups = monthlySignups.reduce((sum, point) => sum + point.value, 0)

  return (
    <>
      <PageHeader title="Analytics" description="Deep dive into platform growth, revenue, and category performance." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Revenue (YTD)" value={formatCurrency(totalRevenue)} icon={Wallet} trend={{ value: "+9.4%", positive: true }} />
        <MetricCard label="New signups (YTD)" value={totalSignups.toLocaleString("en-US")} icon={UserPlus} trend={{ value: "+14.2%", positive: true }} />
        <MetricCard label="Appointments" value={appointments.length.toLocaleString("en-US")} icon={CalendarDays} />
        <MetricCard label="Categories" value={categories.length.toLocaleString("en-US")} icon={LayoutGrid} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Platform revenue</h2>
            <LineChart data={platformRevenue} />
          </CardContent>
        </Card>

        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Monthly signups</h2>
            <BarChart data={monthlySignups} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 ring-foreground/5">
        <CardContent className="flex flex-col gap-4">
          <h2 className="font-heading text-base font-semibold text-foreground">Category breakdown</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Doctors</TableHead>
                <TableHead>Appointments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-sm bg-primary/10 text-primary">
                        <category.icon className="size-4" strokeWidth={2} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{category.doctorCount}</TableCell>
                  <TableCell className="text-muted-foreground">{category.appointmentCount.toLocaleString("en-US")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

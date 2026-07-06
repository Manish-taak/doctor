"use client"

import { CalendarDays, Download, FileBarChart, FileText, Stethoscope, TrendingUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/dashboard/page-header"

interface Report {
  id: string
  title: string
  description: string
  range: string
  icon: LucideIcon
}

const reports: Report[] = [
  {
    id: "rep-revenue",
    title: "Monthly Revenue Report",
    description: "Revenue breakdown by specialty, region, and payment method.",
    range: "Jul 2026",
    icon: FileBarChart,
  },
  {
    id: "rep-growth",
    title: "User Growth Report",
    description: "New signups, activation, and retention across all roles.",
    range: "Jan – Jul 2026",
    icon: TrendingUp,
  },
  {
    id: "rep-performance",
    title: "Doctor Performance Report",
    description: "Ratings, appointment volume, and utilization by provider.",
    range: "Q2 2026",
    icon: Stethoscope,
  },
  {
    id: "rep-volume",
    title: "Appointment Volume Report",
    description: "Booking trends across specialties and appointment types.",
    range: "Jun 2026",
    icon: CalendarDays,
  },
  {
    id: "rep-churn",
    title: "Churn Analysis",
    description: "Patient and provider churn drivers and cohort retention.",
    range: "Last 90 days",
    icon: FileText,
  },
]

export default function AdminReportsPage() {
  return (
    <>
      <PageHeader title="Reports" description="Generate and download platform-wide reports." />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {reports.map((report) => (
          <Card key={report.id} className="ring-foreground/5">
            <CardContent className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-primary/10 text-primary">
                <report.icon className="size-5" strokeWidth={2} />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="font-heading text-base font-semibold text-foreground">{report.title}</h2>
                <p className="text-sm text-muted-foreground">{report.description}</p>
                <p className="text-xs text-muted-foreground">{report.range}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 gap-1.5"
                onClick={() => toast.success(`Download started for ${report.title}`)}
              >
                <Download className="size-3.5" /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

"use client"

import { CalendarDays, Download, FileBarChart, LayoutGrid, Stethoscope, TrendingUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/dashboard/page-header"
import { downloadCsv, toCsv } from "@/lib/csv"

export interface ReportsData {
  revenue: (string | number)[][]
  signups: (string | number)[][]
  doctors: (string | number)[][]
  appointments: (string | number)[][]
  categories: (string | number)[][]
}

interface ReportDefinition {
  id: keyof ReportsData
  title: string
  description: string
  range: string
  icon: LucideIcon
  headers: string[]
}

const reportDefinitions: ReportDefinition[] = [
  {
    id: "revenue",
    title: "Monthly Revenue Report",
    description: "Paid revenue grouped by month.",
    range: "All recorded months",
    icon: FileBarChart,
    headers: ["Month", "Revenue ($)"],
  },
  {
    id: "signups",
    title: "User Growth Report",
    description: "New signups grouped by month.",
    range: "All recorded months",
    icon: TrendingUp,
    headers: ["Month", "New Signups"],
  },
  {
    id: "doctors",
    title: "Doctor Performance Report",
    description: "Rating, reviews, and experience by provider.",
    range: "Current roster",
    icon: Stethoscope,
    headers: ["Doctor", "Specialty", "Rating", "Reviews", "Experience (yrs)", "Location"],
  },
  {
    id: "appointments",
    title: "Appointment Volume Report",
    description: "Appointments booked, grouped by month.",
    range: "All recorded months",
    icon: CalendarDays,
    headers: ["Month", "Appointments"],
  },
  {
    id: "categories",
    title: "Category Performance Report",
    description: "Doctors and appointments per specialty category.",
    range: "Current categories",
    icon: LayoutGrid,
    headers: ["Category", "Doctors", "Appointments"],
  },
]

export function ReportsGrid({ data }: { data: ReportsData }) {
  const handleDownload = (report: ReportDefinition) => {
    const rows = data[report.id]
    if (rows.length === 0) {
      toast.error("No data available for this report yet")
      return
    }
    downloadCsv(`${report.id}-report.csv`, toCsv(report.headers, rows))
  }

  return (
    <>
      <PageHeader title="Reports" description="Generate and download platform-wide reports." />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {reportDefinitions.map((report) => (
          <Card key={report.id} className="ring-foreground/5">
            <CardContent className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <report.icon className="size-5" strokeWidth={2} />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="font-heading text-base font-semibold text-foreground">{report.title}</h2>
                <p className="text-sm text-muted-foreground">{report.description}</p>
                <p className="text-xs text-muted-foreground">{report.range}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 gap-1.5" onClick={() => handleDownload(report)}>
                <Download className="size-3.5" /> Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

"use client"

import { useMemo, useState } from "react"
import { CalendarDays } from "lucide-react"

import { AppointmentCard } from "@/components/cards/appointment-card"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { appointments } from "@/lib/mock/appointments"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const CALENDAR_YEAR = 2026
const CALENDAR_MONTH = 6 // July (0-indexed)
const TODAY = "2026-07-06"

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = firstDay.getDay()

  const cells: { date: string; day: number }[] = []
  for (let i = 0; i < startOffset; i++) {
    cells.push({ date: "", day: 0 })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    cells.push({ date, day })
  }
  return cells
}

export default function DoctorCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string>(TODAY)

  const cells = useMemo(() => buildMonthGrid(CALENDAR_YEAR, CALENDAR_MONTH), [])

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, typeof appointments>()
    for (const appointment of appointments) {
      const existing = map.get(appointment.date) ?? []
      existing.push(appointment)
      map.set(appointment.date, existing)
    }
    return map
  }, [])

  const selectedAppointments = appointmentsByDate.get(selectedDate) ?? []
  const monthLabel = new Date(CALENDAR_YEAR, CALENDAR_MONTH, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <>
      <PageHeader title="Calendar" description="View your schedule and appointment days at a glance." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="ring-foreground/5 lg:col-span-2">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">{monthLabel}</h2>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
              {WEEKDAYS.map((day) => (
                <div key={day} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((cell, i) => {
                if (!cell.date) {
                  return <div key={`empty-${i}`} />
                }
                const dayAppointments = appointmentsByDate.get(cell.date) ?? []
                const hasAppointments = dayAppointments.length > 0
                const isSelected = cell.date === selectedDate
                const isToday = cell.date === TODAY

                return (
                  <button
                    key={cell.date}
                    type="button"
                    onClick={() => setSelectedDate(cell.date)}
                    className={cn(
                      "flex aspect-square flex-col items-center justify-center gap-1 rounded-sm text-sm font-medium transition-colors",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : isToday
                          ? "bg-muted text-foreground"
                          : "text-foreground hover:bg-muted"
                    )}
                  >
                    {cell.day}
                    <span
                      className={cn(
                        "size-1 rounded-sm",
                        hasAppointments ? (isSelected ? "bg-primary-foreground" : "bg-primary") : "bg-transparent"
                      )}
                    />
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">
              {new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedAppointments.length > 0
                ? `${selectedAppointments.length} appointment${selectedAppointments.length > 1 ? "s" : ""} scheduled.`
                : "Nothing scheduled for this day."}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <h2 className="font-heading text-base font-semibold text-foreground">Appointments</h2>
        {selectedAppointments.length > 0 ? (
          selectedAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} perspective="doctor" />
          ))
        ) : (
          <EmptyState icon={CalendarDays} title="No appointments" description="Select a marked day to see the appointments scheduled for it." />
        )}
      </div>
    </>
  )
}

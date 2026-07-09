"use client"

import { useState } from "react"
import { CalendarDays, Check, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { AppointmentCard } from "@/components/cards/appointment-card"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateAppointmentStatus } from "@/lib/api/appointments-client"
import type { Appointment, AppointmentStatus } from "@/types"

const TABS: { value: AppointmentStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

export function DoctorAppointmentsList({ appointments: initial }: { appointments: Appointment[] }) {
  const { data: session } = useSession()
  const [appointments, setAppointments] = useState(initial)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleDecision = async (appointment: Appointment, status: "UPCOMING" | "CANCELLED") => {
    if (!session?.accessToken) return
    setUpdatingId(appointment.id)
    try {
      await updateAppointmentStatus(session.accessToken, appointment.id, status)
      setAppointments((prev) =>
        prev.map((a) => (a.id === appointment.id ? { ...a, status: status.toLowerCase() as AppointmentStatus } : a))
      )
      toast.success(status === "UPCOMING" ? "Appointment approved" : "Appointment declined")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update appointment")
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <Tabs defaultValue="pending">
      <TabsList>
        {TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
            <span className="ml-1 text-xs text-muted-foreground">
              {appointments.filter((a) => a.status === tab.value).length}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS.map((tab) => {
        const filtered = appointments.filter((a) => a.status === tab.value)
        return (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {filtered.length > 0 ? (
              <div className="flex flex-col gap-3">
                {filtered.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    perspective="doctor"
                    actions={
                      appointment.status === "pending" ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={updatingId === appointment.id}
                            onClick={() => handleDecision(appointment, "CANCELLED")}
                          >
                            <X className="size-3.5" /> Reject
                          </Button>
                          <Button
                            size="sm"
                            disabled={updatingId === appointment.id}
                            onClick={() => handleDecision(appointment, "UPCOMING")}
                          >
                            <Check className="size-3.5" /> Approve
                          </Button>
                        </>
                      ) : undefined
                    }
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CalendarDays}
                title={`No ${tab.label.toLowerCase()} appointments`}
                description="Appointments in this category will appear here."
              />
            )}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

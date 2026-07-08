import { CalendarDays } from "lucide-react"

import { AppointmentCard } from "@/components/cards/appointment-card"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAppointments } from "@/lib/api/appointments"
import type { AppointmentStatus } from "@/types"

const TABS: { value: AppointmentStatus; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

export default async function DoctorAppointmentsPage() {
  const appointments = await getAppointments()

  return (
    <>
      <PageHeader title="Appointments" description="Manage your upcoming, completed, and cancelled visits." />

      <Tabs defaultValue="upcoming">
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
                    <AppointmentCard key={appointment.id} appointment={appointment} perspective="doctor" />
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
    </>
  )
}

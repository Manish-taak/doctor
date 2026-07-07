import Link from "next/link"
import { CalendarDays, Plus } from "lucide-react"

import { AppointmentCard } from "@/components/cards/appointment-card"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAppointments } from "@/lib/api/appointments"
import type { AppointmentStatus } from "@/types"

const statusTabs: { value: AppointmentStatus; label: string }[] = [
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

export default async function PatientAppointmentsPage() {
  const appointments = await getAppointments()

  return (
    <>
      <PageHeader
        title="Appointments"
        description="Manage your upcoming, completed, and cancelled visits."
        actions={
          <Button className="gap-1.5" render={<Link href="/patient/doctors" />}>
            <Plus className="size-4" /> Book appointment
          </Button>
        }
      />

      <Tabs defaultValue="upcoming">
        <TabsList>
          {statusTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
              <span className="ml-1 text-xs text-muted-foreground">
                {appointments.filter((a) => a.status === tab.value).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {statusTabs.map((tab) => {
          const filtered = appointments.filter((appointment) => appointment.status === tab.value)
          return (
            <TabsContent key={tab.value} value={tab.value} className="mt-5">
              {filtered.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filtered.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} perspective="patient" />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={CalendarDays}
                  title={`No ${tab.label.toLowerCase()} appointments`}
                  description="Check back later or book a new visit with one of your doctors."
                />
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </>
  )
}

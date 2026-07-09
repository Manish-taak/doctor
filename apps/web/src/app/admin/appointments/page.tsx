import { CalendarDays, MapPin, Video } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { accentGradient } from "@/lib/accent"
import { getAppointments } from "@/lib/api/appointments"
import { cn } from "@/lib/utils"
import type { Appointment, AppointmentStatus } from "@/types"

const statusTabs: { value: AppointmentStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "upcoming", label: "Upcoming" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

const statusStyles: Record<AppointmentStatus, string> = {
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  upcoming: "bg-primary/10 text-primary",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
}

function AppointmentsTable({ items }: { items: Appointment[] }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={CalendarDays}
        title="No appointments found"
        description="Appointments matching this status will appear here."
      />
    )
  }

  return (
    <Card className="ring-foreground/5">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Date &amp; time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback
                        className={cn("bg-linear-to-br font-semibold text-white", accentGradient[appointment.accent])}
                      >
                        {appointment.patientInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground">{appointment.patientName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{appointment.doctorName}</TableCell>
                <TableCell className="text-muted-foreground">{appointment.specialty}</TableCell>
                <TableCell className="text-muted-foreground">
                  {appointment.date} · {appointment.time}
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    {appointment.type === "video" ? (
                      <Video className="size-3.5" />
                    ) : (
                      <MapPin className="size-3.5" />
                    )}
                    <span className="capitalize">{appointment.type}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", statusStyles[appointment.status])}>{appointment.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default async function AdminAppointmentsPage() {
  const appointments = await getAppointments()

  return (
    <>
      <PageHeader title="Appointments" description="Every appointment booked across the Vitalis platform." />

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

        {statusTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-5">
            <AppointmentsTable items={appointments.filter((a) => a.status === tab.value)} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}

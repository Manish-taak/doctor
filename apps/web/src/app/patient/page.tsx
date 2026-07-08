import Link from "next/link"
import { CalendarDays, MessageSquare, Pill, Plus, Stethoscope } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AppointmentCard } from "@/components/cards/appointment-card"
import { BarChart } from "@/components/charts/bar-chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { MetricCard } from "@/components/shared/metric-card"
import { accentGradient } from "@/lib/accent"
import { getAppointments } from "@/lib/api/appointments"
import { getConversations } from "@/lib/api/conversations"
import { getDoctors } from "@/lib/api/doctors"
import { getNotifications } from "@/lib/api/notifications"
import { getPrescriptions } from "@/lib/api/prescriptions"
import { auth } from "@/lib/auth"
import { weeklyCounts } from "@/lib/stats"
import { cn } from "@/lib/utils"

export default async function PatientDashboardPage() {
  const [session, appointments, prescriptions, doctors, notifications, conversations] = await Promise.all([
    auth(),
    getAppointments(),
    getPrescriptions(),
    getDoctors(),
    getNotifications(),
    getConversations(),
  ])

  const firstName = session?.user?.name?.split(" ")[0] ?? "there"
  const upcoming = appointments.filter((a) => a.status === "upcoming")
  const activePrescriptions = prescriptions.filter((p) => p.status === "active")
  const myDoctors = doctors.slice(0, 4)
  const unreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0)
  const weeklyVisits = weeklyCounts(appointments, (a) => a.date)

  return (
    <>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Here's what's happening with your health today."
        actions={
          <Button className="gap-1.5" render={<Link href="/patient/appointments" />}>
            <Plus className="size-4" /> Book appointment
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Upcoming visits" value={String(upcoming.length)} icon={CalendarDays} trend={{ value: "On track", positive: true }} />
        <MetricCard label="Active prescriptions" value={String(activePrescriptions.length)} icon={Pill} />
        <MetricCard label="Unread messages" value={String(unreadMessages)} icon={MessageSquare} />
        <MetricCard label="Doctors followed" value={String(myDoctors.length)} icon={Stethoscope} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-foreground">Upcoming appointments</h2>
                <Link href="/patient/appointments" className="text-sm font-medium text-primary hover:underline">
                  View all
                </Link>
              </div>
              {upcoming.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {upcoming.slice(0, 3).map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} perspective="patient" />
                  ))}
                </div>
              ) : (
                <EmptyState icon={CalendarDays} title="No upcoming appointments" description="Book a visit to see it here." />
              )}
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">Visits this week</h2>
              <BarChart data={weeklyVisits} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">My doctors</h2>
              <div className="flex flex-col gap-3">
                {myDoctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className={cn("bg-linear-to-br font-semibold text-white", accentGradient[doctor.accent])}>
                        {doctor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">{doctor.name}</p>
                      <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    {doctor.availableToday && (
                      <Badge className="bg-primary/10 text-primary">Available</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-foreground">Recent notifications</h2>
                <Link href="/patient/notifications" className="text-sm font-medium text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                {notifications.slice(0, 4).map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-1.5 size-1.5 shrink-0 rounded-sm",
                        notification.read ? "bg-border" : "bg-primary"
                      )}
                    />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

import Link from "next/link"
import { CalendarDays, Star, Users, Wallet } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AppointmentCard } from "@/components/cards/appointment-card"
import { LineChart } from "@/components/charts/line-chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { MetricCard } from "@/components/shared/metric-card"
import { accentGradient } from "@/lib/accent"
import { getAppointments } from "@/lib/api/appointments"
import { getMyDoctorProfile } from "@/lib/api/doctors"
import { getMyPatients } from "@/lib/api/patients"
import { getReviews } from "@/lib/api/reviews"
import { auth } from "@/lib/auth"
import { groupByMonth } from "@/lib/stats"
import { cn } from "@/lib/utils"

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`
}

export default async function DoctorDashboardPage() {
  const [session, doctor, appointments, patients] = await Promise.all([
    auth(),
    getMyDoctorProfile(),
    getAppointments(),
    getMyPatients(),
  ])
  const reviews = await getReviews(doctor.id)

  const now = new Date()
  const todayStr = now.toISOString().slice(0, 10)
  const todaysAppointments = appointments.filter((a) => a.status === "upcoming" && a.date === todayStr)

  const revenueSeries = groupByMonth(
    appointments.filter((a) => a.status === "completed"),
    (a) => a.date,
    () => doctor.price
  )
  const thisMonthEarnings = revenueSeries[revenueSeries.length - 1]?.value ?? 0

  return (
    <>
      <PageHeader
        title={`Good morning, ${session?.user?.name ?? "Doctor"}`}
        description="Here's an overview of your practice today."
        actions={
          <Button className="gap-1.5" render={<Link href="/doctor/calendar" />}>
            <CalendarDays className="size-4" /> View calendar
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Today's appointments" value={String(todaysAppointments.length)} icon={CalendarDays} />
        <MetricCard label="Total patients" value={String(patients.length)} icon={Users} />
        <MetricCard label="This month's earnings" value={formatCurrency(thisMonthEarnings)} icon={Wallet} />
        <MetricCard label="Average rating" value={doctor.rating.toFixed(1)} icon={Star} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-foreground">Today&apos;s schedule</h2>
                <Link href="/doctor/appointments" className="text-sm font-medium text-primary hover:underline">
                  View all
                </Link>
              </div>
              {todaysAppointments.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {todaysAppointments.slice(0, 4).map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} perspective="doctor" />
                  ))}
                </div>
              ) : (
                <EmptyState icon={CalendarDays} title="No appointments today" description="Your upcoming visits will show up here." />
              )}
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-foreground">Earnings overview</h2>
                <Link href="/doctor/earnings" className="text-sm font-medium text-primary hover:underline">
                  View details
                </Link>
              </div>
              <LineChart data={revenueSeries} />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-foreground">Recent reviews</h2>
                <Link href="/doctor/reviews" className="text-sm font-medium text-primary hover:underline">
                  View all
                </Link>
              </div>
              {reviews.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className={cn("bg-linear-to-br font-semibold text-white", accentGradient[review.accent])}>
                          {review.patientInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-foreground">{review.patientName}</p>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "size-3",
                                  i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="line-clamp-2 text-xs text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

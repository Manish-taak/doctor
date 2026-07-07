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
import { auth } from "@/lib/auth"
import { appointments } from "@/lib/mock/appointments"
import { monthlyEarnings } from "@/lib/mock/charts"
import { doctors } from "@/lib/mock/doctors"
import { reviews } from "@/lib/mock/reviews"
import { patients } from "@/lib/mock/patients"
import { cn } from "@/lib/utils"

export default async function DoctorDashboardPage() {
  const session = await auth()
  const currentDoctor = doctors.find((d) => d.id === "dr-amara-chen")
  const upcoming = appointments.filter((a) => a.status === "upcoming")
  const thisMonthEarnings = monthlyEarnings[monthlyEarnings.length - 1]?.value ?? 0

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
        <MetricCard
          label="Today's appointments"
          value={String(upcoming.length)}
          icon={CalendarDays}
          trend={{ value: "On schedule", positive: true }}
        />
        <MetricCard label="Total patients" value={String(patients.length)} icon={Users} />
        <MetricCard
          label="This month's earnings"
          value={`$${thisMonthEarnings.toLocaleString()}`}
          icon={Wallet}
          trend={{ value: "+12% vs last month", positive: true }}
        />
        <MetricCard
          label="Average rating"
          value={currentDoctor ? currentDoctor.rating.toFixed(1) : "—"}
          icon={Star}
        />
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
              {upcoming.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {upcoming.slice(0, 4).map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} perspective="doctor" />
                  ))}
                </div>
              ) : (
                <EmptyState icon={CalendarDays} title="No appointments scheduled" description="Your upcoming visits will show up here." />
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
              <LineChart data={monthlyEarnings} />
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
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

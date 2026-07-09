import type { ReactNode } from "react"
import { CalendarDays, MapPin, Video } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { accentGradient } from "@/lib/accent"
import { cn } from "@/lib/utils"
import type { Appointment, AppointmentStatus } from "@/types"

const statusStyles: Record<AppointmentStatus, string> = {
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  upcoming: "bg-primary/10 text-primary",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-destructive/10 text-destructive",
}

export function AppointmentCard({
  appointment,
  perspective = "patient",
  actions,
}: {
  appointment: Appointment
  perspective?: "patient" | "doctor"
  actions?: ReactNode
}) {
  const primaryName = perspective === "patient" ? appointment.doctorName : appointment.patientName
  const primaryInitials = perspective === "patient" ? appointment.doctorInitials : appointment.patientInitials
  const subtitle = perspective === "patient" ? appointment.specialty : appointment.specialty

  return (
    <Card className="ring-foreground/5">
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarFallback
              className={cn("bg-linear-to-br font-semibold text-white", accentGradient[appointment.accent])}
            >
              {primaryInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-foreground">{primaryName}</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:justify-end">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {appointment.date} · {appointment.time}
          </span>
          <span className="flex items-center gap-1.5">
            {appointment.type === "video" ? <Video className="size-3.5" /> : <MapPin className="size-3.5" />}
            {appointment.location}
          </span>
          <Badge className={statusStyles[appointment.status]}>{appointment.status}</Badge>
        </div>

        {actions && <div className="flex items-center gap-2 sm:ml-2">{actions}</div>}
      </CardContent>
    </Card>
  )
}

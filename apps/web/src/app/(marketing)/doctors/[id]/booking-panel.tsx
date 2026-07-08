"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { parse } from "date-fns"
import { CalendarCheck2, Video } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { createAppointment } from "@/lib/api/appointments-client"

const timeSlots = ["9:00 AM", "11:30 AM", "1:15 PM", "3:00 PM", "4:45 PM"]

export function BookingPanel({
  doctorId,
  doctorName,
  price,
  telehealth,
  location,
}: {
  doctorId: string
  doctorName: string
  price: number
  telehealth: boolean
  location: string
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [date, setDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [visitType, setVisitType] = useState<"in-person" | "video">("in-person")
  const [submitting, setSubmitting] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  const handleBook = async () => {
    if (status !== "authenticated" || !session.accessToken) {
      toast.error("Sign in as a patient to book an appointment")
      router.push("/login")
      return
    }
    if (session.user?.role !== "patient") {
      toast.error("Only patient accounts can book appointments")
      return
    }
    if (!date || !selectedSlot) {
      toast.error("Select a date and time slot")
      return
    }

    const appointmentDate = parse(`${date} ${selectedSlot}`, "yyyy-MM-dd h:mm a", new Date())

    setSubmitting(true)
    try {
      await createAppointment(session.accessToken, {
        doctorId,
        date: appointmentDate.toISOString(),
        type: visitType === "video" ? "VIDEO" : "IN_PERSON",
        location,
      })
      toast.success(`Appointment booked with ${doctorName} on ${date} at ${selectedSlot}.`)
      router.push("/patient/appointments")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to book appointment")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card className="ring-foreground/5 shadow-lg shadow-foreground/5">
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="font-heading text-3xl font-semibold tracking-tight text-foreground">
              ${price}
            </span>
            <span className="text-sm text-muted-foreground"> / visit</span>
          </div>
          {telehealth && (
            <Badge variant="secondary" className="gap-1">
              <Video className="size-3" /> Telehealth available
            </Badge>
          )}
        </div>

        <Separator />

        <div className="flex flex-col gap-2.5">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <CalendarCheck2 className="size-4 text-primary" /> Choose a date
          </span>
          <Input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} />
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-sm font-medium text-foreground">Available time slots</span>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={selectedSlot === slot ? "default" : "outline"}
                size="sm"
                className="justify-center"
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>

        {telehealth && (
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-medium text-foreground">Visit type</span>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={visitType === "in-person" ? "default" : "outline"}
                size="sm"
                onClick={() => setVisitType("in-person")}
              >
                In-person
              </Button>
              <Button
                variant={visitType === "video" ? "default" : "outline"}
                size="sm"
                onClick={() => setVisitType("video")}
              >
                Video
              </Button>
            </div>
          </div>
        )}

        <Button size="lg" className="w-full" onClick={handleBook} disabled={submitting}>
          Book appointment
        </Button>
      </CardContent>
    </Card>
  )
}

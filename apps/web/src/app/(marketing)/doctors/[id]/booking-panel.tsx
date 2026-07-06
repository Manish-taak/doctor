"use client"

import { useState } from "react"
import { CalendarCheck2, Video } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const timeSlots = ["9:00 AM", "11:30 AM", "1:15 PM", "3:00 PM", "4:45 PM"]

export function BookingPanel({
  doctorName,
  price,
  telehealth,
}: {
  doctorName: string
  price: number
  telehealth: boolean
}) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

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
            <CalendarCheck2 className="size-4 text-primary" /> Next available slots
          </span>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={selectedSlot === slot ? "default" : "outline"}
                size="sm"
                className="justify-center"
                onClick={() => {
                  setSelectedSlot(slot)
                  toast(`${slot} selected — confirm below to book.`)
                }}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={() =>
            toast.success(
              selectedSlot
                ? `Appointment requested with ${doctorName} at ${selectedSlot}.`
                : `Select a time slot to book with ${doctorName}.`
            )
          }
        >
          Book appointment
        </Button>
      </CardContent>
    </Card>
  )
}

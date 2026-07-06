import Link from "next/link"
import { MapPin, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { accentGradient } from "@/lib/accent"
import { cn } from "@/lib/utils"
import type { Doctor } from "@/types"

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Card className="group ring-foreground/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      <CardContent className="flex flex-col gap-4 pt-1">
        <div className="flex items-start justify-between">
          <Avatar size="lg" className="ring-4 ring-background">
            <AvatarFallback
              className={cn(
                "bg-linear-to-br font-semibold text-white",
                accentGradient[doctor.accent]
              )}
            >
              {doctor.initials}
            </AvatarFallback>
          </Avatar>
          {doctor.availableToday && (
            <Badge className="bg-primary/10 text-primary">
              <span className="mr-1 size-1.5 rounded-full bg-primary" />
              Available today
            </Badge>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-heading text-base font-semibold text-foreground">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">
            {doctor.specialty} · {doctor.qualification}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">{doctor.rating}</span>({doctor.reviewCount})
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {doctor.location}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t-0 bg-transparent">
        <div className="text-sm">
          <span className="font-heading text-base font-semibold text-foreground">${doctor.price}</span>
          <span className="text-muted-foreground"> / visit</span>
        </div>
        <Button size="sm" render={<Link href={`/doctors/${doctor.id}`} />}>
          Book now
        </Button>
      </CardFooter>
    </Card>
  )
}

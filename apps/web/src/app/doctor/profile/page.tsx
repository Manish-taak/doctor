"use client"

import { GraduationCap, Languages, MapPin, Pencil, Star, Stethoscope } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/dashboard/page-header"
import { accentGradient } from "@/lib/accent"
import { doctors } from "@/lib/mock/doctors"
import { cn } from "@/lib/utils"

export default function DoctorProfilePage() {
  const doctor = doctors.find((d) => d.id === "dr-amara-chen")

  if (!doctor) return null

  return (
    <>
      <PageHeader
        title="Profile"
        description="This is how patients see your public profile."
        actions={
          <Button
            className="gap-1.5"
            variant="outline"
            onClick={() => toast("Editing isn't available in this preview")}
          >
            <Pencil className="size-3.5" /> Edit profile
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="ring-foreground/5 lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <Avatar className="size-24">
              <AvatarFallback className={cn("bg-linear-to-br text-2xl font-semibold text-white", accentGradient[doctor.accent])}>
                {doctor.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-lg font-semibold text-foreground">{doctor.name}</h2>
              <p className="text-sm text-muted-foreground">{doctor.specialty} · {doctor.qualification}</p>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">{doctor.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" /> {doctor.location}
              </span>
              <span className="flex items-center gap-1">
                <Stethoscope className="size-3.5" /> {doctor.experienceYears} yrs experience
              </span>
            </div>
            {doctor.availableToday && <Badge className="bg-primary/10 text-primary">Available today</Badge>}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-foreground">About</h2>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Edit bio"
                  onClick={() => toast("Editing isn't available in this preview")}
                >
                  <Pencil className="size-3.5" />
                </Button>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{doctor.bio}</p>
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-foreground">Education</h2>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Edit education"
                  onClick={() => toast("Editing isn't available in this preview")}
                >
                  <Pencil className="size-3.5" />
                </Button>
              </div>
              <div className="flex flex-col gap-2.5">
                {doctor.education?.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <GraduationCap className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-foreground">Languages</h2>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Edit languages"
                  onClick={() => toast("Editing isn't available in this preview")}
                >
                  <Pencil className="size-3.5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {doctor.languages?.map((language) => (
                  <Badge key={language} variant="outline" className="gap-1">
                    <Languages className="size-3" /> {language}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-foreground">Contact</h2>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Edit contact"
                  onClick={() => toast("Editing isn't available in this preview")}
                >
                  <Pencil className="size-3.5" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 text-sm text-foreground/90">
                <p>{doctor.email}</p>
                <p>{doctor.phone}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

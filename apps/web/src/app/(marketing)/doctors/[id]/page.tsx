import { notFound } from "next/navigation"
import {
  GraduationCap,
  Languages,
  MapPin,
  Star,
  Video,
} from "lucide-react"

import { DoctorCard } from "@/components/cards/doctor-card"
import { ReviewCard } from "@/components/cards/review-card"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { accentGradient } from "@/lib/accent"
import { doctors } from "@/lib/mock/doctors"
import { reviews } from "@/lib/mock/reviews"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/types"
import { BookingPanel } from "./booking-panel"

const doctorTestimonials: Testimonial[] = reviews.map((review) => ({
  id: review.id,
  name: review.patientName,
  role: new Date(review.date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  }),
  quote: review.comment,
  rating: review.rating,
  initials: review.patientInitials,
  accent: review.accent,
}))

export function generateStaticParams() {
  return doctors.map((doctor) => ({ id: doctor.id }))
}

export default async function DoctorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const doctor = doctors.find((d) => d.id === id)

  if (!doctor) {
    notFound()
  }

  const relatedDoctors = doctors
    .filter((d) => d.id !== doctor.id && d.specialty === doctor.specialty)
    .concat(doctors.filter((d) => d.id !== doctor.id && d.specialty !== doctor.specialty))
    .slice(0, 4)

  return (
    <>
      <section className="pt-12 pb-24 sm:pt-16 sm:pb-32">
        <Container>
          <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col gap-8 lg:col-span-2">
              <Card className="ring-foreground/5">
                <CardContent className="flex flex-col gap-6">
                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                    <Avatar className="size-20 ring-4 ring-background">
                      <AvatarFallback
                        className={cn(
                          "bg-linear-to-br text-xl font-semibold text-white",
                          accentGradient[doctor.accent]
                        )}
                      >
                        {doctor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h1 className="font-heading text-2xl font-semibold text-foreground">
                          {doctor.name}
                        </h1>
                        {doctor.availableToday && (
                          <Badge className="bg-primary/10 text-primary">
                            <span className="mr-1 size-1.5 rounded-full bg-primary" />
                            Available today
                          </Badge>
                        )}
                        {doctor.telehealth && (
                          <Badge variant="secondary" className="gap-1">
                            <Video className="size-3" /> Telehealth
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {doctor.specialty} · {doctor.qualification} · {doctor.experienceYears} years
                        experience
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-foreground">{doctor.rating}</span> (
                          {doctor.reviewCount} reviews)
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {doctor.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {doctor.bio && (
                    <p className="text-sm leading-relaxed text-foreground/80">{doctor.bio}</p>
                  )}

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {doctor.education && doctor.education.length > 0 && (
                      <div className="flex flex-col gap-2.5">
                        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <GraduationCap className="size-4 text-primary" /> Education
                        </span>
                        <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                          {doctor.education.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {doctor.languages && doctor.languages.length > 0 && (
                      <div className="flex flex-col gap-2.5">
                        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <Languages className="size-4 text-primary" /> Languages
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {doctor.languages.map((language) => (
                            <Badge key={language} variant="outline">
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-5">
                <h2 className="font-heading text-xl font-semibold text-foreground">
                  Patient reviews
                </h2>
                <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {doctorTestimonials.map((testimonial) => (
                    <StaggerItem key={testimonial.id}>
                      <ReviewCard testimonial={testimonial} />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingPanel doctorName={doctor.name} price={doctor.price} telehealth={doctor.telehealth} />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {relatedDoctors.length > 0 && (
        <section className="bg-secondary/40 py-24 sm:py-32">
          <Container>
            <Reveal className="flex flex-col gap-4">
              <Badge variant="secondary" className="w-fit">
                Related specialists
              </Badge>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                You might also consider
              </h2>
            </Reveal>

            <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedDoctors.map((related) => (
                <StaggerItem key={related.id}>
                  <DoctorCard doctor={related} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      )}
    </>
  )
}

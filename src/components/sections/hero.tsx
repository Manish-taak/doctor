"use client"

import { ArrowRight, CalendarCheck2, MapPin, Play, Search, Star, Video } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Container } from "@/components/layout/container"
import { Float } from "@/components/motion/float"
import { Reveal } from "@/components/motion/reveal"
import { accentGradient } from "@/lib/accent"
import { cn } from "@/lib/utils"

const trustAvatars = [
  { initials: "AC", accent: "primary" as const },
  { initials: "MO", accent: "coral" as const },
  { initials: "PS", accent: "amber" as const },
  { initials: "EK", accent: "violet" as const },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-32 -z-10 size-72 rounded-sm bg-coral/10 blur-3xl"
      />

      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <Badge variant="secondary" className="gap-1.5 py-1.5 pl-1.5 pr-3">
              <span className="flex size-4 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <Star className="size-2.5 fill-current" />
              </span>
              Rated 4.9/5 by 128,000+ patients
            </Badge>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl">
              Healthcare that fits <span className="text-primary">your</span> schedule.
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="max-w-lg text-lg leading-relaxed text-balance text-muted-foreground">
              Find a trusted doctor, book in seconds, and consult in person or over video —
              all from one calm, beautifully simple platform.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="w-full">
            <div className="flex w-full max-w-lg flex-col gap-2 rounded-sm border border-border bg-card p-2 shadow-sm sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2.5 px-3 py-2">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Symptom, specialty, or doctor"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Separator orientation="vertical" className="hidden h-6 sm:block" />
              <div className="flex flex-1 items-center gap-2.5 px-3 py-2">
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Button
                size="lg"
                className="gap-1.5 sm:shrink-0"
                onClick={() => toast("Search isn't available in this preview — try browsing all doctors instead.")}
              >
                Search <ArrowRight className="size-4" />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="flex items-center gap-3 pt-2">
              <AvatarGroup>
                {trustAvatars.map((a) => (
                  <Avatar key={a.initials} className="ring-2 ring-background">
                    <AvatarFallback
                      className={cn("bg-linear-to-br text-xs font-semibold text-white", accentGradient[a.accent])}
                    >
                      {a.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
              <p className="text-sm text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">3,400+ specialists</span> nationwide
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={32} className="relative mx-auto w-full max-w-md lg:mx-0">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-[2.5rem] bg-linear-to-br from-primary/15 via-transparent to-coral/15 blur-2xl"
          />

          <Card className="ring-foreground/5 shadow-2xl shadow-foreground/10">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar>
                    <AvatarFallback className="bg-linear-to-br from-primary to-primary/60 font-semibold text-white">
                      AC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">Dr. Amara Chen</p>
                    <p className="text-xs text-muted-foreground">Cardiologist</p>
                  </div>
                </div>
                <Badge className="gap-1.5 bg-coral/10 text-coral">
                  <span className="size-1.5 rounded-sm bg-coral" />
                  Live now
                </Badge>
              </div>

              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-sm bg-linear-to-br from-primary/20 to-primary/5">
                <video
                  src="/videos/1107319_1080p_4k_3840x2160.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="size-full object-cover object-[12%]"
                />
              </div>

              <div className="flex items-center justify-center gap-3">
                {[Play, Video, MapPin].map((Icon, i) => (
                  <span
                    key={i}
                    className="flex size-9 items-center justify-center rounded-sm bg-muted text-muted-foreground"
                  >
                    <Icon className="size-4" />
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Float className="absolute -top-6 -right-6 hidden sm:block" duration={5}>
            <Card className="ring-foreground/5 shadow-xl shadow-foreground/10">
              <CardContent className="flex items-center gap-2.5 py-2.5 pr-4">
                <span className="flex size-8 items-center justify-center rounded-sm bg-primary/10 text-primary">
                  <CalendarCheck2 className="size-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-foreground">Appointment confirmed</p>
                  <p className="text-[11px] text-muted-foreground">Today, 2:30 PM</p>
                </div>
              </CardContent>
            </Card>
          </Float>

          <Float className="absolute -bottom-6 -left-6 hidden sm:block" duration={4.5} delay={0.6}>
            <Card className="ring-foreground/5 shadow-xl shadow-foreground/10">
              <CardContent className="flex items-center gap-2 py-2.5 pr-4">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <p className="text-xs font-medium text-foreground">4.9 from 12,400 reviews</p>
              </CardContent>
            </Card>
          </Float>
        </Reveal>
      </Container>
    </section>
  )
}

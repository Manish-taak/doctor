import {
  Award,
  Clock,
  Globe,
  HeartHandshake,
  Microscope,
  ShieldCheck,
} from "lucide-react"

import { FeatureCard } from "@/components/cards/feature-card"
import { StatCard } from "@/components/cards/stat-card"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { CtaSection } from "@/components/sections/cta-section"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { accentGradient } from "@/lib/accent"
import { cn } from "@/lib/utils"
import type { Accent, Feature, Stat } from "@/types"

const values: Feature[] = [
  {
    id: "value-patient-first",
    title: "Patient-first",
    description:
      "Every decision we make starts with what makes care feel calmer and more human for the person on the other end.",
    icon: HeartHandshake,
  },
  {
    id: "value-transparency",
    title: "Radical transparency",
    description:
      "Clear pricing, honest wait times, and doctor profiles you can actually trust — no fine print, no surprises.",
    icon: ShieldCheck,
  },
  {
    id: "value-rigor",
    title: "Clinical rigor",
    description:
      "Every specialist on Vitalis is licensed, credential-verified, and held to the same high bar of care.",
    icon: Microscope,
  },
  {
    id: "value-access",
    title: "Always-on access",
    description:
      "Healthcare shouldn't wait for business hours. Book, message, and consult whenever it works for you.",
    icon: Clock,
  },
  {
    id: "value-excellence",
    title: "Obsessive quality",
    description:
      "We sweat the details — from appointment reminders to bedside manner — because good enough isn't good enough.",
    icon: Award,
  },
  {
    id: "value-reach",
    title: "Care without borders",
    description:
      "From rural towns to major cities, we're building a network that puts a great doctor within reach of everyone.",
    icon: Globe,
  },
]

const missionStats: Stat[] = [
  { id: "ms-founded", label: "Founded", value: "2019", icon: Clock },
  { id: "ms-states", label: "States served", value: "50", icon: Globe },
  { id: "ms-clinicians", label: "Clinicians onboarded", value: "3,400+", icon: ShieldCheck },
  { id: "ms-uptime", label: "Platform uptime", value: "99.98%", icon: Award },
]

const leadership: { id: string; name: string; title: string; bio: string; initials: string; accent: Accent }[] = [
  {
    id: "lead-1",
    name: "Dr. Vivian Okafor",
    title: "Co-founder & CEO",
    bio: "Former ER physician who spent a decade watching patients fall through the cracks of scheduling and follow-up.",
    initials: "VO",
    accent: "primary",
  },
  {
    id: "lead-2",
    name: "Marcus Whitfield",
    title: "Co-founder & CTO",
    bio: "Built infrastructure at two health-tech startups before setting out to make booking care feel effortless.",
    initials: "MW",
    accent: "coral",
  },
  {
    id: "lead-3",
    name: "Dr. Anika Desai",
    title: "Chief Medical Officer",
    bio: "Leads clinical quality and credentialing, ensuring every doctor on Vitalis meets a rigorous standard of care.",
    initials: "AD",
    accent: "amber",
  },
  {
    id: "lead-4",
    name: "Julian Cortez",
    title: "VP of Product",
    bio: "Obsesses over the small moments — confirmation emails, reminder timing, empty states — that make care feel calm.",
    initials: "JC",
    accent: "violet",
  },
  {
    id: "lead-5",
    name: "Naomi Ferreira",
    title: "VP of Patient Experience",
    bio: "Runs the support team that patients talk to when something doesn't go as planned — and makes it right fast.",
    initials: "NF",
    accent: "primary",
  },
  {
    id: "lead-6",
    name: "Tomás Alvarez",
    title: "VP of Partnerships",
    bio: "Builds relationships with clinics and health systems to keep expanding the Vitalis specialist network.",
    initials: "TA",
    accent: "coral",
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
        />
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <Badge variant="secondary">Our mission</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              Healthcare should feel calm, not like a chore
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-2xl text-lg text-balance text-muted-foreground">
              Vitalis was built by clinicians and engineers tired of watching good care get lost in phone
              trees, paperwork, and long waits. We&apos;re building the calmest way to find a doctor, book a
              visit, and stay on top of your health.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge variant="secondary">What we stand for</Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              The values behind every decision
            </h2>
            <p className="text-lg text-balance text-muted-foreground">
              These aren&apos;t posters on a wall — they&apos;re how we build, hire, and support patients every
              day.
            </p>
          </Reveal>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.id}>
                <FeatureCard feature={value} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-linear-to-br from-primary via-primary to-primary/80 py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_100%_at_100%_0%,color-mix(in_oklch,white_8%,transparent),transparent)]"
        />
        <Container>
          <StaggerGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {missionStats.map((stat) => (
              <StaggerItem key={stat.id}>
                <StatCard stat={stat} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-secondary/40 py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge variant="secondary">Leadership</Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              The team building Vitalis
            </h2>
            <p className="text-lg text-balance text-muted-foreground">
              A small group of clinicians, engineers, and operators focused on one goal: making care feel
              effortless.
            </p>
          </Reveal>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <StaggerItem key={person.id}>
                <Card className="h-full ring-foreground/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
                  <CardContent className="flex h-full flex-col items-start gap-4">
                    <Avatar size="lg" className="ring-4 ring-background">
                      <AvatarFallback
                        className={cn(
                          "bg-linear-to-br font-semibold text-white",
                          accentGradient[person.accent]
                        )}
                      >
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {person.name}
                      </h3>
                      <p className="text-sm text-primary">{person.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <CtaSection />
    </>
  )
}

import { Check, MapPin, Video, X } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { CtaSection } from "@/components/sections/cta-section"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/mock/categories"

const inPersonPoints: { label: string; included: boolean }[] = [
  { label: "Hands-on physical examination", included: true },
  { label: "Lab work and imaging on-site", included: true },
  { label: "Best for new or complex conditions", included: true },
  { label: "Same-day availability", included: false },
]

const videoPoints: { label: string; included: boolean }[] = [
  { label: "Consult from home or work", included: true },
  { label: "Prescriptions sent digitally", included: true },
  { label: "Same-day and evening slots", included: true },
  { label: "Hands-on physical examination", included: false },
]

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
        />
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <Badge variant="secondary">Services</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              Care for every specialty, on your terms
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-2xl text-lg text-balance text-muted-foreground">
              From routine checkups to specialist care, Vitalis connects you with verified doctors across
              every major field of medicine — in person or over video.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge variant="secondary">Specialties</Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Browse care by specialty
            </h2>
            <p className="text-lg text-balance text-muted-foreground">
              Every category is staffed by credential-verified specialists ready to see you.
            </p>
          </Reveal>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <StaggerItem key={category.id}>
                <Card className="group h-full ring-foreground/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
                  <CardContent className="flex h-full flex-col gap-4">
                    <div className="flex size-11 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <category.icon className="size-5" strokeWidth={2} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-heading text-base font-semibold text-foreground">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.doctorCount} specialists available
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-secondary/40 py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge variant="secondary">How you&apos;re seen</Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              In person or over video — you choose
            </h2>
            <p className="text-lg text-balance text-muted-foreground">
              Every doctor profile shows which visit types they support, so you can pick what fits your
              situation.
            </p>
          </Reveal>

          <StaggerGroup className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            <StaggerItem>
              <Card className="h-full ring-foreground/5">
                <CardContent className="flex h-full flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <MapPin className="size-5" strokeWidth={2} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-foreground">In-person visit</h3>
                  </div>
                  <ul className="flex flex-1 flex-col gap-3">
                    {inPersonPoints.map((point) => (
                      <li
                        key={point.label}
                        className="flex items-start gap-2.5 text-sm text-foreground/80"
                      >
                        {point.included ? (
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        ) : (
                          <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        )}
                        {point.label}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="h-full ring-2 ring-primary shadow-xl shadow-primary/10">
                <CardContent className="flex h-full flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Video className="size-5" strokeWidth={2} />
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-foreground">Video visit</h3>
                  </div>
                  <ul className="flex flex-1 flex-col gap-3">
                    {videoPoints.map((point) => (
                      <li
                        key={point.label}
                        className="flex items-start gap-2.5 text-sm text-foreground/80"
                      >
                        {point.included ? (
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        ) : (
                          <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        )}
                        {point.label}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerGroup>
        </Container>
      </section>

      <CtaSection />
    </>
  )
}

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { getDoctors } from "@/lib/api/doctors"

import { DoctorDirectory } from "./doctor-directory"

// Reads directly from the database now (no cache-busting fetch to signal this
// to Next.js), so force dynamic rendering to avoid serving a stale build-time snapshot.
export const dynamic = "force-dynamic"

export default async function DoctorsPage() {
  const doctors = await getDoctors()

  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
        />
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <Badge variant="secondary">Find doctors</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              Find the right specialist, right now
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-2xl text-lg text-balance text-muted-foreground">
              Search by specialty, location, or availability to find a licensed doctor who fits your
              schedule.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <DoctorDirectory doctors={doctors} />
        </Container>
      </section>
    </>
  )
}

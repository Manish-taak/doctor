import { Check, Minus } from "lucide-react"

import { PricingCard } from "@/components/cards/pricing-card"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { CtaSection } from "@/components/sections/cta-section"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { faqs } from "@/lib/mock/faqs"
import { pricingPlans } from "@/lib/mock/pricing"

const comparisonRows: { label: string; values: [boolean, boolean, boolean] }[] = [
  { label: "Unlimited appointment booking", values: [true, true, true] },
  { label: "Secure messaging with doctors", values: [true, true, true] },
  { label: "Video consultations", values: [false, true, true] },
  { label: "Priority same-day booking", values: [false, true, true] },
  { label: "Smart medication reminders", values: [false, true, true] },
  { label: "Family member profiles", values: [false, true, true] },
  { label: "Dedicated care coordinator", values: [false, false, true] },
  { label: "24/7 priority support line", values: [false, false, true] },
]

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
        />
        <Container className="flex flex-col items-center gap-6 text-center">
          <Reveal>
            <Badge variant="secondary">Pricing</Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
              Simple plans for every kind of care
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-2xl text-lg text-balance text-muted-foreground">
              Start free, and upgrade whenever you need priority booking, video visits, or care for the
              whole family.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <StaggerGroup className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {pricingPlans.map((plan) => (
              <StaggerItem key={plan.id}>
                <PricingCard plan={plan} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="bg-secondary/40 py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
            <Badge variant="secondary">Compare plans</Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Every feature, side by side
            </h2>
            <p className="text-lg text-balance text-muted-foreground">
              See exactly what&apos;s included before you choose.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mt-14 max-w-4xl rounded-sm border border-border bg-card p-2 shadow-sm sm:p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Capability</TableHead>
                  {pricingPlans.map((plan) => (
                    <TableHead key={plan.id} className="text-center">
                      {plan.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonRows.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell className="whitespace-normal text-foreground/80">{row.label}</TableCell>
                    {row.values.map((included, index) => (
                      <TableCell key={pricingPlans[index].id} className="text-center">
                        {included ? (
                          <Check className="mx-auto size-4 text-primary" />
                        ) : (
                          <Minus className="mx-auto size-4 text-muted-foreground" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container className="max-w-3xl">
          <Reveal className="flex flex-col items-center gap-4 text-center">
            <Badge variant="secondary">FAQ</Badge>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              Pricing questions, answered
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 rounded-sm border border-border bg-card px-6 shadow-sm">
            <Accordion>
              {faqs.slice(0, 4).map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="py-5 text-base">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  )
}

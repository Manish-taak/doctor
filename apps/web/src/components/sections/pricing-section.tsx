import { PricingCard } from "@/components/cards/pricing-card"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { Badge } from "@/components/ui/badge"
import { pricingPlans } from "@/lib/mock/pricing"

export function PricingSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="secondary">Pricing</Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Simple plans for every kind of care
          </h2>
          <p className="text-lg text-balance text-muted-foreground">
            Start free. Upgrade when you need priority access and video visits.
          </p>
        </Reveal>

        <StaggerGroup className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.id}>
              <PricingCard plan={plan} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  )
}

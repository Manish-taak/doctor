import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { Badge } from "@/components/ui/badge"
import { steps } from "@/lib/mock/features"

export function HowItWorksSection() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="secondary">How it works</Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Care in four simple steps
          </h2>
          <p className="text-lg text-balance text-muted-foreground">
            From symptom to follow-up, Vitalis keeps every step effortless.
          </p>
        </Reveal>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-border lg:block"
          />
          <StaggerGroup className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <StaggerItem
                key={step.id}
                className="relative flex flex-col items-center gap-4 text-center lg:items-start lg:text-left"
              >
                <span className="relative z-10 flex size-12 items-center justify-center rounded-sm bg-primary text-primary-foreground shadow-sm shadow-primary/30 ring-8 ring-secondary/40">
                  <step.icon className="size-5" strokeWidth={2} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                    Step {step.step}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  )
}

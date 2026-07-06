import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-sml bg-linear-to-br from-foreground to-foreground/90 px-6 py-16 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,color-mix(in_oklch,var(--color-primary)_35%,transparent),transparent)]"
            />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-background sm:text-4xl">
                Your next appointment is a tap away
              </h2>
              <p className="text-lg text-balance text-background/70">
                Join thousands of patients who found calmer, faster healthcare with Vitalis.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="gap-1.5" render={<Link href="/doctors" />}>
                  Find a doctor <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background"
                  render={<Link href="/pricing" />}
                >
                  View pricing
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

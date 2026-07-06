import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { faqs } from "@/lib/mock/faqs"

export function FaqSection() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Badge variant="secondary">FAQ</Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-lg text-balance text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Reach out to our support team anytime.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 rounded-2xl border border-border bg-card px-6 shadow-sm">
          <Accordion>
            {faqs.map((faq) => (
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
  )
}

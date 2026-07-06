import { ReviewCard } from "@/components/cards/review-card"
import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/motion/reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { Badge } from "@/components/ui/badge"
import { testimonials } from "@/lib/mock/testimonials"

export function TestimonialsSection() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="secondary">Patient stories</Badge>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Loved by patients everywhere
          </h2>
          <p className="text-lg text-balance text-muted-foreground">
            Real stories from people who found faster, calmer care with Vitalis.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <ReviewCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  )
}

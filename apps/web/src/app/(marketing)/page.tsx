import { CtaSection } from "@/components/sections/cta-section"
import { FaqSection } from "@/components/sections/faq-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { Hero } from "@/components/sections/hero"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { StatsSection } from "@/components/sections/stats-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { TopDoctorsSection } from "@/components/sections/top-doctors-section"
import { getDoctors } from "@/lib/api/doctors"

// Reads directly from the database now (no cache-busting fetch to signal this
// to Next.js), so force dynamic rendering to avoid serving a stale build-time snapshot.
export const dynamic = "force-dynamic"

export default async function Home() {
  const doctors = await getDoctors()
  const topDoctors = [...doctors].sort((a, b) => b.rating - a.rating).slice(0, 8)

  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TopDoctorsSection doctors={topDoctors} />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}

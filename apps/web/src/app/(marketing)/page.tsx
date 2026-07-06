import { CtaSection } from "@/components/sections/cta-section"
import { FaqSection } from "@/components/sections/faq-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { Hero } from "@/components/sections/hero"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { StatsSection } from "@/components/sections/stats-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { TopDoctorsSection } from "@/components/sections/top-doctors-section"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TopDoctorsSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}

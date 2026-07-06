import type { PricingPlan } from "@/types"

export const pricingPlans: PricingPlan[] = [
  {
    id: "p-basic",
    name: "Essential",
    description: "For occasional visits and one-off consultations.",
    price: 0,
    cadence: "forever",
    features: [
      "Book unlimited appointments",
      "Secure messaging with doctors",
      "Digital prescriptions",
      "Basic medical records storage",
    ],
    cta: "Get started free",
  },
  {
    id: "p-plus",
    name: "Plus",
    description: "For individuals who want priority access and telehealth.",
    price: 19,
    cadence: "per month",
    featured: true,
    features: [
      "Everything in Essential",
      "Unlimited video consultations",
      "Priority same-day booking",
      "Smart medication reminders",
      "Family profile (up to 3 members)",
    ],
    cta: "Start free trial",
  },
  {
    id: "p-family",
    name: "Family",
    description: "For households managing care across generations.",
    price: 39,
    cadence: "per month",
    features: [
      "Everything in Plus",
      "Unlimited family members",
      "Dedicated care coordinator",
      "Annual health report",
      "24/7 priority support line",
    ],
    cta: "Start free trial",
  },
]

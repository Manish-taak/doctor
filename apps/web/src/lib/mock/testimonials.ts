import type { Testimonial } from "@/types"

export const testimonials: Testimonial[] = [
  {
    id: "t-james-hale",
    name: "James Hale",
    role: "Patient since 2023",
    quote:
      "I booked a same-day appointment during a work trip and had a prescription sent to my pharmacy within the hour. It felt effortless.",
    rating: 5,
    initials: "JH",
    accent: "primary",
  },
  {
    id: "t-sofia-reyes",
    name: "Sofia Reyes",
    role: "Patient since 2022",
    quote:
      "Vitalis is the first health app that actually respects my time. The reminders and records keep everything organized for my whole family.",
    rating: 5,
    initials: "SR",
    accent: "coral",
  },
  {
    id: "t-daniel-kim",
    name: "Daniel Kim",
    role: "Patient since 2024",
    quote:
      "Switching between my cardiologist and my GP used to be a mess of phone calls. Now it's a couple of taps and everyone is on the same page.",
    rating: 4.9,
    initials: "DK",
    accent: "amber",
  },
]

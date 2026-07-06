import type { Review } from "@/types"

export const reviews: Review[] = [
  {
    id: "rev-1",
    patientName: "James Hale",
    patientInitials: "JH",
    accent: "primary",
    rating: 5,
    comment: "Dr. Chen took the time to explain everything clearly and never felt rushed.",
    date: "2026-06-29",
  },
  {
    id: "rev-2",
    patientName: "Priya Nair",
    patientInitials: "PN",
    accent: "violet",
    rating: 5,
    comment: "Incredibly knowledgeable and easy to talk to. Highly recommend.",
    date: "2026-06-20",
  },
  {
    id: "rev-3",
    patientName: "Carlos Mendez",
    patientInitials: "CM",
    accent: "coral",
    rating: 4,
    comment: "Great visit overall, though the wait time was a bit longer than expected.",
    date: "2026-06-05",
  },
  {
    id: "rev-4",
    patientName: "Maria Lopez",
    patientInitials: "ML",
    accent: "amber",
    rating: 5,
    comment: "Always attentive and follows up personally. Truly cares about her patients.",
    date: "2026-05-18",
  },
]

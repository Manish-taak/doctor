import {
  CalendarCheck,
  ShieldCheck,
  Video,
  BellRing,
  FileLock2,
  Sparkles,
  Search,
  ClipboardCheck,
  Stethoscope,
  Repeat,
} from "lucide-react"

import type { Feature, Stat, Step } from "@/types"

export const features: Feature[] = [
  {
    id: "feat-instant-booking",
    title: "Instant booking",
    description:
      "See real-time availability and book a visit in under a minute — no phone calls, no waiting for a callback.",
    icon: CalendarCheck,
  },
  {
    id: "feat-verified-doctors",
    title: "Verified specialists",
    description:
      "Every doctor is licensed, credential-checked, and reviewed by real patients before they join Vitalis.",
    icon: ShieldCheck,
  },
  {
    id: "feat-telehealth",
    title: "HD video visits",
    description:
      "Skip the waiting room. Talk to your doctor face-to-face from home with secure, encrypted video consultations.",
    icon: Video,
  },
  {
    id: "feat-reminders",
    title: "Smart reminders",
    description:
      "Never miss a dose or a visit. Vitalis learns your schedule and nudges you at exactly the right moment.",
    icon: BellRing,
  },
  {
    id: "feat-records",
    title: "Private medical records",
    description:
      "Your full history, prescriptions, and lab results live in one encrypted place — accessible only to you.",
    icon: FileLock2,
  },
  {
    id: "feat-care-plans",
    title: "Personalized care plans",
    description:
      "Get tailored follow-ups and recommendations based on your history, not a generic checklist.",
    icon: Sparkles,
  },
]

export const stats: Stat[] = [
  { id: "stat-patients", label: "Patients served", value: "128K+", icon: Stethoscope },
  { id: "stat-doctors", label: "Verified doctors", value: "3,400+", icon: ShieldCheck },
  { id: "stat-rating", label: "Average rating", value: "4.9/5", icon: Sparkles },
  { id: "stat-response", label: "Avg. response time", value: "< 4 min", icon: BellRing },
]

export const steps: Step[] = [
  {
    id: "step-search",
    step: "01",
    title: "Search",
    description: "Tell us your symptom, specialty, or doctor's name — we'll match you with the right fit.",
    icon: Search,
  },
  {
    id: "step-book",
    step: "02",
    title: "Book",
    description: "Pick an available time that works for you, in-person or over video.",
    icon: CalendarCheck,
  },
  {
    id: "step-consult",
    step: "03",
    title: "Consult",
    description: "Meet your doctor, get a diagnosis, and receive prescriptions instantly.",
    icon: ClipboardCheck,
  },
  {
    id: "step-follow-up",
    step: "04",
    title: "Follow up",
    description: "Track recovery, message your doctor, and schedule check-ins with one tap.",
    icon: Repeat,
  },
]

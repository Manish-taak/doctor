import {
  HeartPulse,
  Baby,
  Brain,
  Bone,
  Eye,
  Stethoscope,
  Smile,
  Activity,
} from "lucide-react"

import type { Category } from "@/types"

export const categories: Category[] = [
  { id: "cat-cardiology", name: "Cardiology", icon: HeartPulse, doctorCount: 214, appointmentCount: 3120 },
  { id: "cat-pediatrics", name: "Pediatrics", icon: Baby, doctorCount: 312, appointmentCount: 4890 },
  { id: "cat-neurology", name: "Neurology", icon: Brain, doctorCount: 118, appointmentCount: 1640 },
  { id: "cat-orthopedics", name: "Orthopedics", icon: Bone, doctorCount: 176, appointmentCount: 2210 },
  { id: "cat-ophthalmology", name: "Ophthalmology", icon: Eye, doctorCount: 96, appointmentCount: 1330 },
  { id: "cat-general", name: "General Medicine", icon: Stethoscope, doctorCount: 428, appointmentCount: 6720 },
  { id: "cat-dental", name: "Dental Care", icon: Smile, doctorCount: 154, appointmentCount: 2040 },
  { id: "cat-wellness", name: "Wellness", icon: Activity, doctorCount: 88, appointmentCount: 990 },
]

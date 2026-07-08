import { Activity, Baby, Bone, Brain, Eye, HeartPulse, Smile, Stethoscope } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export const categoryIcons: Record<string, LucideIcon> = {
  HeartPulse,
  Baby,
  Brain,
  Bone,
  Eye,
  Stethoscope,
  Smile,
  Activity,
}

export interface ApiCategory {
  id: string
  name: string
  icon: string
  doctorCount: number
  appointmentCount: number
}

export function resolveIcon(icon: string): LucideIcon {
  return categoryIcons[icon] ?? Stethoscope
}

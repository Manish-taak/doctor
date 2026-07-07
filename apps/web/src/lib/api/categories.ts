import { Activity, Baby, Bone, Brain, Eye, HeartPulse, Smile, Stethoscope } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { Category } from "@/types"

import { apiFetch } from "./client"

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

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

// Raw, serializable shape (icon stays a string) — safe to pass as props from a
// Server Component into a "use client" component. React can't serialize a
// component reference (LucideIcon) across that boundary, only plain data.
export async function getCategories(): Promise<ApiCategory[]> {
  return apiFetch<ApiCategory[]>("/categories")
}

// Icon resolved to its component — only for rendering directly inside a Server
// Component tree (never pass the result across a client boundary as a prop).
export async function getCategoriesWithIcons(): Promise<Category[]> {
  const categories = await getCategories()
  return categories.map((api) => ({
    id: api.id,
    name: api.name,
    icon: resolveIcon(api.icon),
    doctorCount: api.doctorCount,
    appointmentCount: api.appointmentCount,
  }))
}

// Client-safe mutation — takes the access token directly since it's called from
// a "use client" component (the Admin Categories dialog).
export async function createCategory(
  token: string,
  input: { name: string; icon: string }
): Promise<ApiCategory> {
  const response = await fetch(`${PUBLIC_API_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to create category")
  }

  const category = (await response.json()) as { id: string; name: string; icon: string }
  return { ...category, doctorCount: 0, appointmentCount: 0 }
}

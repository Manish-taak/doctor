import { findAllCategories } from "@/lib/server/services/categories"
import type { Category } from "@/types"

import { resolveIcon, type ApiCategory } from "./categories-shared"

export type { ApiCategory } from "./categories-shared"

// Raw, serializable shape (icon stays a string) — safe to pass as props from a
// Server Component into a "use client" component. React can't serialize a
// component reference (LucideIcon) across that boundary, only plain data.
export async function getCategories(): Promise<ApiCategory[]> {
  return findAllCategories()
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

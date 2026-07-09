import type { ApiCategory } from "./categories-shared"

export { categoryIcons, resolveIcon } from "./categories-shared"
export type { ApiCategory } from "./categories-shared"

// Called from "use client" components — relies on the browser automatically
// attaching the NextAuth session cookie to this same-origin request.
export async function createCategory(
  _token: string,
  input: { name: string; icon: string }
): Promise<ApiCategory> {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to create category")
  }

  const category = (await response.json()) as { id: string; name: string; icon: string }
  return { ...category, doctorCount: 0, appointmentCount: 0 }
}

export async function updateCategory(
  _token: string,
  id: string,
  input: { name?: string; icon?: string }
): Promise<{ id: string; name: string; icon: string }> {
  const response = await fetch(`/api/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update category")
  }

  return (await response.json()) as { id: string; name: string; icon: string }
}

export async function deleteCategory(_token: string, id: string): Promise<void> {
  const response = await fetch(`/api/categories/${id}`, { method: "DELETE" })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to delete category")
  }
}

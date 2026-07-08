import { getCategories } from "@/lib/api/categories"

import { AdminCategoriesGrid } from "./categories-grid"

// Reads directly from the database now (no cache-busting fetch to signal this
// to Next.js), so force dynamic rendering to avoid serving a stale build-time snapshot.
export const dynamic = "force-dynamic"

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return <AdminCategoriesGrid categories={categories} />
}

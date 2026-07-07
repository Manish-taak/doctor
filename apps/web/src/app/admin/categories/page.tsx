import { getCategories } from "@/lib/api/categories"

import { AdminCategoriesGrid } from "./categories-grid"

export default async function AdminCategoriesPage() {
  const categories = await getCategories()

  return <AdminCategoriesGrid categories={categories} />
}

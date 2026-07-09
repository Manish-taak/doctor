import { NextResponse } from "next/server"
import { updateCategorySchema } from "@doctor/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { deleteCategory, updateCategory } from "@/lib/server/services/categories"
import { requireRole, requireUser } from "@/lib/server/session"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    requireRole(user, "ADMIN")
    const { id } = await params
    const body = await parseBody(req, updateCategorySchema)
    const category = await updateCategory(id, body)
    return NextResponse.json(category)
  } catch (error) {
    return apiError(error)
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    requireRole(user, "ADMIN")
    const { id } = await params
    await deleteCategory(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return apiError(error)
  }
}

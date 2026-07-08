import { NextResponse } from "next/server"
import { createCategorySchema } from "@doctor/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { createCategory, findAllCategories } from "@/lib/server/services/categories"
import { requireRole, requireUser } from "@/lib/server/session"

export async function GET() {
  try {
    const categories = await findAllCategories()
    return NextResponse.json(categories)
  } catch (error) {
    return apiError(error)
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser()
    requireRole(user, "ADMIN")
    const body = await parseBody(req, createCategorySchema)
    const category = await createCategory(body)
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return apiError(error)
  }
}

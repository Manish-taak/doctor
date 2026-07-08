import { NextResponse } from "next/server"
import { updateUserRoleSchema } from "@doctor/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { updateUserRole } from "@/lib/server/services/users"
import { requireRole, requireUser } from "@/lib/server/session"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    requireRole(user, "ADMIN")
    const { id } = await params
    const body = await parseBody(req, updateUserRoleSchema)
    const updated = await updateUserRole(id, body.role, user)
    return NextResponse.json(updated)
  } catch (error) {
    return apiError(error)
  }
}

import { NextResponse } from "next/server"
import { changePasswordSchema } from "@doctor/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { changePassword } from "@/lib/server/services/auth"
import { requireUser } from "@/lib/server/session"

export async function PATCH(req: Request) {
  try {
    const user = await requireUser()
    const body = await parseBody(req, changePasswordSchema)
    const result = await changePassword(user.id, body.currentPassword, body.newPassword)
    return NextResponse.json(result)
  } catch (error) {
    return apiError(error)
  }
}

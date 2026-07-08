import { NextResponse } from "next/server"
import { updateProfileSchema } from "@doctor/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { findMe, updateProfile } from "@/lib/server/services/users"
import { requireUser } from "@/lib/server/session"

export async function GET() {
  try {
    const user = await requireUser()
    const profile = await findMe(user.id)
    return NextResponse.json(profile)
  } catch (error) {
    return apiError(error)
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await requireUser()
    const body = await parseBody(req, updateProfileSchema)
    const updated = await updateProfile(user.id, body)
    return NextResponse.json(updated)
  } catch (error) {
    return apiError(error)
  }
}

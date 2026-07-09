import { NextResponse } from "next/server"
import { updateDoctorProfileSchema } from "@/lib/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { findMyDoctorProfile, updateMyDoctorProfile } from "@/lib/server/services/doctors"
import { requireRole, requireUser } from "@/lib/server/session"

export async function GET() {
  try {
    const user = await requireUser()
    requireRole(user, "DOCTOR")
    const profile = await findMyDoctorProfile(user.id)
    return NextResponse.json(profile)
  } catch (error) {
    return apiError(error)
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await requireUser()
    requireRole(user, "DOCTOR")
    const body = await parseBody(req, updateDoctorProfileSchema)
    const updated = await updateMyDoctorProfile(user.id, body)
    return NextResponse.json(updated)
  } catch (error) {
    return apiError(error)
  }
}

import { NextResponse } from "next/server"
import { updateSettingsSchema } from "@/lib/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { getPlatformSettings, updatePlatformSettings } from "@/lib/server/services/settings"
import { requireRole, requireUser } from "@/lib/server/session"

export async function GET() {
  try {
    const user = await requireUser()
    requireRole(user, "ADMIN")
    const settings = await getPlatformSettings()
    return NextResponse.json(settings)
  } catch (error) {
    return apiError(error)
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await requireUser()
    requireRole(user, "ADMIN")
    const body = await parseBody(req, updateSettingsSchema)
    const settings = await updatePlatformSettings(body)
    return NextResponse.json(settings)
  } catch (error) {
    return apiError(error)
  }
}

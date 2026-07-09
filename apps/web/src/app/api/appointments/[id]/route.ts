import { NextResponse } from "next/server"
import { updateAppointmentSchema } from "@/lib/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { updateAppointmentStatus } from "@/lib/server/services/appointments"
import { requireUser } from "@/lib/server/session"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    const { id } = await params
    const body = await parseBody(req, updateAppointmentSchema)
    const appointment = await updateAppointmentStatus(user, id, body)
    return NextResponse.json(appointment)
  } catch (error) {
    return apiError(error)
  }
}

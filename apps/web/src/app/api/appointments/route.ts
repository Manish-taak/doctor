import { NextResponse } from "next/server"
import { createAppointmentSchema } from "@/lib/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { createAppointment } from "@/lib/server/services/appointments"
import { requireUser } from "@/lib/server/session"

export async function POST(req: Request) {
  try {
    const user = await requireUser()
    const body = await parseBody(req, createAppointmentSchema)
    const appointment = await createAppointment(user, body)
    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    return apiError(error)
  }
}

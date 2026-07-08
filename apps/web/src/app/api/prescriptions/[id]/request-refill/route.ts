import { NextResponse } from "next/server"

import { apiError } from "@/lib/server/api-handler"
import { requestPrescriptionRefill } from "@/lib/server/services/prescriptions"
import { requireUser } from "@/lib/server/session"

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    const { id } = await params
    const prescription = await requestPrescriptionRefill(user, id)
    return NextResponse.json(prescription)
  } catch (error) {
    return apiError(error)
  }
}

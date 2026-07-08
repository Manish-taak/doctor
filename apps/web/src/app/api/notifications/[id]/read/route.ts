import { NextResponse } from "next/server"

import { apiError } from "@/lib/server/api-handler"
import { markNotificationAsRead } from "@/lib/server/services/notifications"
import { requireUser } from "@/lib/server/session"

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    const { id } = await params
    const notification = await markNotificationAsRead(user, id)
    return NextResponse.json(notification)
  } catch (error) {
    return apiError(error)
  }
}

import { NextResponse } from "next/server"

import { apiError } from "@/lib/server/api-handler"
import { markAllNotificationsAsRead } from "@/lib/server/services/notifications"
import { requireUser } from "@/lib/server/session"

export async function PATCH() {
  try {
    const user = await requireUser()
    const result = await markAllNotificationsAsRead(user)
    return NextResponse.json(result)
  } catch (error) {
    return apiError(error)
  }
}

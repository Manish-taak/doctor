import { NextResponse } from "next/server"
import { sendMessageSchema } from "@/lib/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { findMessages, sendMessage } from "@/lib/server/services/conversations"
import { requireUser } from "@/lib/server/session"

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    const { id } = await params
    const messages = await findMessages(user, id)
    return NextResponse.json(messages)
  } catch (error) {
    return apiError(error)
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser()
    const { id } = await params
    const body = await parseBody(req, sendMessageSchema)
    const message = await sendMessage(user, id, body)
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    return apiError(error)
  }
}

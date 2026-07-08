import { NextResponse } from "next/server"
import { registerSchema } from "@doctor/validators"

import { apiError, parseBody } from "@/lib/server/api-handler"
import { registerUser } from "@/lib/server/services/auth"

export async function POST(req: Request) {
  try {
    const body = await parseBody(req, registerSchema)
    const user = await registerUser(body)
    return NextResponse.json({ id: user.id, email: user.email, name: user.name, role: user.role })
  } catch (error) {
    return apiError(error)
  }
}

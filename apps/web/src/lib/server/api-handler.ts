import { NextResponse } from "next/server"
import type { ZodType } from "zod"

import { HttpError } from "./errors"

export async function parseBody<T>(req: Request, schema: ZodType<T>): Promise<T> {
  const json = await req.json().catch(() => ({}))
  const result = schema.safeParse(json)
  if (!result.success) {
    throw new HttpError(400, result.error.issues.map((issue) => issue.message).join(", "))
  }
  return result.data
}

export function apiError(error: unknown): NextResponse {
  if (error instanceof HttpError) {
    return NextResponse.json({ message: error.message }, { status: error.status })
  }
  console.error(error)
  return NextResponse.json({ message: "Internal server error" }, { status: 500 })
}

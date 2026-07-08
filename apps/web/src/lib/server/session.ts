import { auth } from "@/lib/auth"

import { UnauthorizedError, ForbiddenError } from "./errors"

export interface RequestUser {
  id: string
  email: string
  name: string
  role: "PATIENT" | "DOCTOR" | "ADMIN"
}

export async function requireUser(): Promise<RequestUser> {
  const session = await auth()
  if (!session?.user?.id) throw new UnauthorizedError()

  return {
    id: session.user.id,
    email: session.user.email ?? "",
    name: session.user.name ?? "",
    role: session.user.role.toUpperCase() as RequestUser["role"],
  }
}

export function requireRole(user: RequestUser, ...roles: RequestUser["role"][]) {
  if (!roles.includes(user.role)) throw new ForbiddenError()
}

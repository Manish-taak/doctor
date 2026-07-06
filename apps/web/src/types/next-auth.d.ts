import type { DefaultSession } from "next-auth"

import type { UserRole } from "@/types"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    user: {
      id: string
      role: UserRole
    } & DefaultSession["user"]
  }

  interface User {
    role?: UserRole
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole
    accessToken?: string
  }
}

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import * as bcrypt from "bcrypt"
import { prisma } from "@/lib/db"
import { loginSchema } from "@/lib/validators"

import type { UserRole } from "@/types"

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
        if (!user) return null

        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.toLowerCase() as UserRole,
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role
        // Kept as a truthy marker for existing client-side "is there a session"
        // checks — the real auth boundary is now this encrypted session cookie
        // itself, verified server-side via `auth()` on every request.
        token.accessToken = "session"
      }
      return token
    },
    session: ({ session, token }) => {
      session.user.id = token.sub as string
      session.user.role = token.role as UserRole
      session.accessToken = token.accessToken as string
      return session
    },
  },
})

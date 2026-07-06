import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "@doctor/validators"

import type { UserRole } from "@/types"

const API_URL = process.env.API_URL ?? "http://localhost:4000"

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

        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        })
        if (!response.ok) return null

        const data = await response.json()

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role.toLowerCase() as UserRole,
          accessToken: data.accessToken as string,
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role
        token.accessToken = user.accessToken
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

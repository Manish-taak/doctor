import { NextResponse } from "next/server"

import { auth } from "@/lib/auth"
import type { UserRole } from "@/types"

function roleForPath(pathname: string): UserRole | null {
  if (pathname.startsWith("/patient")) return "patient"
  if (pathname.startsWith("/doctor")) return "doctor"
  if (pathname.startsWith("/admin")) return "admin"
  return null
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const requiredRole = roleForPath(pathname)
  if (!requiredRole) return NextResponse.next()

  if (!req.auth?.user) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (req.auth.user.role !== requiredRole) {
    return NextResponse.redirect(new URL(`/${req.auth.user.role}`, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/patient/:path*", "/doctor/:path*", "/admin/:path*"],
}

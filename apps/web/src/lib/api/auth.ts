// Called from "use client" components — relies on the browser automatically
// attaching the NextAuth session cookie to this same-origin request.
export async function changePassword(_token: string, currentPassword: string, newPassword: string): Promise<void> {
  const response = await fetch("/api/auth/password", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update password")
  }
}

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

// Client-safe mutation — takes the access token directly since it's called from
// the "use client" Settings form.
export async function changePassword(token: string, currentPassword: string, newPassword: string): Promise<void> {
  const response = await fetch(`${PUBLIC_API_URL}/auth/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update password")
  }
}

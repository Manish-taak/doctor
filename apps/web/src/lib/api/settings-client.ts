import type { PlatformSettings } from "./settings"

export interface UpdateSettingsInput {
  platformName?: string
  supportEmail?: string
  enforce2fa?: boolean
  sessionTimeoutMinutes?: number
}

// Called from "use client" components — relies on the browser automatically
// attaching the NextAuth session cookie to this same-origin request.
export async function updateSettings(_token: string, input: UpdateSettingsInput): Promise<PlatformSettings> {
  const response = await fetch("/api/settings", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update settings")
  }

  return response.json()
}

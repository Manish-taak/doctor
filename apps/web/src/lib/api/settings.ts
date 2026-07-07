import { apiFetch, serverAuthHeaders } from "./client"

const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

export interface PlatformSettings {
  id: string
  platformName: string
  supportEmail: string
  enforce2fa: boolean
  sessionTimeoutMinutes: number
  updatedAt: string
}

export async function getSettings(): Promise<PlatformSettings> {
  const headers = await serverAuthHeaders()
  return apiFetch<PlatformSettings>("/settings", { headers })
}

export interface UpdateSettingsInput {
  platformName?: string
  supportEmail?: string
  enforce2fa?: boolean
  sessionTimeoutMinutes?: number
}

// Client-safe mutation — takes the access token directly since it's called from
// the "use client" Admin Settings form.
export async function updateSettings(token: string, input: UpdateSettingsInput): Promise<PlatformSettings> {
  const response = await fetch(`${PUBLIC_API_URL}/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update settings")
  }

  return response.json()
}

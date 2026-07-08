import { getPlatformSettings } from "@/lib/server/services/settings"
import { requireRole, requireUser } from "@/lib/server/session"

export interface PlatformSettings {
  id: string
  platformName: string
  supportEmail: string
  enforce2fa: boolean
  sessionTimeoutMinutes: number
  updatedAt: string
}

export async function getSettings(): Promise<PlatformSettings> {
  const user = await requireUser()
  requireRole(user, "ADMIN")
  const settings = await getPlatformSettings()
  return settings as unknown as PlatformSettings
}

import { prisma } from "@doctor/database"
import type { UpdateSettingsInput } from "@doctor/validators"

const SETTINGS_ID = "platform-settings"

export function getPlatformSettings() {
  return prisma.platformSettings.upsert({
    where: { id: SETTINGS_ID },
    update: {},
    create: { id: SETTINGS_ID },
  })
}

export async function updatePlatformSettings(input: UpdateSettingsInput) {
  await getPlatformSettings()
  return prisma.platformSettings.update({ where: { id: SETTINGS_ID }, data: input })
}

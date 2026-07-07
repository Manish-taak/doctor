import { getSettings } from "@/lib/api/settings"

import { AdminSettingsForm } from "./settings-form"

export default async function AdminSettingsPage() {
  const settings = await getSettings()

  return <AdminSettingsForm settings={settings} />
}

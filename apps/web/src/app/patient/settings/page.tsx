import { getMyProfile } from "@/lib/api/users"

import { SettingsForm } from "./settings-form"

export default async function PatientSettingsPage() {
  const profile = await getMyProfile()

  return <SettingsForm profile={profile} />
}

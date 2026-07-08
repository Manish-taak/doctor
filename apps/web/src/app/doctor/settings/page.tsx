import { auth } from "@/lib/auth"

import { DoctorSettingsForm } from "./settings-form"

export default async function DoctorSettingsPage() {
  const session = await auth()

  return (
    <DoctorSettingsForm
      name={session?.user?.name ?? ""}
      email={session?.user?.email ?? ""}
    />
  )
}

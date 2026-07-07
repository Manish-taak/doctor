import { getMyProfile } from "@/lib/api/users"

import { ProfileForm } from "./profile-form"

export default async function PatientProfilePage() {
  const profile = await getMyProfile()

  return <ProfileForm profile={profile} />
}

import { getMyDoctorProfile } from "@/lib/api/doctors"

import { DoctorProfileForm } from "./profile-form"

export default async function DoctorProfilePage() {
  const doctor = await getMyDoctorProfile()

  return <DoctorProfileForm doctor={doctor} />
}

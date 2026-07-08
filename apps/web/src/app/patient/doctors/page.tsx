import { DoctorCard } from "@/components/cards/doctor-card"
import { PageHeader } from "@/components/dashboard/page-header"
import { getDoctors } from "@/lib/api/doctors"

// Reads directly from the database now (no cache-busting fetch to signal this
// to Next.js), so force dynamic rendering to avoid serving a stale build-time snapshot.
export const dynamic = "force-dynamic"

export default async function PatientDoctorsPage() {
  const doctors = await getDoctors()
  const myDoctors = doctors.slice(0, 6)

  return (
    <>
      <PageHeader
        title="My Doctors"
        description="Doctors you've seen or follow for ongoing care."
        count={myDoctors.length}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {myDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </>
  )
}

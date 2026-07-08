import { prisma } from "@doctor/database"

const ACTIVE_WINDOW_DAYS = 180

export async function findPatientsForDoctor(doctorId: string) {
  const appointments = await prisma.appointment.findMany({
    where: { doctorId },
    include: { patient: { include: { user: true } } },
    orderBy: { date: "desc" },
  })

  const byPatient = new Map<string, typeof appointments>()
  for (const appointment of appointments) {
    const list = byPatient.get(appointment.patientId) ?? []
    list.push(appointment)
    byPatient.set(appointment.patientId, list)
  }

  const now = Date.now()

  return Array.from(byPatient.values()).map((visits) => {
    const mostRecent = visits[0]
    const hasUpcoming = visits.some((v) => v.status === "UPCOMING")
    const isRecent = visits.some((v) => (now - v.date.getTime()) / 86_400_000 <= ACTIVE_WINDOW_DAYS)

    return {
      id: mostRecent.patient.id,
      name: mostRecent.patient.user.name,
      email: mostRecent.patient.user.email,
      phone: mostRecent.patient.phone,
      dob: mostRecent.patient.dob,
      gender: mostRecent.patient.gender,
      lastVisitDate: mostRecent.date,
      lastVisitType: mostRecent.type,
      appointmentCount: visits.length,
      active: hasUpcoming || isRecent,
    }
  })
}

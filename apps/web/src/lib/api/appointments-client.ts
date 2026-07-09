export interface CreateAppointmentInput {
  doctorId: string
  date: string
  type: "IN_PERSON" | "VIDEO"
  location: string
}

// Called from "use client" components — relies on the browser automatically
// attaching the NextAuth session cookie to this same-origin request.
export async function createAppointment(_token: string, input: CreateAppointmentInput): Promise<void> {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to book appointment")
  }
}

export async function updateAppointmentStatus(
  _token: string,
  id: string,
  status: "PENDING" | "UPCOMING" | "COMPLETED" | "CANCELLED"
): Promise<void> {
  const response = await fetch(`/api/appointments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.message ?? "Failed to update appointment")
  }
}

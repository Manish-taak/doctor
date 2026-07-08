// Called from "use client" components — relies on the browser automatically
// attaching the NextAuth session cookie to this same-origin request.
export async function markNotificationRead(_token: string, id: string): Promise<void> {
  await fetch(`/api/notifications/${id}/read`, { method: "PATCH" })
}

export async function markAllNotificationsRead(_token: string): Promise<void> {
  await fetch("/api/notifications/read-all", { method: "PATCH" })
}

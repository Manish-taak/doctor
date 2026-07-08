import { PageHeader } from "@/components/dashboard/page-header"
import { getNotifications } from "@/lib/api/notifications"
import { NotificationsList } from "@/app/patient/notifications/notifications-list"

export default async function DoctorNotificationsPage() {
  const notifications = await getNotifications()

  return (
    <>
      <PageHeader title="Notifications" description="Stay up to date with appointments, messages, and payments." />
      <NotificationsList notifications={notifications} />
    </>
  )
}

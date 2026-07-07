import { PageHeader } from "@/components/dashboard/page-header"
import { getNotifications } from "@/lib/api/notifications"

import { NotificationsList } from "./notifications-list"

export default async function PatientNotificationsPage() {
  const notifications = await getNotifications()

  return (
    <>
      <PageHeader
        title="Notifications"
        description="Stay up to date with appointments, messages, and account activity."
      />
      <NotificationsList notifications={notifications} />
    </>
  )
}

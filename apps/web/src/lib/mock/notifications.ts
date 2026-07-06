import type { Notification } from "@/types"

export const notifications: Notification[] = [
  {
    id: "notif-1",
    type: "appointment",
    title: "Upcoming appointment tomorrow",
    description: "Video call with Dr. Amara Chen at 9:00 AM.",
    time: "2h ago",
    read: false,
  },
  {
    id: "notif-2",
    type: "message",
    title: "New message from Dr. Marcus Obi",
    description: "\"Let's check in again in two weeks.\"",
    time: "5h ago",
    read: false,
  },
  {
    id: "notif-3",
    type: "payment",
    title: "Payment received",
    description: "Your payment of $95.00 for visit #1042 was processed.",
    time: "1d ago",
    read: true,
  },
  {
    id: "notif-4",
    type: "system",
    title: "Profile verified",
    description: "Your insurance details have been verified successfully.",
    time: "2d ago",
    read: true,
  },
  {
    id: "notif-5",
    type: "appointment",
    title: "Appointment rescheduled",
    description: "Your visit with Dr. Noah Bennett moved to Jul 18, 4:15 PM.",
    time: "3d ago",
    read: true,
  },
]

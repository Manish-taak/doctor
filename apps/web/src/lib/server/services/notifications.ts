import { prisma } from "@/lib/db"

import { ForbiddenError, NotFoundError } from "../errors"
import type { RequestUser } from "../session"

export function findNotificationsForUser(user: RequestUser) {
  return prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  })
}

export async function markNotificationAsRead(user: RequestUser, id: string) {
  const notification = await prisma.notification.findUnique({ where: { id } })
  if (!notification) throw new NotFoundError("Notification not found")
  if (notification.userId !== user.id) throw new ForbiddenError("Not your notification")

  return prisma.notification.update({ where: { id }, data: { read: true } })
}

export function markAllNotificationsAsRead(user: RequestUser) {
  return prisma.notification.updateMany({
    where: { userId: user.id, read: false },
    data: { read: true },
  })
}

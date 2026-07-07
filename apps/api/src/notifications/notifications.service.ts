import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"

import type { RequestUser } from "../common/current-user.decorator"
import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class NotificationsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  findAllForUser(user: RequestUser) {
    return this.prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })
  }

  async markAsRead(user: RequestUser, id: string) {
    const notification = await this.prisma.notification.findUnique({ where: { id } })
    if (!notification) throw new NotFoundException("Notification not found")
    if (notification.userId !== user.id) throw new ForbiddenException("Not your notification")

    return this.prisma.notification.update({ where: { id }, data: { read: true } })
  }

  markAllAsRead(user: RequestUser) {
    return this.prisma.notification.updateMany({
      where: { userId: user.id, read: false },
      data: { read: true },
    })
  }
}

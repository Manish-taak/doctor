import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

import { NotificationsService } from "./notifications.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"

@ApiTags("notifications")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.notificationsService.findAllForUser(user)
  }

  @Patch("read-all")
  markAllAsRead(@CurrentUser() user: RequestUser) {
    return this.notificationsService.markAllAsRead(user)
  }

  @Patch(":id/read")
  markAsRead(@CurrentUser() user: RequestUser, @Param("id") id: string) {
    return this.notificationsService.markAsRead(user, id)
  }
}

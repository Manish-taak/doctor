import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { createAppointmentSchema, updateAppointmentSchema } from "@doctor/validators"

import { AppointmentsService } from "./appointments.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"

class CreateAppointmentDto extends createZodDto(createAppointmentSchema) {}
class UpdateAppointmentDto extends createZodDto(updateAppointmentSchema) {}

@ApiTags("appointments")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.appointmentsService.findAllForUser(user)
  }

  @Post()
  create(@CurrentUser() user: RequestUser, @Body() body: CreateAppointmentDto) {
    return this.appointmentsService.create(user, body)
  }

  @Patch(":id")
  updateStatus(
    @CurrentUser() user: RequestUser,
    @Param("id") id: string,
    @Body() body: UpdateAppointmentDto
  ) {
    return this.appointmentsService.updateStatus(user, id, body)
  }
}

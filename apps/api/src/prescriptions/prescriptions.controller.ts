import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { createPrescriptionSchema, updatePrescriptionSchema } from "@doctor/validators"

import { PrescriptionsService } from "./prescriptions.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"

class CreatePrescriptionDto extends createZodDto(createPrescriptionSchema) {}
class UpdatePrescriptionDto extends createZodDto(updatePrescriptionSchema) {}

@ApiTags("prescriptions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("prescriptions")
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.prescriptionsService.findAllForUser(user)
  }

  @Post()
  create(@CurrentUser() user: RequestUser, @Body() body: CreatePrescriptionDto) {
    return this.prescriptionsService.create(user, body)
  }

  @Patch(":id")
  updateStatus(
    @CurrentUser() user: RequestUser,
    @Param("id") id: string,
    @Body() body: UpdatePrescriptionDto
  ) {
    return this.prescriptionsService.updateStatus(user, id, body)
  }

  @Patch(":id/request-refill")
  requestRefill(@CurrentUser() user: RequestUser, @Param("id") id: string) {
    return this.prescriptionsService.requestRefill(user, id)
  }
}

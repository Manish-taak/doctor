import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { createMedicalRecordSchema } from "@doctor/validators"

import { MedicalRecordsService } from "./medical-records.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"

class CreateMedicalRecordDto extends createZodDto(createMedicalRecordSchema) {}

@ApiTags("medical-records")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("medical-records")
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.medicalRecordsService.findAllForUser(user)
  }

  @Post()
  create(@CurrentUser() user: RequestUser, @Body() body: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(user, body)
  }
}

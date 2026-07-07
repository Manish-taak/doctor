import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { createDoctorSchema, updateDoctorProfileSchema } from "@doctor/validators"

import { DoctorsService } from "./doctors.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"
import { Roles } from "../common/roles.decorator"
import { RolesGuard } from "../common/roles.guard"

class CreateDoctorDto extends createZodDto(createDoctorSchema) {}
class UpdateDoctorProfileDto extends createZodDto(updateDoctorProfileSchema) {}

@ApiTags("doctors")
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll() {
    return this.doctorsService.findAll()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("DOCTOR")
  @Get("me")
  getMe(@CurrentUser() user: RequestUser) {
    return this.doctorsService.findMe(user.id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("DOCTOR")
  @Patch("me")
  updateMe(@CurrentUser() user: RequestUser, @Body() body: UpdateDoctorProfileDto) {
    return this.doctorsService.updateProfile(user.id, body)
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @Post()
  create(@Body() body: CreateDoctorDto) {
    return this.doctorsService.create(body)
  }
}

import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { createDoctorSchema } from "@doctor/validators"

import { DoctorsService } from "./doctors.service"
import { JwtAuthGuard } from "../common/jwt-auth.guard"
import { Roles } from "../common/roles.decorator"
import { RolesGuard } from "../common/roles.guard"

class CreateDoctorDto extends createZodDto(createDoctorSchema) {}

@ApiTags("doctors")
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll() {
    return this.doctorsService.findAll()
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

import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { updateSettingsSchema } from "@doctor/validators"

import { SettingsService } from "./settings.service"
import { JwtAuthGuard } from "../common/jwt-auth.guard"
import { Roles } from "../common/roles.decorator"
import { RolesGuard } from "../common/roles.guard"

class UpdateSettingsDto extends createZodDto(updateSettingsSchema) {}

@ApiTags("settings")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("ADMIN")
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  get() {
    return this.settingsService.get()
  }

  @Patch()
  update(@Body() body: UpdateSettingsDto) {
    return this.settingsService.update(body)
  }
}

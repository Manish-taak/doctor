import { Controller, Get, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"

import { UsersService } from "./users.service"
import { JwtAuthGuard } from "../common/jwt-auth.guard"
import { Roles } from "../common/roles.decorator"
import { RolesGuard } from "../common/roles.guard"

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles("ADMIN")
  @Get()
  findAll() {
    return this.usersService.findAll()
  }
}

import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { updateProfileSchema, updateUserRoleSchema } from "@doctor/validators"

import { UsersService } from "./users.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"
import { Roles } from "../common/roles.decorator"
import { RolesGuard } from "../common/roles.guard"

class UpdateUserRoleDto extends createZodDto(updateUserRoleSchema) {}
class UpdateProfileDto extends createZodDto(updateProfileSchema) {}

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

  @Get("me")
  getMe(@CurrentUser() user: RequestUser) {
    return this.usersService.findMe(user.id)
  }

  @Patch("me")
  updateMe(@CurrentUser() user: RequestUser, @Body() body: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, body)
  }

  @Roles("ADMIN")
  @Patch(":id/role")
  updateRole(
    @Param("id") id: string,
    @Body() body: UpdateUserRoleDto,
    @CurrentUser() currentUser: RequestUser
  ) {
    return this.usersService.updateRole(id, body.role, currentUser.id)
  }
}

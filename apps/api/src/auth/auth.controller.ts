import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { changePasswordSchema, loginSchema, registerSchema } from "@doctor/validators"

import { AuthService } from "./auth.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"

class RegisterDto extends createZodDto(registerSchema) {}
class LoginDto extends createZodDto(loginSchema) {}
class ChangePasswordDto extends createZodDto(changePasswordSchema) {}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() body: RegisterDto) {
    return this.authService.register(body)
  }

  @Post("login")
  login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentUser() user: RequestUser) {
    return user
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch("password")
  changePassword(@CurrentUser() user: RequestUser, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(user.id, body.currentPassword, body.newPassword)
  }
}

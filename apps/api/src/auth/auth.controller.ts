import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { loginSchema, registerSchema } from "@doctor/validators"

import { AuthService } from "./auth.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"

class RegisterDto extends createZodDto(registerSchema) {}
class LoginDto extends createZodDto(loginSchema) {}

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
}

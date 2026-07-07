import { Module } from "@nestjs/common"
import { JwtModule, type JwtSignOptions } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"

import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"

const expiresIn = (process.env.JWT_EXPIRES_IN ?? "7d") as JwtSignOptions["expiresIn"]

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? "dev-only-change-me",
      signOptions: { expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

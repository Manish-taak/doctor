import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import type { PrismaClient } from "@doctor/database"
import type { LoginInput, RegisterInput } from "@doctor/validators"

import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class AuthService {
  constructor(
    @Inject(PRISMA) private readonly prisma: PrismaClient,
    private readonly jwt: JwtService
  ) {}

  async register(input: RegisterInput) {
    const existing = await this.prisma.user.findUnique({ where: { email: input.email } })
    if (existing) throw new ConflictException("An account with this email already exists")

    const passwordHash = await bcrypt.hash(input.password, 10)

    const user = await this.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: input.role,
        ...(input.role === "PATIENT" ? { patientProfile: { create: {} } } : {}),
        ...(input.role === "DOCTOR"
          ? {
              doctorProfile: {
                create: {
                  specialty: "General Medicine",
                  qualification: "MD",
                  location: "Not set",
                },
              },
            }
          : {}),
      },
    })

    return this.issueToken(user)
  }

  async login(input: LoginInput) {
    const user = await this.prisma.user.findUnique({ where: { email: input.email } })
    if (!user) throw new UnauthorizedException("Invalid email or password")

    const valid = await bcrypt.compare(input.password, user.passwordHash)
    if (!valid) throw new UnauthorizedException("Invalid email or password")

    return this.issueToken(user)
  }

  private issueToken(user: { id: string; email: string; name: string; role: string }) {
    const accessToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })

    return {
      accessToken,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    }
  }
}

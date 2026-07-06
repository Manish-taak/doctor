import { Inject, Injectable } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"

import { PRISMA } from "../prisma/prisma.module"

@Injectable()
export class UsersService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })
  }
}

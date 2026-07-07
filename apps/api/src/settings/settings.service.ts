import { Inject, Injectable } from "@nestjs/common"
import type { PrismaClient } from "@doctor/database"
import type { UpdateSettingsInput } from "@doctor/validators"

import { PRISMA } from "../prisma/prisma.module"

const SETTINGS_ID = "platform-settings"

@Injectable()
export class SettingsService {
  constructor(@Inject(PRISMA) private readonly prisma: PrismaClient) {}

  get() {
    return this.prisma.platformSettings.upsert({
      where: { id: SETTINGS_ID },
      update: {},
      create: { id: SETTINGS_ID },
    })
  }

  async update(input: UpdateSettingsInput) {
    await this.get()
    return this.prisma.platformSettings.update({ where: { id: SETTINGS_ID }, data: input })
  }
}

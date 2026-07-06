import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_PIPE } from "@nestjs/core"
import { ZodValidationPipe } from "nestjs-zod"

import { PrismaModule } from "./prisma/prisma.module"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { DoctorsModule } from "./doctors/doctors.module"
import { AppointmentsModule } from "./appointments/appointments.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DoctorsModule,
    AppointmentsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}

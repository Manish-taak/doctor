import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_PIPE } from "@nestjs/core"
import { ZodValidationPipe } from "nestjs-zod"

import { PrismaModule } from "./prisma/prisma.module"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { DoctorsModule } from "./doctors/doctors.module"
import { AppointmentsModule } from "./appointments/appointments.module"
import { MedicalRecordsModule } from "./medical-records/medical-records.module"
import { PrescriptionsModule } from "./prescriptions/prescriptions.module"
import { ConversationsModule } from "./conversations/conversations.module"
import { NotificationsModule } from "./notifications/notifications.module"
import { TransactionsModule } from "./transactions/transactions.module"
import { ReviewsModule } from "./reviews/reviews.module"
import { CategoriesModule } from "./categories/categories.module"
import { SettingsModule } from "./settings/settings.module"

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    DoctorsModule,
    AppointmentsModule,
    MedicalRecordsModule,
    PrescriptionsModule,
    ConversationsModule,
    NotificationsModule,
    TransactionsModule,
    ReviewsModule,
    CategoriesModule,
    SettingsModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}

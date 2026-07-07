-- CreateTable
CREATE TABLE "platform_settings" (
    "id" TEXT NOT NULL,
    "platformName" TEXT NOT NULL DEFAULT 'Vitalis',
    "supportEmail" TEXT NOT NULL DEFAULT 'support@vitalis.health',
    "enforce2fa" BOOLEAN NOT NULL DEFAULT false,
    "sessionTimeoutMinutes" INTEGER NOT NULL DEFAULT 30,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("id")
);

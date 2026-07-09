-- AlterTable
ALTER TABLE "patient_profiles" ADD COLUMN     "insuranceGroupNumber" TEXT,
ADD COLUMN     "insurancePolicyNumber" TEXT,
ADD COLUMN     "insuranceProvider" TEXT,
ADD COLUMN     "insuranceValidThrough" TIMESTAMP(3);

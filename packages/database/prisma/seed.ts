import bcrypt from "bcrypt"

import { prisma } from "../src/index"

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@vitalis.health" },
    update: {},
    create: {
      email: "admin@vitalis.health",
      name: "Sunny Patel",
      passwordHash,
      role: "ADMIN",
    },
  })

  const doctorUser = await prisma.user.upsert({
    where: { email: "amara.chen@vitalis.health" },
    update: {},
    create: {
      email: "amara.chen@vitalis.health",
      name: "Dr. Amara Chen",
      passwordHash,
      role: "DOCTOR",
      doctorProfile: {
        create: {
          specialty: "Cardiologist",
          qualification: "MD, FACC",
          bio: "Dr. Chen specializes in preventive cardiology and heart rhythm disorders.",
          experienceYears: 14,
          price: 120,
          rating: 4.9,
          reviewCount: 312,
          telehealth: true,
          availableToday: true,
          location: "Boston, MA",
          education: ["MD, Harvard Medical School", "Residency, Massachusetts General Hospital"],
          languages: ["English", "Mandarin"],
        },
      },
    },
    include: { doctorProfile: true },
  })

  const patientUser = await prisma.user.upsert({
    where: { email: "james.hale@example.com" },
    update: {},
    create: {
      email: "james.hale@example.com",
      name: "James Hale",
      passwordHash,
      role: "PATIENT",
      patientProfile: {
        create: {
          gender: "Male",
          phone: "(617) 555-0122",
        },
      },
    },
    include: { patientProfile: true },
  })

  console.log({ admin: admin.email, doctor: doctorUser.email, patient: patientUser.email })
  console.log("Seed complete. All accounts use password: password123")
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import bcrypt from "bcrypt"

import { prisma } from "../src/lib/db"

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10)

  const category = await prisma.category.upsert({
    where: { name: "Cardiology" },
    update: {},
    create: { name: "Cardiology", icon: "HeartPulse" },
  })

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
    update: {
      doctorProfile: { update: { categoryId: category.id } },
    },
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
          categoryId: category.id,
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

  const doctorProfile = doctorUser.doctorProfile!
  const patientProfile = patientUser.patientProfile!

  await prisma.appointment.upsert({
    where: { id: "seed-appointment-1" },
    update: {},
    create: {
      id: "seed-appointment-1",
      patientId: patientProfile.id,
      doctorId: doctorProfile.id,
      date: new Date("2026-07-08T09:00:00Z"),
      type: "VIDEO",
      status: "UPCOMING",
      location: "Video call",
    },
  })

  await prisma.medicalRecord.upsert({
    where: { id: "seed-record-1" },
    update: {},
    create: {
      id: "seed-record-1",
      patientId: patientProfile.id,
      doctorId: doctorProfile.id,
      title: "Lipid Panel Results",
      type: "LAB_RESULT",
      fileSize: "220 KB",
      summary: "Cholesterol levels within normal range. LDL improved since last panel.",
    },
  })

  await prisma.prescription.upsert({
    where: { id: "seed-prescription-1" },
    update: {},
    create: {
      id: "seed-prescription-1",
      patientId: patientProfile.id,
      doctorId: doctorProfile.id,
      medication: "Atorvastatin 20mg",
      dosage: "1 tablet",
      frequency: "Once daily, evening",
      status: "ACTIVE",
      refillsLeft: 3,
    },
  })

  const conversation = await prisma.conversation.upsert({
    where: { patientId_doctorId: { patientId: patientProfile.id, doctorId: doctorProfile.id } },
    update: {},
    create: { patientId: patientProfile.id, doctorId: doctorProfile.id },
  })

  await prisma.message.createMany({
    data: [
      {
        conversationId: conversation.id,
        senderId: doctorUser.id,
        text: "Hi James, I reviewed your latest lipid panel — LDL has improved nicely.",
        read: true,
      },
      {
        conversationId: conversation.id,
        senderId: patientUser.id,
        text: "That's great to hear! Should I keep the same dosage?",
        read: true,
      },
      {
        conversationId: conversation.id,
        senderId: doctorUser.id,
        text: "Yes, let's keep the current dose and recheck in 3 months.",
        read: false,
      },
    ],
    skipDuplicates: true,
  })

  await prisma.notification.upsert({
    where: { id: "seed-notification-1" },
    update: {},
    create: {
      id: "seed-notification-1",
      userId: patientUser.id,
      type: "APPOINTMENT",
      title: "Upcoming appointment tomorrow",
      description: "Video call with Dr. Amara Chen at 9:00 AM.",
      read: false,
    },
  })

  await prisma.transaction.upsert({
    where: { invoiceId: "INV-1042" },
    update: {},
    create: {
      patientId: patientProfile.id,
      description: "Video consultation — Dr. Amara Chen",
      amount: 120,
      status: "PENDING",
      method: "Visa •••• 4242",
      invoiceId: "INV-1042",
    },
  })

  await prisma.review.upsert({
    where: { id: "seed-review-1" },
    update: {},
    create: {
      id: "seed-review-1",
      doctorId: doctorProfile.id,
      patientId: patientProfile.id,
      rating: 5,
      comment: "Dr. Chen took the time to explain everything clearly and never felt rushed.",
    },
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

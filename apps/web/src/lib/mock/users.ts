import type { PlatformUser } from "@/types"

export const platformUsers: PlatformUser[] = [
  { id: "u-1", name: "James Hale", initials: "JH", email: "james.hale@example.com", role: "patient", status: "active", joinedDate: "2024-02-14", accent: "primary" },
  { id: "u-2", name: "Sofia Reyes", initials: "SR", email: "sofia.reyes@example.com", role: "patient", status: "active", joinedDate: "2023-11-02", accent: "coral" },
  { id: "u-3", name: "Dr. Amara Chen", initials: "AC", email: "amara.chen@vitalis.health", role: "doctor", status: "active", joinedDate: "2022-06-30", accent: "primary" },
  { id: "u-4", name: "Dr. Marcus Obi", initials: "MO", email: "marcus.obi@vitalis.health", role: "doctor", status: "active", joinedDate: "2022-09-18", accent: "coral" },
  { id: "u-5", name: "Dr. Priya Sharma", initials: "PS", email: "priya.sharma@vitalis.health", role: "doctor", status: "active", joinedDate: "2021-04-11", accent: "amber" },
  { id: "u-6", name: "Daniel Kim", initials: "DK", email: "parent.kim@example.com", role: "patient", status: "pending", joinedDate: "2026-06-02", accent: "amber" },
  { id: "u-7", name: "Tom Walker", initials: "TW", email: "tom.walker@example.com", role: "patient", status: "suspended", joinedDate: "2023-01-22", accent: "violet" },
  { id: "u-8", name: "Sunny Patel", initials: "SP", email: "sunny.patel@vitalis.health", role: "admin", status: "active", joinedDate: "2021-01-05", accent: "violet" },
  { id: "u-9", name: "Dr. Elena Kovač", initials: "EK", email: "elena.kovac@vitalis.health", role: "doctor", status: "active", joinedDate: "2023-03-09", accent: "violet" },
  { id: "u-10", name: "Aisha Rahman", initials: "AR", email: "aisha.rahman@example.com", role: "patient", status: "active", joinedDate: "2024-08-19", accent: "amber" },
]

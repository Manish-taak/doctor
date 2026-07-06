import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  FileText,
  Pill,
  CreditCard,
  Bell,
  MessageSquare,
  Settings,
  User,
  Users,
  Star,
  Wallet,
  BarChart3,
  LayoutGrid,
  FileBarChart,
  type LucideIcon,
} from "lucide-react"

import type { UserRole } from "@/types"

export interface DashboardNavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const dashboardNav: Record<UserRole, DashboardNavItem[]> = {
  patient: [
    { label: "Dashboard", href: "/patient", icon: LayoutDashboard },
    { label: "Appointments", href: "/patient/appointments", icon: CalendarDays },
    { label: "My Doctors", href: "/patient/doctors", icon: Stethoscope },
    { label: "Medical Records", href: "/patient/records", icon: FileText },
    { label: "Prescriptions", href: "/patient/prescriptions", icon: Pill },
    { label: "Payments", href: "/patient/payments", icon: CreditCard },
    { label: "Notifications", href: "/patient/notifications", icon: Bell },
    { label: "Messages", href: "/patient/messages", icon: MessageSquare },
    { label: "Settings", href: "/patient/settings", icon: Settings },
    { label: "Profile", href: "/patient/profile", icon: User },
  ],
  doctor: [
    { label: "Dashboard", href: "/doctor", icon: LayoutDashboard },
    { label: "Calendar", href: "/doctor/calendar", icon: CalendarDays },
    { label: "Appointments", href: "/doctor/appointments", icon: CalendarDays },
    { label: "Patients", href: "/doctor/patients", icon: Users },
    { label: "Reviews", href: "/doctor/reviews", icon: Star },
    { label: "Earnings", href: "/doctor/earnings", icon: Wallet },
    { label: "Analytics", href: "/doctor/analytics", icon: BarChart3 },
    { label: "Messages", href: "/doctor/messages", icon: MessageSquare },
    { label: "Notifications", href: "/doctor/notifications", icon: Bell },
    { label: "Profile", href: "/doctor/profile", icon: User },
    { label: "Settings", href: "/doctor/settings", icon: Settings },
  ],
  admin: [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Doctors", href: "/admin/doctors", icon: Stethoscope },
    { label: "Appointments", href: "/admin/appointments", icon: CalendarDays },
    { label: "Categories", href: "/admin/categories", icon: LayoutGrid },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Reports", href: "/admin/reports", icon: FileBarChart },
    { label: "Payments", href: "/admin/payments", icon: CreditCard },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ],
}

export const dashboardRoleLabel: Record<UserRole, string> = {
  patient: "Patient",
  doctor: "Doctor",
  admin: "Admin",
}

export const dashboardCurrentUser: Record<UserRole, { name: string; initials: string; email: string }> = {
  patient: { name: "James Hale", initials: "JH", email: "james.hale@example.com" },
  doctor: { name: "Dr. Amara Chen", initials: "AC", email: "amara.chen@vitalis.health" },
  admin: { name: "Sunny Patel", initials: "SP", email: "sunny.patel@vitalis.health" },
}

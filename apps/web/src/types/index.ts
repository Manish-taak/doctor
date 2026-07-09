import type { LucideIcon } from "lucide-react"

export type Accent = "primary" | "coral" | "amber" | "violet"

export interface NavLink {
  label: string
  href: string
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  qualification: string
  rating: number
  reviewCount: number
  experienceYears: number
  location: string
  price: number
  availableToday: boolean
  telehealth: boolean
  initials: string
  accent: Accent
  bio?: string
  education?: string[]
  languages?: string[]
  email?: string
  phone?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  initials: string
  accent: Accent
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface Stat {
  id: string
  label: string
  value: string
  icon: LucideIcon
}

export interface Step {
  id: string
  step: string
  title: string
  description: string
  icon: LucideIcon
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  cadence: string
  featured?: boolean
  features: string[]
  cta: string
}

export interface Faq {
  id: string
  question: string
  answer: string
}

export type AppointmentStatus = "pending" | "upcoming" | "completed" | "cancelled"
export type AppointmentType = "in-person" | "video"

export interface Appointment {
  id: string
  patientName: string
  patientInitials: string
  doctorName: string
  doctorInitials: string
  specialty: string
  date: string
  time: string
  type: AppointmentType
  status: AppointmentStatus
  location: string
  accent: Accent
}

export interface Patient {
  id: string
  name: string
  initials: string
  age: number
  gender: "Female" | "Male" | "Other"
  lastVisit: string
  reason: string
  status: "active" | "inactive"
  email: string
  phone: string
  accent: Accent
}

export type RecordType = "Lab Result" | "Prescription" | "Visit Summary" | "Imaging"

export interface MedicalRecord {
  id: string
  title: string
  type: RecordType
  doctorName: string
  date: string
  fileSize: string
  summary: string
}

export type PrescriptionStatus = "active" | "completed" | "expired"

export interface Prescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  prescribedBy: string
  date: string
  status: PrescriptionStatus
  refillsLeft: number
}

export interface Conversation {
  id: string
  name: string
  initials: string
  accent: Accent
  role: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
  online: boolean
}

export interface Message {
  id: string
  conversationId: string
  sender: "me" | "them"
  text: string
  time: string
}

export type NotificationType = "appointment" | "message" | "payment" | "system"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  time: string
  read: boolean
}

export type TransactionStatus = "paid" | "pending" | "failed"

export interface Transaction {
  id: string
  description: string
  date: string
  amount: number
  status: TransactionStatus
  method: string
  invoiceId: string
}

export interface Review {
  id: string
  patientName: string
  patientInitials: string
  accent: Accent
  rating: number
  comment: string
  date: string
}

export interface Category {
  id: string
  name: string
  icon: LucideIcon
  doctorCount: number
  appointmentCount: number
}

export interface ChartPoint {
  label: string
  value: number
}

export type UserRole = "patient" | "doctor" | "admin"
export type UserStatus = "active" | "suspended" | "pending"

export interface PlatformUser {
  id: string
  name: string
  initials: string
  email: string
  role: UserRole
  status: UserStatus
  joinedDate: string
  accent: Accent
}

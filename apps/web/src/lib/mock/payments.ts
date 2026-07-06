import type { Transaction } from "@/types"

export const transactions: Transaction[] = [
  {
    id: "txn-1",
    description: "Video consultation — Dr. Amara Chen",
    date: "2026-07-08",
    amount: 120,
    status: "pending",
    method: "Visa •••• 4242",
    invoiceId: "INV-1042",
  },
  {
    id: "txn-2",
    description: "In-person visit — Dr. Marcus Obi",
    date: "2026-07-01",
    amount: 95,
    status: "paid",
    method: "Visa •••• 4242",
    invoiceId: "INV-1038",
  },
  {
    id: "txn-3",
    description: "Annual physical — Dr. Priya Sharma",
    date: "2026-06-15",
    amount: 85,
    status: "paid",
    method: "Mastercard •••• 8891",
    invoiceId: "INV-1029",
  },
  {
    id: "txn-4",
    description: "Video consultation — Dr. Elena Kovač",
    date: "2026-05-22",
    amount: 140,
    status: "paid",
    method: "Visa •••• 4242",
    invoiceId: "INV-1015",
  },
  {
    id: "txn-5",
    description: "Lab work — Vitalis Diagnostics",
    date: "2026-05-02",
    amount: 60,
    status: "failed",
    method: "Mastercard •••• 8891",
    invoiceId: "INV-1004",
  },
]

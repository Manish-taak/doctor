import { format } from "date-fns"

import { findTransactionsForUser } from "@/lib/server/services/transactions"
import { requireUser } from "@/lib/server/session"
import type { Transaction, TransactionStatus } from "@/types"

interface ApiTransaction {
  id: string
  description: string
  date: string
  amount: number
  status: "PAID" | "PENDING" | "FAILED"
  method: string
  invoiceId: string
}

function mapTransaction(api: ApiTransaction): Transaction {
  return {
    id: api.id,
    description: api.description,
    date: format(new Date(api.date), "yyyy-MM-dd"),
    amount: api.amount,
    status: api.status.toLowerCase() as TransactionStatus,
    method: api.method,
    invoiceId: api.invoiceId,
  }
}

export async function getTransactions(): Promise<Transaction[]> {
  const user = await requireUser()
  const transactions = await findTransactionsForUser(user)
  return transactions.map((t) => mapTransaction(t as unknown as ApiTransaction))
}

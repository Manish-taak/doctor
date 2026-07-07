import { format } from "date-fns"

import type { Transaction, TransactionStatus } from "@/types"

import { apiFetch, serverAuthHeaders } from "./client"

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
  const headers = await serverAuthHeaders()
  const transactions = await apiFetch<ApiTransaction[]>("/transactions", { headers })
  return transactions.map(mapTransaction)
}

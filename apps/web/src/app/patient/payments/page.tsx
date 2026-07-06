"use client"

import { Clock, CreditCard, Download, Receipt, Wallet } from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { transactions } from "@/lib/mock/payments"
import type { TransactionStatus } from "@/types"

const statusStyles: Record<TransactionStatus, string> = {
  paid: "bg-primary/10 text-primary",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  failed: "bg-destructive/10 text-destructive",
}

const savedCards = [
  { label: "Visa •••• 4242", expiry: "Expires 08/28", isDefault: true },
  { label: "Mastercard •••• 8891", expiry: "Expires 02/27", isDefault: false },
]

export default function PatientPaymentsPage() {
  const totalPaid = transactions
    .filter((t) => t.status === "paid")
    .reduce((sum, t) => sum + t.amount, 0)
  const totalPending = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0)
  const failedCount = transactions.filter((t) => t.status === "failed").length

  return (
    <>
      <PageHeader title="Payments" description="Track your invoices, payment history, and saved payment methods." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total paid" value={`$${totalPaid.toFixed(2)}`} icon={Wallet} />
        <MetricCard label="Pending amount" value={`$${totalPending.toFixed(2)}`} icon={Clock} />
        <MetricCard label="Failed payments" value={String(failedCount)} icon={CreditCard} />
        <MetricCard label="Total invoices" value={String(transactions.length)} icon={Receipt} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="ring-foreground/5 lg:col-span-2">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Transaction history</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium text-foreground">{transaction.description}</TableCell>
                    <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                    <TableCell className="text-muted-foreground">${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={statusStyles[transaction.status]}>{transaction.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{transaction.invoiceId}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Download invoice ${transaction.invoiceId}`}
                        onClick={() => toast.success(`Download started for invoice ${transaction.invoiceId}`)}
                      >
                        <Download className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold text-foreground">Payment methods</h2>
              <Button size="sm" variant="outline" onClick={() => toast("Adding a card isn't available in this preview.")}>
                Add card
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              {savedCards.map((card) => (
                <div key={card.label} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <CreditCard className="size-4" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5">
                    <p className="text-sm font-medium text-foreground">{card.label}</p>
                    <p className="text-xs text-muted-foreground">{card.expiry}</p>
                  </div>
                  {card.isDefault && <Badge className="bg-primary/10 text-primary">Default</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

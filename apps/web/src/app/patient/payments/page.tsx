import { Clock, CreditCard, Receipt, Wallet } from "lucide-react"

import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getTransactions } from "@/lib/api/transactions"

import { AddCardButton } from "./add-card-button"
import { TransactionsTable } from "./transactions-table"

const savedCards = [
  { label: "Visa •••• 4242", expiry: "Expires 08/28", isDefault: true },
  { label: "Mastercard •••• 8891", expiry: "Expires 02/27", isDefault: false },
]

export default async function PatientPaymentsPage() {
  const transactions = await getTransactions()

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
            <TransactionsTable transactions={transactions} />
          </CardContent>
        </Card>

        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-base font-semibold text-foreground">Payment methods</h2>
              <AddCardButton />
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

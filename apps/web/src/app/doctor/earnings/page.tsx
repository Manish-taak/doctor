import { CalendarClock, TrendingUp, Wallet } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart } from "@/components/charts/bar-chart"
import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { monthlyEarnings } from "@/lib/mock/charts"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/types"

const transactions: Transaction[] = [
  { id: "txn-3001", description: "Consultation — James Hale", date: "2026-07-01", amount: 120, status: "paid", method: "Card", invoiceId: "INV-3001" },
  { id: "txn-3002", description: "Consultation — Sofia Reyes", date: "2026-06-29", amount: 95, status: "paid", method: "Insurance", invoiceId: "INV-3002" },
  { id: "txn-3003", description: "Follow-up — Priya Nair", date: "2026-06-24", amount: 80, status: "paid", method: "Card", invoiceId: "INV-3003" },
  { id: "txn-3004", description: "Consultation — Aisha Rahman", date: "2026-06-20", amount: 110, status: "pending", method: "Insurance", invoiceId: "INV-3004" },
  { id: "txn-3005", description: "Follow-up — Tom Walker", date: "2026-06-12", amount: 90, status: "failed", method: "Card", invoiceId: "INV-3005" },
]

const statusStyles: Record<Transaction["status"], string> = {
  paid: "bg-primary/10 text-primary",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  failed: "bg-destructive/10 text-destructive",
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)

export default function DoctorEarningsPage() {
  const totalEarnings = monthlyEarnings.reduce((sum, m) => sum + m.value, 0)
  const thisMonth = monthlyEarnings[monthlyEarnings.length - 1]?.value ?? 0
  const pendingPayout = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)

  return (
    <>
      <PageHeader title="Earnings" description="Track your revenue, payouts, and transaction history." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total earnings" value={formatCurrency(totalEarnings)} icon={Wallet} />
        <MetricCard label="This month" value={formatCurrency(thisMonth)} icon={TrendingUp} trend={{ value: "+12% vs last month", positive: true }} />
        <MetricCard label="Pending payout" value={formatCurrency(pendingPayout)} icon={CalendarClock} />
        <MetricCard label="Last payout" value="Jun 30, 2026" icon={CalendarClock} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6">
        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Monthly earnings</h2>
            <BarChart data={monthlyEarnings} formatValue={(v) => formatCurrency(v)} />
          </CardContent>
        </Card>

        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Recent transactions</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-medium text-foreground">{txn.description}</TableCell>
                    <TableCell className="text-muted-foreground">{txn.date}</TableCell>
                    <TableCell className="text-muted-foreground">{txn.method}</TableCell>
                    <TableCell className="text-muted-foreground">{txn.invoiceId}</TableCell>
                    <TableCell>
                      <Badge className={cn(statusStyles[txn.status])}>{txn.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-foreground">{formatCurrency(txn.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

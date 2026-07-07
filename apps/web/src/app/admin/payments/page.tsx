import { Clock, Receipt, RefreshCcw, Wallet } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { getTransactions } from "@/lib/api/transactions"
import { cn } from "@/lib/utils"
import type { TransactionStatus } from "@/types"

const statusStyles: Record<TransactionStatus, string> = {
  paid: "bg-primary/10 text-primary",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  failed: "bg-destructive/10 text-destructive",
}

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`
}

export default async function AdminPaymentsPage() {
  const transactions = await getTransactions()
  const totalProcessed = transactions.filter((t) => t.status === "paid").reduce((sum, t) => sum + t.amount, 0)
  const pendingPayouts = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)
  const refunds = transactions.filter((t) => t.status === "failed").reduce((sum, t) => sum + t.amount, 0)

  return (
    <>
      <PageHeader title="Payments" description="Track transactions, payouts, and refunds across the platform." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total processed" value={formatCurrency(totalProcessed)} icon={Wallet} trend={{ value: "+6.1%", positive: true }} />
        <MetricCard label="Pending payouts" value={formatCurrency(pendingPayouts)} icon={Clock} />
        <MetricCard label="Refunds" value={formatCurrency(refunds)} icon={RefreshCcw} trend={{ value: "-2.3%", positive: false }} />
        <MetricCard label="Total transactions" value={transactions.length.toLocaleString("en-US")} icon={Receipt} />
      </div>

      <Card className="mt-6 ring-foreground/5">
        <CardContent>
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
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium text-foreground">{transaction.description}</TableCell>
                  <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                  <TableCell className="text-muted-foreground">{transaction.method}</TableCell>
                  <TableCell className="text-muted-foreground">{transaction.invoiceId}</TableCell>
                  <TableCell>
                    <Badge className={cn("capitalize", statusStyles[transaction.status])}>{transaction.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

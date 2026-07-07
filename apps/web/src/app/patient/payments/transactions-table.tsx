"use client"

import { Download } from "lucide-react"
import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Transaction, TransactionStatus } from "@/types"

const statusStyles: Record<TransactionStatus, string> = {
  paid: "bg-primary/10 text-primary",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  failed: "bg-destructive/10 text-destructive",
}

export function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  return (
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
  )
}

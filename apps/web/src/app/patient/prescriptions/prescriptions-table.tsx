"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

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
import { requestRefill } from "@/lib/api/prescriptions-client"
import type { Prescription, PrescriptionStatus } from "@/types"

const statusStyles: Record<PrescriptionStatus, string> = {
  active: "bg-primary/10 text-primary",
  completed: "bg-muted text-muted-foreground",
  expired: "bg-destructive/10 text-destructive",
}

export function PrescriptionsTable({ prescriptions: initial }: { prescriptions: Prescription[] }) {
  const { data: session } = useSession()
  const [prescriptions, setPrescriptions] = useState(initial)
  const [requestingId, setRequestingId] = useState<string | null>(null)

  const handleRefill = async (prescription: Prescription) => {
    if (!session?.accessToken) return
    setRequestingId(prescription.id)
    try {
      const updated = await requestRefill(session.accessToken, prescription.id)
      setPrescriptions((prev) => prev.map((p) => (p.id === prescription.id ? updated : p)))
      toast.success(`Refill requested for ${prescription.medication} — ${updated.refillsLeft} left.`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to request refill")
    } finally {
      setRequestingId(null)
    }
  }

  return (
    <Card className="ring-foreground/5">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medication</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Prescribed by</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Refills left</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">{prescription.medication}</span>
                    <span className="text-xs text-muted-foreground">{prescription.dosage}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{prescription.frequency}</TableCell>
                <TableCell className="text-muted-foreground">{prescription.prescribedBy}</TableCell>
                <TableCell className="text-muted-foreground">{prescription.date}</TableCell>
                <TableCell>
                  <Badge className={statusStyles[prescription.status]}>{prescription.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{prescription.refillsLeft}</TableCell>
                <TableCell className="text-right">
                  {prescription.status === "active" && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={prescription.refillsLeft <= 0 || requestingId === prescription.id}
                      onClick={() => handleRefill(prescription)}
                    >
                      {prescription.refillsLeft <= 0 ? "No refills left" : "Request refill"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

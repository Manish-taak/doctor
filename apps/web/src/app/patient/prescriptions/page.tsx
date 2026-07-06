"use client"

import { Pill } from "lucide-react"
import { toast } from "sonner"

import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
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
import { prescriptions } from "@/lib/mock/records"
import type { PrescriptionStatus } from "@/types"

const statusStyles: Record<PrescriptionStatus, string> = {
  active: "bg-primary/10 text-primary",
  completed: "bg-muted text-muted-foreground",
  expired: "bg-destructive/10 text-destructive",
}

export default function PatientPrescriptionsPage() {
  return (
    <>
      <PageHeader
        title="Prescriptions"
        description="Current and past medications prescribed by your doctors."
        count={prescriptions.length}
      />

      {prescriptions.length > 0 ? (
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
                          onClick={() =>
                            toast.success(
                              `Refill requested for ${prescription.medication} — you'll hear back within 24 hours.`
                            )
                          }
                        >
                          Request refill
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <EmptyState icon={Pill} title="No prescriptions" description="Prescriptions from your doctors will show up here." />
      )}
    </>
  )
}

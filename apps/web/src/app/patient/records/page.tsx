"use client"

import { Download, FileText } from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { medicalRecords } from "@/lib/mock/records"
import type { RecordType } from "@/types"

const recordTypes: RecordType[] = ["Lab Result", "Prescription", "Visit Summary", "Imaging"]

const recordTypeStyles: Record<RecordType, string> = {
  "Lab Result": "bg-primary/10 text-primary",
  Prescription: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Visit Summary": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Imaging: "bg-coral/10 text-coral",
}

function RecordsTable({ records }: { records: typeof medicalRecords }) {
  if (records.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No records found"
        description="Records of this type will appear here once available."
      />
    )
  }

  return (
    <Card className="ring-foreground/5">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Record</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium text-foreground">{record.title}</span>
                    <span className="text-xs text-muted-foreground">{record.summary}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={recordTypeStyles[record.type]}>{record.type}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{record.doctorName}</TableCell>
                <TableCell className="text-muted-foreground">{record.date}</TableCell>
                <TableCell className="text-muted-foreground">{record.fileSize}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Download ${record.title}`}
                    onClick={() => toast.success(`Download started for ${record.title}`)}
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
  )
}

export default function PatientRecordsPage() {
  return (
    <>
      <PageHeader title="Medical Records" description="Lab results, imaging, and visit summaries from your care team." />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">
            All
            <span className="ml-1 text-xs text-muted-foreground">{medicalRecords.length}</span>
          </TabsTrigger>
          {recordTypes.map((type) => (
            <TabsTrigger key={type} value={type}>
              {type}
              <span className="ml-1 text-xs text-muted-foreground">
                {medicalRecords.filter((record) => record.type === type).length}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-5">
          <RecordsTable records={medicalRecords} />
        </TabsContent>
        {recordTypes.map((type) => (
          <TabsContent key={type} value={type} className="mt-5">
            <RecordsTable records={medicalRecords.filter((record) => record.type === type)} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}

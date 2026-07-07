import { PageHeader } from "@/components/dashboard/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getMedicalRecords } from "@/lib/api/medical-records"
import type { RecordType } from "@/types"

import { RecordsTable } from "./records-table"

const recordTypes: RecordType[] = ["Lab Result", "Prescription", "Visit Summary", "Imaging"]

export default async function PatientRecordsPage() {
  const medicalRecords = await getMedicalRecords()

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

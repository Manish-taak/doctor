import { Pill } from "lucide-react"

import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { getPrescriptions } from "@/lib/api/prescriptions"

import { PrescriptionsTable } from "./prescriptions-table"

export default async function PatientPrescriptionsPage() {
  const prescriptions = await getPrescriptions()

  return (
    <>
      <PageHeader
        title="Prescriptions"
        description="Current and past medications prescribed by your doctors."
        count={prescriptions.length}
      />

      {prescriptions.length > 0 ? (
        <PrescriptionsTable prescriptions={prescriptions} />
      ) : (
        <EmptyState icon={Pill} title="No prescriptions" description="Prescriptions from your doctors will show up here." />
      )}
    </>
  )
}

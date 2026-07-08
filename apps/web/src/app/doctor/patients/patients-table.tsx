"use client"

import { useMemo, useState } from "react"
import { Mail, Phone, Search, Users, Video, MapPin } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { accentGradient } from "@/lib/accent"
import { cn } from "@/lib/utils"
import type { DoctorPatient } from "@/lib/api/patients"

function PatientRow({ patient }: { patient: DoctorPatient }) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <TableRow className="cursor-pointer">
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className={cn("bg-linear-to-br font-semibold text-white", accentGradient[patient.accent])}>
                    {patient.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{patient.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {patient.age !== null ? `${patient.age} · ${patient.gender}` : patient.gender}
            </TableCell>
            <TableCell className="text-muted-foreground">{patient.lastVisit}</TableCell>
            <TableCell className="text-muted-foreground">
              {patient.appointmentCount} visit{patient.appointmentCount === 1 ? "" : "s"}
            </TableCell>
            <TableCell>
              <Badge
                className={patient.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}
              >
                {patient.status}
              </Badge>
            </TableCell>
          </TableRow>
        }
      />

      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className={cn("bg-linear-to-br font-semibold text-white", accentGradient[patient.accent])}>
                {patient.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <DialogTitle>{patient.name}</DialogTitle>
              <DialogDescription>
                {patient.age !== null ? `${patient.age} yrs · ${patient.gender}` : patient.gender}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>
            <Badge
              className={patient.status === "active" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}
            >
              {patient.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last visit</span>
            <span className="text-foreground">{patient.lastVisit}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last visit type</span>
            <span className="flex items-center gap-1.5 text-foreground">
              {patient.visitType === "video" ? <Video className="size-3.5" /> : <MapPin className="size-3.5" />}
              <span className="capitalize">{patient.visitType}</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total visits with you</span>
            <span className="text-foreground">{patient.appointmentCount}</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <Mail className="size-3.5 text-muted-foreground" />
            <span className="text-foreground">{patient.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-3.5 text-muted-foreground" />
            <span className="text-foreground">{patient.phone}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function DoctorPatientsTable({ patients }: { patients: DoctorPatient[] }) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return patients
    return patients.filter((p) => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q))
  }, [patients, query])

  return (
    <>
      <PageHeader title="Patients" description="Browse and search your patient roster." count={filtered.length} />

      <Card className="ring-foreground/5">
        <CardContent className="flex flex-col gap-4">
          <div className="relative max-w-sm">
            <Search className="absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search patients by name or email…"
              className="pl-8"
            />
          </div>

          {filtered.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Age / Gender</TableHead>
                  <TableHead>Last visit</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((patient) => (
                  <PatientRow key={patient.id} patient={patient} />
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState icon={Users} title="No patients found" description="Try a different search term." />
          )}
        </CardContent>
      </Card>
    </>
  )
}

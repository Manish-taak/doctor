"use client"

import { useMemo, useState } from "react"
import { Search, SearchX } from "lucide-react"

import { DoctorCard } from "@/components/cards/doctor-card"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { EmptyState } from "@/components/shared/empty-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { doctors } from "@/lib/mock/doctors"

const specialties = ["All specialties", ...Array.from(new Set(doctors.map((doctor) => doctor.specialty)))]

export function DoctorDirectory() {
  const [search, setSearch] = useState("")
  const [specialty, setSpecialty] = useState("All specialties")
  const [availableOnly, setAvailableOnly] = useState(false)

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase()
    return doctors.filter((doctor) => {
      const matchesSpecialty = specialty === "All specialties" || doctor.specialty === specialty
      const matchesQuery =
        query.length === 0 ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.location.toLowerCase().includes(query)
      const matchesAvailability = !availableOnly || doctor.availableToday
      return matchesSpecialty && matchesQuery && matchesAvailability
    })
  }, [search, specialty, availableOnly])

  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, specialty, or city"
              className="pl-8"
            />
          </div>
          <Select value={specialty} onValueChange={(value) => setSpecialty(value ?? "All specialties")}>
            <SelectTrigger className="w-full sm:w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2.5">
          <Switch
            id="available-today"
            checked={availableOnly}
            onCheckedChange={(checked) => setAvailableOnly(checked)}
          />
          <Label htmlFor="available-today" className="text-sm text-foreground/80">
            Available today only
          </Label>
        </div>
      </div>

      {filteredDoctors.length > 0 ? (
        <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <StaggerItem key={doctor.id}>
              <DoctorCard doctor={doctor} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <div className="mt-10">
          <EmptyState
            icon={SearchX}
            title="No doctors match your filters"
            description="Try a different specialty, clear your search, or turn off the availability filter."
          />
        </div>
      )}
    </>
  )
}

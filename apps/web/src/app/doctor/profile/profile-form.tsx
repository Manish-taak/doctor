"use client"

import { useState } from "react"
import { GraduationCap, Languages as LanguagesIcon, Plus, Star, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/dashboard/page-header"
import { accentGradient } from "@/lib/accent"
import { updateDoctorProfile } from "@/lib/api/doctors-client"
import { cn } from "@/lib/utils"
import type { Doctor } from "@/types"

export function DoctorProfileForm({ doctor }: { doctor: Doctor }) {
  const { data: session } = useSession()
  const [bio, setBio] = useState(doctor.bio ?? "")
  const [experienceYears, setExperienceYears] = useState(String(doctor.experienceYears))
  const [price, setPrice] = useState(String(doctor.price))
  const [location, setLocation] = useState(doctor.location)
  const [telehealth, setTelehealth] = useState(doctor.telehealth)
  const [availableToday, setAvailableToday] = useState(doctor.availableToday)
  const [education, setEducation] = useState(doctor.education ?? [])
  const [educationInput, setEducationInput] = useState("")
  const [languages, setLanguages] = useState(doctor.languages ?? [])
  const [languageInput, setLanguageInput] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!session?.accessToken) return
    setSaving(true)
    try {
      await updateDoctorProfile(session.accessToken, {
        bio,
        experienceYears: Number(experienceYears) || 0,
        price: Number(price) || 0,
        location,
        telehealth,
        availableToday,
        education,
        languages,
      })
      toast.success("Profile saved")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  const addEducation = () => {
    if (!educationInput.trim()) return
    setEducation((prev) => [...prev, educationInput.trim()])
    setEducationInput("")
  }
  const removeEducation = (item: string) => setEducation((prev) => prev.filter((e) => e !== item))

  const addLanguage = () => {
    if (!languageInput.trim()) return
    setLanguages((prev) => [...prev, languageInput.trim()])
    setLanguageInput("")
  }
  const removeLanguage = (item: string) => setLanguages((prev) => prev.filter((l) => l !== item))

  return (
    <>
      <PageHeader title="Profile" description="This is how patients see your public profile." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="ring-foreground/5 lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <Avatar className="size-24">
              <AvatarFallback
                className={cn("bg-linear-to-br text-2xl font-semibold text-white", accentGradient[doctor.accent])}
              >
                {doctor.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-lg font-semibold text-foreground">{doctor.name}</h2>
              <p className="text-sm text-muted-foreground">
                {doctor.specialty} · {doctor.qualification}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-foreground">{doctor.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({doctor.reviewCount} reviews)</span>
            </div>
            <p className="text-xs text-muted-foreground">{doctor.email}</p>
            <div className="flex items-center gap-2">
              <Label htmlFor="available-today" className="text-xs text-muted-foreground">
                Available today
              </Label>
              <Switch id="available-today" checked={availableToday} onCheckedChange={setAvailableToday} />
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <h2 className="font-heading text-base font-semibold text-foreground">Practice details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    min={0}
                    value={experienceYears}
                    onChange={(event) => setExperienceYears(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price">Price per visit ($)</Label>
                  <Input id="price" type="number" min={0} value={price} onChange={(event) => setPrice(event.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={location} onChange={(event) => setLocation(event.target.value)} />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-3">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-foreground">Telehealth</p>
                  <p className="text-xs text-muted-foreground">Offer video consultations to patients.</p>
                </div>
                <Switch checked={telehealth} onCheckedChange={setTelehealth} />
              </div>
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-3">
              <h2 className="font-heading text-base font-semibold text-foreground">About</h2>
              <Textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Tell patients about your practice..."
                className="min-h-24"
              />
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-3">
              <h2 className="font-heading text-base font-semibold text-foreground">Education</h2>
              <div className="flex flex-col gap-2">
                {education.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground/90"
                  >
                    <span className="flex items-center gap-2">
                      <GraduationCap className="size-4 shrink-0 text-primary" /> {item}
                    </span>
                    <button type="button" onClick={() => removeEducation(item)} aria-label={`Remove ${item}`}>
                      <X className="size-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={educationInput}
                  onChange={(event) => setEducationInput(event.target.value)}
                  placeholder="e.g. MD, Harvard Medical School"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault()
                      addEducation()
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={addEducation} aria-label="Add education">
                  <Plus className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-3">
              <h2 className="font-heading text-base font-semibold text-foreground">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <Badge key={language} variant="outline" className="gap-1.5">
                    <LanguagesIcon className="size-3" /> {language}
                    <button type="button" onClick={() => removeLanguage(language)} aria-label={`Remove ${language}`}>
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={languageInput}
                  onChange={(event) => setLanguageInput(event.target.value)}
                  placeholder="e.g. Spanish"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault()
                      addLanguage()
                    }
                  }}
                />
                <Button type="button" variant="outline" size="icon" onClick={addLanguage} aria-label="Add language">
                  <Plus className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

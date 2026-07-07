"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { Pencil, ShieldCheck } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateProfile, type MyProfile } from "@/lib/api/users"
import { getInitials } from "@/lib/utils"

export function ProfileForm({ profile }: { profile: MyProfile }) {
  const { data: session } = useSession()
  const [dob, setDob] = useState(
    profile.patientProfile?.dob ? format(parseISO(profile.patientProfile.dob), "yyyy-MM-dd") : ""
  )
  const [gender, setGender] = useState(profile.patientProfile?.gender ?? "male")
  const [phone, setPhone] = useState(profile.patientProfile?.phone ?? "")
  const [saving, setSaving] = useState(false)

  const [insuranceProvider, setInsuranceProvider] = useState(profile.patientProfile?.insuranceProvider ?? "")
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState(
    profile.patientProfile?.insurancePolicyNumber ?? ""
  )
  const [insuranceGroupNumber, setInsuranceGroupNumber] = useState(
    profile.patientProfile?.insuranceGroupNumber ?? ""
  )
  const [insuranceValidThrough, setInsuranceValidThrough] = useState(
    profile.patientProfile?.insuranceValidThrough
      ? format(parseISO(profile.patientProfile.insuranceValidThrough), "yyyy-MM-dd")
      : ""
  )
  const [savingInsurance, setSavingInsurance] = useState(false)

  const initials = getInitials(profile.name)

  const handleSave = async () => {
    if (!session?.accessToken) return
    setSaving(true)
    try {
      await updateProfile(session.accessToken, { dob: dob || undefined, gender, phone })
      toast.success("Profile saved")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  const handleSaveInsurance = async () => {
    if (!session?.accessToken) return
    setSavingInsurance(true)
    try {
      await updateProfile(session.accessToken, {
        insuranceProvider,
        insurancePolicyNumber,
        insuranceGroupNumber,
        insuranceValidThrough: insuranceValidThrough || undefined,
      })
      toast.success("Insurance information updated")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update insurance information")
    } finally {
      setSavingInsurance(false)
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground">Your personal information and insurance details.</p>
      </div>

      <Card className="ring-foreground/5">
        <CardContent className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar size="lg" className="size-20 ring-4 ring-background">
              <AvatarFallback className="bg-linear-to-br from-primary to-primary/60 text-xl font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-lg font-semibold text-foreground">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={() => toast("Photo upload isn't available in this preview")}
          >
            <Pencil className="size-4" /> Change photo
          </Button>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="ring-foreground/5 lg:col-span-2">
          <CardContent className="flex flex-col gap-5">
            <h2 className="font-heading text-base font-semibold text-foreground">Personal information</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dob">Date of birth</Label>
                <Input id="dob" type="date" value={dob} onChange={(event) => setDob(event.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select value={gender} onValueChange={(value) => setGender(value ?? "male")}>
                  <SelectTrigger id="gender" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="blood-type">Blood type</Label>
                <Select defaultValue="o-positive">
                  <SelectTrigger id="blood-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a-positive">A+</SelectItem>
                    <SelectItem value="a-negative">A-</SelectItem>
                    <SelectItem value="b-positive">B+</SelectItem>
                    <SelectItem value="b-negative">B-</SelectItem>
                    <SelectItem value="o-positive">O+</SelectItem>
                    <SelectItem value="o-negative">O-</SelectItem>
                    <SelectItem value="ab-positive">AB+</SelectItem>
                    <SelectItem value="ab-negative">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="emergency-name">Emergency contact name</Label>
                <Input id="emergency-name" defaultValue="Sarah Hale" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="emergency-phone">Emergency contact phone</Label>
                <Input id="emergency-phone" type="tel" defaultValue="(415) 555-0187" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                Save changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="ring-foreground/5">
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4.5 text-primary" />
              <h2 className="font-heading text-base font-semibold text-foreground">Insurance information</h2>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex flex-col gap-1">
                <Label htmlFor="insurance-provider" className="text-xs text-muted-foreground">
                  Provider
                </Label>
                <Input
                  id="insurance-provider"
                  value={insuranceProvider}
                  onChange={(event) => setInsuranceProvider(event.target.value)}
                  placeholder="e.g. BlueShield Horizon PPO"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="insurance-policy" className="text-xs text-muted-foreground">
                  Policy number
                </Label>
                <Input
                  id="insurance-policy"
                  value={insurancePolicyNumber}
                  onChange={(event) => setInsurancePolicyNumber(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="insurance-group" className="text-xs text-muted-foreground">
                  Group number
                </Label>
                <Input
                  id="insurance-group"
                  value={insuranceGroupNumber}
                  onChange={(event) => setInsuranceGroupNumber(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="insurance-valid-through" className="text-xs text-muted-foreground">
                  Plan valid through
                </Label>
                <Input
                  id="insurance-valid-through"
                  type="date"
                  value={insuranceValidThrough}
                  onChange={(event) => setInsuranceValidThrough(event.target.value)}
                />
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 self-start"
              onClick={handleSaveInsurance}
              disabled={savingInsurance}
            >
              Update insurance
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

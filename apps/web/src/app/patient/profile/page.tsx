"use client"

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
import { getInitials } from "@/lib/utils"

export default function PatientProfilePage() {
  const { data: session } = useSession()
  const user = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    initials: session?.user?.name ? getInitials(session.user.name) : "?",
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
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-lg font-semibold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">Patient since June 2023</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={() => toast("Editing isn't available in this preview")}
          >
            <Pencil className="size-4" /> Edit profile
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
                <Input id="dob" type="date" defaultValue="1990-04-12" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="gender">Gender</Label>
                <Select defaultValue="male">
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
                <Input id="phone" type="tel" defaultValue="(415) 555-0139" />
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
              <Button onClick={() => toast.success("Profile saved")}>Save changes</Button>
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
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Provider</span>
                <span className="font-medium text-foreground">BlueShield Horizon PPO</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Policy number</span>
                <span className="font-medium text-foreground">BSH-7734-1290</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Group number</span>
                <span className="font-medium text-foreground">GRP-44210</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">Plan valid through</span>
                <span className="font-medium text-foreground">Dec 31, 2026</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 self-start"
              onClick={() => toast.success("Insurance information updated")}
            >
              Update insurance
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

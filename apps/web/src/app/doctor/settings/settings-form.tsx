"use client"

import { useState } from "react"
import { Bell, CalendarDays, Shield, User } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/dashboard/page-header"
import { changePassword } from "@/lib/api/auth"
import { updateProfile } from "@/lib/api/users-client"

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const notificationPrefs = [
  { id: "notif-new-appointment", label: "New appointment requests", description: "Get notified when a patient books a visit." },
  { id: "notif-messages", label: "Patient messages", description: "Get notified about new messages from patients." },
  { id: "notif-reviews", label: "New reviews", description: "Get notified when a patient leaves a review." },
  { id: "notif-payouts", label: "Payout updates", description: "Get notified when a payout is processed." },
]

export function DoctorSettingsForm({ name, email }: { name: string; email: string }) {
  const { data: session } = useSession()
  const [fullName, setFullName] = useState(name)
  const [savingAccount, setSavingAccount] = useState(false)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [changingPassword, setChangingPassword] = useState(false)

  const handleSaveAccount = async () => {
    if (!session?.accessToken) return
    setSavingAccount(true)
    try {
      await updateProfile(session.accessToken, { name: fullName })
      toast.success("Settings saved")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save settings")
    } finally {
      setSavingAccount(false)
    }
  }

  const handleChangePassword = async () => {
    if (!session?.accessToken) return
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation don't match")
      return
    }

    setChangingPassword(true)
    try {
      await changePassword(session.accessToken, currentPassword, newPassword)
      toast.success("Password updated")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update password")
    } finally {
      setChangingPassword(false)
    }
  }

  return (
    <>
      <PageHeader title="Settings" description="Manage your account, availability, and preferences." />

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">
            <User className="size-3.5" /> Account
          </TabsTrigger>
          <TabsTrigger value="availability">
            <CalendarDays className="size-3.5" /> Availability
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="size-3.5" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="size-3.5" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-4">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-5">
              <h2 className="font-heading text-base font-semibold text-foreground">Account details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="settings-name">Full name</Label>
                  <Input id="settings-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="settings-email">Email</Label>
                  <Input id="settings-email" type="email" defaultValue={email} disabled />
                  <p className="text-xs text-muted-foreground">Contact support to change your email.</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Specialty, bio, pricing, and location can be updated on your{" "}
                <a href="/doctor/profile" className="font-medium text-foreground hover:underline">
                  Profile
                </a>{" "}
                page.
              </p>
              <div className="flex justify-end">
                <Button onClick={handleSaveAccount} disabled={savingAccount}>
                  Save changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="mt-4">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-1">
              <h2 className="mb-1 font-heading text-base font-semibold text-foreground">Accepting appointments</h2>
              <p className="mb-3 text-xs text-muted-foreground">
                Per-weekday scheduling isn&apos;t available yet — use the same-day availability toggle on your Profile page.
              </p>
              {weekdays.map((day, i) => (
                <div key={day}>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-sm text-foreground">{day}</span>
                    <Switch defaultChecked={i < 5} disabled />
                  </div>
                  {i < weekdays.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-1">
              <h2 className="mb-3 font-heading text-base font-semibold text-foreground">Notification preferences</h2>
              {notificationPrefs.map((pref, i) => (
                <div key={pref.id}>
                  <div className="flex items-center justify-between gap-4 py-2.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-foreground">{pref.label}</span>
                      <span className="text-xs text-muted-foreground">{pref.description}</span>
                    </div>
                    <Switch
                      defaultChecked
                      onCheckedChange={() => toast("Notification preferences aren't available in this preview.")}
                    />
                  </div>
                  {i < notificationPrefs.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-5">
              <h2 className="font-heading text-base font-semibold text-foreground">Password</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="settings-current-password">Current password</Label>
                  <Input
                    id="settings-current-password"
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="settings-new-password">New password</Label>
                  <Input
                    id="settings-new-password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="settings-confirm-password">Confirm new password</Label>
                  <Input
                    id="settings-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">Two-factor authentication</span>
                  <span className="text-xs text-muted-foreground">Add an extra layer of security to your account.</span>
                </div>
                <Switch onCheckedChange={() => toast("Two-factor authentication isn't available in this preview.")} />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleChangePassword} disabled={changingPassword}>
                  Update password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

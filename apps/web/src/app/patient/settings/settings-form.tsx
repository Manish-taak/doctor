"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { changePassword } from "@/lib/api/auth"
import { updateProfile } from "@/lib/api/users-client"
import type { MyProfile } from "@/lib/api/users"

export function SettingsForm({ profile }: { profile: MyProfile }) {
  const { data: session } = useSession()
  const [name, setName] = useState(profile.name)
  const [phone, setPhone] = useState(profile.patientProfile?.phone ?? "")
  const [saving, setSaving] = useState(false)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [changingPassword, setChangingPassword] = useState(false)

  const handleSave = async () => {
    if (!session?.accessToken) return
    setSaving(true)
    try {
      await updateProfile(session.accessToken, { name, phone })
      toast.success("Settings saved")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save settings")
    } finally {
      setSaving(false)
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
      <PageHeader title="Settings" description="Manage your account, notifications, and security preferences." />

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-5">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-5">
              <h2 className="font-heading text-base font-semibold text-foreground">Account details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="full-name">Full name</Label>
                  <Input id="full-name" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={profile.email} disabled />
                  <p className="text-xs text-muted-foreground">Contact support to change your email.</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="timezone">Time zone</Label>
                  <Input id="timezone" defaultValue="Pacific Time (US & Canada)" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={saving}>
                  Save changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-5">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-5">
              <h2 className="font-heading text-base font-semibold text-foreground">Notification preferences</h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-foreground">Email notifications</p>
                    <p className="text-xs text-muted-foreground">
                      Appointment reminders, messages, and billing updates.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-foreground">SMS notifications</p>
                    <p className="text-xs text-muted-foreground">Text reminders 24 hours before a visit.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-foreground">Push notifications</p>
                    <p className="text-xs text-muted-foreground">Real-time alerts on your mobile device.</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-foreground">Marketing emails</p>
                    <p className="text-xs text-muted-foreground">Product news, health tips, and offers.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-5">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-5">
              <h2 className="font-heading text-base font-semibold text-foreground">Password</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <Label htmlFor="current-password">Current password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="new-password">New password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </div>
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

      <Card className="mt-6 ring-destructive/20">
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-0.5">
            <h2 className="font-heading text-base font-semibold text-foreground">Danger zone</h2>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <Button
            variant="destructive"
            className="shrink-0"
            onClick={() => toast.error("Account deletion isn't available in this preview.")}
          >
            Delete account
          </Button>
        </CardContent>
      </Card>
    </>
  )
}

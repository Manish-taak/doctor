"use client"

import { toast } from "sonner"

import { PageHeader } from "@/components/dashboard/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { dashboardCurrentUser } from "@/lib/dashboard-nav"

export default function PatientSettingsPage() {
  const user = dashboardCurrentUser.patient

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
                  <Input id="full-name" defaultValue={user.name} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" defaultValue="(415) 555-0139" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="timezone">Time zone</Label>
                  <Input id="timezone" defaultValue="Pacific Time (US & Canada)" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
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
                  <Input id="current-password" type="password" placeholder="••••••••" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="new-password">New password</Label>
                  <Input id="new-password" type="password" placeholder="••••••••" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="confirm-password">Confirm new password</Label>
                  <Input id="confirm-password" type="password" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => toast.success("Password updated")}>Update password</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6 ring-foreground/5">
            <CardContent className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p>
              </div>
              <Switch />
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

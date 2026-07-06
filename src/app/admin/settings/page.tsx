"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/dashboard/page-header"

const integrations = [
  { id: "stripe", name: "Stripe", description: "Payment processing and payouts", enabled: true },
  { id: "twilio", name: "Twilio", description: "SMS appointment reminders", enabled: true },
  { id: "gcal", name: "Google Calendar", description: "Two-way appointment sync", enabled: false },
  { id: "zoom", name: "Zoom", description: "Video consultation rooms", enabled: true },
]

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Configure platform-wide preferences and integrations." />

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-5">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-5">
              <h2 className="font-heading text-base font-semibold text-foreground">Platform details</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="platform-name">Platform name</Label>
                  <Input id="platform-name" defaultValue="Vitalis" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="support-email">Support email</Label>
                  <Input id="support-email" type="email" defaultValue="support@vitalis.health" />
                </div>
              </div>
              <div>
                <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-5">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-5">
              <h2 className="font-heading text-base font-semibold text-foreground">Security</h2>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-foreground">Enforce two-factor authentication</p>
                  <p className="text-sm text-muted-foreground">Require 2FA for all doctor and admin accounts.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="session-timeout">Session timeout</Label>
                  <p className="text-sm text-muted-foreground">Automatically sign out inactive sessions.</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger id="session-timeout" className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-5">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-heading text-base font-semibold text-foreground">Enterprise plan</h2>
                  <p className="text-sm text-muted-foreground">Unlimited providers, priority support, and advanced analytics.</p>
                </div>
                <span className="rounded-sm bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">Active</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-2xl font-semibold text-foreground">$2,499</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <p className="text-sm text-muted-foreground">Renews on August 1, 2026.</p>
              <div>
                <Button variant="outline" onClick={() => toast("Billing management isn't available in this preview.")}>
                  Manage billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="mt-5">
          <Card className="ring-foreground/5">
            <CardContent className="flex flex-col gap-5">
              <h2 className="font-heading text-base font-semibold text-foreground">Integrations</h2>
              <div className="flex flex-col divide-y divide-border">
                {integrations.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">{integration.name}</p>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                    <Switch defaultChecked={integration.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

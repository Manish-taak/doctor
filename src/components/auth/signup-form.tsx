"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RoleTabs } from "@/components/auth/role-tabs"
import type { UserRole } from "@/types"

export function SignupForm() {
  const [role, setRole] = useState<UserRole>("patient")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className="ring-foreground/5 shadow-xl shadow-foreground/5">
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground">Start with Vitalis in less than a minute</p>
        </div>

        <div className="flex flex-col gap-2">
          <RoleTabs roles={["patient", "doctor"]} value={role} onChange={setRole} />
          <p className="text-center text-xs text-muted-foreground">
            Demo preview — choose the portal you&apos;d like to explore.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" type="text" placeholder="Jordan Lee" autoComplete="name" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                className="pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox id="terms" className="mt-0.5" />
            <Label htmlFor="terms" className="text-[11px] font-normal text-muted-foreground">
              I agree to the{" "}
              <Link href="/terms" className="font-medium text-foreground hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-medium text-foreground hover:underline">
                Privacy Policy
              </Link>
              .
            </Label>
          </div>

          <Button size="lg" className="w-full" render={<Link href={`/${role}`} />}>
            Create account
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          This is a UI preview only — no real account is created.
        </p>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <Card className="ring-foreground/5 shadow-xl shadow-foreground/5">
        <CardContent className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
            <Mail className="size-5" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
              Check your inbox
            </h1>
            <p className="text-sm text-muted-foreground">
              If an account exists for <span className="font-medium text-foreground">{email}</span>, a
              password reset link is on its way.
            </p>
          </div>
          <Button variant="outline" className="w-full gap-1.5" render={<Link href="/login" />}>
            <ArrowLeft className="size-4" /> Back to sign in
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="ring-foreground/5 shadow-xl shadow-foreground/5">
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">
            Reset your password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a link to reset it.
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Send reset link
          </Button>
        </form>

        <Link
          href="/login"
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to sign in
        </Link>
      </CardContent>
    </Card>
  )
}

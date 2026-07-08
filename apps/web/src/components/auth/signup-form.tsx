"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterInput, type SelfServiceRole } from "@doctor/validators"
import { Eye, EyeOff } from "lucide-react"
import { signIn } from "next-auth/react"
import { useForm, useWatch } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RoleTabs } from "@/components/auth/role-tabs"
import type { UserRole } from "@/types"

export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "PATIENT" },
  })

  const role = useWatch({ control, name: "role" })

  const onSubmit = (data: RegisterInput) => {
    setServerError(null)
    startTransition(async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const body = await response.json().catch(() => null)
        setServerError(body?.message ?? "Could not create your account. Please try again.")
        return
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (!signInResult || signInResult.error) {
        router.push("/login")
        return
      }

      router.push(`/${data.role.toLowerCase()}`)
      router.refresh()
    })
  }

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
          <RoleTabs
            roles={["patient", "doctor"]}
            value={role.toLowerCase() as UserRole}
            onChange={(value) => setValue("role", value.toUpperCase() as SelfServiceRole)}
          />
          <p className="text-center text-xs text-muted-foreground">
            Choose the portal you&apos;d like to explore.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Jordan Lee"
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
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
                aria-invalid={!!errors.password}
                {...register("password")}
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
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <div className="flex items-start gap-2">
            <Checkbox id="terms" className="mt-0.5" required />
            <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
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

          {serverError && (
            <p className="text-sm text-destructive" role="alert">
              {serverError}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={isPending}>
            {isPending ? "Creating account…" : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

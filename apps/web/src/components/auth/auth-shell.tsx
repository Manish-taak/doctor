import type { ReactNode } from "react"

import { Logo } from "@/components/layout/logo"

export function AuthShell({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-secondary/30 px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_14%,transparent),transparent)]"
      />
      <Logo className="mb-8" />
      <div className="w-full max-w-sm">{children}</div>
      {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
    </div>
  )
}

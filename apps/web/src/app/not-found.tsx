import Link from "next/link"
import { Compass } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Logo } from "@/components/layout/logo"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border py-6">
        <Container>
          <Logo />
        </Container>
      </header>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-144 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent)]"
        />
        <Container className="flex flex-col items-center gap-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Compass className="size-7" strokeWidth={1.75} />
          </div>
          <p className="font-heading text-7xl font-semibold tracking-tight text-foreground sm:text-8xl">
            404
          </p>
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-2xl font-semibold text-foreground">Page not found</h1>
            <p className="max-w-md text-balance text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back
              on track.
            </p>
          </div>
          <Button size="lg" render={<Link href="/" />}>
            Back to home
          </Button>
        </Container>
      </main>
    </div>
  )
}

import { StatCard } from "@/components/cards/stat-card"
import { Container } from "@/components/layout/container"
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger"
import { stats } from "@/lib/mock/features"

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-primary via-primary to-primary/80 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_100%_at_100%_0%,color-mix(in_oklch,white_8%,transparent),transparent)]"
      />
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.id}>
              <StatCard stat={stat} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  )
}

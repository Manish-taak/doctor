import { CountUp } from "@/components/motion/count-up"
import type { Stat } from "@/types"

export function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon

  return (
    <div className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground/90 ring-1 ring-primary-foreground/15">
        <Icon className="size-4.5" strokeWidth={2} />
      </div>
      <div>
        <p className="font-heading text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
          <CountUp value={stat.value} />
        </p>
        <p className="mt-1 text-sm text-primary-foreground/70">{stat.label}</p>
      </div>
    </div>
  )
}

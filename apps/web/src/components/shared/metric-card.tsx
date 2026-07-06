import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: string
  icon: LucideIcon
  trend?: { value: string; positive: boolean }
}

export function MetricCard({ label, value, icon: Icon, trend }: MetricCardProps) {
  return (
    <Card className="ring-foreground/5">
      <CardContent className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-heading text-2xl font-semibold tracking-tight text-foreground">{value}</p>
          {trend && (
            <span
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trend.positive ? "text-primary" : "text-destructive"
              )}
            >
              {trend.positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
              {trend.value}
            </span>
          )}
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" strokeWidth={2} />
        </div>
      </CardContent>
    </Card>
  )
}

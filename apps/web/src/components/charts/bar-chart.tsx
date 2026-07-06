import { cn } from "@/lib/utils"
import type { ChartPoint } from "@/types"

interface BarChartProps {
  data: ChartPoint[]
  className?: string
  barClassName?: string
  formatValue?: (value: number) => string
}

export function BarChart({ data, className, barClassName, formatValue }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={cn("flex h-48 items-end gap-2 sm:gap-3", className)}>
      {data.map((point) => {
        const heightPct = Math.max((point.value / max) * 100, 4)
        return (
          <div key={point.label} className="group flex flex-1 flex-col items-center gap-2">
            <div className="relative flex h-40 w-full items-end justify-center">
              <div
                title={formatValue ? formatValue(point.value) : String(point.value)}
                style={{ height: `${heightPct}%` }}
                className={cn(
                  "w-full max-w-9 rounded-t-md bg-primary/80 transition-all duration-300 group-hover:bg-primary",
                  barClassName
                )}
              />
            </div>
            <span className="text-xs text-muted-foreground">{point.label}</span>
          </div>
        )
      })}
    </div>
  )
}

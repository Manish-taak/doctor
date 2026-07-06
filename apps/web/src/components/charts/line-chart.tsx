import { cn } from "@/lib/utils"
import type { ChartPoint } from "@/types"

interface LineChartProps {
  data: ChartPoint[]
  className?: string
  strokeClassName?: string
}

export function LineChart({ data, className, strokeClassName }: LineChartProps) {
  const width = 320
  const height = 140
  const padding = 12
  const max = Math.max(...data.map((d) => d.value), 1)
  const min = Math.min(...data.map((d) => d.value), 0)
  const range = max - min || 1

  const points = data.map((point, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (width - padding * 2)
    const y = height - padding - ((point.value - min) / range) * (height - padding * 2)
    return { x, y }
  })

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ")
  const areaPath = `${linePath} L${points[points.length - 1]?.x ?? 0},${height - padding} L${points[0]?.x ?? 0},${height - padding} Z`

  return (
    <div className={cn("w-full", className)}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
        <path d={areaPath} fill="color-mix(in oklch, var(--color-primary) 12%, transparent)" stroke="none" />
        <path
          d={linePath}
          fill="none"
          className={cn("stroke-primary", strokeClassName)}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} className="fill-primary" />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        {data.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  )
}

import { endOfWeek, format, isWithinInterval, parseISO, startOfWeek } from "date-fns"

import type { ChartPoint } from "@/types"

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

/** Counts items falling within the current calendar week (Mon–Sun), by weekday. */
export function weeklyCounts<T>(items: T[], getDate: (item: T) => string): ChartPoint[] {
  const now = new Date()
  const interval = { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) }
  const counts = new Array(7).fill(0)

  for (const item of items) {
    const date = parseISO(getDate(item))
    if (isWithinInterval(date, interval)) {
      counts[(date.getDay() + 6) % 7] += 1
    }
  }

  return WEEKDAY_LABELS.map((label, i) => ({ label, value: counts[i] }))
}

export function groupByMonth<T>(
  items: T[],
  getDate: (item: T) => string,
  getValue: (item: T) => number
): ChartPoint[] {
  const totals = new Map<string, number>()
  for (const item of items) {
    const key = format(parseISO(getDate(item)), "yyyy-MM")
    totals.set(key, (totals.get(key) ?? 0) + getValue(item))
  }
  return Array.from(totals.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => ({ label: format(parseISO(`${key}-01`), "MMM"), value }))
}

export function trendFor(series: ChartPoint[]): { value: string; positive: boolean } | undefined {
  if (series.length < 2) return undefined
  const previous = series[series.length - 2].value
  const latest = series[series.length - 1].value
  if (previous === 0) return undefined
  const change = Math.round(((latest - previous) / previous) * 1000) / 10
  return { value: `${change >= 0 ? "+" : ""}${change}% vs last month`, positive: change >= 0 }
}

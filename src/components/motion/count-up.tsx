"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"

interface ParsedValue {
  prefix: string
  suffix: string
  hasComma: boolean
  decimals: number
  target: number
}

function parseValue(value: string): ParsedValue | null {
  const match = value.match(/^([^\d]*)([\d,]+\.?\d*)(.*)$/)
  if (!match) return null

  const [, prefix, numberPart, suffix] = match
  const hasComma = numberPart.includes(",")
  const decimals = numberPart.includes(".") ? numberPart.split(".")[1].length : 0
  const target = parseFloat(numberPart.replace(/,/g, ""))

  if (Number.isNaN(target)) return null

  return { prefix, suffix, hasComma, decimals, target }
}

function formatNumber(n: number, parsed: ParsedValue) {
  const rounded = parsed.decimals > 0 ? n.toFixed(parsed.decimals) : Math.round(n).toString()
  const [intPart, decPart] = rounded.split(".")
  const withCommas = parsed.hasComma ? Number(intPart).toLocaleString("en-US") : intPart
  return `${parsed.prefix}${withCommas}${decPart ? `.${decPart}` : ""}${parsed.suffix}`
}

export function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const shouldReduceMotion = useReducedMotion()
  const parsed = parseValue(value)
  const [display, setDisplay] = useState(() => (parsed ? formatNumber(0, parsed) : value))

  useEffect(() => {
    if (!parsed || !inView || shouldReduceMotion) return

    const controls = animate(0, parsed.target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(formatNumber(latest, parsed)),
    })

    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, shouldReduceMotion])

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  const shown = inView && shouldReduceMotion ? formatNumber(parsed.target, parsed) : display

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  )
}

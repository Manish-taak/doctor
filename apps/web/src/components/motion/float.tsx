"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface FloatProps {
  children: ReactNode
  className?: string
  duration?: number
  distance?: number
  delay?: number
}

export function Float({ children, className, duration = 4, distance = 10, delay = 0 }: FloatProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn(className)}
      animate={{ y: [0, -distance, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

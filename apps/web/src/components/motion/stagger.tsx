"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

interface StaggerGroupProps {
  children: ReactNode
  className?: string
  delayChildren?: number
  staggerDelay?: number
  once?: boolean
}

export function StaggerGroup({
  children,
  className,
  delayChildren = 0,
  staggerDelay = 0.1,
  once = true,
}: StaggerGroupProps) {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay, delayChildren },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={container}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, y = 20 }: { children: ReactNode; className?: string; y?: number }) {
  const shouldReduceMotion = useReducedMotion()

  const item: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  )
}

import type { Accent } from "@/types"

export type { Accent }

export const accentGradient: Record<Accent, string> = {
  primary: "from-primary to-primary/60",
  coral: "from-coral to-coral/60",
  amber: "from-amber-500 to-amber-400",
  violet: "from-violet-500 to-violet-400",
}

export const accentSoft: Record<Accent, string> = {
  primary: "bg-primary/10 text-primary",
  coral: "bg-coral/10 text-coral",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"

export function PageHeader({
  title,
  description,
  count,
  actions,
}: {
  title: string
  description?: string
  count?: number
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {typeof count === "number" && (
            <Badge variant="secondary" className="text-xs">
              {count}
            </Badge>
          )}
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}

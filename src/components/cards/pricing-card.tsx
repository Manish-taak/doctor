import Link from "next/link"
import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { PricingPlan } from "@/types"

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <Card
      className={cn(
        "relative h-full ring-foreground/5 transition-all duration-300 hover:-translate-y-1",
        plan.featured && "ring-2 ring-primary shadow-xl shadow-primary/10 sm:scale-[1.03]"
      )}
    >
      {plan.featured && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most popular</Badge>
      )}

      <CardContent className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-lg font-semibold text-foreground">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-heading text-4xl font-semibold tracking-tight text-foreground">
            ${plan.price}
          </span>
          <span className="text-sm text-muted-foreground">/ {plan.cadence}</span>
        </div>

        <Button
          size="lg"
          variant={plan.featured ? "default" : "outline"}
          className="w-full"
          render={<Link href="/signup" />}
        >
          {plan.cta}
        </Button>

        <ul className="flex flex-1 flex-col gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

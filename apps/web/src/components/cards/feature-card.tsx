import { Card, CardContent } from "@/components/ui/card"
import type { Feature } from "@/types"

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon

  return (
    <Card className="group h-full ring-foreground/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex size-11 items-center justify-center rounded-sm bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" strokeWidth={2} />
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="font-heading text-base font-semibold text-foreground">{feature.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

import { Quote, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { accentGradient } from "@/lib/accent"
import { cn } from "@/lib/utils"
import type { Testimonial } from "@/types"

export function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full ring-foreground/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
      <CardContent className="flex h-full flex-col gap-5">
        <Quote className="size-7 text-primary/30" strokeWidth={2.5} />

        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < Math.round(testimonial.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-muted text-muted"
              )}
            />
          ))}
        </div>

        <p className="flex-1 text-sm leading-relaxed text-foreground/90">“{testimonial.quote}”</p>

        <div className="flex items-center gap-3 pt-1">
          <Avatar>
            <AvatarFallback
              className={cn(
                "bg-linear-to-br font-semibold text-white",
                accentGradient[testimonial.accent]
              )}
            >
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

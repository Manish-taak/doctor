import { Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/dashboard/page-header"
import { MetricCard } from "@/components/shared/metric-card"
import { accentGradient } from "@/lib/accent"
import { reviews } from "@/lib/mock/reviews"
import { cn } from "@/lib/utils"

export default function DoctorReviewsPage() {
  const totalReviews = reviews.length
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0

  const breakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length
    const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0
    return { stars, count, pct }
  })

  return (
    <>
      <PageHeader title="Reviews" description="See what your patients are saying about your care." />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Average rating" value={averageRating.toFixed(1)} icon={Star} />
        <MetricCard label="Total reviews" value={String(totalReviews)} icon={Star} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="ring-foreground/5 lg:col-span-1">
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-heading text-base font-semibold text-foreground">Rating breakdown</h2>
            <div className="flex flex-col gap-3">
              {breakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="flex w-10 shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    {row.stars} <Star className="size-3 fill-amber-400 text-amber-400" />
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-sm bg-muted">
                    <div className="h-full rounded-sm bg-amber-400" style={{ width: `${row.pct}%` }} />
                  </div>
                  <span className="w-6 shrink-0 text-right text-xs text-muted-foreground">{row.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 lg:col-span-2">
          {reviews.map((review) => (
            <Card key={review.id} className="ring-foreground/5">
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className={cn("bg-linear-to-br font-semibold text-white", accentGradient[review.accent])}>
                        {review.patientInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-medium text-foreground">{review.patientName}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-3.5",
                          i < review.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}

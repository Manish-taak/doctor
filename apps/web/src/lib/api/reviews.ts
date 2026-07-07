import { format } from "date-fns"

import { accentForId } from "@/lib/accent"
import { getInitials } from "@/lib/utils"
import type { Review } from "@/types"

import { apiFetch } from "./client"

interface ApiReview {
  id: string
  rating: number
  comment: string
  date: string
  patient: { user: { name: string } }
}

function mapReview(api: ApiReview): Review {
  return {
    id: api.id,
    patientName: api.patient.user.name,
    patientInitials: getInitials(api.patient.user.name),
    accent: accentForId(api.id),
    rating: api.rating,
    comment: api.comment,
    date: format(new Date(api.date), "yyyy-MM-dd"),
  }
}

export async function getReviews(doctorId: string): Promise<Review[]> {
  const reviews = await apiFetch<ApiReview[]>(`/reviews?doctorId=${doctorId}`)
  return reviews.map(mapReview)
}

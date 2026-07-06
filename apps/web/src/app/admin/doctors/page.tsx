"use client"

import Link from "next/link"
import { Ban, CheckCircle2, Eye, MoreHorizontal, Star } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/dashboard/page-header"
import { accentGradient } from "@/lib/accent"
import { doctors } from "@/lib/mock/doctors"
import { cn } from "@/lib/utils"

export default function AdminDoctorsPage() {
  return (
    <>
      <PageHeader
        title="Doctors"
        description="Review, approve, and manage every provider on the platform."
        count={doctors.length}
      />

      <Card className="ring-foreground/5">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => {
                const verified = doctor.availableToday
                return (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback
                            className={cn("bg-linear-to-br font-semibold text-white", accentGradient[doctor.accent])}
                          >
                            {doctor.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-foreground">{doctor.name}</span>
                          <span className="text-xs text-muted-foreground">{doctor.specialty}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-foreground">{doctor.rating}</span>
                        <span className="text-xs">({doctor.reviewCount})</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{doctor.experienceYears} yrs</TableCell>
                    <TableCell className="text-muted-foreground">{doctor.location}</TableCell>
                    <TableCell>
                      <Badge className={verified ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"}>
                        {verified ? "Verified" : "Pending review"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${doctor.name}`} />}
                        >
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.success(`${doctor.name} approved`)}>
                            <CheckCircle2 /> Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`${doctor.name} suspended`)}>
                            <Ban /> Suspend
                          </DropdownMenuItem>
                          <DropdownMenuItem render={<Link href={`/doctors/${doctor.id}`} />}>
                            <Eye /> View profile
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

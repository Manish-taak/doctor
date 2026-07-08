"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/dashboard/page-header"
import { categoryIcons, createCategory, resolveIcon, type ApiCategory } from "@/lib/api/categories-client"

const iconOptions = Object.keys(categoryIcons)

export function AdminCategoriesGrid({ categories: initial }: { categories: ApiCategory[] }) {
  const { data: session } = useSession()
  const [categories, setCategories] = useState(initial)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [icon, setIcon] = useState(iconOptions[0])
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = async () => {
    if (!session?.accessToken) return
    if (name.trim().length < 2) {
      toast.error("Enter a category name (min 2 characters)")
      return
    }

    setSubmitting(true)
    try {
      const category = await createCategory(session.accessToken, { name: name.trim(), icon })
      setCategories((prev) => [...prev, category])
      toast.success("Category added")
      setOpen(false)
      setName("")
      setIcon(iconOptions[0])
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create category")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Categories"
        description="Organize the specialties and services offered across the platform."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button className="gap-1.5" />}>
              <Plus className="size-4" /> Add category
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add category</DialogTitle>
                <DialogDescription>Create a new specialty category for the platform.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="category-name">Name</Label>
                  <Input
                    id="category-name"
                    placeholder="e.g. Oncology"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="category-icon">Icon</Label>
                  <Select value={icon} onValueChange={(value) => setIcon(value ?? iconOptions[0])}>
                    <SelectTrigger id="category-icon" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                <Button onClick={handleCreate} disabled={submitting}>
                  Create category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => {
          const Icon = resolveIcon(category.icon)
          return (
            <Card key={category.id} className="ring-foreground/5">
              <CardContent className="flex flex-col items-start gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-5.5" strokeWidth={2} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h2 className="font-heading text-base font-semibold text-foreground">{category.name}</h2>
                  <p className="text-sm text-muted-foreground">{category.doctorCount} doctors</p>
                  <p className="text-sm text-muted-foreground">
                    {category.appointmentCount.toLocaleString("en-US")} appointments
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}

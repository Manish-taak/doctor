"use client"

import { useState } from "react"
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageHeader } from "@/components/dashboard/page-header"
import {
  categoryIcons,
  createCategory,
  deleteCategory,
  resolveIcon,
  updateCategory,
  type ApiCategory,
} from "@/lib/api/categories-client"

const iconOptions = Object.keys(categoryIcons)

export function AdminCategoriesGrid({ categories: initial }: { categories: ApiCategory[] }) {
  const { data: session } = useSession()
  const [categories, setCategories] = useState(initial)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [icon, setIcon] = useState(iconOptions[0])
  const [submitting, setSubmitting] = useState(false)

  const [editing, setEditing] = useState<ApiCategory | null>(null)
  const [editName, setEditName] = useState("")
  const [editIcon, setEditIcon] = useState(iconOptions[0])
  const [savingEdit, setSavingEdit] = useState(false)

  const [deleting, setDeleting] = useState<ApiCategory | null>(null)
  const [deletingSubmitting, setDeletingSubmitting] = useState(false)

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

  const openEdit = (category: ApiCategory) => {
    setEditing(category)
    setEditName(category.name)
    setEditIcon(category.icon)
  }

  const handleEdit = async () => {
    if (!session?.accessToken || !editing) return
    if (editName.trim().length < 2) {
      toast.error("Enter a category name (min 2 characters)")
      return
    }

    setSavingEdit(true)
    try {
      const updated = await updateCategory(session.accessToken, editing.id, {
        name: editName.trim(),
        icon: editIcon,
      })
      setCategories((prev) => prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)))
      toast.success("Category updated")
      setEditing(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update category")
    } finally {
      setSavingEdit(false)
    }
  }

  const handleDelete = async () => {
    if (!session?.accessToken || !deleting) return

    setDeletingSubmitting(true)
    try {
      await deleteCategory(session.accessToken, deleting.id)
      setCategories((prev) => prev.filter((c) => c.id !== deleting.id))
      toast.success("Category deleted")
      setDeleting(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete category")
    } finally {
      setDeletingSubmitting(false)
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
                <div className="flex w-full items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5.5" strokeWidth={2} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${category.name}`} />}
                    >
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(category)}>
                        <Pencil /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" onClick={() => setDeleting(category)}>
                        <Trash2 /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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

      <Dialog open={editing !== null} onOpenChange={(next) => !next && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <DialogDescription>Update the name or icon for this category.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-category-name">Name</Label>
              <Input
                id="edit-category-name"
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="edit-category-icon">Icon</Label>
              <Select value={editIcon} onValueChange={(value) => setEditIcon(value ?? iconOptions[0])}>
                <SelectTrigger id="edit-category-icon" className="w-full">
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
            <Button onClick={handleEdit} disabled={savingEdit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleting !== null} onOpenChange={(next) => !next && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{deleting?.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
            <Button variant="destructive" onClick={handleDelete} disabled={deletingSubmitting}>
              Delete category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

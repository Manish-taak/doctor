"use client"

import { useMemo, useState } from "react"
import { Ban, MoreHorizontal, Pencil, Search, ShieldCheck, ShieldOff, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/dashboard/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { accentGradient } from "@/lib/accent"
import { updateUserRole } from "@/lib/api/users"
import { cn } from "@/lib/utils"
import type { PlatformUser, UserRole, UserStatus } from "@/types"

const roleFilters: { value: UserRole | "all"; label: string }[] = [
  { value: "all", label: "All roles" },
  { value: "patient", label: "Patient" },
  { value: "doctor", label: "Doctor" },
  { value: "admin", label: "Admin" },
]

const roleStyles: Record<UserRole, string> = {
  patient: "bg-primary/10 text-primary",
  doctor: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  admin: "bg-coral/10 text-coral",
}

const statusStyles: Record<UserStatus, string> = {
  active: "bg-primary/10 text-primary",
  suspended: "bg-destructive/10 text-destructive",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

export function AdminUsersTable({ users: initial }: { users: PlatformUser[] }) {
  const { data: session } = useSession()
  const [users, setUsers] = useState(initial)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all")

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()
    return users.filter((user) => {
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesQuery =
        query.length === 0 ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      return matchesRole && matchesQuery
    })
  }, [users, search, roleFilter])

  const handleRoleChange = async (user: PlatformUser, role: UserRole) => {
    if (!session?.accessToken) return
    if (session.user?.email === user.email) {
      toast.error("You cannot change your own role")
      return
    }

    const previous = users
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, role } : u)))

    try {
      await updateUserRole(session.accessToken, user.id, role)
      toast.success(`${user.name} is now ${role}`)
    } catch (error) {
      setUsers(previous)
      toast.error(error instanceof Error ? error.message : "Failed to update role")
    }
  }

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage every patient, doctor, and admin account on Vitalis."
        count={filteredUsers.length}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email..."
            className="pl-8"
          />
        </div>
        <Select value={roleFilter} onValueChange={(value) => setRoleFilter((value as UserRole | "all") ?? "all")}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roleFilters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="ring-foreground/5">
        <CardContent>
          {filteredUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback
                            className={cn("bg-linear-to-br font-semibold text-white", accentGradient[user.accent])}
                          >
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-foreground">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("capitalize", roleStyles[user.role])}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("capitalize", statusStyles[user.status])}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.joinedDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${user.name}`} />}
                        >
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.role === "admin" ? (
                            <DropdownMenuItem onClick={() => handleRoleChange(user, "patient")}>
                              <ShieldOff /> Revoke admin
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleRoleChange(user, "admin")}>
                              <ShieldCheck /> Promote to admin
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => toast(`Editing isn't available in this preview`)}>
                            <Pencil /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.success(`${user.name} suspended`)}>
                            <Ban /> Suspend
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => toast.error(`${user.name} deleted`)}
                          >
                            <Trash2 /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              icon={Search}
              title="No users found"
              description="Try adjusting your search or role filter."
            />
          )}
        </CardContent>
      </Card>
    </>
  )
}

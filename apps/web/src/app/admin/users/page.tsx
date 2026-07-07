import { getUsers } from "@/lib/api/users"

import { AdminUsersTable } from "./users-table"

export default async function AdminUsersPage() {
  const users = await getUsers()

  return <AdminUsersTable users={users} />
}

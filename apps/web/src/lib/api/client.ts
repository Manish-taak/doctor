import { auth } from "@/lib/auth"

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
  }
}

export async function serverAuthHeaders(): Promise<Record<string, string>> {
  const session = await auth()
  return session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : {}
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new ApiError(response.status, body?.message ?? `Request to ${path} failed`)
  }

  if (response.status === 204) return undefined as T

  return response.json() as Promise<T>
}

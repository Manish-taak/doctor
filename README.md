# Vitalis — Doctor Appointment SaaS

A full-stack doctor-appointment SaaS: a Next.js 16 frontend (public site + patient/doctor/admin dashboards) backed by a real NestJS + Prisma + PostgreSQL API with JWT auth, Zod validation, and Swagger docs. Organized as an npm workspaces monorepo.

> **Where things stand:** Auth, users, doctors, appointments, medical records, prescriptions, messaging, notifications, payments, reviews, and categories are all real — modeled in Postgres and served through a working REST API (see [What's real vs. still mock](#whats-real-vs-still-mock)). The dashboard *pages* still render from mock data in `apps/web/src/lib/mock/*`; wiring each page to the live API is the next phase.

## Tech stack

**Frontend** (`apps/web`)
- Next.js 16 (App Router, Turbopack, React Compiler)
- TypeScript (strict), Tailwind CSS v4
- shadcn/ui on [Base UI](https://base-ui.com) (not Radix), lucide-react, Framer Motion
- NextAuth (Auth.js v5) for sessions, React Hook Form + Zod for forms
- next-themes, sonner

**Backend** (`apps/api`)
- NestJS 11, Prisma 6, PostgreSQL
- JWT auth (`@nestjs/jwt` + Passport), role-based guards
- Zod validation end-to-end via `nestjs-zod` (same schemas power Swagger docs)
- Swagger/OpenAPI at `/docs`

**Shared** (`packages/*`)
- `@doctor/database` — Prisma schema + generated client
- `@doctor/validators` — Zod schemas shared by the API (validation) and the frontend (form resolvers)

## Prerequisites

- Node.js 20+
- A local PostgreSQL server running (no Docker required — any Postgres install works: native, Homebrew, etc.)

## Getting started (fresh clone)

1. **Create a database.** Using `psql` or any GUI (pgAdmin, TablePlus, etc.):
   ```sql
   CREATE DATABASE doctor;
   ```

2. **Set up environment files.** Copy the values from `.env.example` into three new files, adjusting the connection string to match your local Postgres user/password/port:
   - `packages/database/.env` — needs `DATABASE_URL`
   - `apps/api/.env` — needs `DATABASE_URL`, `PORT`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`
   - `apps/web/.env.local` — needs `AUTH_SECRET`, `NEXTAUTH_URL`, `API_URL`, `NEXT_PUBLIC_API_URL`

3. **Install dependencies** from the repo root:
   ```bash
   npm install
   ```
   This also auto-generates the Prisma client and builds `packages/validators`/`packages/database` via a `postinstall` hook — no separate build step needed.

4. **Run migrations** (creates all tables):
   ```bash
   npm run db:migrate
   ```

5. **Seed demo data** (optional but recommended — creates an admin, a doctor, and a patient account):
   ```bash
   npm run db:seed
   ```
   All seeded accounts use password `password123`:
   - `admin@vitalis.health` (admin)
   - `amara.chen@vitalis.health` (doctor)
   - `james.hale@example.com` (patient)

6. **Start both apps:**
   ```bash
   npm run dev
   ```
   Or individually: `npm run dev:web` / `npm run dev:api`.

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API + Swagger docs: [http://localhost:4000/docs](http://localhost:4000/docs)

Other root scripts: `npm run build`, `npm run lint`, `npm run db:studio` (Prisma Studio — a GUI for browsing data).

## Project structure

```
apps/
  web/                          Next.js frontend
    src/app/
      (marketing)/               public site — shared Navbar + Footer
      patient/, doctor/, admin/   dashboards — own sidebar/topbar shell each
      login/, signup/, forgot-password/   auth screens
      proxy.ts                    route protection (Next.js 16's renamed "middleware")
    src/lib/auth.ts               NextAuth config (Credentials provider → calls the NestJS API)
    src/lib/mock/                 mock data still used by most dashboard pages (see below)
  api/                           NestJS backend
    src/
      auth/                       register, login, /me, JWT strategy + guards
      users/, doctors/, appointments/
      medical-records/, prescriptions/, conversations/, notifications/, transactions/, reviews/, categories/
      prisma/                     Prisma client DI token
      common/                     role guard, current-user decorator, JWT guard
packages/
  database/
    prisma/schema.prisma          12 models — see below
    prisma/seed.ts
  validators/
    src/                          Zod schemas per resource (auth, doctor, appointment, review, etc.)
```

## Database schema

`packages/database/prisma/schema.prisma` — `User` (with `Role`: PATIENT/DOCTOR/ADMIN), `DoctorProfile`, `PatientProfile`, `Appointment`, `MedicalRecord`, `Prescription`, `Conversation`, `Message`, `Notification`, `Transaction`, `Review`, `Category`, all with real foreign-key relations.

## API reference

Full interactive docs (with request/response schemas and a "Try it out" button) live at `/docs` once `apps/api` is running. Endpoint summary:

| Resource | Endpoints |
|---|---|
| Auth | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` |
| Users | `GET /users` (admin only) |
| Doctors | `GET /doctors`, `GET /doctors/:id`, `POST /doctors` (admin only) |
| Appointments | `GET/POST /appointments`, `PATCH /appointments/:id` (role-scoped) |
| Medical Records | `GET/POST /medical-records` (role-scoped) |
| Prescriptions | `GET/POST /prescriptions`, `PATCH /prescriptions/:id` |
| Conversations/Messages | `GET/POST /conversations`, `GET/POST /conversations/:id/messages` |
| Notifications | `GET /notifications`, `PATCH /notifications/:id/read`, `PATCH /notifications/read-all` |
| Transactions | `GET /transactions`, `POST/PATCH` (admin only) |
| Reviews | `GET /reviews?doctorId=...` (public), `POST /reviews` (patient only) |
| Categories | `GET /categories` (public, with live-computed doctor/appointment counts), `POST` (admin only) |

Auth: send `Authorization: Bearer <token>` (the JWT returned from `/auth/login` or `/auth/register`). Role-gated endpoints return 403 for the wrong role.

## What's real vs. still mock

**Real (backed by Postgres, tested end-to-end):**
- Registration, login, JWT sessions, role-based route protection (`/patient`, `/doctor`, `/admin` actually check who's logged in now)
- Every API resource listed above — real relations (an appointment really links a patient row to a doctor row)

**Still mock (frontend dashboard pages haven't been rewired yet):**
- Patient/Doctor/Admin dashboard *pages* still import from `apps/web/src/lib/mock/*` rather than calling the live API
- Actions like Save, Approve, Suspend, Request refill still just show a toast — the underlying API endpoint exists (see table above) but isn't called yet from the UI

## What each role can do

**Patient** — book/view appointments, browse doctors, view medical records & prescriptions, view billing history, message doctors, notifications, profile/settings.

**Doctor** — dashboard overview (schedule, patients, earnings, rating), manage appointments & calendar, patient roster, reviews, earnings, message patients, profile/settings.

**Admin** — platform-wide dashboard, manage all users, approve/suspend doctors, view every appointment, manage categories, analytics/reports, all transactions, platform settings.

## Roadmap

1. Rewire each dashboard page to call the real API instead of `lib/mock/*` (React Query or server components + `fetch`)
2. Real payments (Stripe/Razorpay) instead of the `Transaction` model being admin-entered
3. Real-time messaging/notifications (WebSockets instead of polling)
4. Video consultations (Twilio/WebRTC) if telehealth needs to be real
5. File storage (S3 or similar) for medical record uploads

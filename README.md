# Magaji Law Client Room

A premium, lawyer-controlled intake, consent, legal-document, and matter-access module for Magaji Law.

This version includes **Stage 4: Integration and Operational Backend Plan**. It remains a static/scaffolded Next.js project, but now includes the architecture for a real production backend.

## Core doctrine

**New visitors submit facts. Existing clients access a matter.**

The Client Room is a controlled transition system:

- stranger to potential client;
- story to legal facts;
- emotion to chronology;
- document pile to evidence file;
- inquiry to engagement;
- engagement to matter room.

## Completed layers

### Stage 1 — Client Room prototype
Initial Next.js App Router project with Client Room routes, mock intake, existing-client room, and admin review pages.

### Stage 2 — UI refinement
Premium institutional interface: navy, charcoal, warm ivory, brass accents, refined cards, controlled entry doors, and improved legal-risk language.

### Stage 3 — Legal Document Pack
Added `/client-room/legal` with 12 legal document templates and supporting structured content in `/lib/legal-documents.ts`.

### Stage 4 — Operational Backend Plan
Added `/client-room/operations` with the backend architecture and technical scaffold for database, authentication, matter codes, upload storage, payments, notifications, admin workflow, security, audit logs, and implementation phases.

## Routes

- `/` — redirects to `/client-room`
- `/client-room` — main Client Room landing page
- `/client-room/new` — multi-step new client intake
- `/client-room/existing` — existing client matter-code login demo
- `/client-room/existing/dashboard` — mock existing-client matter dashboard
- `/client-room/admin` — mock lawyer/admin review desk
- `/client-room/admin/intake/[id]` — intake summary and review screen
- `/client-room/legal` — legal document pack index
- `/client-room/legal/[slug]` — individual legal document templates
- `/client-room/operations` — operational backend plan and implementation scaffold

## Legal Document Pack

The legal layer includes templates for:

1. Preliminary Intake Notice
2. No Lawyer-Client Relationship Notice
3. Consent to Review Facts and Documents
4. Conflict Check Disclosure Form
5. Audio/Video Narration Consent
6. AI-Assisted Organisation Notice
7. Privacy and Data Protection Notice
8. Consultation / Intake Review Fee Terms
9. Engagement Letter Template
10. Filing Expense / Disbursement Instruction
11. Existing Client Room Terms
12. Non-Engagement / Decline Notice

These are templates and should be reviewed before live use.

## Backend scaffold files

Stage 4 adds:

- `/docs/OPERATIONAL_BACKEND_PLAN.md` — internal implementation blueprint
- `/lib/backend-plan.ts` — structured roles, statuses, phases, workflow, security checklist, and data model plan
- `/lib/matter-code.ts` — matter-code generation helper
- `/lib/status-labels.ts` — readable labels and descriptions for matter statuses
- `/lib/notifications.ts` — notification template scaffold
- `/components/OperationsSection.tsx`
- `/components/BackendPhaseCard.tsx`
- `/components/DataModelCard.tsx`
- `/components/WorkflowStepCard.tsx`
- `/components/SecurityChecklist.tsx`
- `/components/NotificationTemplateCard.tsx`

## Recommended implementation order

1. Keep the static prototype stable.
2. Add PostgreSQL and Prisma.
3. Persist intake submissions and conflict parties.
4. Add admin review actions and status changes.
5. Add secure file upload to object storage.
6. Add client authentication and OTP.
7. Add matter-code access linked to registered contact details.
8. Add invoice and payment provider integration.
9. Add email notifications.
10. Add audit logs and role-based access controls.
11. Add AI-assisted chronology and question preparation under lawyer supervision.

## Professional risk wording included

The UI repeatedly states that:

- submitting facts does not automatically create a lawyer-client relationship;
- the firm must review and check conflicts before acceptance;
- AI may organise facts but does not replace lawyer judgment;
- preliminary payment should be consultation or intake review fee;
- filing expenses should only be requested after engagement and specific filing instruction.

## Important limitation

This is not yet production backend infrastructure. Before public use, connect and test:

- real authentication and OTP;
- secure object storage;
- encrypted/persistent database;
- payment provider;
- email provider;
- audit logs;
- role-based permissions;
- data retention and backup policy;
- final lawyer-approved notices and terms.

## Run locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000/client-room
```

## Termux note

Plain Termux may fail to run `next dev` because Next.js may try to fetch Android SWC binaries. The recommended workflow is:

```bash
git add .
git commit -m "Add operations backend plan"
git push
```

Then let Vercel build and redeploy the connected GitHub repository.

## Stage 5A — Real Database and Intake Persistence

Stage 5A adds the first real backend layer to the Client Room:

- Prisma ORM and PostgreSQL schema
- `DATABASE_URL` environment variable support
- real intake-submission API routes
- conflict-party persistence
- legal-document acceptance persistence
- audit-log creation
- admin dashboard database fetch with demo fallback
- intake detail database fetch and status update with demo fallback
- `.env.example`
- `docs/STAGE_5A_DATABASE_SETUP.md`

New backend routes:

- `POST /api/intake` — create a new preliminary intake record
- `GET /api/intake` — list recent intake submissions for admin review
- `GET /api/intake/[id]` — read one intake with conflict parties and legal-document acceptances
- `PATCH /api/intake/[id]` — update intake status for office review

Prisma scripts:

```bash
npm run prisma:generate
npm run prisma:push
npm run prisma:studio
```

Setup:

```bash
npm install
cp .env.example .env
# Add DATABASE_URL
npx prisma generate
npx prisma db push
npm run dev
```

Production warning: Stage 5A is not yet the full production backend. It does not include real authentication, protected file upload, payment processing, staff authorisation, email notifications, or matter-code access. Do not use it for sensitive live client data until those later stages are completed and tested.


## Stage 5B — Admin Authentication and Access Control

Stage 5B adds a proper form-based admin login and replaces the temporary Basic Auth experience. The admin dashboard and intake review APIs are protected by a signed HttpOnly session cookie. Public intake submission remains open through `POST /api/intake`, while admin reads and status updates require authentication.

Required production environment variables:

```bash
ADMIN_USER="change-me"
ADMIN_PASS="change-me"
ADMIN_SESSION_SECRET="generate-a-long-random-secret"
```

Admin routes:

- `/client-room/admin/login` — office login
- `/client-room/admin` — protected office review dashboard
- `/api/admin/login` — creates admin session
- `/api/admin/logout` — clears admin session

Public intake remains available at `/client-room/new`.

This is a single-admin bridge. Later stages should add full staff accounts, role-based access control, audit logs, and stronger operational security.


## Stage 5C — Matter Code Creation and Acceptance Workflow

Stage 5C adds the acceptance bridge between public intake and existing-client matter access.

What it adds:

- Admin decision actions for conflict check, clarification, consultation, engagement pending, acceptance, and decline.
- `POST /api/intake/[id]/accept` to convert an intake into a matter.
- `POST /api/intake/[id]/decline` to decline an intake.
- `POST /api/intake/[id]/decision` for intermediate admin decisions.
- Matter-code generation after acceptance.
- Protected matter list at `/client-room/admin/matters`.
- Protected matter detail at `/client-room/admin/matter/[matterCode]`.
- Public matter-code verification through `POST /api/matter/access`.
- Existing Client Room now verifies matter code plus registered phone/email before showing limited status.

Security model:

- Public users cannot list or read matters.
- Public users cannot read intake records.
- Public users can still submit intake through `POST /api/intake`.
- Matter-code access returns only a limited safe summary and never exposes narration, conflict parties, or internal notes.
- Full client authentication should still be added in Stage 5D.


## Stage 5D — Client OTP Authentication and Secure Matter Access

Stage 5D upgrades the Existing Client Room from simple matter-code lookup into OTP-backed client access. Existing clients now request an access code using their matter code and registered phone/email. Successful verification creates a signed HttpOnly client session, and the dashboard fetches limited matter status from the server.

Added in this stage:

- `/api/client/request-otp`
- `/api/client/verify-otp`
- `/api/client/logout`
- `/api/client/matter`
- `lib/client-auth.ts`
- `lib/otp.ts`
- `lib/otp-delivery.ts`
- `ClientOtpChallenge` Prisma model
- protected `/client-room/existing/dashboard`
- OTP-based Existing Client Room UI
- secure client logout

Required environment variables:

```env
CLIENT_SESSION_SECRET="generate-a-long-random-secret"
OTP_DELIVERY_MODE="disabled"
EMAIL_FROM=""
EMAIL_PROVIDER_API_KEY=""
```

The OTP delivery adapter is a scaffold. A real email/SMS provider must be connected before relying on live client OTP access. Direct matter-code lookup has been replaced so the client dashboard opens only after OTP verification.

After applying this stage, push the additive Prisma change:

```bash
npx prisma db push
```

Do not use `--accept-data-loss`.

## Stage 5D-Delivery — Email OTP Delivery

Existing Client Room can now send OTP access codes by email when `OTP_DELIVERY_MODE=resend` is configured with `RESEND_API_KEY` and `OTP_FROM_EMAIL`. The OTP is not returned to the browser in production, is stored hashed, expires after 10 minutes, and still requires matter-code plus registered contact verification.

Phone/SMS delivery is not active yet. Registered phone-only access should be handled by the office until a future SMS provider stage is connected. Public intake remains open, admin authentication remains protected, and client dashboard access still requires a verified client session.

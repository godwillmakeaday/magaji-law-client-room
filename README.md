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

# Magaji Law Client Room

A premium, lawyer-controlled intake and existing-client access module for Magaji Law.

This project is intentionally built as a front-end first system. It provides the UI, routes, workflow, notices, mock client dashboard, mock admin dashboard, and reusable components needed before connecting a real database, authentication, payments, and secure file storage.

## Core doctrine

New visitors submit facts. Existing clients access a matter.

The system separates:

- inquiry from engagement;
- intake review from legal advice;
- consultation fee from filing expenses;
- narration from evidence file;
- potential client from accepted client;
- AI organisation from lawyer judgment.

## Routes

- `/client-room` — main Client Room landing page
- `/client-room/new` — multi-step new client intake
- `/client-room/existing` — existing client matter-code login demo
- `/client-room/existing/dashboard` — mock existing-client matter dashboard
- `/client-room/admin` — mock lawyer/admin review desk
- `/client-room/admin/intake/[id]` — intake summary and review screen

## Run locally

```bash
npm install
npm run dev
```

Then open:

```bash
http://localhost:3000/client-room
```

## Important limitation

This is not production-ready legal infrastructure yet. Before live use, connect:

- real authentication and OTP;
- secure file storage;
- encrypted database;
- payment provider;
- audit logs;
- privacy notices;
- conflict-check workflow;
- final lawyer-approved intake terms;
- engagement-letter generation;
- office user permissions.

## Recommended production integrations

- Next.js App Router
- PostgreSQL database through Prisma
- Auth.js or another secure auth provider
- Object storage for uploads
- Payment provider for consultation/intake review fee
- Email/SMS notification service
- Admin audit trail
- Role-based access control

## Professional risk wording already included

The UI repeatedly states that:

- submitting facts does not automatically create a lawyer-client relationship;
- the firm must review and check conflicts before acceptance;
- AI may organise facts but does not replace lawyer judgment;
- filing fees/expenses should only be requested after engagement and specific filing instruction.

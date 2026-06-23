# Stage 5A — Real Database and Intake Persistence

Stage 5A turns the Magaji Law Client Room from a static premium prototype into a database-ready intake system.

It adds:

- Prisma ORM
- PostgreSQL schema
- runtime API routes for intake submission
- legal-document acceptance records
- conflict-party records
- audit-log records
- admin dashboard fetch from `/api/intake`
- intake detail fetch from `/api/intake/[id]`
- demo-mode fallback when the database is not configured

## What this stage does not add yet

This stage does **not** add:

- real file uploads
- real authentication
- real OTP or account login
- real payment processing
- production-grade admin authorisation
- email notifications
- matter-code issuance

Do not use this deployment for sensitive live client data until authentication, secure storage, access control, privacy controls, and staff workflows are fully completed and tested.

## Database setup

Create a PostgreSQL database using a provider such as Neon, Supabase, Vercel marketplace database, or another managed PostgreSQL host.

Copy the pooled connection string where available and place it in the environment variable:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
```

## Local setup

```bash
npm install
cp .env.example .env
# edit .env and add DATABASE_URL
npx prisma generate
npx prisma db push
npm run dev
```

Test locally:

```bash
http://localhost:3000/client-room/new
http://localhost:3000/client-room/admin
http://localhost:3000/api/intake
```

## Vercel setup

1. Open the Vercel project.
2. Go to Settings → Environment Variables.
3. Add `DATABASE_URL` for Production, Preview, and Development where needed.
4. Redeploy the project.
5. Run `npx prisma db push` from a trusted local machine or deployment workflow connected to the same database.

## Testing workflow

1. Open `/client-room/new`.
2. Fill the intake form.
3. Accept the required legal notices.
4. Submit.
5. Confirm that an intake reference is returned.
6. Open `/client-room/admin`.
7. Confirm that the submission appears.
8. Open the intake detail page.
9. Change status from the decision panel.
10. Check the database using Prisma Studio if needed:

```bash
npm run prisma:studio
```

## Legal-operational boundaries

- Submission is preliminary only.
- A lawyer-client relationship is not created by submitting the form.
- Conflict check must occur before acceptance.
- AI-assisted organisation does not replace lawyer judgment.
- Filing expenses are not requested at the intake stage.
- Matter-code issuance is reserved for a later implementation stage.

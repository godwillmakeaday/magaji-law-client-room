# Magaji Law Client Room

A premium, lawyer-controlled intake and existing-client access module for Magaji Law.

This is the **Prompt 3 Legal Document Pack version**. It adds a legal control layer to the refined Client Room UI: notices, consents, terms, engagement templates, filing-expense instructions, and non-engagement wording.

## Core doctrine

**New visitors submit facts. Existing clients access a matter.**

The Client Room is a controlled transition system:

- stranger to potential client;
- story to legal facts;
- emotion to chronology;
- document pile to evidence file;
- inquiry to engagement;
- engagement to matter room.

## Legal Document Pack added

New route:

- `/client-room/legal` — Legal Document Pack index

Document detail routes:

- `/client-room/legal/preliminary-intake-notice`
- `/client-room/legal/no-lawyer-client-relationship`
- `/client-room/legal/consent-to-review`
- `/client-room/legal/conflict-check-disclosure`
- `/client-room/legal/audio-video-consent`
- `/client-room/legal/ai-assisted-organisation`
- `/client-room/legal/privacy-data-protection`
- `/client-room/legal/intake-review-fee-terms`
- `/client-room/legal/engagement-letter`
- `/client-room/legal/filing-expense-instruction`
- `/client-room/legal/existing-client-room-terms`
- `/client-room/legal/non-engagement-notice`

## The 12 documents

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

## Stage logic

- Intake notice before submission.
- Consent before review.
- Conflict check before acceptance.
- Engagement letter after acceptance.
- Filing expense instruction after engagement.
- Existing client terms after matter-code access.

## Professional safeguards included

The UI and legal pack repeatedly state that:

- submitting facts does not automatically create a lawyer-client relationship;
- the firm must review and check conflicts before acceptance;
- AI may organise facts but does not replace lawyer judgment;
- filing fees/expenses should only be requested after engagement and specific filing instruction;
- the existing client room is for accepted matters only;
- non-engagement must be communicated clearly where the firm declines or has not accepted a matter.

## Routes

- `/client-room` — main Client Room landing page
- `/client-room/new` — multi-step new client intake
- `/client-room/existing` — existing client matter-code login demo
- `/client-room/existing/dashboard` — mock existing-client matter dashboard
- `/client-room/admin` — mock lawyer/admin review desk
- `/client-room/admin/intake/[id]` — intake summary and review screen
- `/client-room/legal` — legal document pack
- `/client-room/legal/[slug]` — individual legal document templates

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

Plain Termux may fail to run `next dev` because Next.js tries to fetch Android SWC binaries. The recommended workflow is:

```bash
git add .
git commit -m "Add Client Room legal document pack"
git push
```

Then let Vercel build and redeploy the connected GitHub repository.

## Important limitation

These documents are templates. They must be reviewed, customised, and approved before live use with real clients. Before production use, connect and review:

- real authentication and OTP;
- secure file storage;
- encrypted database;
- payment provider;
- audit logs;
- privacy notices mapped to actual data processors;
- conflict-check workflow;
- final lawyer-approved intake terms;
- engagement-letter generation;
- office user permissions;
- retention and deletion policy;
- AI-provider and data-processing policy.

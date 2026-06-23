# Magaji Law Client Room — Operational Backend Plan

This document is the Stage 4 implementation plan for turning the Magaji Law Client Room prototype into a real law-office operating system.

It is an internal implementation scaffold. It is not yet a production backend. Live database, authentication, object storage, payment, email, audit logs, and security controls must be connected and tested before public use.

## 1. Operating principle

The Client Room must operate in this order:

1. Public visitor submits intake.
2. Consent and legal notices are accepted.
3. Conflict check is performed.
4. Office decides whether to consult, request clarification, decline, or accept.
5. If accepted, engagement letter is issued.
6. Matter code is created.
7. Client gains access to Existing Client Room.
8. Documents and communications are attached to the matter.
9. Filing expenses are requested only after engagement and specific filing instruction.
10. Matter is tracked until closure.

The core rule is sequence control: no filing expense before engagement; no client room access before acceptance; no AI legal conclusion without lawyer control; no full representation without written office acceptance.

## 2. User roles

### Public visitor
A person browsing the Client Room before any submission.

### Potential client
A person who has submitted facts for preliminary review but whose matter has not been accepted.

### Accepted client
A person whose matter has been accepted by the office and who has an engagement basis or express office confirmation.

### Lawyer/admin
A lawyer authorised to review intakes, check conflicts, accept or decline matters, issue engagement letters, and control legal advice and filings.

### Staff/reviewer
A staff member authorised to organise records, prepare internal summaries, mark documents for review, and support the lawyer under supervision.

### Super admin
A firm-level administrator responsible for access control, system settings, user management, and security oversight.

## 3. Matter lifecycle statuses

Use these statuses across intake, admin dashboard, matter room, invoicing, notifications, and audit logs:

- INTAKE_SUBMITTED
- CONFLICT_CHECK_PENDING
- CLARIFICATION_REQUESTED
- CONSULTATION_REQUIRED
- DECLINED
- ENGAGEMENT_PENDING
- ACCEPTED
- MATTER_CODE_ISSUED
- DOCUMENT_REVIEW
- DRAFTING
- FILING_PREPARATION
- FILED
- HEARING_OR_APPEARANCE
- AWAITING_CLIENT_ACTION
- CLOSED

## 4. Recommended production stack

- Next.js App Router
- TypeScript
- PostgreSQL database
- Prisma ORM
- Auth.js or equivalent secure authentication
- Secure object storage for files and recordings
- Email notification provider
- Payment provider adapter for consultation/intake review fees and invoices
- Vercel deployment
- Environment variables for all secrets

No secret key should be hardcoded in the repository.

## 5. Prisma-style database schema draft

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String?  @unique
  phone     String?
  role      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  clientProfile ClientProfile?
}

model ClientProfile {
  id                     String   @id @default(cuid())
  userId                 String   @unique
  user                   User     @relation(fields: [userId], references: [id])
  address                String?
  preferredContactMethod String?
  createdAt              DateTime @default(now())
  updatedAt              DateTime @updatedAt
}

model IntakeSubmission {
  id                               String   @id @default(cuid())
  referenceNumber                  String   @unique
  fullName                         String
  phone                            String
  email                            String?
  location                         String?
  matterType                       String
  narration                        String
  urgency                          String
  preferredContactMethod           String?
  status                           String
  consentAccepted                  Boolean  @default(false)
  aiNoticeAccepted                 Boolean  @default(false)
  privacyNoticeAccepted            Boolean  @default(false)
  noClientRelationshipAccepted     Boolean  @default(false)
  submittedAt                      DateTime @default(now())
  updatedAt                        DateTime @updatedAt

  conflictParties ConflictParty[]
  uploads         DocumentUpload[]
  narrations      NarrationUpload[]
  acceptances     LegalDocumentAcceptance[]
}

model ConflictParty {
  id                 String           @id @default(cuid())
  intakeSubmissionId String
  intakeSubmission   IntakeSubmission @relation(fields: [intakeSubmissionId], references: [id])
  name               String
  role               String?
  notes              String?
}

model Matter {
  id                 String   @id @default(cuid())
  matterCode         String   @unique
  clientId           String
  intakeSubmissionId String?
  title              String
  matterType         String
  status             String
  assignedLawyerId   String?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt
  closedAt           DateTime?

  accesses  MatterAccess[]
  uploads   DocumentUpload[]
  narrations NarrationUpload[]
  messages  OfficeMessage[]
  invoices  Invoice[]
}

model MatterAccess {
  id         String   @id @default(cuid())
  matterId   String
  matter     Matter   @relation(fields: [matterId], references: [id])
  userId     String
  accessRole String
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
}

model DocumentUpload {
  id                 String   @id @default(cuid())
  matterId           String?
  intakeSubmissionId String?
  uploadedById       String?
  category           String
  fileName           String
  fileUrl            String
  mimeType           String?
  size               Int?
  description        String?
  createdAt          DateTime @default(now())

  matter           Matter?           @relation(fields: [matterId], references: [id])
  intakeSubmission IntakeSubmission? @relation(fields: [intakeSubmissionId], references: [id])
}

model NarrationUpload {
  id                 String   @id @default(cuid())
  intakeSubmissionId String?
  matterId           String?
  type               String
  fileUrl            String
  transcript         String?
  summary            String?
  createdAt          DateTime @default(now())

  intakeSubmission IntakeSubmission? @relation(fields: [intakeSubmissionId], references: [id])
  matter           Matter?           @relation(fields: [matterId], references: [id])
}

model OfficeMessage {
  id          String    @id @default(cuid())
  matterId    String
  matter      Matter    @relation(fields: [matterId], references: [id])
  senderId    String?
  recipientId String?
  subject     String
  body        String
  createdAt   DateTime  @default(now())
  readAt      DateTime?
}

model Invoice {
  id          String    @id @default(cuid())
  matterId    String?
  clientId    String?
  invoiceType String
  description String
  amount      Decimal
  currency    String    @default("NGN")
  status      String
  issuedAt    DateTime  @default(now())
  paidAt      DateTime?

  matter   Matter?         @relation(fields: [matterId], references: [id])
  payments PaymentRecord[]
}

model PaymentRecord {
  id                String    @id @default(cuid())
  invoiceId          String
  invoice            Invoice   @relation(fields: [invoiceId], references: [id])
  provider           String
  providerReference  String
  amount             Decimal
  currency           String    @default("NGN")
  status             String
  paidAt             DateTime?
}

model LegalDocumentAcceptance {
  id                 String   @id @default(cuid())
  userId             String?
  intakeSubmissionId String?
  matterId           String?
  documentSlug       String
  acceptedAt         DateTime @default(now())
  ipAddress          String?
  userAgent          String?

  intakeSubmission IntakeSubmission? @relation(fields: [intakeSubmissionId], references: [id])
}

model AuditLog {
  id         String   @id @default(cuid())
  actorId    String?
  action     String
  entityType String
  entityId   String
  metadata   Json?
  createdAt  DateTime @default(now())
}
```

## 6. Matter-code model

A matter code is issued only after acceptance. It should not be guessable and should never be the only access control.

Recommended format:

```text
MGL-YYYY-MATTERTYPE-RANDOM
```

Example:

```text
MGL-2026-LAND-8F3KQ2
```

Rules:

- Matter code is issued only after office acceptance.
- Matter code must be linked to registered client phone, email, or user account.
- Matter code alone should not grant access.
- Future login should require OTP or secure account login.
- Matter code should be revoked or disabled if the matter closes or access becomes unsafe.

## 7. Authentication model

### Phase 1: Mock login only
Used for prototype demonstration.

### Phase 2: Email/phone OTP
Client enters matter code and receives OTP on registered phone or email.

### Phase 3: Full client account
Client has login credentials and can see only authorised matters.

### Phase 4: Role-based office dashboard
Lawyer, staff, and super admin roles get different permissions.

### Phase 5: Audit trail and device/session logs
Sensitive actions are logged, reviewed, and revocable.

## 8. File upload model

Files must go to secure object storage. The database stores metadata and access rules.

Categories:

- Court papers
- Police documents
- Land/property documents
- Agreements
- Receipts/payment evidence
- Photos/screenshots
- Correspondence
- Audio narration
- Video narration
- Other

Rules:

- Files must be linked to either an intake or a matter.
- Sensitive files should not use public URLs.
- Staff should be able to mark files as received, reviewed, rejected, or requiring clarification.
- Large files should have size limits.
- Access must be restricted by matter permissions.

## 9. Payment model

- Preliminary payment should be consultation fee or intake review fee.
- Payment does not by itself create lawyer-client relationship.
- Professional fees are separate.
- Filing expenses are separate.
- Filing expenses only after engagement and specific filing instruction.
- Invoice records should be created before payment.
- Payment records should be reconciled to invoice records.

## 10. Admin workflow

1. New intake received.
2. Conflict parties reviewed.
3. Urgency checked.
4. Documents reviewed.
5. AI-assisted chronology prepared.
6. Missing questions listed.
7. Lawyer decision selected:
   - request clarification;
   - schedule consultation;
   - decline;
   - accept.
8. If accepted:
   - create matter;
   - issue matter code;
   - attach engagement letter;
   - activate client room.
9. If declined:
   - issue non-engagement notice.

## 11. Email notification model

Templates required:

- Intake received
- Clarification requested
- Consultation required
- Matter accepted
- Engagement letter issued
- Matter code issued
- Document received
- Invoice issued
- Filing expense requested
- Matter closed
- Matter declined

All notifications should be status-aware and should avoid implying full representation before engagement.

## 12. Security model

Controls:

- Role-based access control.
- Secure environment variables.
- HTTPS only.
- No public file URLs for sensitive documents unless protected.
- Audit logs for admin actions.
- Data minimisation.
- Retention policy.
- Backup policy.
- Access revocation.
- Matter-code protection.
- Human lawyer review of AI-organised material.

## 13. Deployment checklist

Before public use:

- Connect PostgreSQL.
- Add Prisma schema and migrations.
- Configure environment variables.
- Add secure auth.
- Add file storage.
- Add email provider.
- Add payment provider.
- Add RBAC permissions.
- Add audit logging.
- Add backup and retention policy.
- Run legal review of all notices and terms.
- Test Vercel production deployment.

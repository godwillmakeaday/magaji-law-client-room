export const roles = [
  {
    key: 'PUBLIC_VISITOR',
    label: 'Public visitor',
    description: 'A person who has not yet submitted an intake and has no matter access.'
  },
  {
    key: 'POTENTIAL_CLIENT',
    label: 'Potential client',
    description: 'A person whose facts have been submitted for preliminary review but whose matter has not been accepted.'
  },
  {
    key: 'ACCEPTED_CLIENT',
    label: 'Accepted client',
    description: 'A person with a confirmed engagement or written office acceptance and an active matter record.'
  },
  {
    key: 'LAWYER_ADMIN',
    label: 'Lawyer/admin',
    description: 'A lawyer authorised to review intakes, make legal decisions, accept or decline matters, and control filings.'
  },
  {
    key: 'STAFF_REVIEWER',
    label: 'Staff/reviewer',
    description: 'A staff member who may organise records, prepare summaries, and flag missing information under lawyer supervision.'
  },
  {
    key: 'SUPER_ADMIN',
    label: 'Super admin',
    description: 'A firm-level administrator responsible for user access, security settings, and system controls.'
  }
] as const;

export const matterStatuses = [
  'INTAKE_SUBMITTED',
  'CONFLICT_CHECK_PENDING',
  'CLARIFICATION_REQUESTED',
  'CONSULTATION_REQUIRED',
  'DECLINED',
  'ENGAGEMENT_PENDING',
  'ACCEPTED',
  'MATTER_CODE_ISSUED',
  'DOCUMENT_REVIEW',
  'DRAFTING',
  'FILING_PREPARATION',
  'FILED',
  'HEARING_OR_APPEARANCE',
  'AWAITING_CLIENT_ACTION',
  'CLOSED'
] as const;

export type MatterStatusKey = (typeof matterStatuses)[number];

export const documentCategories = [
  'Court papers',
  'Police documents',
  'Land/property documents',
  'Agreements',
  'Receipts/payment evidence',
  'Photos/screenshots',
  'Correspondence',
  'Audio narration',
  'Video narration',
  'Other'
] as const;

export const backendPhases = [
  {
    phase: 'Phase 1',
    title: 'Static prototype and legal pack',
    status: 'Current scaffold',
    description: 'Premium UI, mock data, consent structure, legal document pack, and route architecture.'
  },
  {
    phase: 'Phase 2',
    title: 'Database and admin intake persistence',
    status: 'Next production step',
    description: 'Connect PostgreSQL and Prisma so submitted intakes, parties, statuses, and decisions persist.'
  },
  {
    phase: 'Phase 3',
    title: 'Secure file upload',
    status: 'Planned',
    description: 'Move documents, audio, and video to protected object storage with metadata in the database.'
  },
  {
    phase: 'Phase 4',
    title: 'Client authentication and matter-code access',
    status: 'Planned',
    description: 'Require secure account login or OTP plus matter-code matching before accessing accepted matters.'
  },
  {
    phase: 'Phase 5',
    title: 'Payment and invoicing',
    status: 'Planned',
    description: 'Create invoice records before payment and reconcile payment records to consultation, professional fee, and disbursement invoices.'
  },
  {
    phase: 'Phase 6',
    title: 'Email notifications and office workflow',
    status: 'Planned',
    description: 'Send controlled notifications for intake receipt, clarification, engagement, matter code, invoices, and closure.'
  },
  {
    phase: 'Phase 7',
    title: 'Audit logs, reporting, and compliance controls',
    status: 'Planned',
    description: 'Log material office actions, access events, document review, status changes, and user-role changes.'
  },
  {
    phase: 'Phase 8',
    title: 'AI-assisted chronology under lawyer supervision',
    status: 'Planned',
    description: 'Use AI only to organise facts, prepare questions, and summarise documents. Lawyer judgment controls advice and filings.'
  }
] as const;

export const workflowSteps = [
  'Public visitor submits intake with required notices and consent.',
  'System stores intake record and creates a reference number.',
  'Office reviews parties for conflict check before acceptance.',
  'Office reviews urgency, documents, narration, and missing facts.',
  'Lawyer selects next decision: clarify, consult, decline, or accept.',
  'If accepted, engagement letter is issued and matter record is created.',
  'Matter code is generated and linked to the client phone/email/account.',
  'Client room access is activated only for the accepted matter.',
  'Documents, messages, invoices, and office actions attach to the matter.',
  'Filing expenses are requested only after engagement and specific filing instruction.',
  'Matter proceeds through drafting, filing, hearing/appearance, awaiting client action, or closure.'
] as const;

export const securityChecklist = [
  'Use HTTPS-only production deployment.',
  'Store secrets only in environment variables.',
  'Require role-based access control for office users.',
  'Do not expose sensitive files through public URLs.',
  'Use protected object storage for uploads.',
  'Record audit logs for material admin actions.',
  'Limit matter-code access with OTP or secure login.',
  'Maintain retention and deletion policy for submitted records.',
  'Back up the database and storage according to firm policy.',
  'Make AI-organised material subject to human lawyer review.',
  'Revoke access immediately when a user or matter should no longer be active.'
] as const;

export const notificationTypes = [
  'INTAKE_RECEIVED',
  'CLARIFICATION_REQUESTED',
  'CONSULTATION_REQUIRED',
  'MATTER_ACCEPTED',
  'ENGAGEMENT_LETTER_ISSUED',
  'MATTER_CODE_ISSUED',
  'DOCUMENT_RECEIVED',
  'INVOICE_ISSUED',
  'FILING_EXPENSE_REQUESTED',
  'MATTER_CLOSED',
  'MATTER_DECLINED'
] as const;

export const dataModels = [
  {
    name: 'User',
    purpose: 'Stores account identity for clients, lawyers, staff, and administrators.',
    fields: ['id', 'name', 'email', 'phone', 'role', 'createdAt', 'updatedAt']
  },
  {
    name: 'ClientProfile',
    purpose: 'Stores client-level contact and preference data connected to a user account.',
    fields: ['id', 'userId', 'address', 'preferredContactMethod', 'createdAt', 'updatedAt']
  },
  {
    name: 'IntakeSubmission',
    purpose: 'Stores public intake facts before acceptance or engagement.',
    fields: ['id', 'referenceNumber', 'fullName', 'phone', 'email', 'location', 'matterType', 'narration', 'urgency', 'preferredContactMethod', 'status', 'consents', 'submittedAt', 'updatedAt']
  },
  {
    name: 'ConflictParty',
    purpose: 'Stores names and entities needed for conflict review.',
    fields: ['id', 'intakeSubmissionId', 'name', 'role', 'notes']
  },
  {
    name: 'Matter',
    purpose: 'Stores accepted matters after office approval.',
    fields: ['id', 'matterCode', 'clientId', 'intakeSubmissionId', 'title', 'matterType', 'status', 'assignedLawyerId', 'createdAt', 'updatedAt', 'closedAt']
  },
  {
    name: 'DocumentUpload',
    purpose: 'Stores file metadata while sensitive file binaries live in secure object storage.',
    fields: ['id', 'matterId', 'intakeSubmissionId', 'uploadedById', 'category', 'fileName', 'fileUrl', 'mimeType', 'size', 'description', 'createdAt']
  },
  {
    name: 'Invoice',
    purpose: 'Stores invoice records before payment attempts and links fees to matters.',
    fields: ['id', 'matterId', 'clientId', 'invoiceType', 'description', 'amount', 'currency', 'status', 'issuedAt', 'paidAt']
  },
  {
    name: 'AuditLog',
    purpose: 'Stores material system and office actions for accountability.',
    fields: ['id', 'actorId', 'action', 'entityType', 'entityId', 'metadata', 'createdAt']
  }
] as const;

export const futureIntegrations = [
  'PostgreSQL database with Prisma ORM',
  'Auth.js or equivalent secure authentication',
  'OTP provider for phone/email verification',
  'Secure object storage for files and recordings',
  'Email provider for controlled office notifications',
  'Payment provider adapter for consultation and invoice payment',
  'Admin analytics and reporting',
  'AI-assisted chronology and missing-question preparation under lawyer supervision'
] as const;

import type { MatterStatusKey } from './backend-plan';

export const statusLabels: Record<MatterStatusKey, { label: string; description: string }> = {
  INTAKE_SUBMITTED: {
    label: 'Intake submitted',
    description: 'A public intake has been received and awaits office review.'
  },
  CONFLICT_CHECK_PENDING: {
    label: 'Conflict check pending',
    description: 'The office must review parties, entities, witnesses, agencies, and related persons before any acceptance.'
  },
  CLARIFICATION_REQUESTED: {
    label: 'Clarification requested',
    description: 'The office has asked the potential client for missing facts, names, documents, or dates.'
  },
  CONSULTATION_REQUIRED: {
    label: 'Consultation required',
    description: 'A consultation is needed before the office can decide whether to accept the matter.'
  },
  DECLINED: {
    label: 'Declined',
    description: 'The firm has not accepted the matter and should issue a non-engagement notice where appropriate.'
  },
  ENGAGEMENT_PENDING: {
    label: 'Engagement pending',
    description: 'The office is preparing or awaiting acceptance of engagement terms.'
  },
  ACCEPTED: {
    label: 'Accepted',
    description: 'The firm has agreed to act, subject to the stated scope and engagement terms.'
  },
  MATTER_CODE_ISSUED: {
    label: 'Matter code issued',
    description: 'An accepted matter now has a controlled code linked to the registered client identity.'
  },
  DOCUMENT_REVIEW: {
    label: 'Document review',
    description: 'Submitted materials are under office review and classification.'
  },
  DRAFTING: {
    label: 'Drafting',
    description: 'The office is preparing letters, pleadings, agreements, or other legal documents.'
  },
  FILING_PREPARATION: {
    label: 'Filing preparation',
    description: 'The office is preparing a filing route after engagement and specific instruction.'
  },
  FILED: {
    label: 'Filed',
    description: 'The relevant filing has been made and the matter now follows the applicable procedural track.'
  },
  HEARING_OR_APPEARANCE: {
    label: 'Hearing or appearance',
    description: 'The matter has a court, police, agency, or office appearance stage.'
  },
  AWAITING_CLIENT_ACTION: {
    label: 'Awaiting client action',
    description: 'The office is waiting for client documents, approvals, payments, attendance, or instructions.'
  },
  CLOSED: {
    label: 'Closed',
    description: 'The matter has been concluded, archived, declined after review, or otherwise closed according to office policy.'
  }
};

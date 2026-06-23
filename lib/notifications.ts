export const notificationTemplates = [
  {
    key: 'INTAKE_RECEIVED',
    title: 'Intake received',
    subject: 'Your intake has been received: {{referenceNumber}}',
    body: 'Dear {{clientName}}, your submission has been received for preliminary review. This does not by itself create a lawyer-client relationship. The office will review the information and may contact you for clarification, consultation, or next steps.'
  },
  {
    key: 'CLARIFICATION_REQUESTED',
    title: 'Clarification requested',
    subject: 'Further information required for {{referenceNumber}}',
    body: 'Dear {{clientName}}, the office requires further information before it can complete preliminary review. Please provide the requested details through the Client Room or by the authorised office channel.'
  },
  {
    key: 'CONSULTATION_REQUIRED',
    title: 'Consultation required',
    subject: 'Consultation required for {{referenceNumber}}',
    body: 'Dear {{clientName}}, preliminary review indicates that consultation is required before the office can determine the next step. Payment of a consultation or intake review fee does not by itself mean the firm has accepted full representation.'
  },
  {
    key: 'MATTER_ACCEPTED',
    title: 'Matter accepted',
    subject: 'Matter accepted subject to engagement terms: {{matterCode}}',
    body: 'Dear {{clientName}}, Magaji Law has agreed to act subject to the stated scope, engagement terms, and professional fee confirmation. Please review the engagement document issued by the office.'
  },
  {
    key: 'ENGAGEMENT_LETTER_ISSUED',
    title: 'Engagement letter issued',
    subject: 'Engagement letter issued for {{matterCode}}',
    body: 'Dear {{clientName}}, the engagement letter for your matter has been issued. Please review the scope, fees, duties, and limitations before acceptance.'
  },
  {
    key: 'MATTER_CODE_ISSUED',
    title: 'Matter code issued',
    subject: 'Your Client Room matter code: {{matterCode}}',
    body: 'Dear {{clientName}}, your matter code has been issued. Do not share it with unauthorised persons. Access should be linked to your registered phone, email, or approved login method.'
  },
  {
    key: 'DOCUMENT_RECEIVED',
    title: 'Document received',
    subject: 'Document received for {{matterCode}}',
    body: 'Dear {{clientName}}, the office has received a document uploaded or submitted for your matter. Receipt does not mean the document has been fully reviewed unless the office confirms review.'
  },
  {
    key: 'INVOICE_ISSUED',
    title: 'Invoice issued',
    subject: 'Invoice issued for {{matterCode}}',
    body: 'Dear {{clientName}}, an invoice has been issued for your matter. Please review the invoice type, description, amount, and payment instructions before payment.'
  },
  {
    key: 'FILING_EXPENSE_REQUESTED',
    title: 'Filing expense requested',
    subject: 'Filing expense instruction for {{matterCode}}',
    body: 'Dear {{clientName}}, the office has issued a filing or disbursement instruction for your accepted matter. Filing expenses are separate from professional fees unless expressly stated.'
  },
  {
    key: 'MATTER_CLOSED',
    title: 'Matter closed',
    subject: 'Matter closed: {{matterCode}}',
    body: 'Dear {{clientName}}, this matter has been marked closed according to office records. Please contact the office through approved channels if you require any closing documents or further instruction.'
  },
  {
    key: 'MATTER_DECLINED',
    title: 'Matter declined',
    subject: 'Non-engagement notice for {{referenceNumber}}',
    body: 'Dear {{clientName}}, the firm has not accepted this matter. No lawyer-client relationship has been formed. You should seek other legal advice promptly where necessary, especially where deadlines may apply.'
  }
] as const;

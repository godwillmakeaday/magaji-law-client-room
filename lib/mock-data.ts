import type { IntakeSubmission, MatterEvent, MatterStage, MatterType } from './types';

export const matterTypes: MatterType[] = [
  'Land/property',
  'Police invitation/criminal defence',
  'Business/company',
  'Debt/recovery',
  'Family/inheritance',
  'Employment',
  'Contract/document review',
  'Litigation/court matter',
  'Political/party matter',
  'Other'
];

export const matterStages: MatterStage[] = [
  'Intake received',
  'Conflict check',
  'Consultation scheduled',
  'Engagement pending',
  'Documents under review',
  'Drafting',
  'Filing preparation',
  'Filed',
  'Hearing/appearance',
  'Awaiting client action',
  'Closed'
];

export const intakeSubmissions: IntakeSubmission[] = [
  {
    id: 'ML-INT-2401',
    clientName: 'Samuel A.',
    matterType: 'Land/property',
    urgency: 'Hearing date approaching',
    dateSubmitted: '23 Jun 2026',
    opposingParties: ['Dantani I.', 'Unnamed third party'],
    status: 'Urgent',
    location: 'Awe, Nasarawa State',
    phone: '+234 800 000 0001',
    email: 'samuel@example.com',
    narration:
      'Client reports a family land dispute involving alleged trespass, prior community intervention, and boundary witnesses. Client wants the office to assess whether court filing is appropriate after review of family history and evidence.',
    documents: ['Boundary sketch placeholder', 'Witness list placeholder', 'Photographs placeholder'],
    chronology: [
      'Family land allegedly inherited from late father.',
      'Prior dispute brought before local authority.',
      'Recent alleged entry into two-bag portion of land.',
      'Client now seeks structured legal action after document review.'
    ],
    missingQuestions: [
      'Are there existing land documents or only customary evidence?',
      'What exact date did the most recent trespass occur?',
      'Have any parties been served prior demand letters?',
      'Are boundary witnesses willing to provide written statements?'
    ],
    riskFlags: [
      'Possible limitation and proof-of-title issues',
      'Needs careful conflict check',
      'Community authority history should be documented'
    ]
  },
  {
    id: 'ML-INT-2402',
    clientName: 'Aisha M.',
    matterType: 'Business/company',
    urgency: 'Needs review within days',
    dateSubmitted: '22 Jun 2026',
    opposingParties: ['Former co-founder', 'Unregistered venture partner'],
    status: 'Conflict check required',
    location: 'Lafia, Nasarawa State',
    phone: '+234 800 000 0002',
    email: 'aisha@example.com',
    narration:
      'Client seeks review of business formation history, ownership promises, contribution records, and possible CAC regularisation.',
    documents: ['CAC reservation screenshot placeholder', 'Bank transfer evidence placeholder'],
    chronology: [
      'Two founders started informal business relationship.',
      'Client states she contributed capital and branding work.',
      'Disagreement arose around ownership and control.',
      'Client requests review before formal demand letter.'
    ],
    missingQuestions: [
      'Was any written agreement signed?',
      'Who controls company email, bank account, and CAC login?',
      'What exactly is the remedy being sought?'
    ],
    riskFlags: ['Possible partnership evidence gaps', 'Client-money history needs verification']
  },
  {
    id: 'ML-INT-2403',
    clientName: 'John O.',
    matterType: 'Police invitation/criminal defence',
    urgency: 'Police/court deadline',
    dateSubmitted: '21 Jun 2026',
    opposingParties: ['Complainant unknown', 'Division A police station'],
    status: 'Awaiting consultation',
    location: 'Abuja',
    phone: '+234 800 000 0003',
    email: 'john@example.com',
    narration:
      'Client received a police invitation over a business transaction and wants advice before appearing.',
    documents: ['Police invitation placeholder', 'Transaction receipt placeholder'],
    chronology: [
      'Business transaction took place.',
      'Complainant allegedly reported to police.',
      'Client received invitation requiring attendance.',
      'Client seeks legal presence and preparation.'
    ],
    missingQuestions: [
      'What is the exact invitation date and time?',
      'What was the transaction amount and evidence trail?',
      'Has client already made any statement?'
    ],
    riskFlags: ['Time-sensitive', 'Do not submit detailed public narration without lawyer review']
  }
];

export const clientMatter = {
  title: 'Land Trespass and Boundary Evidence Review',
  code: 'ML-2026-0148',
  stage: 'Documents under review' as MatterStage,
  nextOfficeAction: 'Prepare chronology and witness-question list for lawyer review.',
  clientActionRequired: 'Upload any receipts, photographs, local authority papers, or witness contact details not yet submitted.',
  invoiceStatus: 'Consultation invoice pending office confirmation',
  engagementStatus: 'Engagement letter placeholder awaiting final scope approval'
};

export const matterTimeline: MatterEvent[] = [
  {
    date: '23 Jun 2026',
    title: 'Matter room opened',
    note: 'Office created a controlled client room after preliminary review.'
  },
  {
    date: '23 Jun 2026',
    title: 'Documents requested',
    note: 'Client asked to provide title history, boundary details, and witness names.'
  },
  {
    date: '24 Jun 2026',
    title: 'Lawyer review scheduled',
    note: 'Internal review placeholder. No court filing has been approved yet.'
  }
];

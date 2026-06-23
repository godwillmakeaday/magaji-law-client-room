export type MatterType =
  | 'Land/property'
  | 'Police invitation/criminal defence'
  | 'Business/company'
  | 'Debt/recovery'
  | 'Family/inheritance'
  | 'Employment'
  | 'Contract/document review'
  | 'Litigation/court matter'
  | 'Political/party matter'
  | 'Other';

export type MatterStage =
  | 'Intake received'
  | 'Conflict check'
  | 'Consultation scheduled'
  | 'Engagement pending'
  | 'Documents under review'
  | 'Drafting'
  | 'Filing preparation'
  | 'Filed'
  | 'Hearing/appearance'
  | 'Awaiting client action'
  | 'Closed';

export type IntakeStatus =
  | 'New'
  | 'Conflict check required'
  | 'Urgent'
  | 'Awaiting consultation'
  | 'Accepted'
  | 'Declined';

export type IntakeSubmission = {
  id: string;
  clientName: string;
  matterType: MatterType;
  urgency: string;
  dateSubmitted: string;
  opposingParties: string[];
  status: IntakeStatus;
  location: string;
  phone: string;
  email: string;
  narration: string;
  documents: string[];
  chronology: string[];
  missingQuestions: string[];
  riskFlags: string[];
};

export type MatterEvent = {
  date: string;
  title: string;
  note: string;
};

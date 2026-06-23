export type LegalDocumentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: string;
  title: string;
  purpose: string;
  appliesTo: string;
  summary: string;
  bodySections: LegalDocumentSection[];
  operationalNote: string;
};

export const legalDocuments: LegalDocument[] = [
  {
    slug: 'preliminary-intake-notice',
    title: 'Preliminary Intake Notice',
    purpose: 'Explains the first-stage purpose of the Client Room before any engagement decision.',
    appliesTo: 'Client Room landing page, New Client Intake start, and submission confirmation.',
    summary: 'The Client Room allows preliminary fact submission so the office can understand the matter, screen urgency, and decide the proper next step.',
    bodySections: [
      {
        heading: '1. Purpose of the Client Room',
        paragraphs: [
          'The Magaji Law Client Room is provided to help persons submit preliminary facts, documents, narration, contact details, and related information to the office in a structured way.',
          'The purpose of the preliminary intake stage is to help the firm understand the general nature of the matter, identify the parties involved, consider urgency, and determine whether consultation, further clarification, conflict review, or another step may be required.'
        ]
      },
      {
        heading: '2. No acceptance at submission stage',
        paragraphs: [
          'Submission of information through the Client Room does not mean that Magaji Law has accepted the matter, agreed to act, opened a formal client file, or undertaken responsibility to take any step on behalf of the person submitting the information.',
          'A lawyer-client relationship begins only when the firm expressly confirms acceptance of the matter, issues an engagement letter, opens a controlled matter file, or otherwise gives written confirmation that it has agreed to act.'
        ]
      },
      {
        heading: '3. Possible office response',
        bullets: [
          'request further facts, documents, names, dates, or clarification;',
          'request a consultation or intake review meeting;',
          'conduct or complete a conflict check;',
          'state proposed scope and fee terms;',
          'accept the matter subject to engagement terms;',
          'decline the matter without giving detailed reasons where professional duties require caution.'
        ]
      },
      {
        heading: '4. Urgent safety matters',
        paragraphs: [
          'The Client Room is not an emergency-response channel. Where there is an immediate threat to life, physical safety, or property, the person should first contact the appropriate emergency authority, security agency, medical service, or other lawful authority before or alongside any request for legal assistance.'
        ]
      }
    ],
    operationalNote: 'Display this notice before the new client starts intake and again on the submission confirmation screen.'
  },
  {
    slug: 'no-lawyer-client-relationship',
    title: 'No Lawyer-Client Relationship Notice',
    purpose: 'Defines the boundary between website use, preliminary review, and formal engagement.',
    appliesTo: 'Global footer, new intake consent, existing client access notice, and legal pack index.',
    summary: 'Website use, uploads, calls, messages, or preliminary review do not by themselves create a lawyer-client relationship.',
    bodySections: [
      {
        heading: '1. General notice',
        paragraphs: [
          'Use of this website, access to the Client Room, completion of an intake form, document upload, voice upload, video upload, email communication, telephone call, WhatsApp message, or preliminary office review does not by itself create a lawyer-client relationship with Magaji Law.'
        ]
      },
      {
        heading: '2. When engagement begins',
        paragraphs: [
          'A lawyer-client relationship begins only when the firm expressly accepts the matter and confirms the engagement in writing, issues an engagement letter, opens a controlled matter file, or gives another clear office confirmation that it has agreed to act for the client in relation to the specified matter.'
        ]
      },
      {
        heading: '3. No legal advice at preliminary stage',
        paragraphs: [
          'Information displayed on the Client Room or submitted during preliminary intake should not be treated as legal advice, legal opinion, litigation strategy, court instruction, or confirmation that any step will be taken. Legal advice is given only by the lawyer or office after proper review and within the confirmed scope of engagement.'
        ]
      },
      {
        heading: '4. Right to decline',
        paragraphs: [
          'Magaji Law may decline to act after preliminary review, conflict check, consultation, or internal assessment. Where the firm has not accepted the matter, the person remains responsible for seeking other legal assistance and for protecting any applicable deadline or limitation period.'
        ]
      }
    ],
    operationalNote: 'Place this notice anywhere the user might wrongly assume that submission equals representation.'
  },
  {
    slug: 'consent-to-review',
    title: 'Consent to Review Facts and Documents',
    purpose: 'Records the user’s permission for preliminary office review of submitted materials.',
    appliesTo: 'New Client Intake consent stage and document upload stage.',
    summary: 'The user consents to preliminary review of facts, documents, recordings, images, and communications for intake and conflict purposes.',
    bodySections: [
      {
        heading: '1. Consent to preliminary review',
        paragraphs: [
          'By submitting information through the Client Room, the person submitting the information consents to Magaji Law receiving and conducting a preliminary review of the facts, documents, images, audio recordings, video recordings, messages, contact details, and related materials provided.'
        ]
      },
      {
        heading: '2. Purpose of review',
        bullets: [
          'understand the nature of the matter;',
          'identify the parties and institutions involved;',
          'consider whether a conflict of interest may exist;',
          'identify urgency, missing facts, and likely next questions;',
          'determine whether consultation or engagement may be appropriate;',
          'organise materials for internal office review.'
        ]
      },
      {
        heading: '3. Internal organisation',
        paragraphs: [
          'The firm may internally classify, summarise, transcribe, index, or organise the submitted materials to assist the lawyer and office in reviewing the matter. This internal organisation does not by itself amount to legal advice or acceptance of the matter.'
        ]
      },
      {
        heading: '4. Withdrawal of consent',
        paragraphs: [
          'A person may request withdrawal of consent for further processing, subject to applicable legal, professional, accounting, conflict-check, regulatory, record-keeping, or dispute-protection obligations that may require the firm to retain or process limited records.'
        ]
      }
    ],
    operationalNote: 'Use this as the full document linked from the consent checkbox before the final intake submission.'
  },
  {
    slug: 'conflict-check-disclosure',
    title: 'Conflict Check Disclosure Form',
    purpose: 'Requires disclosure of parties and related persons so the firm can protect independence and confidentiality.',
    appliesTo: 'Parties/conflict section of the New Client Intake and admin review dashboard.',
    summary: 'Complete party disclosure helps the firm decide whether it can professionally act.',
    bodySections: [
      {
        heading: '1. Duty to identify all relevant persons',
        paragraphs: [
          'The person submitting a matter must disclose, as far as known, the names of all relevant parties, opposing parties, companies, family members, officers, institutions, agencies, courts, police stations, witnesses, agents, signatories, beneficiaries, land vendors, trustees, associations, and any other persons connected with the matter.'
        ]
      },
      {
        heading: '2. Why conflict check is required',
        paragraphs: [
          'Conflict check protects the firm’s professional independence, client confidentiality, loyalty to existing or former clients where applicable, and the integrity of legal representation. The firm must know the relevant names before deciding whether it can act.'
        ]
      },
      {
        heading: '3. Effect of incomplete disclosure',
        paragraphs: [
          'Incomplete, inaccurate, or delayed disclosure may prevent the firm from accepting the matter. If a conflict or serious professional difficulty is discovered after preliminary review or engagement, the firm may decline, withdraw, limit its role, or take any other step permitted by law and professional duty.'
        ]
      },
      {
        heading: '4. Client confirmation',
        paragraphs: [
          'The person submitting the matter confirms that the names and party information provided are accurate to the best of their knowledge and undertakes to inform the firm promptly if additional parties, institutions, documents, or related persons become known.'
        ]
      }
    ],
    operationalNote: 'Require this before intake submission and surface it strongly in the admin review view.'
  },
  {
    slug: 'audio-video-consent',
    title: 'Audio/Video Narration Consent',
    purpose: 'Controls voluntary submission, review, transcription, and internal use of recordings.',
    appliesTo: 'Narration Room and upload sections for audio or video files.',
    summary: 'Audio and video narration may be reviewed, transcribed, summarised, and organised for legal intake purposes.',
    bodySections: [
      {
        heading: '1. Voluntary recording submission',
        paragraphs: [
          'A person may voluntarily submit audio or video narration through the Client Room where it helps explain the facts, sequence of events, documents, scene, conversation history, or requested legal assistance.'
        ]
      },
      {
        heading: '2. Permitted internal use',
        bullets: [
          'listen to or view the recording;',
          'transcribe all or part of the recording;',
          'summarise the facts stated in the recording;',
          'extract dates, names, issues, missing questions, and document references;',
          'store the recording or derived notes as part of the preliminary intake or matter file where appropriate.'
        ]
      },
      {
        heading: '3. Third-party information',
        paragraphs: [
          'The person submitting the recording should avoid including unnecessary sensitive information about third parties where possible. Where third-party information is necessary to explain the matter, it should be limited to what is relevant and submitted honestly.'
        ]
      },
      {
        heading: '4. Authority to submit',
        paragraphs: [
          'The person submitting the recording confirms that they have authority to submit it and that they are not deliberately uploading unlawfully obtained, misleading, altered, or irrelevant recordings. Recordings may not be returned unless expressly agreed or required by law or office policy.'
        ]
      }
    ],
    operationalNote: 'Show this notice directly beside audio/video upload controls.'
  },
  {
    slug: 'ai-assisted-organisation',
    title: 'AI-Assisted Organisation Notice',
    purpose: 'Explains the limited role of AI tools in intake review and internal legal operations.',
    appliesTo: 'Narration Room, consent section, admin chronology placeholder, and privacy notice.',
    summary: 'AI may help organise information, but lawyer judgment controls all advice, strategy, filings, and legal conclusions.',
    bodySections: [
      {
        heading: '1. Limited AI assistance',
        paragraphs: [
          'Magaji Law may use AI-assisted tools to help organise information submitted through the Client Room. Such tools may assist with transcription, chronology, issue listing, missing-fact identification, question preparation, document indexing, and internal review support.'
        ]
      },
      {
        heading: '2. AI is not the lawyer',
        paragraphs: [
          'AI tools do not replace lawyer review, do not create a lawyer-client relationship, do not give final legal advice, and do not independently determine the legal rights, obligations, strategy, filing route, or outcome of any matter.'
        ]
      },
      {
        heading: '3. Human legal control',
        paragraphs: [
          'Lawyer judgment controls all legal advice, legal opinions, filings, letters, pleadings, negotiation positions, court documents, strategy, and professional decisions. Any AI-organised material is an aid to review only and must be verified by the lawyer or office.'
        ]
      },
      {
        heading: '4. Significant effects and human intervention',
        paragraphs: [
          'Where any automated processing may produce legal or similarly significant effects, the firm should ensure that human intervention, lawyer review, correction, and appropriate professional supervision remain available before final action is taken.'
        ]
      },
      {
        heading: '5. Sensitive information',
        paragraphs: [
          'Persons submitting information should provide only what is relevant to the matter and should avoid unnecessary sensitive data. The firm should handle submitted information carefully and in line with confidentiality, privacy, security, and professional obligations.'
        ]
      }
    ],
    operationalNote: 'Use this to prevent the product from being misunderstood as automated legal advice.'
  },
  {
    slug: 'privacy-data-protection',
    title: 'Privacy and Data Protection Notice',
    purpose: 'Explains collection, use, sharing, retention, security, and user rights around personal data.',
    appliesTo: 'Before collecting personal details, files, recordings, contact details, and matter facts.',
    summary: 'Magaji Law may process personal data for intake, conflict check, engagement, legal service delivery, billing, compliance, and communication.',
    bodySections: [
      {
        heading: '1. Information collected',
        paragraphs: [
          'Magaji Law may collect personal data and matter information including names, addresses, telephone numbers, email addresses, contact preferences, identity details where necessary, matter facts, party names, documents, images, audio recordings, video recordings, payment references, communication records, and other information voluntarily submitted or required for legal service delivery.'
        ]
      },
      {
        heading: '2. Purpose of processing',
        bullets: [
          'preliminary intake review and matter classification;',
          'conflict check and professional independence review;',
          'consultation, engagement, and legal service delivery;',
          'document review, drafting, filing preparation, and client communication;',
          'billing, accounting, receipts, and disbursement records;',
          'office administration, security, compliance, audit, and record keeping;',
          'responding to lawful requests, court processes, regulators, or professional obligations.'
        ]
      },
      {
        heading: '3. Sharing of information',
        paragraphs: [
          'Information may be shared only where necessary with lawyers, authorised staff, consultants, secure technology providers, courts, registries, agencies, regulators, opposing parties where professionally required, or other persons where the client instructs or the law permits or requires disclosure.'
        ]
      },
      {
        heading: '4. Rights of the data subject',
        paragraphs: [
          'Subject to applicable law and professional obligations, a data subject may request access to personal data, correction of inaccurate data, deletion where appropriate, restriction or objection to processing, withdrawal of consent where consent is the relevant basis, and may raise complaints with the appropriate data protection regulator.'
        ]
      },
      {
        heading: '5. Security and retention',
        paragraphs: [
          'The firm should use reasonable administrative, technical, and organisational measures to protect personal data against unauthorised access, loss, misuse, alteration, or disclosure. Data may be retained for as long as necessary for legal, professional, accounting, compliance, limitation, dispute, or record-keeping purposes.'
        ]
      },
      {
        heading: '6. AI-assisted organisation',
        paragraphs: [
          'AI-assisted tools may help organise or summarise information for internal review, but final legal decisions, advice, filings, and professional conclusions remain subject to human lawyer control.'
        ]
      }
    ],
    operationalNote: 'This template should be reviewed against the live privacy architecture, hosting, storage, AI providers, and data-transfer arrangements before production use.'
  },
  {
    slug: 'intake-review-fee-terms',
    title: 'Consultation / Intake Review Fee Terms',
    purpose: 'Separates preliminary review or consultation fee from professional fees and filing expenses.',
    appliesTo: 'Before any payment integration is added to the New Client Intake.',
    summary: 'An intake review fee or consultation fee may be charged before detailed review, but it does not by itself mean full representation has begun.',
    bodySections: [
      {
        heading: '1. Preliminary fee language',
        paragraphs: [
          'Where applicable, Magaji Law may require an intake review fee or consultation fee before detailed review, consultation, or structured office assessment of a submitted matter. This fee is for the preliminary service expressly stated by the office.'
        ]
      },
      {
        heading: '2. No automatic full representation',
        paragraphs: [
          'Payment of an intake review fee or consultation fee does not by itself mean that the firm has accepted the matter for full representation, agreed to file a process, undertaken court appearance, or assumed responsibility for any step outside the stated preliminary service.'
        ]
      },
      {
        heading: '3. Separate professional fees and expenses',
        paragraphs: [
          'Professional fees, filing expenses, disbursements, transport, court fees, registry charges, agency fees, printing, service of process, search fees, perfection expenses, and other costs are separate unless expressly included in a written fee confirmation.'
        ]
      },
      {
        heading: '4. Filing expenses after engagement only',
        paragraphs: [
          'Filing expenses or court filing deposits should be requested only after the firm has accepted the matter, confirmed the filing route, settled the relevant documents, and issued specific filing or disbursement instruction.'
        ]
      },
      {
        heading: '5. Written confirmation',
        paragraphs: [
          'All fee terms, scope of work, payment references, inclusions, exclusions, and refund or accounting terms should be confirmed in writing by the office before the client relies on them.'
        ]
      }
    ],
    operationalNote: 'Use this before payment buttons are added; do not label first-stage payments as filing fees.'
  },
  {
    slug: 'engagement-letter',
    title: 'Engagement Letter Template',
    purpose: 'Confirms the basis on which Magaji Law agrees to act after acceptance.',
    appliesTo: 'After conflict check and matter acceptance; before full representation or formal filing.',
    summary: 'This letter confirms scope, fees, duties, exclusions, communication, expenses, and acceptance.',
    bodySections: [
      {
        heading: '1. Opening confirmation',
        paragraphs: [
          'Date: [Insert date]',
          'Client: [Insert client name]',
          'Matter Title: [Insert matter title]',
          'Matter Code: [Insert matter code]',
          'Dear [Client name],',
          'This letter confirms the basis on which Magaji Law has agreed to act for you in relation to the matter described below. Please read it carefully and ask for clarification before signing or confirming acceptance.'
        ]
      },
      {
        heading: '2. Scope of engagement',
        paragraphs: [
          'The firm is engaged to provide the following services: [describe scope clearly, including advice, document review, drafting, negotiation, representation, filing, appearance, or other service].'
        ]
      },
      {
        heading: '3. Excluded services',
        paragraphs: [
          'Unless expressly added in writing, this engagement does not include: [appeals, enforcement, separate suits, criminal defence, property perfection, regulatory filing, travel, settlement documentation, tax advice, or any other excluded service].'
        ]
      },
      {
        heading: '4. Professional fee',
        paragraphs: [
          'The professional fee for the agreed scope is: [insert amount or structure]. Payment terms are: [insert instalment, due date, milestone, or other arrangement]. The professional fee is separate from filing expenses and disbursements unless expressly stated otherwise.'
        ]
      },
      {
        heading: '5. Expenses and disbursements',
        paragraphs: [
          'The client is responsible for approved expenses and disbursements including filing fees, registry charges, searches, printing, transport, courier, service of process, accommodation where necessary, and other matter expenses, subject to written confirmation or office policy.'
        ]
      },
      {
        heading: '6. Client duties',
        bullets: [
          'provide accurate and complete information;',
          'disclose all relevant parties and documents;',
          'respond to requests within reasonable time;',
          'avoid instructing the firm through unauthorised third parties;',
          'pay agreed fees and approved expenses;',
          'inform the firm promptly of new facts, deadlines, threats, or communications.'
        ]
      },
      {
        heading: '7. Confidentiality and communication',
        paragraphs: [
          'The firm will handle client information in accordance with professional duties, confidentiality obligations, and applicable law. Official instructions, advice, filings, and commitments should be confirmed through recognised office channels.'
        ]
      },
      {
        heading: '8. Document handling',
        paragraphs: [
          'Copies of documents may be stored physically or digitally for the matter. Originals should not be submitted unless requested. Where originals are received, handling, custody, return, or retention should be recorded by the office.'
        ]
      },
      {
        heading: '9. Termination or withdrawal',
        paragraphs: [
          'Either the client or the firm may end the engagement in accordance with applicable law, professional obligations, fee terms, and reasonable notice where required. Fees already earned and approved expenses remain payable.'
        ]
      },
      {
        heading: '10. Acceptance',
        paragraphs: [
          'Client signature/name: ___________________________',
          'Date: ___________________________',
          'For Magaji Law: ___________________________'
        ]
      }
    ],
    operationalNote: 'This is the main engagement document; it should be customised matter by matter before signature.'
  },
  {
    slug: 'filing-expense-instruction',
    title: 'Filing Expense / Disbursement Instruction',
    purpose: 'Records a specific client authorisation for court filing, registry work, agency payments, or disbursements.',
    appliesTo: 'After engagement, when a specific filing or disbursement has been confirmed.',
    summary: 'Filing expenses are separate from professional fees and should follow specific written instruction and accounting.',
    bodySections: [
      {
        heading: '1. Nature of filing expense',
        paragraphs: [
          'Filing expense, court fee, registry charge, agency payment, transport, service of process, search fee, perfection charge, or other disbursement is not the same as the professional fee of the firm unless expressly stated in writing.'
        ]
      },
      {
        heading: '2. Specific authorisation',
        paragraphs: [
          'The client authorises the firm to apply the stated sum towards the following filing or disbursement: [describe filing route, court/registry/agency, document, matter title, estimated amount, and purpose].'
        ]
      },
      {
        heading: '3. Conditions before filing',
        paragraphs: [
          'No filing is guaranteed until the relevant documents are settled, client instructions are clear, required funds are confirmed where applicable, and the office determines that filing is professionally and procedurally appropriate.'
        ]
      },
      {
        heading: '4. Accounting',
        paragraphs: [
          'Unused balance, shortfall, receipts, payment references, or additional disbursement requests should be handled according to office policy and written fee/disbursement confirmation. The client may request reasonable accounting for disbursements applied to the matter.'
        ]
      },
      {
        heading: '5. Client confirmation',
        paragraphs: [
          'Client name: ___________________________',
          'Matter code: ___________________________',
          'Approved amount/purpose: ___________________________',
          'Signature/date: ___________________________'
        ]
      }
    ],
    operationalNote: 'Link this only after engagement; it should never appear as the first payment document for a new visitor.'
  },
  {
    slug: 'existing-client-room-terms',
    title: 'Existing Client Room Terms',
    purpose: 'Controls use of matter-code access after the firm has accepted a matter.',
    appliesTo: 'Existing client login and dashboard.',
    summary: 'The existing client room is for accepted matters only and should be used carefully for updates and document exchange.',
    bodySections: [
      {
        heading: '1. Access for accepted matters only',
        paragraphs: [
          'The Existing Client Room is for matters that have been accepted by Magaji Law or opened as controlled office files. A matter code should not be treated as general public access or as proof of scope beyond what the office has confirmed.'
        ]
      },
      {
        heading: '2. Matter-code protection',
        paragraphs: [
          'The client must protect the matter code and should not share it with unauthorised persons. Any person accessing the room through the client’s details may be treated as acting with the client’s authority unless the office is promptly notified otherwise.'
        ]
      },
      {
        heading: '3. Uploads and communications',
        paragraphs: [
          'Documents, narration, messages, and updates submitted through the Existing Client Room may become part of the matter communication record. The client should upload only relevant documents and should avoid sending originals unless requested.'
        ]
      },
      {
        heading: '4. Not an emergency channel',
        paragraphs: [
          'The Existing Client Room is not for emergencies requiring immediate physical intervention, security response, medical attention, or urgent court attendance unless the office has expressly set that process for the matter. Response times may vary based on office workload and matter priority.'
        ]
      },
      {
        heading: '5. Official confirmation',
        paragraphs: [
          'Official filings, advice, court steps, settlement positions, undertakings, appearances, and fee commitments must be confirmed by the lawyer or office through recognised communication channels. A dashboard status or uploaded document does not replace professional confirmation.'
        ]
      }
    ],
    operationalNote: 'Show this on login and dashboard footer; link it anywhere the matter code is mentioned.'
  },
  {
    slug: 'non-engagement-notice',
    title: 'Non-Engagement / Decline Notice',
    purpose: 'Provides clear wording when the firm declines or has not accepted a matter.',
    appliesTo: 'Admin decision flow and messages to persons whose matters are not accepted.',
    summary: 'The firm has not accepted the matter and the person should seek other legal advice where necessary.',
    bodySections: [
      {
        heading: '1. Notice of non-engagement',
        paragraphs: [
          'After preliminary review, Magaji Law has not accepted this matter and has not agreed to act for you in relation to it. No lawyer-client relationship has been formed by the submission, review, correspondence, or communication to date.'
        ]
      },
      {
        heading: '2. Need to protect your position',
        paragraphs: [
          'You should seek other legal advice promptly where necessary. Deadlines, limitation periods, court dates, filing requirements, police invitations, appeal periods, response periods, and other time-sensitive obligations may continue running despite this non-engagement notice.'
        ]
      },
      {
        heading: '3. Documents and records',
        paragraphs: [
          'Documents or information submitted may be retained, archived, or deleted according to office policy, professional obligations, data protection requirements, conflict-check needs, and any applicable legal or dispute-protection reason.'
        ]
      },
      {
        heading: '4. No responsibility for unaccepted steps',
        paragraphs: [
          'The firm is not responsible for taking any step, filing any process, contacting any party, attending any meeting, protecting any deadline, or providing legal advice unless it has expressly agreed to do so in writing.'
        ]
      },
      {
        heading: '5. Closing',
        paragraphs: [
          'This notice is issued to avoid misunderstanding and to make clear that you remain free to consult another lawyer or take any lawful step you consider necessary.'
        ]
      }
    ],
    operationalNote: 'Use this in admin decisions when a matter is declined or remains unaccepted after preliminary review.'
  }
];

export function getLegalDocument(slug: string) {
  return legalDocuments.find((document) => document.slug === slug);
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { EmptyState } from '@/components/EmptyState';
import { NoticeBox } from '@/components/NoticeBox';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { intakeSubmissions } from '@/lib/mock-data';

const decisionStatuses = [
  'CONFLICT_CHECK_PENDING',
  'CLARIFICATION_REQUESTED',
  'CONSULTATION_REQUIRED',
  'ENGAGEMENT_PENDING',
  'ACCEPTED',
  'DECLINED'
];

type RealConflictParty = {
  id: string;
  name: string;
  role?: string | null;
  notes?: string | null;
};

type RealLegalAcceptance = {
  id: string;
  documentSlug: string;
  acceptedAt: string;
};

type RealIntake = {
  id: string;
  referenceNumber: string;
  fullName: string;
  phone: string;
  email?: string | null;
  location?: string | null;
  matterType: string;
  narration?: string | null;
  urgency: string;
  preferredContactMethod?: string | null;
  status: string;
  submittedAt: string;
  conflictParties: RealConflictParty[];
  legalDocumentAcceptances: RealLegalAcceptance[];
};

type DetailRecord = {
  id: string;
  referenceNumber: string;
  clientName: string;
  matterType: string;
  urgency: string;
  dateSubmitted: string;
  status: string;
  location: string;
  phone: string;
  email: string;
  narration: string;
  opposingParties: string[];
  documents: string[];
  chronology: string[];
  missingQuestions: string[];
  riskFlags: string[];
  conflictParties: RealConflictParty[];
  legalDocumentAcceptances: RealLegalAcceptance[];
};

function formatDate(value?: string) {
  if (!value) return 'Not recorded';
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function fromReal(intake: RealIntake): DetailRecord {
  return {
    id: intake.id,
    referenceNumber: intake.referenceNumber,
    clientName: intake.fullName,
    matterType: intake.matterType,
    urgency: intake.urgency,
    dateSubmitted: formatDate(intake.submittedAt),
    status: intake.status,
    location: intake.location ?? 'Not supplied',
    phone: intake.phone,
    email: intake.email ?? 'Not supplied',
    narration: intake.narration ?? 'No narration supplied.',
    opposingParties: intake.conflictParties.map((party) => party.name),
    documents: ['Secure document upload will be connected in Stage 5E.'],
    chronology: [
      'Real intake submission saved to the database.',
      'Conflict parties and legal-document acceptances are attached to the record.',
      'Lawyer review, missing questions, and chronology can now be persisted in later stages.'
    ],
    missingQuestions: [
      'What documents should the client provide first?',
      'Is consultation required before acceptance?',
      'Are there any conflict-check names still missing?'
    ],
    riskFlags: intake.urgency.toLowerCase().includes('police') || intake.urgency.toLowerCase().includes('court') ? ['Time-sensitive review'] : ['Preliminary review required'],
    conflictParties: intake.conflictParties,
    legalDocumentAcceptances: intake.legalDocumentAcceptances
  };
}

function fromMock(id: string): DetailRecord | null {
  const mock = intakeSubmissions.find((item) => item.id === id) ?? intakeSubmissions[0];
  if (!mock) return null;

  return {
    ...mock,
    referenceNumber: mock.id,
    clientName: mock.clientName,
    status: mock.status,
    conflictParties: mock.opposingParties.map((name, index) => ({ id: `${mock.id}-${index}`, name, role: 'Demo opposing party' })),
    legalDocumentAcceptances: []
  };
}

export function AdminIntakeDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [record, setRecord] = useState<DetailRecord | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function loadDetail() {
      try {
        const response = await fetch(`/api/intake/${id}`, { cache: 'no-store' });
        const payload = await response.json();

        if (!alive) return;

        if (response.status === 401) {
          router.replace('/client-room/admin/login');
          return;
        }

        if (!response.ok || payload.demoMode) {
          setDemoMode(true);
          setRecord(fromMock(id));
          return;
        }

        setRecord(fromReal(payload.intake));
        setDemoMode(false);
      } catch (error) {
        if (!alive) return;
        setDemoMode(true);
        setRecord(fromMock(id));
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadDetail();

    return () => {
      alive = false;
    };
  }, [id]);

  async function updateStatus(status: string) {
    if (demoMode || !record) {
      setMessage('Status changes require DATABASE_URL and a real database connection.');
      return;
    }

    setStatusUpdating(status);
    setMessage(null);

    try {
      const response = await fetch(`/api/intake/${record.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message ?? 'Status update failed.');
      }

      setRecord((current) => (current ? { ...current, status: payload.intake.status } : current));
      setMessage(`Status updated to ${payload.intake.status.replaceAll('_', ' ')}.`);
    } catch (error) {
      setMessage('Status update could not be saved. Check database configuration and API logs.');
    } finally {
      setStatusUpdating(null);
    }
  }

  const acceptedDocuments = useMemo(() => record?.legalDocumentAcceptances ?? [], [record]);

  if (loading) {
    return <div className="rounded-3xl border border-ink/10 bg-white/65 p-6 text-sm text-ink/60">Loading intake detail…</div>;
  }

  if (!record) {
    return <EmptyState title="Intake not found" note="No matching intake record was available from the database or demo fallback." />;
  }

  return (
    <>
      {demoMode ? <div className="mb-8"><DemoModeBanner /></div> : null}
      <div className="mb-9 flex flex-wrap items-start justify-between gap-5">
        <div>
          <SectionLabel>Intake summary</SectionLabel>
          <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">{record.clientName}</h1>
          <p className="mt-4 text-base text-ink/55">{record.referenceNumber} · {record.matterType} · {record.location}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <StatusBadge label="Signed in office session" />
          <StatusBadge label={record.status.replaceAll('_', ' ')} />
          <Link href="/client-room/admin" className="rounded-full border border-ink/10 bg-white/60 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">Back to desk</Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-6">
          <article className="matter-paper rounded-[2rem] border border-ink/10 p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Client narration</p>
            <p className="mt-5 text-base leading-8 text-ink/72">{record.narration}</p>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white/72 p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Parties and conflict check</p>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <InfoTile label="Recorded parties" value={record.conflictParties.length ? record.conflictParties.map((party) => `${party.name}${party.role ? ` (${party.role})` : ''}`).join(', ') : 'No parties recorded'} />
              <InfoTile label="Institution / location" value={record.location} />
              <InfoTile label="Matter type" value={record.matterType} />
              <InfoTile label="Urgency" value={record.urgency} />
            </div>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white/72 p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">AI-organised chronology placeholder</p>
            <div className="mt-5 space-y-3">
              {record.chronology.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-2xl bg-parchment p-4 text-sm leading-6 text-ink/62">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-xs text-brass">{index + 1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white/72 p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Lawyer notes and status decision</p>
            <textarea rows={7} className="field-control mt-5 leading-6" placeholder="Internal office notes, legal route, missing documents, risk points, and next instruction." />
            <div className="mt-5 flex flex-wrap gap-2">
              {decisionStatuses.map((action) => (
                <button key={action} disabled={Boolean(statusUpdating)} onClick={() => updateStatus(action)} className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:opacity-50">
                  {statusUpdating === action ? 'Saving…' : action.replaceAll('_', ' ')}
                </button>
              ))}
            </div>
            {message ? <p className="mt-4 rounded-2xl bg-parchment p-4 text-sm text-ink/62">{message}</p> : null}
          </article>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-ink/10 bg-white/72 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Client details</p>
            <dl className="mt-5 space-y-4 text-sm">
              <Row label="Phone" value={record.phone} />
              <Row label="Email" value={record.email} />
              <Row label="Submitted" value={record.dateSubmitted} />
              <Row label="Urgency" value={record.urgency} />
              <Row label="Reference" value={record.referenceNumber} />
            </dl>
          </div>

          <NoticeBox title="Legal document acceptances">
            {acceptedDocuments.length ? (
              <ul className="list-disc space-y-2 pl-5">
                {acceptedDocuments.map((item) => <li key={item.id}>{item.documentSlug} · {formatDate(item.acceptedAt)}</li>)}
              </ul>
            ) : (
              <p>No database acceptance records are available in demo mode.</p>
            )}
          </NoticeBox>

          <NoticeBox title="Missing facts/questions">
            <ul className="list-disc space-y-2 pl-5">
              {record.missingQuestions.map((question) => <li key={question}>{question}</li>)}
            </ul>
          </NoticeBox>

          <NoticeBox title="Risk flags" tone="warning">
            <ul className="list-disc space-y-2 pl-5">
              {record.riskFlags.map((flag) => <li key={flag}>{flag}</li>)}
            </ul>
          </NoticeBox>

          <NoticeBox title="Internal AI boundary" tone="dark">
            Internal note: AI-organised material is an aid to review only. Lawyer judgment controls all legal conclusions, advice, and filings. <Link href="/client-room/legal/ai-assisted-organisation" className="font-bold text-brass hover:text-vellum">Read AI notice</Link>.
          </NoticeBox>

          <NoticeBox title="Decision document map">
            If accepted, use the <Link href="/client-room/legal/engagement-letter" className="font-bold text-brass hover:text-ink">Engagement Letter</Link>. If declined, use the <Link href="/client-room/legal/non-engagement-notice" className="font-bold text-brass hover:text-ink">Non-Engagement Notice</Link>. Filing expenses require the <Link href="/client-room/legal/filing-expense-instruction" className="font-bold text-brass hover:text-ink">Filing Expense Instruction</Link>.
          </NoticeBox>

          <div className="rounded-[2rem] border border-ink/10 bg-white/72 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Documents received</p>
            <div className="mt-5 space-y-3">
              {record.documents.map((document) => (
                <div key={document} className="rounded-2xl border border-ink/10 bg-white/72 p-4 text-sm text-ink/62">{document}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-ink/10 pb-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{label}</dt>
      <dd className="mt-1 text-ink/70">{value}</dd>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-parchment p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink/70">{value}</p>
    </div>
  );
}

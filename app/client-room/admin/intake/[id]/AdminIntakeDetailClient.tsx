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
  'ENGAGEMENT_PENDING'
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

type RealMatter = {
  id: string;
  matterCode: string;
  title: string;
  matterType: string;
  status: string;
  createdAt: string;
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
  matter?: RealMatter | null;
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
  documents: string[];
  chronology: string[];
  missingQuestions: string[];
  riskFlags: string[];
  conflictParties: RealConflictParty[];
  legalDocumentAcceptances: RealLegalAcceptance[];
  matter?: RealMatter | null;
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
    documents: ['Secure document upload will be connected in Stage 5E.'],
    chronology: [
      'Real intake submission saved to the database.',
      'Conflict parties and legal-document acceptances are attached to the record.',
      'Lawyer review determines whether to request clarification, consult, decline, or accept.'
    ],
    missingQuestions: ['Confirm all opposing parties.', 'Confirm limitation/deadline risks.', 'Confirm whether engagement terms have been accepted.'],
    riskFlags: intake.urgency.toLowerCase().includes('police') || intake.urgency.toLowerCase().includes('court') ? ['Time-sensitive matter'] : ['Lawyer review required'],
    conflictParties: intake.conflictParties,
    legalDocumentAcceptances: intake.legalDocumentAcceptances,
    matter: intake.matter ?? null
  };
}

function demoRecord(id: string): DetailRecord | null {
  const record = intakeSubmissions.find((item) => item.id === id) ?? intakeSubmissions[0];
  if (!record) return null;
  return {
    id: record.id,
    referenceNumber: (record as any).referenceNumber ?? record.id,
    clientName: record.clientName,
    matterType: record.matterType,
    urgency: record.urgency,
    dateSubmitted: record.dateSubmitted,
    status: record.status,
    location: record.location,
    phone: record.phone ?? 'Demo phone',
    email: record.email ?? 'Demo email',
    narration: record.narration,
    documents: ['Demo document placeholder'],
    chronology: ['Demo intake received.', 'Demo conflict check pending.', 'Demo lawyer decision required.'],
    missingQuestions: ['What is the exact date of the event?', 'Who are all opposing parties?', 'Which documents are available?'],
    riskFlags: record.riskFlags ?? ['Demo risk review'],
    conflictParties: [],
    legalDocumentAcceptances: []
  };
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{label}</p>
      <p className="mt-2 text-sm leading-6 text-ink/70">{value}</p>
    </div>
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

export function AdminIntakeDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [record, setRecord] = useState<DetailRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [decisionLoading, setDecisionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [matterCode, setMatterCode] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function loadRecord() {
      try {
        const response = await fetch(`/api/intake/${id}`, { cache: 'no-store' });
        const payload = await response.json();

        if (!alive) return;

        if (response.status === 401) {
          router.replace('/client-room/admin/login');
          return;
        }

        if (!response.ok || payload.demoMode || !payload.intake) {
          setDemoMode(true);
          setRecord(demoRecord(id));
          return;
        }

        const detail = fromReal(payload.intake);
        setRecord(detail);
        setMatterCode(detail.matter?.matterCode ?? null);
        setDemoMode(false);
      } catch (error) {
        if (!alive) return;
        setDemoMode(true);
        setRecord(demoRecord(id));
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadRecord();
    return () => {
      alive = false;
    };
  }, [id, router]);

  const acceptedDocuments = useMemo(() => record?.legalDocumentAcceptances ?? [], [record]);

  async function updateStatus(status: string) {
    if (!record) return;
    setStatusUpdating(status);
    setMessage('');

    try {
      const response = await fetch(`/api/intake/${record.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message ?? 'Status update failed.');
        return;
      }

      setRecord({ ...record, status: payload.intake.status });
      setMessage(`Status updated to ${payload.intake.status.replaceAll('_', ' ')}.`);
    } catch {
      setMessage('Status update failed.');
    } finally {
      setStatusUpdating(null);
    }
  }

  async function updateDecision(status: string) {
    if (!record) return;
    setDecisionLoading(status);
    setMessage('');

    try {
      const response = await fetch(`/api/intake/${record.id}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decision: status })
      });
      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message ?? 'Decision update failed.');
        return;
      }

      setRecord({ ...record, status: payload.intake.status });
      setMessage(`Decision updated to ${payload.intake.status.replaceAll('_', ' ')}.`);
    } catch {
      setMessage('Decision update failed.');
    } finally {
      setDecisionLoading(null);
    }
  }

  async function acceptMatter() {
    if (!record) return;
    setDecisionLoading('ACCEPT');
    setMessage('');

    try {
      const response = await fetch(`/api/intake/${record.id}/accept`, { method: 'POST' });
      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message ?? 'Matter acceptance failed.');
        if (payload.matterCode) setMatterCode(payload.matterCode);
        return;
      }

      setMatterCode(payload.matter.matterCode);
      setRecord({ ...record, status: 'ACCEPTED', matter: payload.matter });
      setMessage(`Matter opened. Code: ${payload.matter.matterCode}`);
    } catch {
      setMessage('Matter acceptance failed.');
    } finally {
      setDecisionLoading(null);
    }
  }

  async function declineIntake() {
    if (!record) return;
    setDecisionLoading('DECLINE');
    setMessage('');

    try {
      const response = await fetch(`/api/intake/${record.id}/decline`, { method: 'POST' });
      const payload = await response.json();

      if (!response.ok) {
        setMessage(payload.message ?? 'Decline decision failed.');
        return;
      }

      setRecord({ ...record, status: payload.status });
      setMessage('Intake declined. Issue a non-engagement notice where appropriate.');
    } catch {
      setMessage('Decline decision failed.');
    } finally {
      setDecisionLoading(null);
    }
  }

  async function copyMatterCode() {
    if (!matterCode) return;
    await navigator.clipboard.writeText(matterCode);
    setMessage('Matter code copied. Issue this code only after office approval or engagement confirmation.');
  }

  if (loading) return <div className="rounded-3xl border border-ink/10 bg-white/60 p-6 text-ink/60">Loading intake detail…</div>;
  if (!record) return <EmptyState title="Intake not found" note="No intake record could be loaded." />;

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-start justify-between gap-5">
        <div>
          <SectionLabel>Intake summary view</SectionLabel>
          <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">{record.clientName}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/55">
            Reference {record.referenceNumber}. This review screen is for conflict check, missing facts, consultation routing, acceptance, decline, and matter-code creation.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <StatusBadge label="Signed in office session" />
          <StatusBadge label={record.status.replaceAll('_', ' ')} />
          <Link href="/client-room/admin" className="rounded-full border border-ink/10 bg-white/60 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">Back to desk</Link>
        </div>
      </div>

      {demoMode ? <div className="mb-8"><DemoModeBanner /></div> : null}

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-6">
          <article className="matter-paper rounded-[2rem] border border-ink/10 p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Client narration</p>
            <p className="mt-5 text-base leading-8 text-ink/72">{record.narration}</p>
          </article>

          <article className="rounded-[2rem] border border-ink/10 bg-white/72 p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Decision panel</p>
            <h2 className="mt-3 font-display text-3xl text-ink">Accept, decline, or route this intake.</h2>
            <p className="mt-3 text-sm leading-7 text-ink/55">Matter code is issued only after office acceptance. It is not a filing confirmation and should be given only after engagement confirmation or office approval.</p>

            {matterCode ? (
              <div className="mt-6 rounded-3xl border border-brass/30 bg-brass/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">Created matter code</p>
                <p className="mt-2 font-display text-3xl text-ink">{matterCode}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={copyMatterCode} className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-vellum hover:bg-slateblue">Copy code</button>
                  <Link href={`/client-room/admin/matter/${matterCode}`} className="rounded-full border border-ink/10 bg-white/70 px-4 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">Open matter</Link>
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-2">
              {decisionStatuses.map((action) => (
                <button key={action} disabled={Boolean(decisionLoading)} onClick={() => updateDecision(action)} className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass disabled:cursor-not-allowed disabled:opacity-50">
                  {decisionLoading === action ? 'Saving…' : action.replaceAll('_', ' ')}
                </button>
              ))}
              <button disabled={Boolean(decisionLoading) || Boolean(matterCode)} onClick={acceptMatter} className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-vellum hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-50">
                {decisionLoading === 'ACCEPT' ? 'Creating matter…' : 'Accept and create matter'}
              </button>
              <button disabled={Boolean(decisionLoading) || Boolean(matterCode)} onClick={declineIntake} className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:border-red-300 disabled:cursor-not-allowed disabled:opacity-50">
                {decisionLoading === 'DECLINE' ? 'Declining…' : 'Decline intake'}
              </button>
            </div>

            <textarea rows={5} className="field-control mt-5 leading-6" placeholder="Internal office notes, legal route, missing documents, risk points, and next instruction." />
            {message ? <p className="mt-4 rounded-2xl bg-parchment p-4 text-sm text-ink/62">{message}</p> : null}
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
        </aside>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminIntakeCard, type AdminCardIntake } from '@/components/AdminIntakeCard';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { intakeSubmissions } from '@/lib/mock-data';

const baseMetrics = [
  ['New submissions', '0', 'Fresh records awaiting triage'],
  ['Conflict checks pending', '0', 'Parties require office screening'],
  ['Urgent reviews', '0', 'Police, court, or time-sensitive flags'],
  ['Consultation required', '0', 'Matters likely needing lawyer interview'],
  ['Accepted matters', '0', 'Controlled files already opened'],
  ['Awaiting client action', '0', 'Documents or clarification pending']
];

type ApiMatterSummary = {
  id: string;
  matterCode: string;
  title: string;
  matterType: string;
  status: string;
  createdAt: string;
  intakeSubmission?: { fullName: string; referenceNumber: string } | null;
};

type ApiIntakeSummary = {
  id: string;
  referenceNumber: string;
  fullName: string;
  phone: string;
  email?: string | null;
  location?: string | null;
  matterType: string;
  urgency: string;
  status: string;
  submittedAt: string;
  conflictPartyCount: number;
  narration?: string | null;
};

function formatDate(value?: string) {
  if (!value) return 'Not recorded';
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function normaliseRecord(record: ApiIntakeSummary): AdminCardIntake {
  return {
    id: record.id,
    referenceNumber: record.referenceNumber,
    clientName: record.fullName,
    matterType: record.matterType,
    urgency: record.urgency,
    dateSubmitted: formatDate(record.submittedAt),
    opposingParties: [],
    conflictPartyCount: record.conflictPartyCount,
    status: record.status,
    location: record.location ?? 'Not supplied',
    phone: record.phone,
    email: record.email ?? undefined,
    narration: record.narration ?? '',
    riskFlags: record.urgency.toLowerCase().includes('police') || record.urgency.toLowerCase().includes('court') ? ['Time-sensitive'] : []
  };
}

function demoRecords(): AdminCardIntake[] {
  return intakeSubmissions.map((item) => ({ ...item }));
}

export function AdminDashboardClient() {
  const router = useRouter();
  const [records, setRecords] = useState<AdminCardIntake[]>(demoRecords());
  const [demoMode, setDemoMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [matters, setMatters] = useState<ApiMatterSummary[]>([]);

  useEffect(() => {
    let alive = true;

    async function loadMatters() {
      try {
        const response = await fetch('/api/matters', { cache: 'no-store' });
        const payload = await response.json();
        if (!alive) return;
        if (response.ok) setMatters(payload.matters ?? []);
      } catch {
        if (alive) setMatters([]);
      }
    }

    async function loadIntakes() {
      try {
        const response = await fetch('/api/intake', { cache: 'no-store' });
        const payload = await response.json();

        if (!alive) return;

        if (response.status === 401) {
          router.replace('/client-room/admin/login');
          return;
        }

        if (!response.ok || payload.demoMode) {
          setDemoMode(true);
          setRecords(demoRecords());
          return;
        }

        setRecords((payload.intakes ?? []).map(normaliseRecord));
        setDemoMode(false);
      } catch (error) {
        if (!alive) return;
        setDemoMode(true);
        setRecords(demoRecords());
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadIntakes();
    loadMatters();

    return () => {
      alive = false;
    };
  }, []);

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/client-room/admin/login');
    router.refresh();
  }

  const metrics = useMemo(() => {
    const total = records.length;
    const conflict = records.filter((record) => record.status.includes('CONFLICT')).length;
    const urgent = records.filter((record) => record.urgency.toLowerCase().includes('urgent') || record.urgency.toLowerCase().includes('police') || record.urgency.toLowerCase().includes('court')).length;
    const consultation = records.filter((record) => record.status.includes('CONSULTATION') || record.status.includes('consultation')).length;
    const accepted = Math.max(records.filter((record) => record.status.includes('ACCEPTED') || record.status.includes('Accepted')).length, matters.length);

    return [
      ['New submissions', String(total), 'Fresh records awaiting triage'],
      ['Conflict checks pending', String(conflict), 'Parties require office screening'],
      ['Urgent reviews', String(urgent), 'Police, court, or time-sensitive flags'],
      ['Consultation required', String(consultation), 'Matters likely needing lawyer interview'],
      ['Accepted matters', String(accepted), 'Controlled files already opened'],
      ['Awaiting client action', String(matters.filter((matter) => matter.status.includes('AWAITING_CLIENT_ACTION')).length), 'Documents or clarification pending']
    ];
  }, [records, matters]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
        <div>
          <SectionLabel>Office review dashboard</SectionLabel>
          <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">The lawyer’s command desk.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink/55">
            A database-ready control room for triage, conflict check, consultation routing, acceptance, decline, document review, and matter-room creation.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge label="Signed in office session" />
          <StatusBadge label={demoMode ? 'Demo fallback' : 'Database-backed'} />
          <Link href="/client-room/admin/matters" className="rounded-full border border-ink/10 bg-white/65 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">Accepted Matters</Link>
          <Link href="/client-room/legal" className="rounded-full border border-ink/10 bg-white/65 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">Legal Pack</Link>
          <button onClick={signOut} className="rounded-full border border-ink/10 bg-navy px-5 py-2 text-sm font-semibold text-vellum hover:bg-ink">Sign out</button>
        </div>
      </div>

      {demoMode ? <div className="mb-8"><DemoModeBanner /></div> : null}
      {loading ? <div className="mb-8 rounded-3xl border border-ink/10 bg-white/60 p-5 text-sm text-ink/60">Loading intake submissions…</div> : null}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {(demoMode ? baseMetrics : metrics).map(([label, value, note]) => (
          <article key={label} className="rounded-3xl border border-ink/10 bg-white/62 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brass">{label}</p>
            <h2 className="mt-3 font-display text-4xl text-ink">{value}</h2>
            <p className="mt-2 text-xs leading-5 text-ink/50">{note}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 grid gap-3 rounded-[2rem] border border-ink/10 bg-white/55 p-4 md:grid-cols-3 lg:grid-cols-6">
        {['New', 'Urgent', 'Conflict check', 'Consultation', 'Accepted', 'Declined'].map((filter) => (
          <button key={filter} className="rounded-full border border-ink/10 bg-white/65 px-4 py-2 text-sm font-semibold text-ink/60 hover:border-brass hover:text-brass">
            {filter}
          </button>
        ))}
      </div>


      <section className="mt-10 rounded-[2rem] border border-ink/10 bg-white/65 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Recently accepted matters</p>
            <h2 className="mt-2 font-display text-3xl text-ink">Matter-code register preview.</h2>
          </div>
          <Link href="/client-room/admin/matters" className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-vellum hover:bg-slateblue">View all matters</Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {matters.slice(0, 3).map((matter) => (
            <Link key={matter.id} href={`/client-room/admin/matter/${matter.matterCode}`} className="rounded-3xl border border-ink/10 bg-parchment p-4 text-sm text-ink/65 hover:border-brass">
              <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-brass">{matter.matterCode}</span>
              <span className="mt-2 block font-semibold text-ink">{matter.title}</span>
              <span className="mt-1 block text-ink/50">{matter.status.replaceAll('_', ' ')}</span>
            </Link>
          ))}
          {!matters.length ? <p className="rounded-3xl border border-ink/10 bg-parchment p-4 text-sm text-ink/55 md:col-span-3">No accepted matters have been created yet.</p> : null}
        </div>
      </section>

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        {records.map((intake) => <AdminIntakeCard key={intake.id} intake={intake} />)}
      </section>
    </section>
  );
}

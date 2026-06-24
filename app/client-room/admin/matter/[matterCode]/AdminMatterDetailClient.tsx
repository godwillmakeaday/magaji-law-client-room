'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { NoticeBox } from '@/components/NoticeBox';
import { StatusBadge } from '@/components/StatusBadge';

type MatterDetail = {
  id: string;
  matterCode: string;
  title: string;
  matterType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  intakeSubmission?: {
    id: string;
    referenceNumber: string;
    fullName: string;
    phone: string;
    email?: string | null;
    urgency: string;
    status: string;
  } | null;
};

function formatDate(value?: string) {
  if (!value) return 'Not recorded';
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export function AdminMatterDetailClient({ matterCode }: { matterCode: string }) {
  const router = useRouter();
  const [matter, setMatter] = useState<MatterDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let alive = true;

    async function loadMatter() {
      try {
        const response = await fetch(`/api/matter/${matterCode}`, { cache: 'no-store' });
        const payload = await response.json();

        if (!alive) return;

        if (response.status === 401) {
          router.replace('/client-room/admin/login');
          return;
        }

        if (!response.ok) {
          setMessage(payload.message ?? 'Matter could not be loaded.');
          return;
        }

        setMatter(payload.matter);
      } catch {
        if (!alive) return;
        setMessage('Matter could not be loaded.');
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadMatter();
    return () => { alive = false; };
  }, [matterCode, router]);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-5">
          <div>
            <SectionLabel>Admin matter detail</SectionLabel>
            <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">{matter?.title ?? matterCode}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/55">Protected office-only matter view. Future stages will add documents, invoices, engagement letters, messages, and audit trails.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/client-room/admin/matters" className="rounded-full border border-ink/10 bg-white/60 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">All matters</Link>
            <Link href="/client-room/admin" className="rounded-full border border-ink/10 bg-white/60 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">Office desk</Link>
          </div>
        </div>

        {loading ? <p className="rounded-3xl border border-ink/10 bg-white/70 p-5 text-sm text-ink/60">Loading matter…</p> : null}
        {message ? <p className="rounded-3xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">{message}</p> : null}

        {matter ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <section className="rounded-[2rem] border border-ink/10 bg-white/72 p-7 shadow-institution">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Matter identity</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <StatusBadge label={matter.status.replaceAll('_', ' ')} />
                <span className="rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-xs font-semibold text-ink/55">{matter.matterCode}</span>
              </div>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                <Info label="Matter code" value={matter.matterCode} />
                <Info label="Matter type" value={matter.matterType} />
                <Info label="Created" value={formatDate(matter.createdAt)} />
                <Info label="Updated" value={formatDate(matter.updatedAt)} />
                <Info label="Client" value={matter.intakeSubmission?.fullName ?? 'Not linked'} />
                <Info label="Reference" value={matter.intakeSubmission?.referenceNumber ?? 'Not linked'} />
              </div>

              {matter.intakeSubmission ? (
                <Link href={`/client-room/admin/intake/${matter.intakeSubmission.id}`} className="mt-7 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-vellum hover:bg-slateblue">Open linked intake</Link>
              ) : null}
            </section>

            <aside className="space-y-5">

              <NoticeBox title="Client access" tone="dark">
                <div className="space-y-2 text-sm leading-7">
                  <p>Existing-client access now uses matter code, registered contact verification, OTP, and a secure session.</p>
                  <p><strong>Registered phone:</strong> {maskContact(matter.intakeSubmission?.phone)}</p>
                  <p><strong>Registered email:</strong> {maskContact(matter.intakeSubmission?.email ?? '')}</p>
                  <p>Do not issue or re-issue the matter code before engagement confirmation or office approval.</p>
                </div>
              </NoticeBox>
              <NoticeBox title="Future documents">
                Engagement letters, filing instructions, receipts, uploaded evidence, and office messages will be connected in later backend stages.
              </NoticeBox>
              <NoticeBox title="Client access boundary" tone="warning">
                Existing-client matter-code access shows only a limited safe summary. Narration, conflict details, opposing party names, and internal notes remain admin-only.
              </NoticeBox>
              <NoticeBox title="Matter-code instruction" tone="dark">
                Issue matter code only after acceptance and office approval. It is not proof of filing and not a substitute for engagement documentation.
              </NoticeBox>
            </aside>
          </div>
        ) : null}
      </section>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-parchment p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{label}</p>
      <p className="mt-2 text-sm font-semibold text-ink/70">{value}</p>
    </div>
  );
}


function maskContact(value: string | null | undefined) {
  const normalized = (value ?? '').toLowerCase().replace(/\s+/g, '').trim();
  if (!normalized) return 'Not recorded';
  if (normalized.includes('@')) {
    const [name, domain] = normalized.split('@');
    return `${name.slice(0, 2)}***@${domain ?? 'email'}`;
  }
  if (normalized.length <= 4) return '***';
  return `${normalized.slice(0, 3)}***${normalized.slice(-3)}`;
}

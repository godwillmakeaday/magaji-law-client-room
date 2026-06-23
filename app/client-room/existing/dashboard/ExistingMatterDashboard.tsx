'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ClientDashboardCard } from '@/components/ClientDashboardCard';
import { NoticeBox } from '@/components/NoticeBox';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';

type SafeMatterSummary = {
  matterCode: string;
  title: string;
  matterType: string;
  status: string;
  nextOfficeAction?: string;
  clientActionRequired?: string;
  createdAt?: string;
};

export function ExistingMatterDashboard() {
  const [matter, setMatter] = useState<SafeMatterSummary | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('mglMatterSummary');
    if (stored) {
      try {
        setMatter(JSON.parse(stored) as SafeMatterSummary);
      } catch {
        sessionStorage.removeItem('mglMatterSummary');
      }
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <PageShell><section className="mx-auto max-w-5xl px-5 py-20 text-ink/60">Loading matter room…</section></PageShell>;
  }

  if (!matter) {
    return (
      <PageShell>
        <section className="mx-auto max-w-3xl px-5 py-20">
          <div className="rounded-[2rem] border border-ink/10 bg-white/72 p-8 shadow-institution">
            <SectionLabel>Existing client dashboard</SectionLabel>
            <h1 className="mt-4 font-display text-4xl text-ink">Matter access required.</h1>
            <p className="mt-4 text-sm leading-7 text-ink/55">No verified matter summary is available in this browser session. Please enter your matter code and registered contact detail again.</p>
            <Link href="/client-room/existing" className="mt-6 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-vellum hover:bg-slateblue">Return to matter access</Link>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
          <div>
            <SectionLabel>Existing client dashboard</SectionLabel>
            <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">{matter.title}</h1>
            <div className="mt-5 flex flex-wrap gap-3">
              <StatusBadge label={matter.status.replaceAll('_', ' ')} />
              <span className="rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-xs font-semibold text-ink/55">{matter.matterCode}</span>
            </div>
          </div>
          <Link href="/client-room/existing" className="rounded-full border border-ink/10 bg-white/60 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">
            Exit matter room
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <ClientDashboardCard title="Current status" value={matter.status.replaceAll('_', ' ')} note="Office-controlled matter status." />
          <ClientDashboardCard title="Matter type" value={matter.matterType} note="Controlled classification from intake." />
          <ClientDashboardCard title="Next office action" value="Office review" note={matter.nextOfficeAction ?? 'The office will communicate the next action directly.'} />
          <ClientDashboardCard title="Client action required" value="Watch for request" note={matter.clientActionRequired ?? 'Provide additional documents only when requested by the office.'} emphasis />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="space-y-6 rounded-[2rem] border border-ink/10 bg-white/72 p-6 shadow-institution">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Limited matter status</p>
              <h2 className="mt-3 font-display text-3xl text-ink">Controlled matter access bridge.</h2>
              <p className="mt-3 text-sm leading-7 text-ink/55">This page shows limited status information only. It does not expose intake narration, conflict parties, legal acceptances, admin notes, or evidence records.</p>
            </div>

            <div className="grid gap-4 rounded-[1.7rem] border border-ink/10 bg-parchment p-5 md:grid-cols-2">
              <Info label="Matter code" value={matter.matterCode} />
              <Info label="Matter type" value={matter.matterType} />
              <Info label="Status" value={matter.status.replaceAll('_', ' ')} />
              <Info label="Created" value={matter.createdAt ? new Date(matter.createdAt).toLocaleString() : 'Recorded by office'} />
            </div>
          </section>

          <aside className="space-y-5">
            <NoticeBox title="Formal office confirmation controls">
              This dashboard shows limited matter status only. Formal advice, filings, engagement commitments, expenses, and deadlines must be confirmed by the office.
            </NoticeBox>
            <NoticeBox title="No filing without instruction" tone="warning">
              A matter code is not proof that a case has been filed. Filing expenses require engagement, settled documents, office instruction, and specific filing confirmation.
            </NoticeBox>
            <NoticeBox title="Matter-code protection" tone="dark">
              Do not share your matter code. This temporary access model will later be replaced by OTP/session authentication.
            </NoticeBox>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{label}</p>
      <p className="mt-2 text-sm font-semibold text-ink/70">{value}</p>
    </div>
  );
}

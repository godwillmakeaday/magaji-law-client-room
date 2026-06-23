'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';

type MatterSummary = {
  id: string;
  matterCode: string;
  title: string;
  matterType: string;
  status: string;
  createdAt: string;
  intakeSubmission?: {
    fullName: string;
    referenceNumber: string;
    phone?: string | null;
    email?: string | null;
  } | null;
};

function formatDate(value?: string) {
  if (!value) return 'Not recorded';
  return new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

export function AdminMattersClient() {
  const router = useRouter();
  const [matters, setMatters] = useState<MatterSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    let alive = true;

    async function loadMatters() {
      try {
        const response = await fetch('/api/matters', { cache: 'no-store' });
        const payload = await response.json();

        if (!alive) return;

        if (response.status === 401) {
          router.replace('/client-room/admin/login');
          return;
        }

        if (!response.ok) {
          setDemoMode(true);
          setMatters([]);
          return;
        }

        setMatters(payload.matters ?? []);
      } catch {
        if (!alive) return;
        setDemoMode(true);
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadMatters();
    return () => { alive = false; };
  }, [router]);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-5">
          <div>
            <SectionLabel>Accepted matters</SectionLabel>
            <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">Matter code register.</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/55">A protected office list of intake submissions converted into accepted matters with matter codes.</p>
          </div>
          <Link href="/client-room/admin" className="rounded-full border border-ink/10 bg-white/60 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">Back to desk</Link>
        </div>

        {demoMode ? <div className="mb-8"><DemoModeBanner /></div> : null}
        {loading ? <p className="rounded-3xl border border-ink/10 bg-white/70 p-5 text-sm text-ink/60">Loading matters…</p> : null}

        <div className="grid gap-5">
          {matters.map((matter) => (
            <article key={matter.id} className="rounded-[2rem] border border-ink/10 bg-white/72 p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brass">{matter.matterCode}</p>
                  <h2 className="mt-2 font-display text-3xl text-ink">{matter.title}</h2>
                  <p className="mt-2 text-sm text-ink/55">{matter.intakeSubmission?.fullName ?? 'Client'} · {matter.matterType} · {formatDate(matter.createdAt)}</p>
                </div>
                <StatusBadge label={matter.status.replaceAll('_', ' ')} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={`/client-room/admin/matter/${matter.matterCode}`} className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-vellum hover:bg-slateblue">Open matter</Link>
                {matter.intakeSubmission ? <span className="rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/60">Ref: {matter.intakeSubmission.referenceNumber}</span> : null}
              </div>
            </article>
          ))}

          {!loading && !matters.length ? (
            <div className="rounded-[2rem] border border-ink/10 bg-white/72 p-8 text-sm leading-7 text-ink/60">No accepted matters have been created yet. Open an intake detail and use “Accept and create matter.”</div>
          ) : null}
        </div>
      </section>
    </PageShell>
  );
}

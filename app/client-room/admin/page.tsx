import Link from 'next/link';
import { AdminIntakeCard } from '@/components/AdminIntakeCard';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { intakeSubmissions } from '@/lib/mock-data';

const metrics = [
  ['New submissions', '12', 'Fresh records awaiting triage'],
  ['Conflict checks pending', '5', 'Parties require office screening'],
  ['Urgent reviews', '3', 'Police, court, or time-sensitive flags'],
  ['Consultation required', '7', 'Matters likely needing lawyer interview'],
  ['Accepted matters', '9', 'Controlled files already opened'],
  ['Awaiting client action', '4', 'Documents or clarification pending']
];

export default function AdminPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>
            <SectionLabel>Office review dashboard</SectionLabel>
            <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">The lawyer’s command desk.</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-ink/55">
              A front-end mock control room for triage, conflict check, consultation routing, acceptance, decline, document review, and matter-room creation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge label="Front-end demo only" />
            <Link href="/client-room/legal" className="rounded-full border border-ink/10 bg-white/65 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">Legal Pack</Link>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {metrics.map(([label, value, note]) => (
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

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {intakeSubmissions.map((intake) => <AdminIntakeCard key={intake.id} intake={intake} />)}
        </section>
      </section>
    </PageShell>
  );
}

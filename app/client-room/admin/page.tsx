import { AdminIntakeCard } from '@/components/AdminIntakeCard';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { intakeSubmissions } from '@/lib/mock-data';

const metrics = [
  ['New intake submissions', '12'],
  ['Urgent matters', '3'],
  ['Conflict check required', '5'],
  ['Awaiting consultation', '7']
];

export default function AdminPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>
            <SectionLabel>Office review dashboard</SectionLabel>
            <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">The lawyer’s command desk.</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-ink/50">
              A front-end mock dashboard for triage, conflict check, consultation routing, acceptance, decline, and matter-room creation.
            </p>
          </div>
          <StatusBadge label="Front-end demo only" />
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {metrics.map(([label, value]) => (
            <article key={label} className="rounded-3xl border border-ink/10 bg-white/60 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">{label}</p>
              <h2 className="mt-3 font-display text-4xl text-ink">{value}</h2>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 rounded-[2rem] border border-ink/10 bg-white/50 p-4 md:grid-cols-6">
          {['New', 'Urgent', 'Conflict check', 'Consultation', 'Accepted', 'Declined'].map((filter) => (
            <button key={filter} className="rounded-full border border-ink/10 bg-white/50 px-4 py-2 text-sm font-semibold text-ink/60 hover:border-brass hover:text-brass">
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

import Link from 'next/link';
import { EmptyState } from '@/components/EmptyState';
import { NoticeBox } from '@/components/NoticeBox';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { intakeSubmissions } from '@/lib/mock-data';

type IntakeSummaryPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return intakeSubmissions.map((intake) => ({ id: intake.id }));
}

export default function IntakeSummaryPage({ params }: IntakeSummaryPageProps) {
  const intake = intakeSubmissions.find((item) => item.id === params.id);

  if (!intake) {
    return (
      <PageShell>
        <section className="mx-auto max-w-5xl px-5 py-20 md:px-8">
          <EmptyState title="Intake not found" note="This demo contains only the mock intake records included in the project." />
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-9 flex flex-wrap items-start justify-between gap-5">
          <div>
            <SectionLabel>Intake summary</SectionLabel>
            <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">{intake.clientName}</h1>
            <p className="mt-4 text-base text-ink/50">{intake.id} · {intake.matterType} · {intake.location}</p>
          </div>
          <div className="flex gap-3">
            <StatusBadge label={intake.status} />
            <Link href="/client-room/admin" className="rounded-full border border-ink/10 bg-white/50 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">Back to desk</Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6">
            <article className="matter-paper rounded-[2rem] border border-ink/10 p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Client narration</p>
              <p className="mt-5 text-base leading-8 text-ink/70">{intake.narration}</p>
            </article>

            <article className="rounded-[2rem] border border-ink/10 bg-white/70 p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">AI-organised chronology placeholder</p>
              <div className="mt-5 space-y-3">
                {intake.chronology.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-2xl bg-parchment p-4 text-sm leading-6 text-ink/60">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-xs text-brass">{index + 1}</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-ink/10 bg-white/70 p-7 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Lawyer notes</p>
              <textarea rows={7} className="mt-5 w-full rounded-2xl border border-ink/10 bg-white/100 px-4 py-3 text-sm leading-6 outline-none focus:border-brass focus:ring-4 focus:ring-brass/10" placeholder="Internal office notes, legal route, missing documents, risk points, and next instruction." />
              <div className="mt-5 flex flex-wrap gap-2">
                {['Conflict check pending', 'Consultation required', 'Accepted', 'Declined'].map((action) => (
                  <button key={action} className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">{action}</button>
                ))}
              </div>
            </article>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-ink/10 bg-white/70 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Client details</p>
              <dl className="mt-5 space-y-4 text-sm">
                <Row label="Phone" value={intake.phone} />
                <Row label="Email" value={intake.email} />
                <Row label="Submitted" value={intake.dateSubmitted} />
                <Row label="Urgency" value={intake.urgency} />
                <Row label="Opposing parties" value={intake.opposingParties.join(', ')} />
              </dl>
            </div>

            <NoticeBox title="Missing questions">
              <ul className="list-disc space-y-2 pl-5">
                {intake.missingQuestions.map((question) => <li key={question}>{question}</li>)}
              </ul>
            </NoticeBox>

            <NoticeBox title="Risk flags" tone="warning">
              <ul className="list-disc space-y-2 pl-5">
                {intake.riskFlags.map((flag) => <li key={flag}>{flag}</li>)}
              </ul>
            </NoticeBox>

            <div className="rounded-[2rem] border border-ink/10 bg-white/70 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Uploaded documents</p>
              <div className="mt-5 space-y-3">
                {intake.documents.map((document) => (
                  <div key={document} className="rounded-2xl border border-ink/10 bg-white/70 p-4 text-sm text-ink/60">{document}</div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
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

import Link from 'next/link';
import type { IntakeSubmission } from '@/lib/types';
import { StatusBadge } from './StatusBadge';

export function AdminIntakeCard({ intake }: { intake: IntakeSubmission }) {
  return (
    <article className="rounded-[2rem] border border-ink/10 bg-white/72 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-institution">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brass">{intake.id}</p>
          <h3 className="mt-2 font-display text-2xl text-ink">{intake.clientName}</h3>
          <p className="mt-1 text-sm text-ink/60">{intake.matterType} · {intake.location}</p>
        </div>
        <StatusBadge label={intake.status} />
      </div>

      <div className="mt-4 grid gap-3 rounded-3xl bg-parchment p-4 text-sm text-ink/60">
        <div><span className="font-semibold text-ink">Urgency:</span> {intake.urgency}</div>
        <div><span className="font-semibold text-ink">Parties:</span> {intake.opposingParties.join(', ')}</div>
        <div><span className="font-semibold text-ink">Submitted:</span> {intake.dateSubmitted}</div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink/55">{intake.narration}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {intake.riskFlags.slice(0, 2).map((flag) => (
          <span key={flag} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800">
            {flag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link href={`/client-room/admin/intake/${intake.id}`} className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-vellum transition hover:bg-slateblue">
          Review intake
        </Link>
        <button className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">
          Conflict check
        </button>
        <button className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">
          Consultation
        </button>
      </div>
    </article>
  );
}

import Link from 'next/link';
import { StatusBadge } from './StatusBadge';

export type AdminCardIntake = {
  id: string;
  referenceNumber?: string;
  clientName: string;
  fullName?: string;
  matterType: string;
  urgency: string;
  dateSubmitted: string;
  submittedAt?: string;
  opposingParties: string[];
  conflictPartyCount?: number;
  status: string;
  location: string;
  phone?: string;
  email?: string;
  narration: string;
  riskFlags?: string[];
};

export function AdminIntakeCard({ intake }: { intake: AdminCardIntake }) {
  const identifier = intake.referenceNumber ?? intake.id;
  const displayName = intake.clientName || intake.fullName || 'Unnamed intake';
  const parties = intake.opposingParties.length
    ? intake.opposingParties.join(', ')
    : `${intake.conflictPartyCount ?? 0} conflict parties recorded`;

  return (
    <article className="rounded-[2rem] border border-ink/10 bg-white/72 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-institution">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brass">{identifier}</p>
          <h3 className="mt-2 font-display text-2xl text-ink">{displayName}</h3>
          <p className="mt-1 text-sm text-ink/60">{intake.matterType} · {intake.location || 'Location not supplied'}</p>
        </div>
        <StatusBadge label={intake.status.replaceAll('_', ' ')} />
      </div>

      <div className="mt-4 grid gap-3 rounded-3xl bg-parchment p-4 text-sm text-ink/60">
        <div><span className="font-semibold text-ink">Urgency:</span> {intake.urgency}</div>
        <div><span className="font-semibold text-ink">Parties:</span> {parties}</div>
        <div><span className="font-semibold text-ink">Submitted:</span> {intake.dateSubmitted}</div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink/55">{intake.narration || 'No narration was supplied in the summary view.'}</p>

      {intake.riskFlags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {intake.riskFlags.slice(0, 2).map((flag) => (
            <span key={flag} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800">
              {flag}
            </span>
          ))}
        </div>
      ) : null}

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

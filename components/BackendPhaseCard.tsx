type BackendPhaseCardProps = Readonly<{
  phase: string;
  title: string;
  status: string;
  description: string;
}>;

export function BackendPhaseCard({ phase, title, status, description }: BackendPhaseCardProps) {
  return (
    <article className="chamber-card rounded-3xl p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brass">{phase}</span>
        <span className="rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink/65">{status}</span>
      </div>
      <h3 className="mt-5 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-ink/58">{description}</p>
    </article>
  );
}

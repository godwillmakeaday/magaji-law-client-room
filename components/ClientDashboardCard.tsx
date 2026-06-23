type ClientDashboardCardProps = {
  title: string;
  value: string;
  note?: string;
};

export function ClientDashboardCard({ title, value, note }: ClientDashboardCardProps) {
  return (
    <article className="rounded-3xl border border-ink/10 bg-white/50 p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass">{title}</p>
      <h3 className="mt-3 font-display text-2xl text-ink">{value}</h3>
      {note ? <p className="mt-3 text-sm leading-6 text-ink/60">{note}</p> : null}
    </article>
  );
}

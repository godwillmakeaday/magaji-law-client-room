type ClientDashboardCardProps = {
  title: string;
  value: string;
  note?: string;
  emphasis?: boolean;
};

export function ClientDashboardCard({ title, value, note, emphasis = false }: ClientDashboardCardProps) {
  return (
    <article className={`rounded-3xl border p-6 shadow-sm ${emphasis ? 'border-brass/40 bg-navy text-vellum' : 'border-ink/10 bg-white/60 text-ink'}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${emphasis ? 'text-brass' : 'text-brass'}`}>{title}</p>
      <h3 className={`mt-3 font-display text-2xl ${emphasis ? 'text-vellum' : 'text-ink'}`}>{value}</h3>
      {note ? <p className={`mt-3 text-sm leading-6 ${emphasis ? 'text-vellum/65' : 'text-ink/60'}`}>{note}</p> : null}
    </article>
  );
}

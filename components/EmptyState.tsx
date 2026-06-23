export function EmptyState({ title, note }: { title: string; note: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-ink/20 bg-white/50 p-8 text-center">
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-ink/60">{note}</p>
    </div>
  );
}

type SecurityChecklistProps = Readonly<{
  items: readonly string[];
}>;

export function SecurityChecklist({ items }: SecurityChecklistProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="flex gap-3 rounded-2xl border border-brass/25 bg-navy p-4 text-vellum shadow-sm">
          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brass" />
          <p className="text-sm leading-6 text-vellum/72">{item}</p>
        </div>
      ))}
    </div>
  );
}

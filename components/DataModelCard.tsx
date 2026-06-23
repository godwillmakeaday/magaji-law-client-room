type DataModelCardProps = Readonly<{
  name: string;
  purpose: string;
  fields: readonly string[];
}>;

export function DataModelCard({ name, purpose, fields }: DataModelCardProps) {
  return (
    <article className="rounded-3xl border border-ink/10 bg-white/70 p-6 shadow-sm backdrop-blur">
      <h3 className="font-display text-2xl text-ink">{name}</h3>
      <p className="mt-3 text-sm leading-7 text-ink/55">{purpose}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {fields.map((field) => (
          <span key={field} className="rounded-full border border-ink/10 bg-vellum px-3 py-1 text-xs font-semibold text-ink/62">
            {field}
          </span>
        ))}
      </div>
    </article>
  );
}

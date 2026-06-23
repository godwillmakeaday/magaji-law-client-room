type OperationsSectionProps = Readonly<{
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}>;

export function OperationsSection({ eyebrow, title, description, children }: OperationsSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
      <div className="mb-8 max-w-3xl">
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass">{eyebrow}</p> : null}
        <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-5xl">{title}</h2>
        {description ? <p className="mt-4 text-base leading-8 text-ink/58">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

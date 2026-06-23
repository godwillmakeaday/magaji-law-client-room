type WorkflowStepCardProps = Readonly<{
  number: number;
  children: React.ReactNode;
}>;

export function WorkflowStepCard({ number, children }: WorkflowStepCardProps) {
  return (
    <article className="flex gap-4 rounded-3xl border border-ink/10 bg-white/64 p-5 shadow-sm backdrop-blur">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-brass">{number}</span>
      <p className="pt-1 text-sm font-semibold leading-7 text-ink/70">{children}</p>
    </article>
  );
}

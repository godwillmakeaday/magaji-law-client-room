type StepIndicatorProps = {
  steps: string[];
  current: number;
};

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="rounded-[1.6rem] border border-ink/10 bg-white/65 p-3 shadow-sm backdrop-blur">
      <p className="px-2 pb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-ink/45">Guided legal interview</p>
      <div className="grid gap-2 md:grid-cols-5 lg:grid-cols-1">
        {steps.map((step, index) => {
          const isActive = index === current;
          const isDone = index < current;

          return (
            <div
              key={step}
              className={`rounded-2xl px-3 py-3 text-xs font-semibold transition ${
                isActive
                  ? 'bg-navy text-vellum shadow-sm'
                  : isDone
                    ? 'bg-brass/20 text-navy'
                    : 'bg-white/60 text-ink/50'
              }`}
            >
              <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-full border border-current text-[10px]">
                {isDone ? '✓' : index + 1}
              </span>
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}

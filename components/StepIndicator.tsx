type StepIndicatorProps = {
  steps: string[];
  current: number;
};

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-white/50 p-3 shadow-sm">
      <div className="grid gap-2 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`rounded-2xl px-3 py-2 text-xs font-medium ${
              index === current
                ? 'bg-navy text-vellum'
                : index < current
                  ? 'bg-brass/20 text-navy'
                  : 'bg-white/50 text-ink/50'
            }`}
          >
            <span className="mr-2 inline-grid h-5 w-5 place-items-center rounded-full border border-current text-[10px]">
              {index + 1}
            </span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}

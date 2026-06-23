type UploadPanelProps = {
  title: string;
  description: string;
};

export function UploadPanel({ title, description }: UploadPanelProps) {
  return (
    <div className="rounded-3xl border border-dashed border-brass/70 bg-white/50 p-6 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-brass/30 bg-brass/10 text-brass">
        ↑
      </div>
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-ink/50">{description}</p>
      <label className="mt-5 inline-flex cursor-pointer rounded-full border border-ink/10 bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:border-brass hover:text-brass">
        Choose file
        <input type="file" className="sr-only" />
      </label>
      <p className="mt-3 text-xs text-ink/50">Placeholder only. Connect to secure storage before live use.</p>
    </div>
  );
}

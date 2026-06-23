type UploadPanelProps = {
  title: string;
  description: string;
  accept?: string;
};

export function UploadPanel({ title, description, accept }: UploadPanelProps) {
  return (
    <div className="group rounded-3xl border border-dashed border-brass/60 bg-white/60 p-6 text-center shadow-sm transition hover:border-brass hover:bg-white/80">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-brass/30 bg-brass/10 text-lg font-bold text-brass transition group-hover:bg-brass group-hover:text-navy">
        ↑
      </div>
      <h3 className="font-display text-xl text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-ink/55">{description}</p>
      <label className="mt-5 inline-flex cursor-pointer rounded-full border border-ink/10 bg-white px-5 py-2 text-sm font-semibold text-ink transition hover:border-brass hover:text-brass">
        Choose file
        <input type="file" accept={accept} className="sr-only" />
      </label>
      <p className="mt-3 text-xs leading-5 text-ink/45">Placeholder only. Connect to secure storage before live use.</p>
    </div>
  );
}

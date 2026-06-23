type MatterTypeCardProps = {
  title: string;
  selected?: boolean;
  onSelect?: () => void;
};

export function MatterTypeCard({ title, selected, onSelect }: MatterTypeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-3xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-brass/50 ${
        selected
          ? 'border-brass bg-brass/10 shadow-sm'
          : 'border-ink/10 bg-white/60 hover:border-brass/50 hover:bg-white/90'
      }`}
    >
      <span className="block font-display text-xl text-ink">{title}</span>
      <span className="mt-2 block text-xs uppercase tracking-[0.2em] text-ink/42">Structured intake pathway</span>
    </button>
  );
}

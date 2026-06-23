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
      className={`rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-brass/50 ${
        selected
          ? 'border-brass bg-brass/10 shadow-sm'
          : 'border-ink/10 bg-white/50 hover:border-brass/50 hover:bg-white'
      }`}
    >
      <span className="block font-medium text-ink">{title}</span>
      <span className="mt-2 block text-xs leading-5 text-ink/50">Structured intake pathway</span>
    </button>
  );
}

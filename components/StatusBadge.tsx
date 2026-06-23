import type { IntakeStatus, MatterStage } from '@/lib/types';

type StatusBadgeProps = {
  label: IntakeStatus | MatterStage | string;
};

function statusClass(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes('urgent') || lower.includes('police') || lower.includes('hearing')) return 'border-red-200 bg-red-50 text-red-800';
  if (lower.includes('accepted') || lower.includes('filed')) return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (lower.includes('declined') || lower.includes('closed')) return 'border-zinc-200 bg-zinc-100 text-zinc-700';
  if (lower.includes('conflict') || lower.includes('pending')) return 'border-amber-200 bg-amber-50 text-amber-800';
  return 'border-slate-200 bg-white/100 text-slate-700';
}

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(label)}`}>
      {label}
    </span>
  );
}

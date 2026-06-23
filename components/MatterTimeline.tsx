import type { MatterEvent } from '@/lib/types';

export function MatterTimeline({ events }: { events: MatterEvent[] }) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={`${event.date}-${event.title}`} className="relative rounded-3xl border border-ink/10 bg-white/50 p-5">
          <span className="absolute -left-2 top-6 grid h-4 w-4 place-items-center rounded-full bg-brass text-[8px] text-navy">
            {index + 1}
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">{event.date}</p>
          <h3 className="mt-2 font-display text-xl text-ink">{event.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink/50">{event.note}</p>
        </div>
      ))}
    </div>
  );
}

import type { MatterEvent } from '@/lib/types';

export function MatterTimeline({ events }: { events: MatterEvent[] }) {
  return (
    <div className="relative space-y-4 before:absolute before:left-[1.05rem] before:top-3 before:h-[calc(100%-1.5rem)] before:w-px before:bg-brass/35">
      {events.map((event, index) => (
        <div key={`${event.date}-${event.title}`} className="relative pl-10">
          <span className="absolute left-0 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-brass/40 bg-navy text-xs font-bold text-brass shadow-sm">
            {index + 1}
          </span>
          <div className="rounded-3xl border border-ink/10 bg-white/60 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">{event.date}</p>
            <h3 className="mt-2 font-display text-xl text-ink">{event.title}</h3>
            <p className="mt-2 text-sm leading-6 text-ink/55">{event.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

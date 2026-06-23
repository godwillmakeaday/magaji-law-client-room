import Link from 'next/link';

const navItems = [
  { href: '/client-room', label: 'Client Room' },
  { href: '/client-room/new', label: 'New Intake' },
  { href: '/client-room/existing', label: 'Existing Client' },
  { href: '/client-room/admin', label: 'Office Review' },
  { href: '/client-room/legal', label: 'Legal Pack' }
];

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-navy/95 text-vellum backdrop-blur-xl">
      <div className="border-b border-white/10 bg-black/10 px-5 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-vellum/55 md:text-xs">
        Magaji Law Client Room · structured intake, conflict review, document submission, and matter access
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href="/client-room" className="group flex min-w-0 items-center gap-3" aria-label="Magaji Law Client Room home">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brass/50 bg-white/5 font-display text-lg tracking-wide text-brass shadow-sm">
            ML
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-none tracking-wide">Magaji Law</span>
            <span className="mt-1 block truncate text-[11px] uppercase tracking-[0.28em] text-vellum/60">Client Room</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-vellum/70 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/client-room/new"
          className="shrink-0 rounded-full border border-brass/50 px-4 py-2 text-xs font-bold text-vellum transition hover:bg-brass hover:text-navy md:text-sm"
        >
          Begin Intake
        </Link>
      </div>
    </header>
  );
}

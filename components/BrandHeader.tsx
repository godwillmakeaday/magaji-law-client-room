import Link from 'next/link';

const navItems = [
  { href: '/client-room', label: 'Client Room' },
  { href: '/client-room/new', label: 'New Intake' },
  { href: '/client-room/existing', label: 'Existing Client' },
  { href: '/client-room/admin', label: 'Office Desk' }
];

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-navy/95 text-vellum backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/client-room" className="group flex items-center gap-3" aria-label="Magaji Law Client Room home">
          <span className="grid h-11 w-11 place-items-center rounded-full border border-brass/50 bg-white/5 font-display text-lg tracking-wide text-brass shadow-sm">
            ML
          </span>
          <span>
            <span className="block font-display text-lg leading-none tracking-wide">Magaji Law</span>
            <span className="mt-1 block text-[11px] uppercase tracking-[0.28em] text-vellum/60">Client Room</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
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
          className="rounded-full border border-brass/50 px-4 py-2 text-sm font-medium text-vellum transition hover:bg-brass hover:text-navy"
        >
          Begin Intake
        </Link>
      </div>
    </header>
  );
}

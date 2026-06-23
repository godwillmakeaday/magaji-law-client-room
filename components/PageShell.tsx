import Link from 'next/link';
import { BrandHeader } from './BrandHeader';

export function PageShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen law-grid">
      <BrandHeader />
      {children}
      <footer className="border-t border-ink/10 bg-navy px-5 py-10 text-vellum md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl text-vellum">Magaji Law Client Room</p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-vellum/55">
              Structured legal intake and matter access. Submission does not by itself create a lawyer-client relationship.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-vellum/60">
            <Link href="/client-room/new" className="hover:text-brass">New Intake</Link>
            <span>·</span>
            <Link href="/client-room/existing" className="hover:text-brass">Existing Client</Link>
            <span>·</span>
            <Link href="/client-room/admin" className="hover:text-brass">Office Review</Link>
            <span>·</span>
            <Link href="/client-room/legal" className="hover:text-brass">Legal Pack</Link>
            <span>·</span>
            <Link href="/client-room/operations" className="hover:text-brass">Operations Plan</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

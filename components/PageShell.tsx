import { BrandHeader } from './BrandHeader';

export function PageShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen law-grid">
      <BrandHeader />
      {children}
    </main>
  );
}

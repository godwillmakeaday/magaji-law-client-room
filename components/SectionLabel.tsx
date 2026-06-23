export function SectionLabel({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.34em] text-brass">
      {children}
    </p>
  );
}

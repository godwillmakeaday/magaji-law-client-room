export function DemoModeBanner({ message }: { message?: string }) {
  return (
    <div className="rounded-[1.7rem] border border-amber-200 bg-amber-50/80 p-5 text-sm leading-7 text-amber-950 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">Backend demo mode</p>
      <p className="mt-2">
        {message ??
          'Backend demo mode: database persistence is not active on this deployment. Configure DATABASE_URL and run Prisma setup to enable real intake storage.'}
      </p>
    </div>
  );
}

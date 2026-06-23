import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { ExistingLogin } from './ExistingLogin';

export default function ExistingClientPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-10 max-w-4xl">
          <SectionLabel>Existing client access</SectionLabel>
          <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">A controlled room for accepted matters.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/50">
            New visitors submit facts. Existing clients access a matter. This separation protects the office, the client, and the legal process.
          </p>
        </div>
        <ExistingLogin />
      </section>
    </PageShell>
  );
}

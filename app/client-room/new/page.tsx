import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { NewIntakeForm } from './NewIntakeForm';

export default function NewClientIntakePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-10 max-w-4xl">
          <SectionLabel>New client intake</SectionLabel>
          <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">A guided legal interview before the office takes the matter.</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink/55">
            This pathway converts narration, documents, parties, urgency, and consent into a lawyer-reviewed preliminary file. It is serious enough for legal work, but clear enough for ordinary clients.
          </p>
        </div>
        <NewIntakeForm />
      </section>
    </PageShell>
  );
}

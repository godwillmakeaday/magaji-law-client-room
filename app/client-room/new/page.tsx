import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { NewIntakeForm } from './NewIntakeForm';

export default function NewClientIntakePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-10 max-w-4xl">
          <SectionLabel>New client intake</SectionLabel>
          <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">Tell the story before the office takes the matter.</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/50">
            This premium intake pathway converts narration, documents, parties, and urgency into a lawyer-reviewed preliminary file.
          </p>
        </div>
        <NewIntakeForm />
      </section>
    </PageShell>
  );
}

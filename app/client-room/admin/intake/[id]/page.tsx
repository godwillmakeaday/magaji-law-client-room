import { PageShell } from '@/components/PageShell';
import { AdminIntakeDetailClient } from './AdminIntakeDetailClient';

export const dynamic = 'force-dynamic';

type IntakeSummaryPageProps = {
  params: { id: string };
};

export default function IntakeSummaryPage({ params }: IntakeSummaryPageProps) {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <AdminIntakeDetailClient id={params.id} />
      </section>
    </PageShell>
  );
}

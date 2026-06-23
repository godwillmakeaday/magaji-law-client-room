import Link from 'next/link';
import { EmptyState } from '@/components/EmptyState';
import { NoticeBox } from '@/components/NoticeBox';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { getLegalDocument, legalDocuments } from '@/lib/legal-documents';

type LegalDocumentPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return legalDocuments.map((document) => ({ slug: document.slug }));
}

export function generateMetadata({ params }: LegalDocumentPageProps) {
  const document = getLegalDocument(params.slug);
  return {
    title: document ? `${document.title} | Magaji Law Client Room` : 'Legal Document | Magaji Law Client Room'
  };
}

export default function LegalDocumentPage({ params }: LegalDocumentPageProps) {
  const document = getLegalDocument(params.slug);

  if (!document) {
    return (
      <PageShell>
        <section className="mx-auto max-w-5xl px-5 py-20 md:px-8">
          <EmptyState title="Document not found" note="This legal pack contains only the template documents included in the project." />
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link href="/client-room/legal" className="rounded-full border border-ink/10 bg-white/65 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">
            Back to Legal Pack
          </Link>
          <StatusBadge label="Template" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <article className="matter-paper rounded-[2rem] border border-ink/10 bg-white p-7 shadow-institution print:border-0 print:bg-white print:p-0 print:shadow-none md:p-10">
            <div className="border-b border-ink/10 pb-7">
              <SectionLabel>Magaji Law Client Room</SectionLabel>
              <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">{document.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-ink/58">{document.summary}</p>
              <div className="mt-6 inline-flex rounded-full border border-brass/30 bg-brass/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-brass">
                Working template · review before live use
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {document.bodySections.map((section) => (
                <section key={section.heading}>
                  <h2 className="font-display text-2xl leading-tight text-ink">{section.heading}</h2>
                  {section.paragraphs ? (
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-base leading-8 text-ink/70">{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  {section.bullets ? (
                    <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-ink/70">
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-ink/10 bg-parchment p-5">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brass">Acknowledgment / office use</p>
              <div className="mt-5 grid gap-4 text-sm leading-7 text-ink/62 md:grid-cols-2">
                <p>Client / submitter name: ___________________________</p>
                <p>Date: ___________________________</p>
                <p>Matter code: ___________________________</p>
                <p>Office reviewer: ___________________________</p>
              </div>
            </div>
          </article>

          <aside className="space-y-5 print:hidden">
            <NoticeBox title="Where this applies" tone="dark">
              {document.appliesTo}
            </NoticeBox>
            <NoticeBox title="Operational note">
              {document.operationalNote}
            </NoticeBox>
            <NoticeBox title="Template caution" tone="warning">
              This is a structured template for the Client Room workflow. Review against final firm policy, data storage, payment process, professional rules, and matter type before live use.
            </NoticeBox>
            <div className="rounded-[2rem] border border-ink/10 bg-white/70 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Other documents</p>
              <div className="mt-5 space-y-2">
                {legalDocuments.filter((item) => item.slug !== document.slug).slice(0, 6).map((item) => (
                  <Link key={item.slug} href={`/client-room/legal/${item.slug}`} className="block rounded-2xl border border-ink/10 bg-white/65 p-3 text-sm font-medium text-ink/64 hover:border-brass hover:text-brass">
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link href="/client-room/legal" className="mt-5 inline-flex text-sm font-bold text-brass hover:text-ink">View full pack</Link>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

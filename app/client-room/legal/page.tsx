import Link from 'next/link';
import { NoticeBox } from '@/components/NoticeBox';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { legalDocuments } from '@/lib/legal-documents';

const stageRules = [
  'Intake notice before submission',
  'Consent before review',
  'Conflict check before acceptance',
  'Engagement letter after acceptance',
  'Filing expense instruction after engagement',
  'Existing client terms after matter-code access'
];

export default function LegalDocumentPackPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-navy text-vellum">
        <div className="absolute inset-0 opacity-60 vault-grid" />
        <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-brass/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="relative z-10 max-w-4xl">
            <SectionLabel>Legal control layer</SectionLabel>
            <h1 className="mt-5 font-display text-5xl leading-tight md:text-7xl">Client Room Legal Document Pack</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-vellum/66 md:text-lg">
              Notices, consents, terms, and engagement documents supporting structured legal intake and matter access.
            </p>
            <p className="mt-5 max-w-3xl border-l border-brass/60 pl-5 text-sm leading-7 text-vellum/58">
              These templates create the legal meaning behind the interface: what a submission is, what consent covers, when engagement begins, and why filing expenses come only after acceptance.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="space-y-5">
          <NoticeBox title="Template status" tone="dark">
            These documents are working templates. They should be reviewed, customised, and approved before production use with real clients.
          </NoticeBox>
          <NoticeBox title="Operational doctrine">
            No filing fee before engagement. No client room before acceptance. No legal advice before lawyer review. No AI conclusion without lawyer control.
          </NoticeBox>
          <div className="rounded-[2rem] border border-ink/10 bg-white/70 p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Stage logic</p>
            <div className="mt-5 space-y-3">
              {stageRules.map((rule, index) => (
                <div key={rule} className="flex gap-3 rounded-2xl bg-parchment p-3 text-sm leading-6 text-ink/66">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-brass">{index + 1}</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="grid gap-5 md:grid-cols-2">
          {legalDocuments.map((document) => (
            <article key={document.slug} className="chamber-card rounded-[2rem] p-6 transition hover:-translate-y-1 hover:border-brass/50">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brass">Document</p>
                <StatusBadge label="Template" />
              </div>
              <h2 className="mt-5 font-display text-3xl leading-tight text-ink">{document.title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink/58">{document.purpose}</p>
              <div className="mt-5 rounded-2xl border border-ink/10 bg-white/60 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brass">Where it applies</p>
                <p className="mt-2 text-sm leading-6 text-ink/60">{document.appliesTo}</p>
              </div>
              <Link href={`/client-room/legal/${document.slug}`} className="mt-6 inline-flex rounded-full bg-navy px-5 py-2 text-sm font-bold text-vellum transition hover:bg-slateblue">
                View Document
              </Link>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

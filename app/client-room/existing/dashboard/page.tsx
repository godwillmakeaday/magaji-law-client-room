import Link from 'next/link';
import { ClientDashboardCard } from '@/components/ClientDashboardCard';
import { MatterTimeline } from '@/components/MatterTimeline';
import { NoticeBox } from '@/components/NoticeBox';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { UploadPanel } from '@/components/UploadPanel';
import { clientMatter, documentCategories, matterTimeline } from '@/lib/mock-data';

export default function ExistingClientDashboardPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
          <div>
            <SectionLabel>Existing client dashboard</SectionLabel>
            <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">{clientMatter.title}</h1>
            <div className="mt-5 flex flex-wrap gap-3">
              <StatusBadge label={clientMatter.stage} />
              <span className="rounded-full border border-ink/10 bg-white/60 px-3 py-1 text-xs font-semibold text-ink/55">{clientMatter.code}</span>
            </div>
          </div>
          <Link href="/client-room/existing" className="rounded-full border border-ink/10 bg-white/60 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">
            Exit demo room
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <ClientDashboardCard title="Current stage" value={clientMatter.stage} note="Office-controlled matter status." />
          <ClientDashboardCard title="Next office action" value="Chronology review" note={clientMatter.nextOfficeAction} />
          <ClientDashboardCard title="Client action required" value="Documents needed" note={clientMatter.clientActionRequired} emphasis />
          <ClientDashboardCard title="Fee / invoice" value="Pending" note={clientMatter.invoiceStatus} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <section className="space-y-6 rounded-[2rem] border border-ink/10 bg-white/72 p-6 shadow-institution">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Client updates</p>
              <h2 className="mt-3 font-display text-3xl text-ink">Upload documents or send further narration.</h2>
              <p className="mt-3 text-sm leading-7 text-ink/55">Use this room for documents and clarifications requested by the office. Do not send originals unless requested.</p>
            </div>

            <UploadPanel title="Upload new document" description="Send additional papers, receipts, photos, invitation letters, court processes, screenshots, or correspondence requested by the office." />

            <div className="grid gap-3 rounded-[1.7rem] border border-ink/10 bg-parchment p-5 md:grid-cols-2">
              {documentCategories.map((category) => (
                <div key={category} className="rounded-2xl border border-ink/10 bg-white/70 p-3 text-sm font-medium text-ink/70">
                  {category}
                </div>
              ))}
            </div>

            <label className="block">
              <span className="field-label">Further narration</span>
              <textarea rows={6} className="field-control leading-6" placeholder="Add any new fact, date, name, clarification, correction, or office instruction response." />
            </label>
            <button className="w-fit rounded-full bg-navy px-6 py-3 text-sm font-bold text-vellum transition hover:bg-slateblue">Send update to office</button>
          </section>

          <aside className="space-y-5">
            <NoticeBox title="Engagement documents">
              {clientMatter.engagementStatus}. In live use, signed letters, invoices, filing instructions, and receipts should appear here. <Link href="/client-room/legal/engagement-letter" className="font-bold text-brass hover:text-ink">View engagement template</Link>.
            </NoticeBox>
            <NoticeBox title="No filing without instruction" tone="warning">
              This dashboard should never imply that a case has been filed until the office confirms filing, process number, court, registry, and expense accounting. <Link href="/client-room/legal/filing-expense-instruction" className="font-bold text-amber-900 underline decoration-amber-700/40 underline-offset-4">Read filing-expense instruction</Link>.
            </NoticeBox>
            <div className="rounded-[2rem] border border-ink/10 bg-white/72 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Office messages</p>
              <p className="mt-4 text-sm leading-7 text-ink/55">Please upload all boundary evidence and identify witnesses before consultation. Do not send originals unless requested.</p>
            </div>
            <div className="rounded-[2rem] border border-ink/10 bg-white/72 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Matter identity</p>
              <dl className="mt-5 space-y-4 text-sm">
                <Row label="Matter code" value={clientMatter.code} />
                <Row label="Current stage" value={clientMatter.stage} />
                <Row label="Access level" value="Accepted client demo" />
              </dl>
            </div>
          </aside>
        </div>

        <section className="mt-10 rounded-[2rem] border border-ink/10 bg-white/72 p-6 shadow-sm">
          <div className="mb-6 rounded-3xl border border-brass/20 bg-brass/10 p-5 text-sm leading-7 text-ink/62">
            This matter room is governed by the <Link href="/client-room/legal/existing-client-room-terms" className="font-bold text-brass hover:text-ink">Existing Client Room Terms</Link>. Uploads and messages may become part of the matter communication record.
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Matter timeline</p>
          <h2 className="mt-3 font-display text-3xl text-ink">Controlled sequence of office and client actions.</h2>
          <div className="mt-7">
            <MatterTimeline events={matterTimeline} />
          </div>
        </section>
      </section>
    </PageShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-ink/10 pb-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">{label}</dt>
      <dd className="mt-1 text-ink/70">{value}</dd>
    </div>
  );
}

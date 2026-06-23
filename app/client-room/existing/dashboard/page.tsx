import Link from 'next/link';
import { ClientDashboardCard } from '@/components/ClientDashboardCard';
import { MatterTimeline } from '@/components/MatterTimeline';
import { NoticeBox } from '@/components/NoticeBox';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';
import { StatusBadge } from '@/components/StatusBadge';
import { UploadPanel } from '@/components/UploadPanel';
import { clientMatter, matterTimeline } from '@/lib/mock-data';

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
              <span className="rounded-full border border-ink/10 bg-white/50 px-3 py-1 text-xs font-semibold text-ink/50">{clientMatter.code}</span>
            </div>
          </div>
          <Link href="/client-room/existing" className="rounded-full border border-ink/10 bg-white/50 px-5 py-2 text-sm font-semibold text-ink/70 hover:border-brass hover:text-brass">
            Exit demo room
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <ClientDashboardCard title="Current stage" value={clientMatter.stage} note="Office-controlled matter status." />
          <ClientDashboardCard title="Next office action" value="Chronology review" note={clientMatter.nextOfficeAction} />
          <ClientDashboardCard title="Client action" value="Documents needed" note={clientMatter.clientActionRequired} />
          <ClientDashboardCard title="Fee status" value="Pending" note={clientMatter.invoiceStatus} />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-5 rounded-[2rem] border border-ink/10 bg-white/70 p-6 shadow-institution">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Client updates</p>
            <h2 className="font-display text-3xl text-ink">Upload documents or send further narration.</h2>
            <div className="grid gap-5">
              <UploadPanel title="Upload new document" description="Send additional papers, receipts, photos, invitation letters, court processes, or screenshots requested by the office." />
              <label className="block">
                <span className="text-sm font-semibold text-ink/70">Further narration</span>
                <textarea rows={6} className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/100 px-4 py-3 text-sm leading-6 outline-none focus:border-brass focus:ring-4 focus:ring-brass/10" placeholder="Add any new fact, date, name, clarification, or correction for the office." />
              </label>
              <button className="w-fit rounded-full bg-navy px-6 py-3 text-sm font-bold text-vellum transition hover:bg-slateblue">Send update to office</button>
            </div>
          </section>

          <aside className="space-y-5">
            <NoticeBox title="Engagement documents">
              {clientMatter.engagementStatus}. In live use, signed letters, invoices, filing instructions, and receipts should appear here.
            </NoticeBox>
            <NoticeBox title="No filing without instruction" tone="warning">
              This dashboard should never imply that a case has been filed until the office confirms filing, process number, court, registry, and expense accounting.
            </NoticeBox>
            <div className="rounded-[2rem] border border-ink/10 bg-white/70 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Office messages</p>
              <p className="mt-4 text-sm leading-7 text-ink/50">Please upload all boundary evidence and identify witnesses before consultation. Do not send originals unless requested.</p>
            </div>
          </aside>
        </div>

        <section className="mt-10 rounded-[2rem] border border-ink/10 bg-white/70 p-6 shadow-sm">
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

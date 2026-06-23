import Link from 'next/link';
import { PageShell } from '@/components/PageShell';
import { NoticeBox } from '@/components/NoticeBox';
import { SectionLabel } from '@/components/SectionLabel';

const process = [
  ['1', 'Submit your story', 'Write, speak, upload documents, and identify the people or institutions involved.'],
  ['2', 'Conflict and office review', 'The firm checks whether it can professionally receive or act on the matter.'],
  ['3', 'Consultation or engagement', 'A consultation, engagement letter, or decline notice is issued after review.'],
  ['4', 'Matter room access', 'Accepted clients receive a matter code for controlled updates and document exchange.']
];

const trust = [
  'Confidential handling',
  'Lawyer-reviewed intake',
  'Conflict check before acceptance',
  'No automatic lawyer-client relationship',
  'AI-assisted organisation, not AI legal advice'
];

export default function ClientRoomLanding() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-navy text-vellum">
        <div className="absolute inset-0 opacity-20 law-grid" />
        <div className="absolute -right-32 -top-40 h-96 w-96 rounded-full bg-brass/25 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:py-28">
          <div className="relative z-10">
            <SectionLabel>Lawyer-controlled client entry</SectionLabel>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
              Before We Advise, Tell Us the Story.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-vellum/70">
              A premium intake and matter-access room for submitting facts, documents, narration, and updates to Magaji Law before the office determines the proper legal route.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/client-room/new" className="rounded-full bg-brass px-6 py-3 text-sm font-bold text-navy transition hover:bg-vellum">
                I am bringing a new matter
              </Link>
              <Link href="/client-room/existing" className="rounded-full border border-vellum/25 px-6 py-3 text-sm font-bold text-vellum transition hover:border-brass hover:text-brass">
                I already have a matter code
              </Link>
            </div>
          </div>
          <div className="relative z-10 rounded-[2rem] border border-vellum/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-brass/25 bg-navy/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brass">Entry doors</p>
              <div className="mt-6 grid gap-4">
                <Link href="/client-room/new" className="group rounded-3xl border border-vellum/10 bg-white/10 p-6 transition hover:border-brass/50 hover:bg-white/10">
                  <span className="text-xs uppercase tracking-[0.24em] text-brass">Door 1</span>
                  <h2 className="mt-3 font-display text-3xl">New Client Intake</h2>
                  <p className="mt-3 text-sm leading-6 text-vellum/50">For people who need the office to understand a new story before consultation, engagement, or filing.</p>
                </Link>
                <Link href="/client-room/existing" className="group rounded-3xl border border-vellum/10 bg-white/10 p-6 transition hover:border-brass/50 hover:bg-white/10">
                  <span className="text-xs uppercase tracking-[0.24em] text-brass">Door 2</span>
                  <h2 className="mt-3 font-display text-3xl">Existing Client Room</h2>
                  <p className="mt-3 text-sm leading-6 text-vellum/50">For accepted clients with a matter code, office requests, uploads, invoices, and matter-stage updates.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-5 md:grid-cols-5">
          {trust.map((item) => (
            <div key={item} className="rounded-3xl border border-ink/10 bg-white/50 p-5 shadow-sm">
              <div className="mb-4 h-1 w-12 rounded-full bg-brass" />
              <p className="text-sm font-semibold leading-6 text-ink/75">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <div>
          <SectionLabel>How the room works</SectionLabel>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">From scattered story to controlled legal file.</h2>
          <p className="mt-5 text-base leading-8 text-ink/50">
            The Client Room separates strangers, potential clients, accepted clients, consultation, filing expenses, and engagement. That separation is the professional protection.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {process.map(([number, title, note]) => (
            <article key={title} className="chamber-card rounded-3xl p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-bold text-brass">{number}</span>
              <h3 className="mt-5 font-display text-2xl text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/50">{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <NoticeBox title="No automatic engagement">
            Submission through this room is not a confirmation that Magaji Law has accepted the matter. Acceptance requires office confirmation or an engagement letter.
          </NoticeBox>
          <NoticeBox title="Filing fees come later">
            Preliminary intake or consultation may be paid first. Filing expenses are requested only after the office accepts the matter and confirms the proper filing route.
          </NoticeBox>
          <NoticeBox title="AI is only an organiser">
            AI may help arrange chronology, questions, and document summaries. Legal judgment remains with the lawyer and the office.
          </NoticeBox>
        </div>
      </section>
    </PageShell>
  );
}

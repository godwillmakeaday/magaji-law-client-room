import Link from 'next/link';
import { NoticeBox } from '@/components/NoticeBox';
import { PageShell } from '@/components/PageShell';
import { SectionLabel } from '@/components/SectionLabel';

const process = [
  ['1', 'Tell the story', 'Write, speak, or upload the facts without forcing legal language.'],
  ['2', 'Identify parties', 'Names of opposing parties, institutions, officers, witnesses, and companies support conflict review.'],
  ['3', 'Upload documents', 'Receipts, agreements, letters, court papers, invitations, photographs, and screenshots are gathered.'],
  ['4', 'Office review', 'The firm reviews the intake, urgency, conflict position, and missing facts.'],
  ['5', 'Consultation or engagement', 'The office may consult, request clarification, accept, or decline the matter.'],
  ['6', 'Matter room access', 'Accepted clients receive a controlled matter code for updates and document exchange.']
];

const trust = [
  'Lawyer-reviewed intake',
  'Conflict check before acceptance',
  'Confidential handling',
  'No automatic lawyer-client relationship',
  'AI-assisted organisation, not AI legal advice',
  'Filing expenses only after engagement'
];

export default function ClientRoomLanding() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-navy text-vellum">
        <div className="absolute inset-0 opacity-60 vault-grid" />
        <div className="absolute -right-28 -top-44 h-[32rem] w-[32rem] rounded-full bg-brass/20 blur-3xl" />
        <div className="absolute -bottom-48 left-10 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-24">
          <div className="relative z-10">
            <div className="mb-7 inline-flex rounded-full border border-brass/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brass">
              Magaji Law Client Room
            </div>
            <h1 className="max-w-4xl font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
              Before We Advise, Tell Us the Story.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-vellum/70">
              Structured intake, conflict review, document submission, and matter access for a lawyer-controlled legal process.
            </p>
            <p className="mt-5 max-w-2xl border-l border-brass/50 pl-5 text-base leading-8 text-vellum/58">
              New visitors submit facts. Existing clients access a matter. That separation protects the office, the client, and the integrity of legal work.
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

          <div className="relative z-10 rounded-[2rem] border border-vellum/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl md:p-5">
            <div className="rounded-[1.5rem] border border-brass/25 bg-navy/72 p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brass">Controlled entry doors</p>
              <div className="mt-6 grid gap-4">
                <Link href="/client-room/new" className="group chamber-card-dark rounded-3xl p-6 transition hover:border-brass/50">
                  <span className="text-xs uppercase tracking-[0.24em] text-brass">Door 1</span>
                  <h2 className="mt-3 font-display text-3xl text-vellum">New Client Intake</h2>
                  <p className="mt-3 text-sm leading-6 text-vellum/55">
                    For new matters not yet accepted by the firm. Submit facts, parties, documents, urgency, and contact method for preliminary review.
                  </p>
                </Link>
                <Link href="/client-room/existing" className="group chamber-card-dark rounded-3xl p-6 transition hover:border-brass/50">
                  <span className="text-xs uppercase tracking-[0.24em] text-brass">Door 2</span>
                  <h2 className="mt-3 font-display text-3xl text-vellum">Existing Client Room</h2>
                  <p className="mt-3 text-sm leading-6 text-vellum/55">
                    For accepted matters only. Use your matter code to send updates, upload documents, view next actions, and communicate with the office.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {trust.map((item) => (
            <div key={item} className="rounded-3xl border border-ink/10 bg-white/58 p-5 shadow-sm backdrop-blur">
              <div className="mb-4 h-1 w-12 rounded-full bg-brass" />
              <p className="text-sm font-semibold leading-6 text-ink/76">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 md:grid-cols-[0.78fr_1.22fr] md:px-8">
        <div>
          <SectionLabel>How the room works</SectionLabel>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">From scattered story to controlled legal file.</h2>
          <p className="mt-5 text-base leading-8 text-ink/55">
            The Client Room turns emotion, documents, and fragmented recollection into a reviewable intake record before any professional acceptance or filing instruction.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {process.map(([number, title, note]) => (
            <article key={title} className="chamber-card rounded-3xl p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-sm font-bold text-brass">{number}</span>
              <h3 className="mt-5 font-display text-2xl text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-ink/55">{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <NoticeBox title="No automatic engagement">
            Submission through this room is not a confirmation that Magaji Law has accepted the matter. Acceptance requires office confirmation or an engagement letter. <Link href="/client-room/legal/no-lawyer-client-relationship" className="font-bold text-brass hover:text-ink">Read notice</Link>.
          </NoticeBox>
          <NoticeBox title="Filing expenses come later">
            Preliminary intake or consultation may be paid first. Filing expenses are requested only after the office accepts the matter and confirms the proper filing route. <Link href="/client-room/legal/filing-expense-instruction" className="font-bold text-amber-900 underline decoration-amber-700/40 underline-offset-4">Read filing instruction</Link>.
          </NoticeBox>
          <NoticeBox title="AI is only an organiser">
            AI may help arrange chronology, questions, and document summaries. Legal judgment remains with the lawyer and the office. <Link href="/client-room/legal/ai-assisted-organisation" className="font-bold text-brass hover:text-ink">Read AI notice</Link>.
          </NoticeBox>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-brass/25 bg-navy p-7 text-vellum shadow-institution md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Legal document layer</p>
            <div className="mt-4 flex flex-col gap-5">
              <div>
                <h2 className="font-display text-3xl leading-tight md:text-4xl">The legal pack behind the Client Room.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-vellum/58">Notices, consents, fee terms, engagement templates, filing instructions, and non-engagement documents now support the workflow.</p>
              </div>
              <Link href="/client-room/legal" className="w-fit rounded-full bg-brass px-6 py-3 text-sm font-bold text-navy transition hover:bg-vellum">View Legal Pack</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-ink/10 bg-white/74 p-7 shadow-institution backdrop-blur md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Operational backend layer</p>
            <div className="mt-4 flex flex-col gap-5">
              <div>
                <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">The roadmap for the real office system.</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/58">Database, authentication, matter codes, secure storage, payment flow, notifications, admin workflow, and audit-trail architecture now sit behind the prototype.</p>
              </div>
              <Link href="/client-room/operations" className="w-fit rounded-full bg-navy px-6 py-3 text-sm font-bold text-vellum transition hover:bg-brass hover:text-navy">View Operations Plan</Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

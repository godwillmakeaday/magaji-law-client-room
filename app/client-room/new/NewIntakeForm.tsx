'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ConsentChecklist } from '@/components/ConsentChecklist';
import { MatterTypeCard } from '@/components/MatterTypeCard';
import { NoticeBox } from '@/components/NoticeBox';
import { StepIndicator } from '@/components/StepIndicator';
import { UploadPanel } from '@/components/UploadPanel';
import { matterTypes } from '@/lib/mock-data';
import type { MatterType } from '@/lib/types';

const steps = ['Matter', 'Parties', 'Narration', 'Documents', 'Consent'];

const urgencyOptions = [
  {
    title: 'Normal',
    note: 'The matter needs review, but there is no immediate deadline.'
  },
  {
    title: 'Time-sensitive',
    note: 'A response, meeting, or decision is needed within days.'
  },
  {
    title: 'Police/court deadline',
    note: 'There is an invitation, appearance, hearing, or filing date.'
  },
  {
    title: 'Immediate office review needed',
    note: 'The facts require urgent office triage. If there is immediate threat to life or safety, contact the appropriate emergency authority first.'
  }
];

const documentCategories = [
  'Court papers',
  'Police documents',
  'Land/property documents',
  'Agreements',
  'Receipts/payment evidence',
  'Photos/screenshots',
  'Correspondence',
  'Other'
];

export function NewIntakeForm() {
  const [current, setCurrent] = useState(0);
  const [matterType, setMatterType] = useState<MatterType>('Land/property');
  const [urgency, setUrgency] = useState('Normal');
  const [submitted, setSubmitted] = useState(false);

  const nextLabel = useMemo(() => (current === steps.length - 1 ? 'Submit for Preliminary Review' : 'Continue'), [current]);

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-brass/30 bg-white/82 p-8 shadow-institution">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Submission received for preliminary review</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink">Your story has entered the office review queue.</h1>
        <p className="mt-5 text-base leading-8 text-ink/62">
          The office will assess whether it can act, whether consultation is required, and whether further information is needed. Do not treat this submission as confirmation that the firm has accepted your matter.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <NoticeBox title="What happens next" tone="success">
            Keep documents ready. The office may request clarification, consultation, or a formal engagement step.
          </NoticeBox>
          <NoticeBox title="Do not assume filing" tone="warning">
            Do not pay filing expenses or assume court filing until Magaji Law confirms acceptance, scope, and written filing instruction.
          </NoticeBox>
        </div>
        <button onClick={() => setSubmitted(false)} className="mt-7 rounded-full border border-ink/10 px-5 py-2 text-sm font-semibold text-ink hover:border-brass hover:text-brass">
          Return to intake demo
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
      <aside className="space-y-5">
        <StepIndicator steps={steps} current={current} />
        <NoticeBox title="Professional boundary">
          This form begins a preliminary review only. Engagement starts after conflict check, acceptance, and written confirmation from the office. <Link href="/client-room/legal/no-lawyer-client-relationship" className="font-bold text-brass hover:text-ink">Read the full notice</Link>.
        </NoticeBox>
        <NoticeBox title="Emergency boundary" tone="warning">
          If there is an immediate threat to life or safety, contact the appropriate emergency authority first. This form is not an emergency-response channel.
        </NoticeBox>
        <NoticeBox title="Payment language">
          Use intake review or consultation fee at this stage. Filing expenses belong only after engagement and specific filing instruction. <Link href="/client-room/legal/intake-review-fee-terms" className="font-bold text-brass hover:text-ink">Read fee terms</Link>.
        </NoticeBox>
      </aside>

      <section className="rounded-[2rem] border border-ink/10 bg-white/78 p-6 shadow-institution backdrop-blur md:p-8">
        {current === 0 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Step 1 · Matter type</p>
            <h2 className="mt-3 font-display text-4xl text-ink">What kind of matter are you bringing?</h2>
            <p className="mt-3 text-sm leading-7 text-ink/55">Select the nearest category. The office may reclassify the matter after review.</p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {matterTypes.map((type) => (
                <MatterTypeCard key={type} title={type} selected={matterType === type} onSelect={() => setMatterType(type)} />
              ))}
            </div>
          </div>
        ) : null}

        {current === 1 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Step 2 · Parties and conflict review</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Identify the people, parties, and institutions.</h2>
            <p className="mt-3 text-sm leading-7 text-ink/55">
              The firm needs the names of all relevant parties before deciding whether it can act. Include opposing parties, institutions, witnesses, officers, companies, family members, and agents where known.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <Input label="Full name" placeholder="Your full legal name" />
              <Input label="Phone number" placeholder="+234..." />
              <Input label="Email" placeholder="name@example.com" />
              <Input label="Location" placeholder="City / State" />
              <Input label="Preferred contact method" placeholder="Phone, WhatsApp, email" />
              <Input label="Police station / court / agency" placeholder="If any" />
              <Textarea label="Opposing parties" placeholder="Names of persons, companies, family members, institutions, or officers involved" />
              <Textarea label="Witnesses or related persons" placeholder="Names of witnesses, relatives, signatories, agents, or officials" />
            </div>
          </div>
        ) : null}

        {current === 2 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Step 3 · Narration room</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Tell the story from the beginning.</h2>
            <p className="mt-3 text-sm leading-7 text-ink/55">
              Start from the beginning. Do not worry about perfect legal language. Mention names, dates, places, documents, payments, promises, threats, witnesses, agencies, courts, police stations, and what you want the office to do.
            </p>
            <div className="mt-8 rounded-[1.7rem] border border-ink/10 bg-parchment p-5">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass">Narration room</p>
              <div className="mt-5 grid gap-5">
                <Textarea label="Write the story" placeholder="Start from the beginning. Tell the facts calmly. Do not argue yet." rows={10} />
                <div className="grid gap-5 md:grid-cols-2">
                  <UploadPanel title="Upload voice narration" accept="audio/*" description="Upload a voice note where you narrate the matter calmly from the beginning." />
                  <UploadPanel title="Upload video narration" accept="video/*" description="Upload a short video narration only where it is necessary to explain documents, scene, or sequence." />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {current === 3 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Step 4 · Documents and urgency</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Upload evidence and mark the urgency.</h2>
            <p className="mt-3 text-sm leading-7 text-ink/55">Upload placeholders are shown for demo only. Live use should connect to secure storage with permission control and audit records.</p>
            <div className="mt-8 grid gap-5">
              <UploadPanel title="Documents and evidence" description="Upload agreements, receipts, court papers, police invitations, land documents, photos, WhatsApp screenshots, or other documents." />
              <div className="grid gap-3 rounded-[1.7rem] border border-ink/10 bg-white/60 p-5 md:grid-cols-2">
                {documentCategories.map((category) => (
                  <label key={category} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white/70 p-3 text-sm text-ink/70">
                    <input type="checkbox" className="h-4 w-4 accent-[#b08d57]" />
                    {category}
                  </label>
                ))}
              </div>
              <div>
                <p className="field-label">Urgency level</p>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {urgencyOptions.map((option) => (
                    <button
                      key={option.title}
                      type="button"
                      onClick={() => setUrgency(option.title)}
                      className={`rounded-3xl border p-4 text-left transition ${urgency === option.title ? 'border-brass bg-brass/10' : 'border-ink/10 bg-white/60 hover:border-brass/50'}`}
                    >
                      <span className="block font-display text-xl text-ink">{option.title}</span>
                      <span className="mt-2 block text-sm leading-6 text-ink/55">{option.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {current === 4 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Step 5 · Preliminary notices and consent</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Confirm the professional boundary.</h2>
            <p className="mt-3 text-sm leading-7 text-ink/55">These notices protect the client, the office, and the integrity of the legal process.</p>
            <div className="mt-8">
              <ConsentChecklist />
              <div className="mt-5 rounded-3xl border border-brass/25 bg-brass/10 p-5 text-sm leading-7 text-ink/66">
                The complete Client Room legal pack is available at <Link href="/client-room/legal" className="font-bold text-brass hover:text-ink">/client-room/legal</Link>. These linked templates explain the full intake, privacy, AI, conflict-check, engagement, and filing-expense boundaries.
              </div>
            </div>
            <div className="mt-8 rounded-3xl bg-parchment p-6 text-sm leading-7 text-ink/62">
              <strong className="text-ink">Selected category:</strong> {matterType}. <strong className="text-ink">Urgency:</strong> {urgency}. This is a front-end demo. Connect a database, authentication, secure storage, and payment processor before live deployment.
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-ink/10 pt-6">
          <button
            type="button"
            onClick={() => setCurrent((value) => Math.max(0, value - 1))}
            className="rounded-full border border-ink/10 px-5 py-2 text-sm font-semibold text-ink/70 transition hover:border-brass hover:text-brass disabled:opacity-40"
            disabled={current === 0}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => (current === steps.length - 1 ? setSubmitted(true) : setCurrent((value) => Math.min(steps.length - 1, value + 1)))}
            className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-vellum transition hover:bg-slateblue"
          >
            {nextLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

function Input({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <input className="field-control" placeholder={placeholder} />
    </label>
  );
}

function Textarea({ label, placeholder, rows = 4 }: { label: string; placeholder: string; rows?: number }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <textarea rows={rows} className="field-control leading-6" placeholder={placeholder} />
    </label>
  );
}

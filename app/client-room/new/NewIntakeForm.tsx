'use client';

import { useMemo, useState } from 'react';
import { ConsentChecklist } from '@/components/ConsentChecklist';
import { MatterTypeCard } from '@/components/MatterTypeCard';
import { NoticeBox } from '@/components/NoticeBox';
import { StepIndicator } from '@/components/StepIndicator';
import { UploadPanel } from '@/components/UploadPanel';
import { matterTypes } from '@/lib/mock-data';
import type { MatterType } from '@/lib/types';

const steps = ['Matter', 'People', 'Story', 'Consent'];

export function NewIntakeForm() {
  const [current, setCurrent] = useState(0);
  const [matterType, setMatterType] = useState<MatterType>('Land/property');
  const [submitted, setSubmitted] = useState(false);

  const nextLabel = useMemo(() => (current === steps.length - 1 ? 'Submit for Preliminary Review' : 'Continue'), [current]);

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-brass/30 bg-white/75 p-8 shadow-institution">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Preliminary submission received</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink">Your story has been received for preliminary review.</h1>
        <p className="mt-5 text-base leading-8 text-ink/60">
          The office will assess whether it can act and may contact you for consultation, clarification, or engagement. Do not treat this submission as confirmation that the firm has accepted your matter.
        </p>
        <div className="mt-8 rounded-3xl bg-navy p-6 text-vellum">
          <p className="text-sm leading-7 text-vellum/75">
            Keep your documents ready. Do not pay filing expenses or assume court filing until Magaji Law confirms acceptance, scope, and written filing instruction.
          </p>
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
          This form begins a preliminary review only. Engagement starts after conflict check, acceptance, and written confirmation from the office.
        </NoticeBox>
        <NoticeBox title="Use the right payment language" tone="warning">
          At this stage, refer only to intake review or consultation fees. Filing expenses belong after engagement and filing instruction.
        </NoticeBox>
      </aside>

      <section className="rounded-[2rem] border border-ink/10 bg-white/75 p-6 shadow-institution md:p-8">
        {current === 0 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Step 1</p>
            <h2 className="mt-3 font-display text-4xl text-ink">What kind of matter are you bringing?</h2>
            <p className="mt-3 text-sm leading-7 text-ink/50">Select the nearest category. The office may reclassify the matter after review.</p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {matterTypes.map((type) => (
                <MatterTypeCard key={type} title={type} selected={matterType === type} onSelect={() => setMatterType(type)} />
              ))}
            </div>
          </div>
        ) : null}

        {current === 1 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Step 2</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Identify the people, parties, and institutions.</h2>
            <p className="mt-3 text-sm leading-7 text-ink/50">This helps the office begin conflict check before legal acceptance.</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Step 3</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Tell the story from the beginning.</h2>
            <p className="mt-3 text-sm leading-7 text-ink/50">
              Mention dates, names, places, payments, documents, promises, threats, witnesses, and what you want the office to do.
            </p>
            <div className="mt-8 grid gap-5">
              <Textarea label="Written narration" placeholder="Start from the beginning. Do not argue yet. Tell the facts." rows={9} />
              <div className="grid gap-5 md:grid-cols-2">
                <UploadPanel title="Audio narration" description="Upload a voice note where you narrate the matter calmly from the beginning." />
                <UploadPanel title="Video narration" description="Upload a short video narration only where it is necessary to explain documents, scene, or sequence." />
              </div>
              <UploadPanel title="Documents and evidence" description="Upload agreements, receipts, court papers, police invitations, land documents, photos, WhatsApp screenshots, or other documents." />
              <Select label="Urgency" options={['Not urgent', 'Needs review within days', 'Police/court deadline', 'Threat or immediate risk', 'Hearing date approaching']} />
            </div>
          </div>
        ) : null}

        {current === 3 ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Step 4</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Preliminary notices and consent.</h2>
            <p className="mt-3 text-sm leading-7 text-ink/50">Confirm these before the office receives your intake for preliminary review.</p>
            <div className="mt-8">
              <ConsentChecklist />
            </div>
            <div className="mt-8 rounded-3xl bg-parchment p-6 text-sm leading-7 text-ink/60">
              <strong className="text-ink">Selected category:</strong> {matterType}. This is a front-end demo. Connect a database, authentication, secure storage, and payment processor before live deployment.
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
      <span className="text-sm font-semibold text-ink/70">{label}</span>
      <input className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/100 px-4 py-3 text-sm outline-none transition focus:border-brass focus:ring-4 focus:ring-brass/10" placeholder={placeholder} />
    </label>
  );
}

function Textarea({ label, placeholder, rows = 4 }: { label: string; placeholder: string; rows?: number }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink/70">{label}</span>
      <textarea rows={rows} className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/100 px-4 py-3 text-sm leading-6 outline-none transition focus:border-brass focus:ring-4 focus:ring-brass/10" placeholder={placeholder} />
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink/70">{label}</span>
      <select className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/100 px-4 py-3 text-sm outline-none transition focus:border-brass focus:ring-4 focus:ring-brass/10">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

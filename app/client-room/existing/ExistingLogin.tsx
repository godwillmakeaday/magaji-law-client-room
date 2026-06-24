'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { NoticeBox } from '@/components/NoticeBox';

type Step = 'request' | 'verify';

export function ExistingLogin() {
  const [step, setStep] = useState<Step>('request');
  const [code, setCode] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [surname, setSurname] = useState('');
  const [challengeId, setChallengeId] = useState('');
  const [maskedContact, setMaskedContact] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function requestOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setNotice('');

    if (code.trim().length < 6 || identifier.trim().length < 2) {
      setError('Enter your matter code and the registered phone or email attached to the matter.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/client/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matterCode: code.trim(),
          contactValue: identifier.trim(),
          surname: surname.trim()
        })
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message ?? 'Matter access could not be verified. Check your matter code and registered contact detail or contact the office.');
        return;
      }

      setChallengeId(payload.challengeId);
      setMaskedContact(payload.maskedContact ?? 'registered contact');
      setNotice(payload.message ?? 'Access code requested.');
      setStep('verify');
    } catch {
      setError('Matter access could not be verified. Please try again or contact the office.');
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setNotice('');

    if (!challengeId || !/^\d{6}$/.test(otpCode.trim())) {
      setError('Enter the 6-digit access code.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/client/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId, otpCode: otpCode.trim() })
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message ?? 'Access code could not be verified.');
        return;
      }

      router.push(payload.redirectTo ?? '/client-room/existing/dashboard');
    } catch {
      setError('Access code could not be verified. Please try again or contact the office.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="space-y-5">
        <NoticeBox title="OTP-backed matter access" tone="dark">
          Access is for accepted matters only. Use the matter code issued by the office and the registered phone or email attached to the matter. A one-time access code is required before the dashboard opens.
        </NoticeBox>
        <NoticeBox title="Protect your code">
          Do not share your matter code or access code with unauthorised persons. Access is governed by the <Link href="/client-room/legal/existing-client-room-terms" className="font-bold text-brass hover:text-ink">Existing Client Room Terms</Link>.
        </NoticeBox>
        <NoticeBox title="Limited matter status">
          This room shows limited matter status only. Formal advice, filings, deadlines, and commitments must be confirmed by the office.
        </NoticeBox>
      </aside>

      <div className="rounded-[2rem] border border-ink/10 bg-white/82 p-8 shadow-institution">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Existing client room</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">Enter your secure matter room.</h1>
        <p className="mt-4 text-sm leading-7 text-ink/55">
          Matter access now requires an office-issued matter code, registered contact detail, and a one-time access code before the dashboard opens.
        </p>

        <div className="mt-7 grid gap-3 rounded-[1.6rem] border border-ink/10 bg-parchment p-4 md:grid-cols-2">
          <StepPill active={step === 'request'} label="1. Verify matter" />
          <StepPill active={step === 'verify'} label="2. Enter access code" />
        </div>

        {step === 'request' ? (
          <form onSubmit={requestOtp} className="mt-8 grid gap-5">
            <label className="block">
              <span className="field-label">Matter code</span>
              <input value={code} onChange={(event) => setCode(event.target.value)} className="field-control uppercase tracking-[0.18em]" placeholder="MGL-2026-LAND-8F3KQ2" />
            </label>
            <label className="block">
              <span className="field-label">Registered phone or email</span>
              <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} className="field-control" placeholder="Phone / email" />
            </label>
            <label className="block">
              <span className="field-label">Client surname <span className="text-ink/40">(optional for now)</span></span>
              <input value={surname} onChange={(event) => setSurname(event.target.value)} className="field-control" placeholder="Surname" />
            </label>
            {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
            {notice ? <p className="rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700">{notice}</p> : null}
            <button disabled={loading} className="rounded-full bg-navy px-7 py-3 text-sm font-bold text-vellum transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Requesting…' : 'Request access code'}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-8 grid gap-5">
            <div className="rounded-[1.4rem] border border-ink/10 bg-parchment p-4 text-sm leading-7 text-ink/60">
              An access code was prepared for <strong className="text-ink">{maskedContact}</strong>. Enter the 6-digit code within 10 minutes.
            </div>
            {notice ? <p className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-800">{notice}</p> : null}
            <label className="block">
              <span className="field-label">6-digit access code</span>
              <input value={otpCode} onChange={(event) => setOtpCode(event.target.value.replace(/\D/g, '').slice(0, 6))} className="field-control text-center text-2xl tracking-[0.4em]" placeholder="000000" inputMode="numeric" />
            </label>
            {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
            <div className="flex flex-wrap gap-3">
              <button disabled={loading} className="rounded-full bg-navy px-7 py-3 text-sm font-bold text-vellum transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? 'Verifying…' : 'Verify and enter matter room'}
              </button>
              <button type="button" onClick={() => { setStep('request'); setOtpCode(''); setError(''); }} className="rounded-full border border-ink/10 bg-white/60 px-7 py-3 text-sm font-bold text-ink/70 hover:border-brass hover:text-brass">
                Change details
              </button>
            </div>
          </form>
        )}

        <p className="mt-5 text-xs leading-6 text-ink/50">This bridge does not expose narration, parties, conflict details, evidence, legal acceptances, or admin notes.</p>
      </div>
    </div>
  );
}

function StepPill({ active, label }: { active: boolean; label: string }) {
  return (
    <div className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${active ? 'bg-navy text-vellum' : 'bg-white/70 text-ink/45'}`}>
      {label}
    </div>
  );
}

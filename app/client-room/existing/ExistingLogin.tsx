'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { NoticeBox } from '@/components/NoticeBox';

export function ExistingLogin() {
  const [code, setCode] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [surname, setSurname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (code.trim().length < 6 || identifier.trim().length < 2) {
      setError('Enter your matter code and the registered phone or email attached to the matter.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/matter/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matterCode: code.trim(),
          contactVerification: identifier.trim(),
          surname: surname.trim()
        })
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message ?? 'Matter access could not be verified. Check your matter code and registered contact detail or contact the office.');
        return;
      }

      sessionStorage.setItem('mglMatterSummary', JSON.stringify(payload.matter));
      router.push('/client-room/existing/dashboard');
    } catch (error) {
      setError('Matter access could not be verified. Please try again or contact the office.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="space-y-5">
        <NoticeBox title="Matter-code access" tone="dark">
          Access is for accepted matters only. Use the matter code issued by the office and the registered phone or email attached to the matter.
        </NoticeBox>
        <NoticeBox title="Protect your access">
          Do not share your matter code with unauthorised persons. Matter-code access is temporary and will later be replaced with OTP/session login. <Link href="/client-room/legal/existing-client-room-terms" className="font-bold text-brass hover:text-ink">Read Existing Client Room Terms</Link>.
        </NoticeBox>
        <NoticeBox title="Professional separation">
          A matter code should be issued only after the office has accepted the client or opened a controlled matter file.
        </NoticeBox>
      </aside>

      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-ink/10 bg-white/82 p-8 shadow-institution">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Existing client room</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">Access your controlled matter room.</h1>
        <p className="mt-4 text-sm leading-7 text-ink/55">
          Use the matter code issued by the office to access limited matter-stage information. Full client authentication, uploads, payments, and messaging will be added in later stages.
        </p>
        <div className="mt-8 grid gap-5">
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
        </div>
        <button disabled={loading} className="mt-8 rounded-full bg-navy px-7 py-3 text-sm font-bold text-vellum transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Verifying…' : 'Continue to matter room'}
        </button>
        <p className="mt-4 text-xs leading-6 text-ink/50">Access is governed by the <Link href="/client-room/legal/existing-client-room-terms" className="font-bold text-brass hover:text-ink">Existing Client Room Terms</Link>. This bridge does not expose narration, parties, conflict details, or admin notes.</p>
      </form>
    </div>
  );
}

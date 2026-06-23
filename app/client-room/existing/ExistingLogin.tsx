'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { NoticeBox } from '@/components/NoticeBox';

export function ExistingLogin() {
  const [code, setCode] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.trim().length < 6 || identifier.trim().length < 2) {
      setError('Enter a matter code with at least 6 characters and your registered surname, phone, or email.');
      return;
    }
    router.push('/client-room/existing/dashboard');
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="space-y-5">
        <NoticeBox title="Matter-code access" tone="dark">
          Existing Client Room is for accepted clients only. In live use, this should be protected by real authentication, OTP, audit logs, and role-based permissions.
        </NoticeBox>
        <NoticeBox title="Professional separation">
          A matter code should be issued only after the office has accepted the client or opened a controlled matter file.
        </NoticeBox>
      </aside>
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-ink/10 bg-white/80 p-8 shadow-institution">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Existing client room</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-ink md:text-5xl">Enter your matter code.</h1>
        <p className="mt-4 text-sm leading-7 text-ink/50">Use the matter code issued by the office to access uploads, updates, requests, and matter-stage information.</p>
        <div className="mt-8 grid gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-ink/70">Matter code</span>
            <input value={code} onChange={(event) => setCode(event.target.value)} className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/100 px-4 py-3 text-sm uppercase tracking-[0.18em] outline-none focus:border-brass focus:ring-4 focus:ring-brass/10" placeholder="ML-2026-0148" />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink/70">Registered surname, phone, or email</span>
            <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/100 px-4 py-3 text-sm outline-none focus:border-brass focus:ring-4 focus:ring-brass/10" placeholder="Surname / phone / email" />
          </label>
          {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        </div>
        <button className="mt-8 rounded-full bg-navy px-7 py-3 text-sm font-bold text-vellum transition hover:bg-slateblue">
          Continue to matter room
        </button>
        <p className="mt-4 text-xs leading-6 text-ink/50">Demo rule: any code of 6+ characters and any identifier of 2+ characters will open the mock dashboard.</p>
      </form>
    </div>
  );
}

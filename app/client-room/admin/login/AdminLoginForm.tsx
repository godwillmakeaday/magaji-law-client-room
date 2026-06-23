'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function AdminLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage(payload.error ?? 'Invalid office credentials.');
        return;
      }

      router.replace('/client-room/admin');
      router.refresh();
    } catch {
      setMessage('Login could not be completed. Check network connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">Username</span>
        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="field-control mt-2"
          autoComplete="username"
          required
        />
      </label>
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/50">Password</span>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="field-control mt-2"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      {message ? <p className="rounded-2xl border border-red-500/20 bg-red-50 p-4 text-sm text-red-700">{message}</p> : null}
      <button
        disabled={loading}
        className="w-full rounded-full bg-navy px-6 py-3 text-sm font-bold text-vellum transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Checking credentials…' : 'Enter Office Review'}
      </button>
    </form>
  );
}

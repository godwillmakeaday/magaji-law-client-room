import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/admin-auth';
import { AdminLoginForm } from './AdminLoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const token = cookies().get(ADMIN_COOKIE_NAME)?.value;
  const isLoggedIn = await verifyAdminSessionToken(token);

  if (isLoggedIn) {
    redirect('/client-room/admin');
  }

  return (
    <main className="min-h-screen law-grid bg-parchment px-5 py-10 text-ink md:px-8">
      <div className="mx-auto flex min-h-[85vh] max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-[2.5rem] border border-ink/10 bg-white/70 shadow-2xl md:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-navy p-8 text-vellum md:p-12">
            <Link href="/client-room" className="inline-flex items-center gap-3 text-vellum/80 hover:text-brass">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-brass/50 bg-white/5 font-display text-lg text-brass">ML</span>
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">Client Room</span>
            </Link>
            <div className="mt-16">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brass">Restricted office system</p>
              <h1 className="mt-4 font-display text-5xl leading-tight text-vellum md:text-6xl">Office Access</h1>
              <p className="mt-6 max-w-md text-base leading-8 text-vellum/62">
                Restricted access for authorised Magaji Law office review only. Client and matter information is confidential.
              </p>
            </div>
            <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-6 text-vellum/62">
              Unauthorised access to this area is prohibited. All office review actions should be treated as confidential and subject to professional control.
            </div>
          </div>
          <div className="p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brass">Admin login</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Enter Office Review</h2>
            <p className="mt-4 text-sm leading-6 text-ink/55">
              Use the office credentials configured in Vercel environment variables. Sessions expire automatically after 8 hours.
            </p>
            <AdminLoginForm />
            <p className="mt-8 text-xs leading-5 text-ink/45">
              The public intake system remains separate from the office review system. Public submission does not grant access to this area.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, createAdminSessionToken, getAdminSessionMaxAge } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (!adminUser || !adminPass || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: 'Admin authentication is not fully configured.' }, { status: 500 });
  }

  let body: { username?: string; password?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid login request.' }, { status: 400 });
  }

  if (body.username !== adminUser || body.password !== adminPass) {
    return NextResponse.json({ error: 'Invalid office credentials.' }, { status: 401 });
  }

  const token = await createAdminSessionToken(adminUser);
  const response = NextResponse.json({ success: true });

  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: getAdminSessionMaxAge()
  });

  return response;
}

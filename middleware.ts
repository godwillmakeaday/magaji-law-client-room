import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from '@/lib/admin-auth';

export const config = {
  matcher: [
    '/client-room/admin/:path*',
    '/api/intake/:path*',
    '/api/matter/:path*',
    '/api/matters/:path*',
    '/api/matters'
  ]
};

function isAdminLoginPath(pathname: string) {
  return pathname === '/client-room/admin/login' || pathname.startsWith('/client-room/admin/login/');
}

function apiUnauthorized() {
  return NextResponse.json({ error: 'Admin authentication required' }, { status: 401 });
}

function isPublicApiAccess(pathname: string, method: string) {
  if (pathname === '/api/intake' && method === 'POST') return true;
  if (pathname === '/api/matter/access' && method === 'POST') return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminLoginPath(pathname)) {
    return NextResponse.next();
  }

  if (isPublicApiAccess(pathname, request.method)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAuthenticated = await verifyAdminSessionToken(token);

  if (isAuthenticated) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/intake') || pathname.startsWith('/api/matter') || pathname.startsWith('/api/matters')) {
    return apiUnauthorized();
  }

  if (pathname.startsWith('/client-room/admin')) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/client-room/admin/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

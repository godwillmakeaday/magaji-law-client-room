import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from '@/lib/admin-auth';
import { CLIENT_COOKIE_NAME, verifyClientSessionToken } from '@/lib/client-auth';

export const config = {
  matcher: [
    '/client-room/admin/:path*',
    '/client-room/existing/dashboard/:path*',
    '/api/intake/:path*',
    '/api/matter/:path*',
    '/api/matters/:path*',
    '/api/matters',
    '/api/client/:path*'
  ]
};

function isAdminLoginPath(pathname: string) {
  return pathname === '/client-room/admin/login' || pathname.startsWith('/client-room/admin/login/');
}

function isPublicApiAccess(pathname: string, method: string) {
  if (pathname === '/api/intake' && method === 'POST') return true;
  if (pathname === '/api/client/request-otp' && method === 'POST') return true;
  if (pathname === '/api/client/verify-otp' && method === 'POST') return true;
  if (pathname === '/api/client/logout' && method === 'POST') return true;
  return false;
}

function adminApiUnauthorized() {
  return NextResponse.json({ error: 'Admin authentication required' }, { status: 401 });
}

function clientApiUnauthorized() {
  return NextResponse.json({ error: 'Client authentication required' }, { status: 401 });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminLoginPath(pathname) || isPublicApiAccess(pathname, request.method)) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/client-room/existing/dashboard')) {
    const clientToken = request.cookies.get(CLIENT_COOKIE_NAME)?.value;
    const clientSession = await verifyClientSessionToken(clientToken);

    if (clientSession) {
      return NextResponse.next();
    }

    const accessUrl = request.nextUrl.clone();
    accessUrl.pathname = '/client-room/existing';
    accessUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(accessUrl);
  }

  if (pathname === '/api/client/matter' || pathname.startsWith('/api/client/matter/')) {
    const clientToken = request.cookies.get(CLIENT_COOKIE_NAME)?.value;
    const clientSession = await verifyClientSessionToken(clientToken);
    return clientSession ? NextResponse.next() : clientApiUnauthorized();
  }

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isAdminAuthenticated = await verifyAdminSessionToken(token);

  if (isAdminAuthenticated) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api/intake') || pathname.startsWith('/api/matter') || pathname.startsWith('/api/matters')) {
    return adminApiUnauthorized();
  }

  if (pathname.startsWith('/client-room/admin')) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/client-room/admin/login';
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

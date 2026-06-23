import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/client-room/admin/:path*",
    "/api/intake/:path*",
  ],
};

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Magaji Law Office"',
    },
  });
}

function isAuthorized(request: NextRequest) {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (!adminUser || !adminPass) return false;

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) return false;

  try {
    const encoded = authHeader.slice("Basic ".length);
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) return false;

    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);

    return user === adminUser && pass === adminPass;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public users to submit new intake forms.
  if (pathname === "/api/intake" && request.method === "POST") {
    return NextResponse.next();
  }

  // Protect admin pages and all non-public intake API access.
  if (
    pathname.startsWith("/client-room/admin") ||
    pathname.startsWith("/api/intake")
  ) {
    if (isAuthorized(request)) {
      return NextResponse.next();
    }

    return unauthorized();
  }

  return NextResponse.next();
}

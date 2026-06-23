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

export function middleware(request: NextRequest) {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (!adminUser || !adminPass) {
    return unauthorized();
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return unauthorized();
  }

  const encoded = authHeader.split(" ")[1];

  try {
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(":");

    if (user === adminUser && pass === adminPass) {
      return NextResponse.next();
    }

    return unauthorized();
  } catch {
    return unauthorized();
  }
}

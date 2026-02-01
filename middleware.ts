import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // protéger admin
  if (pathname.startsWith("/admin")) {
    const loggedIn = req.cookies.get("sb-access-token");

    if (!loggedIn) {
      return NextResponse.redirect(
        new URL("/ar/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

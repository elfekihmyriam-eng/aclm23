import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Autoriser la page login
  if (pathname.startsWith("/ar/login")) {
    return NextResponse.next();
  }

  // 🔒 Protéger admin
  if (pathname.startsWith("/admin")) {
    const loggedIn =
      req.cookies.get("sb-access-token") ||
      req.cookies.get("sb-refresh-token");

    if (!loggedIn) {
      return NextResponse.redirect(
        new URL("/ar/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/ar/login"],
};

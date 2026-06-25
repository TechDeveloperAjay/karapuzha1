import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminSession = request.cookies.get("admin_session")?.value;

  // Protect admin paths from unauthenticated users
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!adminSession) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated admin users away from login page to dashboard
  if (pathname === "/admin/login") {
    if (adminSession) {
      const dashboardUrl = new URL("/admin", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

// Config to specify matching route paths
export const config = {
  matcher: ["/admin/:path*"],
};

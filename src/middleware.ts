import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") || pathname.startsWith("/verify");
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // If authenticated, prevent visiting auth pages
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If not authenticated, block protected pages
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow all other requests through (including "/")
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/verify/:path*",
    "/dashboard/:path*",
  ],
};

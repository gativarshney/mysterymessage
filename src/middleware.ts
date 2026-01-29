import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export {default} from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  const isAuthRoute = url.pathname.startsWith("/sign-in") || url.pathname.startsWith("/sign-up") || url.pathname.startsWith("/verify");
  const isProtectedRoute = url.pathname.startsWith("/dashboard");

  // If authenticated, prevent visiting auth pages
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If not authenticated, block protected pages
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow all other requests through (including "/")
  return NextResponse.next(); // continue processing the request
}

// Matcher to specify which routes the middleware applies to
export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/verify/:path*",
    "/dashboard/:path*",
  ],
};

// Middleware to manage authentication-based route access using NextAuth.js.
// In simple words, it redirects users based on their authentication status and the routes they are trying to access.
// If a user is authenticated, they are redirected away from sign-in/sign-up pages to the dashboard.
// If a user is not authenticated, they are redirected away from protected dashboard pages to the sign-in page.

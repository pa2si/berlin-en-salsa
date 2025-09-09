import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Create the default next-intl middleware
const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, etc.
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if this is the root path and no locale is set yet
  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language") || "";

    // Check if the browser prefers German
    const isGermanPreferred = acceptLanguage.toLowerCase().includes("de");

    // If not German, redirect to Spanish
    if (!isGermanPreferred) {
      const url = request.nextUrl.clone();
      url.pathname = "/es";
      return NextResponse.redirect(url);
    }
  }

  // Use default next-intl middleware for all other cases
  return handleI18nRouting(request);
}

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/_next` or `/_vercel`
  // - ... the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

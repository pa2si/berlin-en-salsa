import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

// Create the next-intl middleware with custom locale detection
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a locale prefix
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // If no locale prefix and visiting root path, check if we should redirect
  if (!hasLocalePrefix && pathname === "/") {
    // First, check if user has already chosen a locale (stored in cookie)
    const localeCookie = request.cookies.get("NEXT_LOCALE");

    // If user has previously chosen a locale, respect that choice
    if (!localeCookie) {
      // No cookie exists, so this is a first-time visitor
      // Check browser's accept-language header
      const acceptLanguage = request.headers.get("accept-language") || "";

      // Parse accept-language header to check if German is the primary language
      // Format examples: "de", "de-DE", "en-US,de;q=0.9"
      const primaryLanguage = acceptLanguage
        .split(",")[0]
        .split("-")[0]
        .toLowerCase();
      const isGerman = primaryLanguage === "de";

      // If browser's primary language is NOT German, redirect to Spanish version
      if (!isGerman) {
        const url = request.nextUrl.clone();
        url.pathname = "/es";
        return NextResponse.redirect(url);
      }
    }
  }

  // Let next-intl middleware handle the rest
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/_next` or `/_vercel`
  // - ... the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create and export the next-intl middleware
// This will handle locale detection including:
// 1. Locale prefix in pathname
// 2. Locale cookie (NEXT_LOCALE)
// 3. Accept-language header
// 4. Default locale as fallback
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - ... if they start with `/api`, `/_next` or `/_vercel`
  // - ... the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["de", "es"],

  // Used when no locale matches - German as default to keep / as German
  defaultLocale: "de",

  // Use 'as-needed' so German (default) has no prefix
  // and Spanish has /es prefix
  localePrefix: "as-needed",

  // Localized pathnames - map different paths to same internal route
  pathnames: {
    // Home route
    "/": "/",
    // Privacy route - localized paths
    "/privacy": {
      de: "/datenschutz",
      es: "/privacidad",
    },
    // Legal route - localized paths
    "/legal": {
      de: "/impressum",
      es: "/legal",
    },
    // Timetable route - localized paths
    "/timetable": {
      de: "/programm",
      es: "/programa",
    },
  },
});

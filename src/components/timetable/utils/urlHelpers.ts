/**
 * Shared URL parameter utilities for timetable navigation
 * These helpers support internationalized day parameters across German/Spanish locales
 */

// PHASE 7: Complete weekday localization mappings
export const WEEKDAY_LOCALIZATION: Record<string, { de: string; es: string }> =
  {
    monday: { de: "montag", es: "lunes" },
    tuesday: { de: "dienstag", es: "martes" },
    wednesday: { de: "mittwoch", es: "miercoles" },
    thursday: { de: "donnerstag", es: "jueves" },
    friday: { de: "freitag", es: "viernes" },
    saturday: { de: "samstag", es: "sabado" },
    sunday: { de: "sonntag", es: "domingo" },
  };

// PHASE 7: Reverse mapping for parsing localized URLs
export const LOCALIZED_TO_ENGLISH: Record<string, string> = {
  // German
  montag: "monday",
  dienstag: "tuesday",
  mittwoch: "wednesday",
  donnerstag: "thursday",
  freitag: "friday",
  samstag: "saturday",
  sonntag: "sunday",
  // Spanish
  lunes: "monday",
  martes: "tuesday",
  miercoles: "wednesday",
  jueves: "thursday",
  viernes: "friday",
  sabado: "saturday",
  domingo: "sunday",
  // English (for backward compatibility)
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
  sunday: "sunday",
};

/**
 * Get the localized URL parameter name based on locale
 * @param locale - Current locale ("de" or "es")
 * @returns "tag" for German, "dia" for Spanish
 */
export const getDayParamName = (locale: string): string => {
  return locale === "de" ? "tag" : "dia";
};

/**
 * Convert English weekday to localized URL parameter value
 * @param day - English weekday name (e.g., "saturday", "sunday")
 * @param locale - Current locale ("de" or "es")
 * @returns Localized weekday (e.g., "samstag", "sabado")
 */
export const getLocalizedDayParam = (day: string, locale: string): string => {
  const weekday = day.toLowerCase();
  const localeKey = locale === "de" ? "de" : "es";

  // Look up localized version
  if (WEEKDAY_LOCALIZATION[weekday]) {
    return WEEKDAY_LOCALIZATION[weekday][localeKey];
  }

  // Fallback to original if not found (shouldn't happen)
  console.warn(`Unknown weekday for localization: ${day}`);
  return weekday;
};

/**
 * Build a complete query object for timetable navigation
 * @param day - English weekday name (e.g., "saturday", "sunday")
 * @param locale - Current locale ("de" or "es")
 * @returns Query object with localized parameter name and value
 * @example
 * // German locale
 * buildTimetableQuery("saturday", "de") // { tag: "samstag" }
 * // Spanish locale
 * buildTimetableQuery("saturday", "es") // { dia: "sabado" }
 */
export const buildTimetableQuery = (
  day: string,
  locale: string,
): Record<string, string> => {
  const paramName = getDayParamName(locale);
  const dayValue = getLocalizedDayParam(day, locale);
  return { [paramName]: dayValue };
};

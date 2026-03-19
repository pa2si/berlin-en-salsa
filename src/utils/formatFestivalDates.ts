import { FESTIVAL_CONFIG } from "@/config/festival";

/**
 * Format festival dates based on locale and number of days
 *
 * Formatting rules:
 * - 1 day: "19 de julio de 2026" (ES) / "19. Juli 2026" (DE)
 * - 2 days: "19 y 20 de julio de 2026" (ES) / "19. und 20. Juli 2026" (DE)
 * - 3+ days: "19 - 21 de julio de 2026" (ES) / "19. - 21. Juli 2026" (DE)
 *
 * @param locale - The current locale ('es', 'de', etc.)
 * @returns Formatted date string
 */
export function formatFestivalDates(locale: string): string {
  const days = FESTIVAL_CONFIG.days;

  if (days.length === 0) return "";

  const startDate = days[0].date;
  const endDate = days[days.length - 1].date;

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const month = startDate.toLocaleDateString(locale, { month: "long" });
  const year = startDate.getFullYear();

  // Single day
  if (days.length === 1) {
    return locale === "es"
      ? `${startDay} de ${month} de ${year}`
      : `${startDay}. ${month} ${year}`;
  }

  // Two days - use "y" (and) format
  if (days.length === 2) {
    return locale === "es"
      ? `${startDay} y ${endDay} de ${month} de ${year}`
      : `${startDay}. und ${endDay}. ${month} ${year}`;
  }

  // Three or more days - use range format
  return locale === "es"
    ? `${startDay} - ${endDay} de ${month} de ${year}`
    : `${startDay}. - ${endDay}. ${month} ${year}`;
}

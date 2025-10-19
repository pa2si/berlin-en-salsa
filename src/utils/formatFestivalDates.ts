import { FESTIVAL_CONFIG } from "@/config/festival";

/**
 * Format festival dates based on locale and number of days
 *
 * Formatting rules:
 * - 1 day: "19 de julio" (ES) / "19. Juli" (DE)
 * - 2 days: "19 y 20 de julio" (ES) / "19. und 20. Juli" (DE)
 * - 3+ days: "19 - 21 de julio" (ES) / "19. - 21. Juli" (DE)
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

  // Single day
  if (days.length === 1) {
    return locale === "es"
      ? `${startDay} de ${month}`
      : `${startDay}. ${month}`;
  }

  // Two days - use "y" (and) format
  if (days.length === 2) {
    return locale === "es"
      ? `${startDay} y ${endDay} de ${month}`
      : `${startDay}. und ${endDay}. ${month}`;
  }

  // Three or more days - use range format
  return locale === "es"
    ? `${startDay} - ${endDay} de ${month}`
    : `${startDay}. - ${endDay}. ${month}`;
}

import { useSearchParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

/**
 * Hook for managing URL parameters with locale support
 * PHASE 7: Enhanced to support all weekdays with proper localization
 */
export const useURLParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

  // PHASE 7: Complete weekday localization mappings
  const WEEKDAY_LOCALIZATION: Record<string, { de: string; es: string }> = {
    monday: { de: "montag", es: "lunes" },
    tuesday: { de: "dienstag", es: "martes" },
    wednesday: { de: "mittwoch", es: "miercoles" },
    thursday: { de: "donnerstag", es: "jueves" },
    friday: { de: "freitag", es: "viernes" },
    saturday: { de: "samstag", es: "sabado" },
    sunday: { de: "sonntag", es: "domingo" },
  };

  // PHASE 7: Reverse mapping for parsing localized URLs
  const LOCALIZED_TO_ENGLISH: Record<string, string> = {
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

  // Helper functions for locale-specific URL parameters
  const getDayParamName = (): string => {
    return locale === "de" ? "tag" : "dia";
  };

  /**
   * PHASE 7: Convert English weekday to localized URL parameter
   * Supports all 7 weekdays with proper German/Spanish localization
   */
  const getLocalizedDayParam = (day: string): string => {
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
   * PHASE 7: Parse URL parameter to English weekday
   * Handles localized German/Spanish parameters and English fallback
   */
  const parseDayParam = (): string => {
    const paramName = getDayParamName();
    let dayParam = searchParams.get(paramName);

    // Check for backwards compatibility with old "day" parameter
    if (!dayParam) {
      dayParam = searchParams.get("day");
    }

    // Default to first day if no parameter
    if (!dayParam) return "saturday";

    // Convert to lowercase for case-insensitive matching
    const normalizedParam = dayParam.toLowerCase();
    
    // Look up English weekday from localized parameter
    if (LOCALIZED_TO_ENGLISH[normalizedParam]) {
      return LOCALIZED_TO_ENGLISH[normalizedParam];
    }
    
    // Fallback: return as-is (might be English already)
    console.warn(`Unknown day parameter: ${dayParam}, returning as-is`);
    return normalizedParam;
  };

  // Function to update the URL with the selected day
  const updateDayInUrl = (day: string) => {
    const params = new URLSearchParams(searchParams);
    const paramName = getDayParamName();
    const dayValue = getLocalizedDayParam(day);

    // Remove old parameter names to ensure clean URLs
    params.delete("day");
    params.delete("tag");
    params.delete("dia");

    // Set the localized parameter
    params.set(paramName, dayValue);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    parseDayParam,
    updateDayInUrl,
  };
};

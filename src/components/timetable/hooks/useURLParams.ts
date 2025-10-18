import { useSearchParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  LOCALIZED_TO_ENGLISH,
  getDayParamName,
  getLocalizedDayParam,
} from "../utils/urlHelpers";

/**
 * Hook for managing URL parameters with locale support
 * PHASE 7: Enhanced to support all weekdays with proper localization
 */
export const useURLParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

  /**
   * PHASE 7: Parse URL parameter to English weekday
   * Handles localized German/Spanish parameters and English fallback
   */
  const parseDayParam = (): string => {
    const paramName = getDayParamName(locale);
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
    const paramName = getDayParamName(locale);
    const dayValue = getLocalizedDayParam(day, locale);

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

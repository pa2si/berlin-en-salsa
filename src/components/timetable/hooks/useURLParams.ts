import { useSearchParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

/**
 * Hook for managing URL parameters with locale support
 */
export const useURLParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

  // Helper functions for locale-specific URL parameters
  const getDayParamName = (): string => {
    return locale === "de" ? "tag" : "dia";
  };

  const getLocalizedDayParam = (day: string): string => {
    // Handle legacy saturday/sunday
    if (day === "saturday" || day === "sunday") {
      if (locale === "de") {
        return day === "saturday" ? "samstag" : "sonntag";
      }
      return day === "saturday" ? "sabado" : "domingo";
    }
    // For other days, return as-is (will be enhanced in Phase 7)
    return day;
  };

  const parseDayParam = (): string => {
    const paramName = getDayParamName();
    let dayParam = searchParams.get(paramName);

    // Check for backwards compatibility with old "day" parameter
    if (!dayParam) {
      dayParam = searchParams.get("day");
    }

    if (!dayParam) return "saturday"; // Default to first day

    // Handle legacy localized params
    if (locale === "de") {
      if (dayParam === "sonntag" || dayParam === "sunday") return "sunday";
      if (dayParam === "samstag" || dayParam === "saturday") return "saturday";
    } else {
      if (dayParam === "domingo" || dayParam === "sunday") return "sunday";
      if (dayParam === "sabado" || dayParam === "saturday") return "saturday";
    }
    
    // Return as-is for other days (will be enhanced in Phase 7)
    return dayParam;
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

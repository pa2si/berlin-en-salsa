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

  const getLocalizedDayParam = (day: "saturday" | "sunday"): string => {
    if (locale === "de") {
      return day === "saturday" ? "samstag" : "sonntag";
    }
    return day === "saturday" ? "sabado" : "domingo";
  };

  const parseDayParam = (): "saturday" | "sunday" => {
    const paramName = getDayParamName();
    let dayParam = searchParams.get(paramName);

    // Check for backwards compatibility with old "day" parameter
    if (!dayParam) {
      dayParam = searchParams.get("day");
    }

    if (!dayParam) return "saturday";

    if (locale === "de") {
      return dayParam === "sonntag" || dayParam === "sunday"
        ? "sunday"
        : "saturday";
    }
    return dayParam === "domingo" || dayParam === "sunday"
      ? "sunday"
      : "saturday";
  };

  // Function to update the URL with the selected day
  const updateDayInUrl = (day: "saturday" | "sunday") => {
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

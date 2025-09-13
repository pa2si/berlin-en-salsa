import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { URLStateService } from "../../../services/timetable/URLStateService";

/**
 * Enhanced hook for URL parameter management using URLStateService
 */
export const useURLParamsWithServices = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const parseDayParam = useCallback((): "saturday" | "sunday" => {
    return URLStateService.parseDayFromURL(searchParams, locale);
  }, [searchParams, locale]);

  const updateDayInUrl = useCallback(
    (day: "saturday" | "sunday") => {
      URLStateService.updateDayInURL(day, locale, router, searchParams);
    },
    [locale, router, searchParams],
  );

  const addModalToURL = useCallback(
    (eventId: string) => {
      URLStateService.addModalToURL(eventId, router, searchParams);
    },
    [router, searchParams],
  );

  const removeModalFromURL = useCallback(() => {
    URLStateService.removeModalFromURL(router, searchParams);
  }, [router, searchParams]);

  const clearAllParams = useCallback(() => {
    URLStateService.clearTimetableParams(router, searchParams);
  }, [router, searchParams]);

  const getDayParamName = useCallback(() => {
    return URLStateService.getDayParamName(locale);
  }, [locale]);

  const getLocalizedDayValue = useCallback(
    (day: "saturday" | "sunday") => {
      return URLStateService.getLocalizedDayValue(day, locale);
    },
    [locale],
  );

  return {
    parseDayParam,
    updateDayInUrl,
    addModalToURL,
    removeModalFromURL,
    clearAllParams,
    getDayParamName,
    getLocalizedDayValue,
  };
};

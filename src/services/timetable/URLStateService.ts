import { useRouter } from "next/navigation";

/**
 * Service for managing URL state and parameters
 * Handles day selection, modal state, and URL synchronization
 */
export class URLStateService {
  private static readonly DAY_PARAM_MAP = {
    es: { param: "dia", saturday: "sabado", sunday: "domingo" },
    de: { param: "tag", saturday: "samstag", sunday: "sonntag" },
  } as const;

  /**
   * Parses the day parameter from URL
   */
  static parseDayFromURL(
    searchParams: URLSearchParams,
    locale: string,
  ): "saturday" | "sunday" {
    const config =
      this.DAY_PARAM_MAP[locale as keyof typeof this.DAY_PARAM_MAP];
    if (!config) return "saturday";

    const dayParam = searchParams.get(config.param);

    if (dayParam === config.saturday) return "saturday";
    if (dayParam === config.sunday) return "sunday";

    return "saturday"; // Default fallback
  }

  /**
   * Updates the day parameter in URL
   */
  static updateDayInURL(
    day: "saturday" | "sunday",
    locale: string,
    router: ReturnType<typeof useRouter>,
    searchParams: URLSearchParams,
  ): void {
    const config =
      this.DAY_PARAM_MAP[locale as keyof typeof this.DAY_PARAM_MAP];
    if (!config) return;

    const params = new URLSearchParams(searchParams);

    // Remove both possible day parameters
    Object.values(this.DAY_PARAM_MAP).forEach(({ param }) => {
      params.delete(param);
    });

    // Set the localized parameter
    const dayValue = day === "saturday" ? config.saturday : config.sunday;
    params.set(config.param, dayValue);

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  /**
   * Gets the current day parameter name for the locale
   */
  static getDayParamName(locale: string): string {
    const config =
      this.DAY_PARAM_MAP[locale as keyof typeof this.DAY_PARAM_MAP];
    return config?.param || "dia";
  }

  /**
   * Gets the localized day value
   */
  static getLocalizedDayValue(
    day: "saturday" | "sunday",
    locale: string,
  ): string {
    const config =
      this.DAY_PARAM_MAP[locale as keyof typeof this.DAY_PARAM_MAP];
    if (!config) return day;

    return day === "saturday" ? config.saturday : config.sunday;
  }

  /**
   * Clears all timetable-related URL parameters
   */
  static clearTimetableParams(
    router: ReturnType<typeof useRouter>,
    searchParams: URLSearchParams,
  ): void {
    const params = new URLSearchParams(searchParams);

    // Remove all day parameters
    Object.values(this.DAY_PARAM_MAP).forEach(({ param }) => {
      params.delete(param);
    });

    // Remove modal-related parameters if any
    params.delete("modal");
    params.delete("event");

    router.replace(`?${params.toString()}`, { scroll: false });
  }

  /**
   * Adds modal state to URL (optional feature)
   */
  static addModalToURL(
    eventId: string,
    router: ReturnType<typeof useRouter>,
    searchParams: URLSearchParams,
  ): void {
    const params = new URLSearchParams(searchParams);
    params.set("modal", "open");
    params.set("event", eventId);
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  /**
   * Removes modal state from URL
   */
  static removeModalFromURL(
    router: ReturnType<typeof useRouter>,
    searchParams: URLSearchParams,
  ): void {
    const params = new URLSearchParams(searchParams);
    params.delete("modal");
    params.delete("event");
    router.replace(`?${params.toString()}`, { scroll: false });
  }
}

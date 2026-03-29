/**
 * Represents a single day of the festival with all metadata
 */
export interface FestivalDay {
  id: string; // e.g., "day1", "day2", "day3"
  date: Date; // Actual calendar date
  weekday: string; // e.g., "saturday", "sunday", "monday" (lowercase)
  weekdayFull: string; // e.g., "Saturday", "Sunday" (capitalized)
  label: string; // Translation key for display (e.g., "Sections.SectionFive.days.saturday")
  imageSrc: string; // Path to button image
  dateShort: string; // e.g., "Jul 19" for display
  dateISO: string; // ISO date string for technical use
}

export const FESTIVAL_TIME_ZONE = "Europe/Berlin";

/**
 * Generate festival days from date range
 * Each day gets complete metadata for UI rendering and data lookup
 */
function generateFestivalDays(start: Date, end: Date): FestivalDay[] {
  const days: FestivalDay[] = [];
  const current = new Date(start);
  current.setHours(0, 0, 0, 0); // Start at midnight for accurate day counting

  const endDate = new Date(end);
  endDate.setHours(0, 0, 0, 0);

  let dayCounter = 1;

  while (current <= endDate) {
    const weekdayName = current
      .toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: FESTIVAL_TIME_ZONE,
      })
      .toLowerCase();

    const weekdayFull = current.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: FESTIVAL_TIME_ZONE,
    });

    const dateShort = current.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: FESTIVAL_TIME_ZONE,
    });

    const dateISO = current.toLocaleDateString("en-CA", {
      timeZone: FESTIVAL_TIME_ZONE,
    });

    days.push({
      id: `day${dayCounter}`,
      date: new Date(current),
      weekday: weekdayName,
      weekdayFull: weekdayFull,
      label: `Sections.SectionFive.days.${weekdayName}`,
      imageSrc: `/timetable-days/day${dayCounter}.svg`,
      dateShort: dateShort,
      dateISO: dateISO,
    });

    current.setDate(current.getDate() + 1);
    dayCounter++;
  }

  return days;
}

/**
 * Computed type for valid day IDs (e.g., "day1", "day2")
 * This provides type safety while remaining dynamic
 */
export type FestivalDayId = `day${number}`;

// Festival date configuration
export const FESTIVAL_CONFIG = {
  timeZone: FESTIVAL_TIME_ZONE,

  dates: {
    // Explicit Berlin timezone offsets (+02:00) for summer dates
    start: new Date("2026-07-03T12:30:00+02:00"),
    end: new Date("2026-07-05T22:00:00+02:00"),
  },

  /**
   * Global venue availability flag
   * When true the UI will display the venue name/translation (t("venue")).
   * Set to false when the location is not finalized and should be hidden.
   */
  venueIsKnown: false,

  /**
   * Timetable availability configuration
   * Set to true when the timetable is finalized and ready to be displayed
   */
  timetable: {
    isAvailable: true, // Change to true when timetable is ready
  },

  /**
   * Features section (SectionThree) availability
   * Set to true when you want to display festival features/program overview
   */
  sectionThree: {
    isAvailable: false, // Change to false to hide the features section
  },

  /**
   * Dynamically generate festival days from start/end dates
   * This is a getter so it's computed on access
   */
  get days(): FestivalDay[] {
    return generateFestivalDays(this.dates.start, this.dates.end);
  },

  /**
   * Get a specific day by its ID
   */
  getDayById(dayId: string): FestivalDay | undefined {
    return this.days.find((day) => day.id === dayId);
  },

  /**
   * Get a specific day by its weekday name
   */
  getDayByWeekday(weekday: string): FestivalDay | undefined {
    return this.days.find((day) => day.weekday === weekday.toLowerCase());
  },
};

/**
 * Helper to get all valid weekdays as a union type
 * Usage: "saturday" | "sunday" | "monday" etc.
 */
export type FestivalWeekday = (typeof FESTIVAL_CONFIG.days)[number]["weekday"];

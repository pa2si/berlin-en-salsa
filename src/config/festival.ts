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
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const weekdayFull = current.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const dateShort = current.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    days.push({
      id: `day${dayCounter}`,
      date: new Date(current),
      weekday: weekdayName,
      weekdayFull: weekdayFull,
      label: `Sections.SectionFive.days.${weekdayName}`,
      imageSrc: `/timetable-days/day${dayCounter}.svg`,
      dateShort: dateShort,
      dateISO: current.toISOString().split("T")[0],
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
  dates: {
    start: new Date("July 19, 2025 12:30:00"),
    end: new Date("July 20 2025 23:59:59"),
  },

  /**
   * Timetable availability configuration
   * Set to true when the timetable is finalized and ready to be displayed
   */
  timetable: {
    isAvailable: false, // Change to true when timetable is ready
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

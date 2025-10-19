import { TimeSlot } from "../../../types/timetable";

export interface Column {
  area: string;
  slots: TimeSlot[];
}

export interface TimetableData {
  saturday: Column[];
  sunday: Column[];
}

/**
 * PHASE 5: Changed from hardcoded "saturday" | "sunday" to generic string
 * Now supports any weekday (monday, tuesday, etc.)
 * @deprecated Consider using string directly instead of this type alias
 */
export type DayType = string; // Changed from "saturday" | "sunday" to support any weekday
export type LocaleType = "es" | "de";

import { TimeSlot } from "../../../types/timetable";

export interface Column {
  area: string;
  slots: TimeSlot[];
}

export interface TimetableData {
  saturday: Column[];
  sunday: Column[];
}

export type DayType = "saturday" | "sunday";
export type LocaleType = "es" | "de";

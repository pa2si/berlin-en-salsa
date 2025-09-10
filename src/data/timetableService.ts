import { Column } from "../types/timetable";
import { saturdayTimetableData } from "./saturdayTimetable";
import { sundayTimetableData } from "./sundayTimetable";
import { GermanSaturdayTimetableData } from "./GermanSaturdayTimetable";
import { GermanSundayTimetableData } from "./GermanSundayTimetable";

export interface TimetableData {
  saturday: Column[];
  sunday: Column[];
}

export function getTimetableData(locale: string): TimetableData {
  switch (locale) {
    case "de":
      return {
        saturday: GermanSaturdayTimetableData,
        sunday: GermanSundayTimetableData,
      };
    case "es":
    default:
      return {
        saturday: saturdayTimetableData,
        sunday: sundayTimetableData,
      };
  }
}

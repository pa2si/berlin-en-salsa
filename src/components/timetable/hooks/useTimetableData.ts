import { useLocale } from "next-intl";
import { TimetableService } from "../../../data/timetable/services/timetable.service";
import { Column } from "../../../types/timetable";
import { processEventContinuation } from "../utils/eventProcessing";
import { useColumnTranslation } from "../utils/translationHelpers";

/**
 * Hook for fetching and processing timetable data
 */
export const useTimetableData = (currentDay: "saturday" | "sunday") => {
  const locale = useLocale();
  const { translateColumnArea, getOriginalAreaKey } = useColumnTranslation();

  // Get raw timetable data from service
  const rawTimetableData = TimetableService.getTimetableData(
    currentDay,
    locale,
  );

  // Process the timetable data to identify consecutive slots and translate areas
  const processedTimetableData: Column[] = processEventContinuation(
    rawTimetableData,
    translateColumnArea,
    getOriginalAreaKey,
  );

  return {
    timetableData: processedTimetableData,
  };
};

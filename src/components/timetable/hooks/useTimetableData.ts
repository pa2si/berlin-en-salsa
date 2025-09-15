import { useEffect, useState } from "react";
import { Column } from "../../../types/timetable";
import { processEventContinuation } from "../utils/eventProcessing";
import { useColumnTranslation } from "../utils/translationHelpers";
import { TimetableService } from "../../../data/timetable/services/timetable.service";

/**
 * Hook for fetching and processing timetable data with the translation system
 * This hook works with Server Components and the translatable data format
 */
export const useTimetableData = (currentDay: "saturday" | "sunday") => {
  const [timetableData, setTimetableData] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { translateColumnArea, getOriginalAreaKey } = useColumnTranslation();

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get translated timetable data from the service
        const rawTimetableData =
          await TimetableService.getTimetableDataServer(currentDay);

        // Process the timetable data to identify consecutive slots and translate areas
        const processedTimetableData: Column[] = processEventContinuation(
          rawTimetableData,
          translateColumnArea,
          getOriginalAreaKey,
        );

        setTimetableData(processedTimetableData);
      } catch (err) {
        console.error("Error fetching timetable data:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimetableData();
  }, [currentDay, translateColumnArea, getOriginalAreaKey]);

  return {
    timetableData,
    isLoading,
    error,
  };
};

/**
 * Lightweight hook for client-side translation of already-fetched translatable data
 * This can be used when timetable data is fetched server-side and passed as props
 */
export const useClientTimetableTranslation = () => {
  const { translateColumnArea, getOriginalAreaKey } = useColumnTranslation();

  const translateTimetableData = (rawData: Column[]) => {
    return processEventContinuation(
      rawData,
      translateColumnArea,
      getOriginalAreaKey,
    );
  };

  return {
    translateTimetableData,
  };
};

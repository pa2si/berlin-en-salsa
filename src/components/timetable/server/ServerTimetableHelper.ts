import { Column } from "../../../types/timetable";
import { processEventContinuation } from "../utils/eventProcessing";
import { TimetableService } from "../../../data/timetable/services/timetable.service";
import { getTranslations } from "next-intl/server";

/**
 * Server-side helper for getting translated timetable data
 * This should be used in Server Components for optimal performance
 * PHASE 5: Updated to accept generic string for day parameters
 */
export class ServerTimetableHelper {
  /**
   * Get fully translated and processed timetable data for a specific day
   * This runs on the server and returns ready-to-use data
   * PHASE 5: Now accepts any weekday string (not just "saturday" | "sunday")
   */
  static async getTimetableData(
    currentDay: string, // Changed from "saturday" | "sunday" to string
  ): Promise<Column[]> {
    // Get translated timetable data from the service
    const rawTimetableData =
      await TimetableService.getTimetableDataServer(currentDay);

    // Get translation function for area names
    const t = await getTranslations("Timetable.columns");

    // Create column translation functions (server-side versions)
    const translateColumnArea = (area: string) => {
      // Map area names to translation keys
      const areaKeyMap: Record<string, string> = {
        Hauptbühne: "mainStage",
        "Tarima Principal": "mainStage",
        "Main Stage": "mainStage",
        "Tanz-Workshops": "danceWorkshops",
        "Talleres de Baile": "danceWorkshops",
        "Dance Workshops": "danceWorkshops",
        "Musik-Workshops": "musicWorkshops",
        "Talleres de Música": "musicWorkshops",
        "Music Workshops": "musicWorkshops",
        "Salsa-Talks": "salsaTalks",
        "Charlas Salseras": "salsaTalks",
        "Salsa Talks": "salsaTalks",
      };

      const translationKey = areaKeyMap[area];
      if (translationKey) {
        try {
          return t(translationKey as never);
        } catch (error) {
          console.warn(`Translation not found for area: ${area}`, error);
          return area; // Fallback to original
        }
      }
      return area;
    };

    const getOriginalAreaKey = (translatedArea: string) => {
      // This is used for URL generation - return a consistent key
      const reverseMap: Record<string, string> = {
        Hauptbühne: "main-stage",
        "Tarima Principal": "main-stage",
        "Main Stage": "main-stage",
        "Tanz-Workshops": "dance-workshops",
        "Talleres de Baile": "dance-workshops",
        "Dance Workshops": "dance-workshops",
        "Musik-Workshops": "music-workshops",
        "Talleres de Música": "music-workshops",
        "Music Workshops": "music-workshops",
        "Salsa-Talks": "salsa-talks",
        "Charlas Salseras": "salsa-talks",
        "Salsa Talks": "salsa-talks",
      };

      return (
        reverseMap[translatedArea] ||
        translatedArea.toLowerCase().replace(/\s+/g, "-")
      );
    };

    // Process the timetable data to identify consecutive slots and translate areas
    const processedTimetableData: Column[] = processEventContinuation(
      rawTimetableData,
      translateColumnArea,
      getOriginalAreaKey,
    );

    return processedTimetableData;
  }

  /**
   * Check if a specific area has been migrated to the new translation system
   * PHASE 5: Updated to accept generic string for day parameter
   * @deprecated This method is for backward compatibility only
   */
  static isAreaMigrated(area: string, day: string): boolean {
    // Changed from "saturday" | "sunday" to string
    // Map area names to AreaType
    const areaTypeMap: Record<string, string> = {
      "main-stage": "main-stage",
      "dance-workshops": "dance-workshops",
      "music-workshops": "music-workshops",
      "salsa-talks": "salsa-talks",
    };

    const areaType = areaTypeMap[area];
    if (areaType) {
      return TimetableService.isAreaMigrated(areaType as never, day);
    }
    return false;
  }

  /**
   * Get available time slots for a given day
   * PHASE 5: Updated to accept generic string for day parameter
   */
  static async getAvailableTimeSlots(
    day: string, // Changed from "saturday" | "sunday" to string
  ): Promise<string[]> {
    return TimetableService.getAvailableTimeSlotsServer(day);
  }
}

import { AreaType, AREA_DEFINITIONS } from "../types/area.types";
import { TimeSlot } from "../types/event.types";
import { TranslatableTimeSlot } from "../types/translatable.types";
import { Column } from "../types/timetable.types";
import { translateTimeSlotsServer } from "../utils/timetableTranslation";

// Import translatable data - single source of truth
import { mainStageSaturday } from "../areas/main-stage/saturday";
import { mainStageSunday } from "../areas/main-stage/sunday";
import { danceWorkshopsSaturday } from "../areas/dance-workshops/saturday";
import { danceWorkshopsSunday } from "../areas/dance-workshops/sunday";
import { musicWorkshopsSaturday } from "../areas/music-workshops/saturday";
import { musicWorkshopsSunday } from "../areas/music-workshops/sunday";
import { salsaTalksSaturday } from "../areas/salsa-talks/saturday";
import { salsaTalksSunday } from "../areas/salsa-talks/sunday";

// Import existing data for areas not yet migrated (none remaining)
// import { salsaTalksSaturday } from "../areas/salsa-talks/saturday";
// import { salsaTalksSunday } from "../areas/salsa-talks/sunday";

// Import German locale data for areas not yet migrated (now only for non-main-stage areas)
// Note: Other German imports will be added as we migrate each area

/**
 * Service for timetable data that supports the translation system
 * This service handles all timetable data with full i18n support
 */
export class TimetableService {
  /**
   * Get raw translatable data for Saturday (for areas that have been migrated)
   */
  private static getSaturdayTranslatableData(): Record<
    AreaType,
    TranslatableTimeSlot[] | TimeSlot[]
  > {
    return {
      "main-stage": mainStageSaturday, // Migrated to translatable format
      "dance-workshops": danceWorkshopsSaturday, // Migrated to translatable format
      "music-workshops": musicWorkshopsSaturday, // Migrated to translatable format
      "salsa-talks": salsaTalksSaturday, // Migrated to translatable format
    };
  }

  /**
   * Get raw translatable data for Sunday (for areas that have been migrated)
   */
  private static getSundayTranslatableData(): Record<
    AreaType,
    TranslatableTimeSlot[] | TimeSlot[]
  > {
    return {
      "main-stage": mainStageSunday, // Migrated to translatable format
      "dance-workshops": danceWorkshopsSunday, // Migrated to translatable format
      "music-workshops": musicWorkshopsSunday, // Migrated to translatable format
      "salsa-talks": salsaTalksSunday, // Migrated to translatable format
    };
  }

  /**
   * Get translated timetable data for Saturday - Server Component version
   */
  static async getSaturdayDataTranslated(): Promise<
    Record<AreaType, TimeSlot[]>
  > {
    const rawData = this.getSaturdayTranslatableData();
    const translatedData: Record<AreaType, TimeSlot[]> = {} as Record<
      AreaType,
      TimeSlot[]
    >;

    for (const [areaKey, slots] of Object.entries(rawData)) {
      const area = areaKey as AreaType;

      // All areas have been migrated to translatable format
      translatedData[area] = await translateTimeSlotsServer(
        slots as TranslatableTimeSlot[],
      );
    }

    return translatedData;
  }

  /**
   * Get translated timetable data for Sunday - Server Component version
   */
  static async getSundayDataTranslated(): Promise<
    Record<AreaType, TimeSlot[]>
  > {
    const rawData = this.getSundayTranslatableData();
    const translatedData: Record<AreaType, TimeSlot[]> = {} as Record<
      AreaType,
      TimeSlot[]
    >;

    for (const [areaKey, slots] of Object.entries(rawData)) {
      const area = areaKey as AreaType;

      // All areas have been migrated to translatable format
      translatedData[area] = await translateTimeSlotsServer(
        slots as TranslatableTimeSlot[],
      );
    }

    return translatedData;
  }

  /**
   * Get timetable data for a specific day - Server Component version
   * This replaces the old getTimetableData method for Server Components
   */
  static async getTimetableDataServer(
    day: "saturday" | "sunday",
  ): Promise<Column[]> {
    let areaData: Record<AreaType, TimeSlot[]>;

    if (day === "saturday") {
      // Use the new translation system for Saturday
      areaData = await this.getSaturdayDataTranslated();
    } else {
      // Use the new translation system for Sunday
      areaData = await this.getSundayDataTranslated();
    }

    return Object.entries(areaData).map(([areaKey, slots]) => {
      const areaType = areaKey as AreaType;
      const areaDefinition = AREA_DEFINITIONS[areaType];

      return {
        area: areaDefinition.spanishName, // Will be replaced with translation keys later
        slots: slots,
      };
    });
  }

  /**
   * Get available time slots for a given day - Server Component version
   */
  static async getAvailableTimeSlotsServer(
    day: "saturday" | "sunday",
  ): Promise<string[]> {
    let areaData: Record<AreaType, TimeSlot[]>;

    if (day === "saturday") {
      areaData = await this.getSaturdayDataTranslated();
    } else {
      areaData = await this.getSundayDataTranslated();
    }

    const timeSlots = new Set<string>();
    Object.values(areaData).forEach((slots) => {
      slots.forEach((slot) => timeSlots.add(slot.time));
    });

    return Array.from(timeSlots).sort();
  }

  /**
   * Get all events for a specific area and day - Server Component version
   */
  static async getAreaEventsServer(
    area: AreaType,
    day: "saturday" | "sunday",
  ): Promise<TimeSlot[]> {
    let areaData: Record<AreaType, TimeSlot[]>;

    if (day === "saturday") {
      areaData = await this.getSaturdayDataTranslated();
    } else {
      areaData = await this.getSundayDataTranslated();
    }

    return areaData[area] || [];
  }

  /**
   * Find an event by time and area - Server Component version
   */
  static async findEventServer(
    time: string,
    area: AreaType,
    day: "saturday" | "sunday",
  ): Promise<TimeSlot | undefined> {
    const areaEvents = await this.getAreaEventsServer(area, day);
    return areaEvents.find((slot) => slot.time === time && slot.event);
  }

  /**
   * Migration helper: Check if an area has been migrated to translatable format
   */
  static isAreaMigrated(area: AreaType, day: "saturday" | "sunday"): boolean {
    return area === "main-stage" && day === "saturday";
  }
}

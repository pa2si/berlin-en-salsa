import { AreaType, AREA_DEFINITIONS } from "../types/area.types";
import { TimeSlot } from "../types/event.types";
import { Column } from "../types/timetable.types";

// Import area data - Spanish (default) locale
import { mainStageSaturday } from "../areas/main-stage/saturday";
import { mainStageSunday } from "../areas/main-stage/sunday";
import { danceWorkshopsSaturday } from "../areas/dance-workshops/saturday";
import { danceWorkshopsSunday } from "../areas/dance-workshops/sunday";
import { musicWorkshopsSaturday } from "../areas/music-workshops/saturday";
import { musicWorkshopsSunday } from "../areas/music-workshops/sunday";
import { salsaTalksSaturday } from "../areas/salsa-talks/saturday";
import { salsaTalksSunday } from "../areas/salsa-talks/sunday";

// Import German locale data
import { mainStageSaturday as mainStageSaturdayDe } from "../areas/main-stage/de/saturday";
import { mainStageSunday as mainStageSundayDe } from "../areas/main-stage/de/sunday";
import { danceWorkshopsSaturday as danceWorkshopsSaturdayDe } from "../areas/dance-workshops/de/saturday";
import { danceWorkshopsSunday as danceWorkshopsSundayDe } from "../areas/dance-workshops/de/sunday";
import { musicWorkshopsSaturday as musicWorkshopsSaturdayDe } from "../areas/music-workshops/de/saturday";
import { musicWorkshopsSunday as musicWorkshopsSundayDe } from "../areas/music-workshops/de/sunday";
import { salsaTalksSaturday as salsaTalksSaturdayDe } from "../areas/salsa-talks/de/saturday";
import { salsaTalksSunday as salsaTalksSundayDe } from "../areas/salsa-talks/de/sunday";

/**
 * Service to aggregate timetable data from different areas
 */
export class TimetableService {
  private static getSaturdayData(
    locale: string = "es",
  ): Record<AreaType, TimeSlot[]> {
    if (locale === "de") {
      // Return German Saturday data
      return {
        "main-stage": mainStageSaturdayDe,
        "dance-workshops": danceWorkshopsSaturdayDe,
        "music-workshops": musicWorkshopsSaturdayDe,
        "salsa-talks": salsaTalksSaturdayDe,
      };
    }

    // Default Spanish locale
    return {
      "main-stage": mainStageSaturday,
      "dance-workshops": danceWorkshopsSaturday,
      "music-workshops": musicWorkshopsSaturday,
      "salsa-talks": salsaTalksSaturday,
    };
  }

  private static getSundayData(
    locale: string = "es",
  ): Record<AreaType, TimeSlot[]> {
    if (locale === "de") {
      // Return German Sunday data
      return {
        "main-stage": mainStageSundayDe,
        "dance-workshops": danceWorkshopsSundayDe,
        "music-workshops": musicWorkshopsSundayDe,
        "salsa-talks": salsaTalksSundayDe,
      };
    }

    // Default Spanish locale
    return {
      "main-stage": mainStageSunday,
      "dance-workshops": danceWorkshopsSunday,
      "music-workshops": musicWorkshopsSunday,
      "salsa-talks": salsaTalksSunday,
    };
  }

  /**
   * Get timetable data for a specific day and locale
   */
  static getTimetableData(
    day: "saturday" | "sunday",
    locale: string = "es",
  ): Column[] {
    const areaData =
      day === "saturday"
        ? this.getSaturdayData(locale)
        : this.getSundayData(locale);

    return Object.entries(areaData).map(([areaKey, slots]) => {
      const areaType = areaKey as AreaType;
      const areaDefinition = AREA_DEFINITIONS[areaType];

      // Get the localized area name
      const localizedAreaName =
        locale === "de"
          ? areaDefinition.germanName
          : areaDefinition.spanishName;

      return {
        area: localizedAreaName,
        slots: slots,
      };
    });
  }

  /**
   * Get available time slots across all areas for a given day and locale
   */
  static getAvailableTimeSlots(
    day: "saturday" | "sunday",
    locale: string = "es",
  ): string[] {
    const areaData =
      day === "saturday"
        ? this.getSaturdayData(locale)
        : this.getSundayData(locale);
    const timeSlots = new Set<string>();

    Object.values(areaData).forEach((slots) => {
      slots.forEach((slot) => timeSlots.add(slot.time));
    });

    return Array.from(timeSlots).sort();
  }

  /**
   * Get all events for a specific area, day and locale
   */
  static getAreaEvents(
    area: AreaType,
    day: "saturday" | "sunday",
    locale: string = "es",
  ): TimeSlot[] {
    const areaData =
      day === "saturday"
        ? this.getSaturdayData(locale)
        : this.getSundayData(locale);
    return areaData[area] || [];
  }

  /**
   * Find an event by time, area, day and locale
   */
  static findEvent(
    time: string,
    area: AreaType,
    day: "saturday" | "sunday",
    locale: string = "es",
  ): TimeSlot | undefined {
    const areaEvents = this.getAreaEvents(area, day, locale);
    return areaEvents.find((slot) => slot.time === time && slot.event);
  }
}

import { AreaType, AREA_DEFINITIONS } from "../types/area.types";
import { TimeSlot } from "../types/event.types";
import { TranslatableTimeSlot } from "../types/translatable.types";
import { Column } from "../types/timetable.types";
import { translateTimeSlotsServer } from "../utils/timetableTranslation";
import { TimetableAdapterService } from "../../../services/timetableAdapter";

// Import translatable data - single source of truth
import { mainStageSunday } from "../areas/main-stage/sunday";
import { danceWorkshopsSaturday } from "../areas/dance-workshops/saturday";
import { danceWorkshopsSunday } from "../areas/dance-workshops/sunday";
import { musicWorkshopsSaturday } from "../areas/music-workshops/saturday";
import { musicWorkshopsSunday } from "../areas/music-workshops/sunday";
import { salsaTalksSaturday } from "../areas/salsa-talks/saturday";
import { salsaTalksSunday } from "../areas/salsa-talks/sunday";

// Import new event-based data
import { mainStageSaturdayEvents } from "../events/main-stage-saturday-new";
import {
  mainStageSaturdayTimeline,
  createTimelineFromSimpleConfig,
} from "../../../utils/timelineConfig";

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
    // Generate timeline from simple config
    const timelineEvents = createTimelineFromSimpleConfig(
      mainStageSaturdayTimeline,
      mainStageSaturdayEvents,
    );

    return {
      "main-stage":
        this.convertNewEventsToTranslatableTimeSlots(timelineEvents), // Using simple timeline config
      "dance-workshops": danceWorkshopsSaturday, // Migrated to translatable format
      "music-workshops": musicWorkshopsSaturday, // Migrated to translatable format
      "salsa-talks": salsaTalksSaturday, // Migrated to translatable format
    };
  }

  /**
   * Convert new TimetableEvent[] format back to TranslatableTimeSlot[] for compatibility
   */
  private static convertNewEventsToTranslatableTimeSlots(
    events: import("../../../types/events").TimetableEvent[],
  ): TranslatableTimeSlot[] {
    const timeSlots: TranslatableTimeSlot[] = [];

    // Generate 30-minute time slots from 12:30 to 23:00
    const startTime = 12 * 60 + 30; // 12:30 in minutes
    const endTime = 23 * 60; // 23:00 in minutes

    for (let time = startTime; time <= endTime; time += 30) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      // Find if any event is active at this time
      const activeEvent = events.find((event) => {
        const eventStart = this.timeToMinutes(event.startTime);
        const eventEnd = this.timeToMinutes(event.endTime);
        return time >= eventStart && time < eventEnd;
      });

      if (activeEvent) {
        const timeSlot: TranslatableTimeSlot = {
          time: timeString,
          event: activeEvent.title,
          type: "main",
          actType:
            activeEvent.type === "main-stage"
              ? activeEvent.performanceType === "live"
                ? "Live"
                : "DJ Set"
              : undefined,
        };

        // Add acts information - using the new acts format
        let djs: Array<{
          name: string;
          role: string;
          image?: string;
          bio?: string;
          description?: string;
        }> = [];
        let bandMembers: Array<{
          name: string;
          role: string;
          image?: string;
          bio?: string;
          description?: string;
        }> = [];
        let dancers: Array<{
          name: string;
          role: string;
          image?: string;
          bio?: string;
          description?: string;
        }> = [];

        if ("acts" in activeEvent && activeEvent.acts.length > 0) {
          djs = activeEvent.acts.filter((p) => p.role === "dj");
          bandMembers = activeEvent.acts.filter(
            (p) => p.role === "band-member" || p.role === "band",
          );
          dancers = activeEvent.acts.filter((p) => p.role === "dancer");
        }

        if (djs.length > 0) {
          // Create slides for DJs
          timeSlot.slides = djs.map((dj) => ({
            djName: dj.name,
            image: dj.image,
            description: dj.bio || dj.description, // Use bio or description
          }));
        } else if (bandMembers.length > 0) {
          timeSlot.image = activeEvent.image;
          timeSlot.bio = bandMembers[0].bio || bandMembers[0].description; // Use bio or description

          // Check if there are also dancers for a dance show
          if (dancers.length > 0) {
            // Use dance show properties from the event if available
            if ("hasShow" in activeEvent) {
              timeSlot.hasShow = activeEvent.hasShow;
            } else {
              timeSlot.hasShow = true; // Fallback for backward compatibility
            }

            if ("danceShow" in activeEvent && activeEvent.danceShow) {
              timeSlot.danceShow = activeEvent.danceShow;
            }

            if ("dancers" in activeEvent && activeEvent.dancers) {
              timeSlot.dancers = activeEvent.dancers;
            }

            // Use existing slides if they exist, otherwise create them
            if (
              "slides" in activeEvent &&
              activeEvent.slides &&
              activeEvent.slides.length > 0
            ) {
              // Convert existing slides to the format expected by the legacy system
              timeSlot.slides = activeEvent.slides.map((slide, index) => {
                if (index === 0) {
                  // First slide is the band
                  return {
                    bandName: activeEvent.title,
                    image: slide.image,
                    description: slide.caption,
                  };
                } else {
                  // Second slide is dancers
                  return {
                    dancerOne: dancers[0]?.name,
                    dancerTwo: dancers[1]?.name,
                    image: slide.image,
                    description: slide.caption,
                  };
                }
              });
            }
          }
        }

        timeSlots.push(timeSlot);
      } else {
        // Empty slot
        timeSlots.push({ time: timeString });
      }
    }

    return timeSlots;
  }

  /**
   * Helper method to convert time string to minutes
   */
  private static timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
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
   * NEW: Get timetable data using the new event-based architecture
   * This method uses the adapter service to gradually migrate to the new system
   */
  static async getTimetableDataServerNew(
    day: "saturday" | "sunday",
  ): Promise<Column[]> {
    try {
      // Use the new adapter service which handles both old and new formats
      const areaColumns = await TimetableAdapterService.getTimetableData(day);

      // Convert back to legacy Column format for existing components
      return TimetableAdapterService.convertToLegacyFormat(areaColumns);
    } catch (error) {
      console.warn(
        "Failed to load with new adapter, falling back to legacy system:",
        error,
      );

      // Fallback to legacy system if something goes wrong
      return this.getTimetableDataServer(day);
    }
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

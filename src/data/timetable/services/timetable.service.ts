import { AreaType, AREA_DEFINITIONS } from "../types/area.types";
import { TimeSlot } from "../types/event.types";
import { TranslatableTimeSlot } from "../types/translatable.types";
import { Column } from "../types/timetable.types";
import { translateTimeSlotsServer } from "../utils/timetableTranslation";
import { TimelineSlot, TimetableEvent, RawTimetableEvent } from "../../../types/events";

// Import unified event collections (day-agnostic)
import { mainStageEvents } from "../events/main-stage";
import { danceWorkshopEvents } from "../events/dance-workshops";
import { musicWorkshopEvents } from "../events/music-workshops";
import { salsaTalksEvents } from "../events/salsa-talks";

// Import timeline helper functions (NO MORE importing individual timeline arrays!)
import {
  getTimelineForAreaAndDay,
  createTimelineFromSimpleConfig,
} from "../../../utils/timelineConfig";

/**
 * Event collection mapping
 * Maps area types to their unified event collections
 */
const EVENT_COLLECTIONS: Record<AreaType, RawTimetableEvent[]> = {
  "main-stage": mainStageEvents,
  "dance-workshops": danceWorkshopEvents,
  "music-workshops": musicWorkshopEvents,
  "salsa-talks": salsaTalksEvents,
};

/**
 * Service for timetable data that supports the translation system
 * This service handles all timetable data with full i18n support
 */
export class TimetableService {
  /**
   * Get event collection for an area
   */
  private static getEventCollectionForArea(area: AreaType): RawTimetableEvent[] {
    return EVENT_COLLECTIONS[area] || [];
  }

  /**
   * Get raw translatable data for any day (GENERIC METHOD)
   * This replaces getSaturdayTranslatableData() and getSundayTranslatableData()
   */
  private static getTranslatableDataForDay(
    dayWeekday: string,
  ): Record<AreaType, TranslatableTimeSlot[]> {
    const result: Record<AreaType, TranslatableTimeSlot[]> = {} as Record<
      AreaType,
      TranslatableTimeSlot[]
    >;

    // Loop through all areas dynamically
    const areas = Object.keys(AREA_DEFINITIONS) as AreaType[];

    for (const area of areas) {
      const timeline = getTimelineForAreaAndDay(area, dayWeekday);
      const events = this.getEventCollectionForArea(area);
      const enrichedEvents = createTimelineFromSimpleConfig(
        timeline,
        events,
        dayWeekday,
      );

      result[area] = this.convertNewEventsToTranslatableTimeSlots(enrichedEvents);
    }

    return result;
  }

  /**
   * @deprecated Use getTranslatableDataForDay('saturday') instead
   * Get raw translatable data for Saturday (for areas that have been migrated)
   */
  private static getSaturdayTranslatableData(): Record<
    AreaType,
    TranslatableTimeSlot[] | TimeSlot[]
  > {
    return this.getTranslatableDataForDay("saturday");
  }

  /**
   * @deprecated Use getTranslatableDataForDay('sunday') instead
   * Get raw translatable data for Sunday
   */
  private static getSundayTranslatableData(): Record<
    AreaType,
    TranslatableTimeSlot[] | TimeSlot[]
  > {
    return this.getTranslatableDataForDay("sunday");
  }

  /**
   * Convert new TimetableEvent[] format back to TranslatableTimeSlot[] for compatibility
   */
  private static convertNewEventsToTranslatableTimeSlots(
    events: import("../../../types/events").TimetableEvent[],
  ): TranslatableTimeSlot[] {
    const timeSlots: TranslatableTimeSlot[] = [];

    // Generate 30-minute time slots from 12:30 to 22:00
    const startTime = 12 * 60 + 30; // 12:30 in minutes
    const endTime = 22 * 60; // 22:00 in minutes

    for (let time = startTime; time <= endTime; time += 30) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      // Find if any event is active at this time
      const activeEvent = events.find((event) => {
        if (!event.startTime || !event.endTime) return false;
        const eventStart = this.timeToMinutes(event.startTime);
        const eventEnd = this.timeToMinutes(event.endTime);
        return time >= eventStart && time < eventEnd;
      });

      if (activeEvent) {
        const timeSlot: TranslatableTimeSlot = {
          time: timeString,
          event: activeEvent.title,
          type:
            activeEvent.type === "dance-workshop" ||
            activeEvent.type === "music-workshop"
              ? "workshop"
              : "main",
          actType:
            activeEvent.type === "main-stage"
              ? activeEvent.performanceType === "live"
                ? "Live"
                : "DJ Set"
              : activeEvent.type === "dance-workshop"
                ? "dance-workshop"
                : activeEvent.type === "music-workshop"
                  ? "music-workshop"
                  : undefined,
        };

        // Handle dance and music workshops
        if (
          activeEvent.type === "dance-workshop" ||
          activeEvent.type === "music-workshop"
        ) {
          const instructors = activeEvent.acts.filter(
            (act) => act.role === "instructor",
          );

          if (instructors.length > 0) {
            timeSlot.instructor = instructors[0].name;
            timeSlot.bio = instructors[0].bio || instructors[0].description;
            timeSlot.image = activeEvent.image || instructors[0].image;
            timeSlot.description = activeEvent.description;

            if (instructors.length > 1) {
              timeSlot.instructorTwo = instructors[1].name;
              timeSlot.bioTwo =
                instructors[1].bio || instructors[1].description;
            }
          }

          timeSlots.push(timeSlot);
          continue; // Skip the rest of the logic
        }

        // Handle talk events
        if (activeEvent.type === "talk") {
          const presenters = activeEvent.acts.filter(
            (act) => act.role === "presenter",
          );
          const moderators = activeEvent.acts.filter(
            (act) => act.role === "moderator",
          );
          const guests = activeEvent.acts.filter((act) => act.role === "guest");

          timeSlot.type = "talk";
          timeSlot.actType = "talk";

          if (presenters.length > 0) {
            timeSlot.presenter = presenters[0].name;
          }

          if (moderators.length > 0) {
            timeSlot.moderator = moderators[0].name;
          }

          if (guests.length > 0) {
            timeSlot.guest = guests[0].name;
          }

          timeSlot.description = activeEvent.description;
          timeSlot.image = activeEvent.image;

          // Add slides if they exist
          if (
            "slides" in activeEvent &&
            activeEvent.slides &&
            Array.isArray(activeEvent.slides)
          ) {
            timeSlot.slides = activeEvent.slides.map(
              (slide: { image?: string; caption?: string }) => ({
                image: slide.image,
                caption: slide.caption,
              }),
            );
          }

          timeSlots.push(timeSlot);
          continue; // Skip the rest of the logic
        }

        // Handle aviatrix talk events
        if (activeEvent.type === "aviatrix-talk") {
          const moderators = activeEvent.acts.filter(
            (act) => act.role === "moderator",
          );
          const guests = activeEvent.acts.filter((act) => act.role === "guest");

          timeSlot.type = "talk";
          timeSlot.actType = "aviatrix";

          if (moderators.length > 0) {
            timeSlot.moderator = moderators[0].name;
          }

          if (guests.length > 0) {
            timeSlot.guest = guests[0].name;
            timeSlot.bio = guests[0].bio;
          }

          // Add aviatrix-specific fields
          if ("artistDiscussed" in activeEvent) {
            timeSlot.artist = activeEvent.artistDiscussed;
          }

          if ("recordDiscussed" in activeEvent) {
            timeSlot.record = activeEvent.recordDiscussed;
          }

          if ("moderatorComment" in activeEvent) {
            timeSlot.comment = activeEvent.moderatorComment;
          }

          // Add slides if they exist
          if (
            "slides" in activeEvent &&
            activeEvent.slides &&
            Array.isArray(activeEvent.slides)
          ) {
            timeSlot.slides = activeEvent.slides.map(
              (slide: { image?: string; caption?: string }) => ({
                image: slide.image,
                caption: slide.caption,
              }),
            );
          }

          timeSlots.push(timeSlot);
          continue; // Skip the rest of the logic
        }

        // Add acts information - using the new acts format (for main stage events)
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
   * Get translated timetable data for a specific day (GENERIC METHOD)
   * This replaces getSaturdayDataTranslated() and getSundayDataTranslated()
   */
  private static async getDataTranslatedForDay(
    dayWeekday: string,
  ): Promise<Record<AreaType, TimeSlot[]>> {
    const rawData = this.getTranslatableDataForDay(dayWeekday);
    const translatedData: Record<AreaType, TimeSlot[]> = {} as Record<
      AreaType,
      TimeSlot[]
    >;

    for (const [areaKey, slots] of Object.entries(rawData)) {
      const area = areaKey as AreaType;
      translatedData[area] = await translateTimeSlotsServer(
        slots as TranslatableTimeSlot[],
      );
    }

    return translatedData;
  }

  /**
   * @deprecated Use getDataTranslatedForDay('saturday') instead
   * Get translated timetable data for Saturday - Server Component version
   */
  static async getSaturdayDataTranslated(): Promise<
    Record<AreaType, TimeSlot[]>
  > {
    return this.getDataTranslatedForDay("saturday");
  }

  /**
   * @deprecated Use getDataTranslatedForDay('sunday') instead
   * Get translated timetable data for Sunday - Server Component version
   */
  static async getSundayDataTranslated(): Promise<
    Record<AreaType, TimeSlot[]>
  > {
    return this.getDataTranslatedForDay("sunday");
  }

  /**
   * Get timetable data for a specific day - Server Component version
   * This replaces the old getTimetableData method for Server Components
   */
  static async getTimetableDataServer(
    dayWeekday: string, // Changed from "saturday" | "sunday" to accept any weekday
  ): Promise<Column[]> {
    // Use the new generic translation system
    const areaData = await this.getDataTranslatedForDay(dayWeekday);

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
    dayWeekday: string, // Changed from "saturday" | "sunday" to accept any weekday
  ): Promise<string[]> {
    const areaData = await this.getDataTranslatedForDay(dayWeekday);

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
    dayWeekday: string, // Changed from "saturday" | "sunday" to accept any weekday
  ): Promise<TimeSlot[]> {
    const areaData = await this.getDataTranslatedForDay(dayWeekday);

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

  // ============================================================================
  // NEW EVENT-BASED METHODS (for bridge removal migration)
  // ============================================================================

  /**
   * Get events for a specific area and day (returns TimelineSlot format)
   * This is the new method that will replace the bridge layer conversion
   */
  static getEventsForArea(
    area: AreaType,
    dayWeekday: string, // Changed from "saturday" | "sunday" to accept any weekday
  ): TimelineSlot[] {
    // Get timeline configuration dynamically (NO MORE HARDCODED MAP!)
    const timeline = getTimelineForAreaAndDay(area, dayWeekday);
    const events = this.getEventCollectionForArea(area);

    // createTimelineFromSimpleConfig returns TimetableEvent[] with startTime/endTime filled in
    const timelineEvents = createTimelineFromSimpleConfig(
      timeline,
      events,
      dayWeekday,
    );

    // Convert to TimelineSlot[] format (time -> events mapping)
    const slotsMap = new Map<string, TimetableEvent[]>();

    // Build time slots from events (every 30 minutes from 13:00 to 21:30)
    const startHour = 13;
    const endHour = 21;
    const endMinutes = 30;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === endHour && minute > endMinutes) break;
        const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        slotsMap.set(timeStr, []);
      }
    }

    // Assign events to their time slots
    for (const event of timelineEvents) {
      const startTime = event.startTime;
      if (startTime && slotsMap.has(startTime)) {
        slotsMap.get(startTime)!.push(event);
      }
    }

    // Convert map to TimelineSlot array
    return Array.from(slotsMap.entries()).map(([time, events]) => ({
      time,
      events,
    }));
  }

  /**
   * Get all events for a specific day (returns events by area)
   * This will be the new main method for fetching timetable data
   */
  static getTimetableEventsServer(
    dayWeekday: string, // Changed from "saturday" | "sunday" to accept any weekday
  ): Record<AreaType, TimelineSlot[]> {
    const areas = Object.keys(AREA_DEFINITIONS) as AreaType[];

    return areas.reduce(
      (acc, area) => {
        acc[area] = this.getEventsForArea(area, dayWeekday);
        return acc;
      },
      {} as Record<AreaType, TimelineSlot[]>,
    );
  }
}

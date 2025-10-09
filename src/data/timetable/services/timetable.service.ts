import { AreaType, AREA_DEFINITIONS } from "../types/area.types";
import { TimeSlot } from "../types/event.types";
import { TranslatableTimeSlot } from "../types/translatable.types";
import { Column } from "../types/timetable.types";
import { translateTimeSlotsServer } from "../utils/timetableTranslation";

// Import translatable data - single source of truth
// Import new event-based data
import { mainStageSaturdayEvents } from "../events/main-stage/main-stage-saturday";
import { mainStageSundayEvents } from "../events/main-stage/main-stage-sunday";
import { danceWorkshopSaturdayEvents } from "../events/dance-workshops/dance-workshops-saturday";
import { danceWorkshopSundayEvents } from "../events/dance-workshops/dance-workshops-sunday";
import { musicWorkshopSaturdayEvents } from "../events/music-workshops/music-workshops-saturday";
import { musicWorkshopSundayEvents } from "../events/music-workshops/music-workshops-sunday";
import { salsaTalksSaturdayEvents } from "../events/salsa-talks/salsa-talks-saturday";
import { salsaTalksSundayEvents } from "../events/salsa-talks/salsa-talks-sunday";
import {
  mainStageSaturdayTimeline,
  mainStageSundayTimeline,
  danceWorkshopsSaturdayTimeline,
  danceWorkshopsSundayTimeline,
  musicWorkshopsSaturdayTimeline,
  musicWorkshopsSundayTimeline,
  salsaTalksSaturdayTimeline,
  salsaTalksSundayTimeline,
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
    const mainStageTimelineEvents = createTimelineFromSimpleConfig(
      mainStageSaturdayTimeline,
      mainStageSaturdayEvents,
    );

    const danceWorkshopsTimelineEvents = createTimelineFromSimpleConfig(
      danceWorkshopsSaturdayTimeline,
      danceWorkshopSaturdayEvents,
    );

    const musicWorkshopsTimelineEvents = createTimelineFromSimpleConfig(
      musicWorkshopsSaturdayTimeline,
      musicWorkshopSaturdayEvents,
    );

    const salsaTalksTimelineEvents = createTimelineFromSimpleConfig(
      salsaTalksSaturdayTimeline,
      salsaTalksSaturdayEvents,
    );

    return {
      "main-stage": this.convertNewEventsToTranslatableTimeSlots(
        mainStageTimelineEvents,
      ), // Using simple timeline config
      "dance-workshops": this.convertNewEventsToTranslatableTimeSlots(
        danceWorkshopsTimelineEvents,
      ), // Using new event structure
      "music-workshops": this.convertNewEventsToTranslatableTimeSlots(
        musicWorkshopsTimelineEvents,
      ), // Using new event structure
      "salsa-talks": this.convertNewEventsToTranslatableTimeSlots(
        salsaTalksTimelineEvents,
      ), // Using new event structure
    };
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
   * Get raw translatable data for Sunday (for areas that have been migrated)
   */
  private static getSundayTranslatableData(): Record<
    AreaType,
    TranslatableTimeSlot[] | TimeSlot[]
  > {
    // Generate timeline from simple config
    const mainStageTimelineEvents = createTimelineFromSimpleConfig(
      mainStageSundayTimeline,
      mainStageSundayEvents,
    );

    const danceWorkshopsTimelineEvents = createTimelineFromSimpleConfig(
      danceWorkshopsSundayTimeline,
      danceWorkshopSundayEvents,
    );

    const musicWorkshopsTimelineEvents = createTimelineFromSimpleConfig(
      musicWorkshopsSundayTimeline,
      musicWorkshopSundayEvents,
    );

    const salsaTalksTimelineEvents = createTimelineFromSimpleConfig(
      salsaTalksSundayTimeline,
      salsaTalksSundayEvents,
    );

    return {
      "main-stage": this.convertNewEventsToTranslatableTimeSlots(
        mainStageTimelineEvents,
      ), // Using simple timeline config
      "dance-workshops": this.convertNewEventsToTranslatableTimeSlots(
        danceWorkshopsTimelineEvents,
      ), // Using new event structure
      "music-workshops": this.convertNewEventsToTranslatableTimeSlots(
        musicWorkshopsTimelineEvents,
      ), // Using new event structure
      "salsa-talks": this.convertNewEventsToTranslatableTimeSlots(
        salsaTalksTimelineEvents,
      ), // Using new event structure
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

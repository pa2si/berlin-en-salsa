/**
 * TIMETABLE ADAPTER SERVICE
 *
 * This service provides a compatibility layer between the old TimeSlot-based system
 * and the new Event-based system. It allows for gradual migration while maintaining
 * backward compatibility.
 */

import { Column, TimeSlot } from "../types/timetable";
import { AreaColumn, TimelineSlot, TimetableEvent } from "../types/events";
import { DataTransformer } from "../utils/dataTransformer";
import { AreaType, AREA_DEFINITIONS } from "../data/timetable/types/area.types";

// Import new event data and centralized slot generation
import { generateMainStageTimelineSlots } from "../utils/timelineConfig";

// Import legacy data (for areas not yet migrated)
import { TimetableService } from "../data/timetable/services/timetable.service";

/**
 * Adapter service that can work with both old and new data formats
 */
export class TimetableAdapterService {
  /**
   * Get timetable data in the new AreaColumn format
   * This method handles both migrated and non-migrated areas
   */
  static async getTimetableData(
    day: "saturday" | "sunday",
  ): Promise<AreaColumn[]> {
    const areas: AreaType[] = [
      "main-stage",
      "dance-workshops",
      "music-workshops",
      "salsa-talks",
    ];
    const areaColumns: AreaColumn[] = [];

    for (const area of areas) {
      if (area === "main-stage" && day === "saturday") {
        // Use new event-based data for main stage Saturday
        const timelineSlots = generateMainStageTimelineSlots();
        areaColumns.push({
          area,
          displayName: "Main Stage", // This would come from translations
          slots: timelineSlots,
        });
      } else {
        // Use legacy data for other areas (convert on the fly)
        const legacyData = await this.getLegacyAreaData(area, day);
        const timelineSlots = DataTransformer.transformToTimelineSlots(
          legacyData,
          area,
          day,
        );
        areaColumns.push({
          area,
          displayName: AREA_DEFINITIONS[area].spanishName, // Fallback to Spanish name
          slots: timelineSlots,
        });
      }
    }

    return areaColumns;
  }

  /**
   * Get legacy data for areas that haven't been migrated yet
   */
  private static async getLegacyAreaData(
    area: AreaType,
    day: "saturday" | "sunday",
  ): Promise<TimeSlot[]> {
    try {
      const allData =
        day === "saturday"
          ? await TimetableService.getSaturdayDataTranslated()
          : await TimetableService.getSundayDataTranslated();

      return allData[area] || [];
    } catch (error) {
      console.warn(`Failed to load legacy data for ${area} ${day}:`, error);
      return [];
    }
  }

  /**
   * Convert new AreaColumn format back to legacy Column format
   * This is needed for compatibility with existing components during transition
   */
  static convertToLegacyFormat(areaColumns: AreaColumn[]): Column[] {
    return areaColumns.map((areaColumn) => ({
      area: AREA_DEFINITIONS[areaColumn.area].spanishName,
      originalAreaKey: areaColumn.area,
      slots: this.convertTimelineToTimeSlots(areaColumn.slots),
    }));
  }

  /**
   * Convert TimelineSlots back to TimeSlots for legacy compatibility
   */
  private static convertTimelineToTimeSlots(
    timelineSlots: TimelineSlot[],
  ): TimeSlot[] {
    return timelineSlots.map((timelineSlot) => {
      const baseSlot: TimeSlot = {
        time: timelineSlot.time,
      };

      // If there are events in this slot, convert the first one to legacy format
      if (timelineSlot.events.length > 0) {
        const event = timelineSlot.events[0]; // Take the first event for now
        return {
          ...baseSlot,
          ...this.convertEventToTimeSlot(event),
        };
      }

      return baseSlot;
    });
  }

  /**
   * Convert a TimetableEvent back to TimeSlot format for legacy compatibility
   */
  private static convertEventToTimeSlot(
    event: TimetableEvent,
  ): Partial<TimeSlot> {
    const slot: Partial<TimeSlot> = {
      event: event.title,
      description: event.description,
      image: event.image,
      type: this.mapEventTypeToLegacy(event.type),
      originalEvent: event, // Store reference to original event for new modal
    };

    // Handle acts-based fields
    if ("act" in event && event.acts.length > 0) {
      const instructors = event.acts.filter((p) => p.role === "instructor");
      const djs = event.acts.filter((p) => p.role === "dj");
      const presenters = event.acts.filter((p) => p.role === "presenter");
      const moderators = event.acts.filter((p) => p.role === "moderator");
      const guests = event.acts.filter((p) => p.role === "guest");
      const dancers = event.acts.filter((p) => p.role === "dancer");

      if (instructors.length > 0) {
        slot.instructor = instructors[0].name;
        slot.bio = instructors[0].bio;
        if (instructors.length > 1) {
          slot.instructorTwo = instructors[1].name;
          slot.bioTwo = instructors[1].bio;
        }
      }

      if (djs.length > 0) {
        slot.djs = djs.map((dj) => dj.name).join(" & ");
      }

      if (presenters.length > 0) {
        slot.presenter = presenters[0].name;
      }

      if (moderators.length > 0) {
        slot.moderator = moderators[0].name;
      }

      if (guests.length > 0) {
        slot.guest = guests[0].name;
      }

      if (dancers.length > 0) {
        slot.dancers = dancers.map((d) => d.name).join(" & ");
      }
    }

    // Handle event-specific fields
    if (event.type === "main-stage") {
      slot.actType = event.performanceType === "live" ? "Live" : "DJ Set";
    }

    if (event.type === "aviatrix-talk") {
      slot.artist = event.artistDiscussed;
      slot.record = event.recordDiscussed;
      slot.comment = event.moderatorComment;
      slot.text = event.backgroundInfo;
      slot.actType = "aviatrix";
    }

    // Convert slides if they exist
    if ("slides" in event && event.slides) {
      slot.slides = event.slides.map((slide) => ({
        image: slide.image,
        description: slide.caption,
        // Keep legacy fields if they exist
        djName: slide.djName,
        dancerName: slide.dancerName,
        bio: slide.bio,
        djOne: slide.djOne,
        djTwo: slide.djTwo,
        djOneBio: slide.djOneBio,
        djTwoBio: slide.djTwoBio,
        bandName: slide.bandName,
        dancerOne: slide.dancerOne,
        dancerTwo: slide.dancerTwo,
        dancerOneBio: slide.dancerOneBio,
        dancerTwoBio: slide.dancerTwoBio,
        combinedDancersDescription: slide.combinedDancersDescription,
        descriptionTwoDjsTogether: slide.descriptionTwoDjsTogether,
        genreDescription: slide.genreDescription,
      }));
    }

    return slot;
  }

  /**
   * Map new event types to legacy types
   */
  private static mapEventTypeToLegacy(
    eventType: TimetableEvent["type"],
  ): TimeSlot["type"] {
    switch (eventType) {
      case "main-stage":
        return "main";
      case "dance-workshop":
      case "music-workshop":
        return "workshop";
      case "talk":
      case "aviatrix-talk":
        return "talk";
      case "dance-show":
        return "dance-show";
      default:
        return "main";
    }
  }

  /**
   * Get events for a specific time slot (useful for modal display)
   */
  static getEventsForTimeSlot(
    areaColumns: AreaColumn[],
    area: AreaType,
    time: string,
  ): TimetableEvent[] {
    const areaColumn = areaColumns.find((col) => col.area === area);
    if (!areaColumn) return [];

    const timelineSlot = areaColumn.slots.find((slot) => slot.time === time);
    return timelineSlot?.events || [];
  }

  /**
   * Find an event by ID across all areas
   */
  static findEventById(
    areaColumns: AreaColumn[],
    eventId: string,
  ): TimetableEvent | null {
    for (const areaColumn of areaColumns) {
      for (const slot of areaColumn.slots) {
        const event = slot.events.find((e) => e.id === eventId);
        if (event) return event;
      }
    }
    return null;
  }
}

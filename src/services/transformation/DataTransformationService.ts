import {
  EventDomain,
  SlideData,
  AreaType,
  EventType,
} from "../../domain/timetable/models";
import { TimeSlot } from "../../data/timetable/types/event.types";
import { SelectedEventDetails } from "../../components/timetable/hooks/useEventModal";

/**
 * Service for transforming data between different representations
 * Handles conversion between domain models, DTOs, and UI models
 */
export class DataTransformationService {
  /**
   * Transforms legacy TimeSlot to domain EventDomain model
   */
  static timeSlotToEventDomain(
    timeSlot: TimeSlot,
    area: AreaType,
    date: Date = new Date(),
  ): EventDomain {
    const [hours, minutes] = (timeSlot.time || "00:00").split(":").map(Number);
    const startTime = new Date(date);
    startTime.setHours(hours, minutes, 0, 0);

    // Default duration of 1 hour (calculated from durationSlots or default)
    const duration = (timeSlot.durationSlots || 1) * 60;
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    return {
      id: this.generateEventId(timeSlot, area),
      title: timeSlot.event || "Untitled Event",
      startTime,
      endTime,
      duration,
      area,
      type: this.mapEventType(timeSlot.type),
      instructors: this.extractInstructors(timeSlot),
      presenters: this.extractPresenters(timeSlot),
      hosts: this.extractHosts(timeSlot),
      djs: this.extractDJs(timeSlot),
      status: "scheduled",
      metadata: {
        description: timeSlot.description,
        images: this.extractImages(timeSlot),
        slides: this.transformSlides(timeSlot.slides),
        tags: this.extractTags(timeSlot),
        difficulty: this.mapDifficulty(timeSlot.level),
        language: ["es"], // Default language
        requirements: undefined, // TimeSlot doesn't have requirements field
      },
    };
  }

  /**
   * Transforms EventDomain to SelectedEventDetails for UI
   */
  static eventDomainToSelectedEventDetails(
    event: EventDomain,
  ): SelectedEventDetails {
    // Map EventType to the limited UI types
    const uiType =
      event.type === "performance" || event.type === "social"
        ? "main"
        : event.type;

    return {
      event: event.title,
      time: this.formatTime(event.startTime),
      instructor: event.instructors.map((i) => i.name).join(", ") || undefined,
      presenter: event.presenters.map((p) => p.name).join(", ") || undefined,
      host: event.hosts.map((h) => h.name).join(", ") || undefined,
      djs: event.djs.map((d) => d.name).join(", ") || undefined,
      description: event.metadata.description,
      bio: event.instructors[0]?.bio || event.presenters[0]?.bio,
      image: event.metadata.images[0],
      imageTwo: event.metadata.images[1],
      type: uiType,
      slides: event.metadata.slides.map((slide) => ({
        image: slide.image,
        description: slide.description,
        // Map other slide properties as needed
      })),
      hasShow: event.metadata.tags.includes("dance-show"),
      danceShow: event.metadata.tags
        .find((tag) => tag.startsWith("show:"))
        ?.replace("show:", ""),
    };
  }

  /**
   * Transforms SelectedEventDetails back to TimeSlot format
   */
  static selectedEventDetailsToTimeSlot(
    details: SelectedEventDetails,
  ): TimeSlot {
    return {
      time: details.time,
      event: details.event,
      instructor: details.instructor,
      presenter: details.presenter,
      host: details.host,
      djs: details.djs,
      description: details.description,
      bio: details.bio,
      image: details.image,
      imageTwo: details.imageTwo,
      type: details.type,
      slides: details.slides,
      hasShow: details.hasShow,
      danceShow: details.danceShow,
      dancers: details.dancers,
    };
  }

  /**
   * Transforms raw timetable data to structured format
   */
  static transformRawTimetableData(
    rawData: Record<string, TimeSlot[]>,
    date: Date,
  ): Record<AreaType, EventDomain[]> {
    const transformed: Record<string, EventDomain[]> = {};

    Object.entries(rawData).forEach(([areaKey, timeSlots]) => {
      const area = areaKey as AreaType;
      transformed[area] = timeSlots.map((slot) =>
        this.timeSlotToEventDomain(slot, area, date),
      );
    });

    return transformed as Record<AreaType, EventDomain[]>;
  }

  /**
   * Transforms events for calendar/grid display
   */
  static transformForGridDisplay(events: EventDomain[]): {
    timeSlots: string[];
    eventsBySlot: Record<string, EventDomain[]>;
    continuations: Record<string, boolean>;
  } {
    // Generate time slots (hourly from 10 AM to 11 PM)
    const timeSlots: string[] = [];
    for (let hour = 10; hour <= 23; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
    }

    // Group events by time slot
    const eventsBySlot: Record<string, EventDomain[]> = {};
    const continuations: Record<string, boolean> = {};

    timeSlots.forEach((timeSlot) => {
      eventsBySlot[timeSlot] = [];
    });

    events.forEach((event) => {
      const startTimeSlot = this.formatTime(event.startTime);
      const endTimeSlot = this.formatTime(event.endTime);

      // Find which time slots this event spans
      const startIndex = timeSlots.indexOf(startTimeSlot);
      const endIndex = timeSlots.findIndex((slot) => slot >= endTimeSlot);

      if (startIndex !== -1) {
        // Add event to starting slot
        eventsBySlot[startTimeSlot].push(event);

        // Mark continuation slots
        for (
          let i = startIndex + 1;
          i < endIndex && i < timeSlots.length;
          i++
        ) {
          continuations[`${event.id}-${timeSlots[i]}`] = true;
        }
      }
    });

    return {
      timeSlots,
      eventsBySlot,
      continuations,
    };
  }

  /**
   * Optimizes event data for performance
   */
  static optimizeEventData(events: EventDomain[]): {
    events: EventDomain[];
    imagePreloads: string[];
    criticalEvents: EventDomain[];
  } {
    // Sort events by start time
    const sortedEvents = [...events].sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime(),
    );

    // Extract images for preloading
    const imagePreloads = Array.from(
      new Set(
        events
          .flatMap((event) => [
            ...event.metadata.images,
            ...event.metadata.slides
              .map((slide) => slide.image)
              .filter(Boolean),
          ])
          .filter(Boolean),
      ),
    );

    // Identify critical events (happening soon or popular)
    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000);

    const criticalEvents = sortedEvents.filter(
      (event) =>
        event.startTime <= nextHour ||
        event.type === "main" ||
        event.metadata.tags.includes("featured"),
    );

    return {
      events: sortedEvents,
      imagePreloads: imagePreloads as string[],
      criticalEvents,
    };
  }

  /**
   * Helper methods for data transformation
   */
  private static generateEventId(timeSlot: TimeSlot, area: AreaType): string {
    const event = timeSlot.event || "unknown";
    const time = timeSlot.time || "00:00";
    return `${area}-${event.replace(/\s+/g, "-").toLowerCase()}-${time.replace(":", "")}`;
  }

  private static mapEventType(type?: string): EventType {
    // Map TimeSlot types to EventDomain types
    switch (type) {
      case "main":
        return "main";
      case "dance-show":
        return "dance-show";
      case "workshop":
        return "workshop";
      case "talk":
        return "talk";
      default:
        return "main"; // Default fallback
    }
  }

  private static extractInstructors(
    timeSlot: TimeSlot,
  ): EventDomain["instructors"] {
    const instructors = [];

    if (timeSlot.instructor) {
      instructors.push({
        id: `instructor-${timeSlot.instructor.replace(/\s+/g, "-").toLowerCase()}`,
        name: timeSlot.instructor,
        bio: timeSlot.bio,
        expertise: [],
        image: timeSlot.image,
      });
    }

    return instructors;
  }

  private static extractPresenters(
    timeSlot: TimeSlot,
  ): EventDomain["presenters"] {
    if (timeSlot.presenter) {
      return [
        {
          id: `presenter-${timeSlot.presenter.replace(/\s+/g, "-").toLowerCase()}`,
          name: timeSlot.presenter,
          bio: timeSlot.bio,
          topics: [],
          image: timeSlot.image,
        },
      ];
    }
    return [];
  }

  private static extractHosts(timeSlot: TimeSlot): EventDomain["hosts"] {
    if (timeSlot.host) {
      return [
        {
          id: `host-${timeSlot.host.replace(/\s+/g, "-").toLowerCase()}`,
          name: timeSlot.host,
          bio: timeSlot.bio,
          image: timeSlot.image,
        },
      ];
    }
    return [];
  }

  private static extractDJs(timeSlot: TimeSlot): EventDomain["djs"] {
    if (timeSlot.djs) {
      return timeSlot.djs.split(",").map((dj) => ({
        id: `dj-${dj.trim().replace(/\s+/g, "-").toLowerCase()}`,
        name: dj.trim(),
        bio: undefined,
        genres: [],
        image: undefined,
      }));
    }
    return [];
  }

  private static extractImages(timeSlot: TimeSlot): string[] {
    const images = [];
    if (timeSlot.image) images.push(timeSlot.image);
    if (timeSlot.imageTwo) images.push(timeSlot.imageTwo);
    return images;
  }

  private static transformSlides(slides?: TimeSlot["slides"]): SlideData[] {
    if (!slides) return [];

    return slides.map((slide, index) => ({
      id: `slide-${index}`,
      image: slide.image,
      title: slide.djName || slide.dancerName || slide.bandName,
      description: slide.description,
      order: index,
      type: this.determineSlideType(slide),
    }));
  }

  private static determineSlideType(slide: {
    djName?: string;
    djOne?: string;
    djTwo?: string;
    dancerName?: string;
    dancerOne?: string;
    dancerTwo?: string;
    image?: string;
    description?: string;
  }): SlideData["type"] {
    if (slide.djName || slide.djOne || slide.djTwo) return "dj-profile";
    if (slide.dancerName || slide.dancerOne || slide.dancerTwo)
      return "dancer-profile";
    if (slide.image && !slide.description) return "image";
    return "description";
  }

  private static extractTags(timeSlot: TimeSlot): string[] {
    const tags = [];

    if (timeSlot.hasShow) tags.push("dance-show");
    if (timeSlot.danceShow) tags.push(`show:${timeSlot.danceShow}`);
    if (timeSlot.type) tags.push(`type:${timeSlot.type}`);

    return tags;
  }

  private static mapDifficulty(
    level?: string,
  ): EventDomain["metadata"]["difficulty"] {
    const levelMap: Record<string, EventDomain["metadata"]["difficulty"]> = {
      beginner: "beginner",
      intermediate: "intermediate",
      advanced: "advanced",
      all: "all-levels",
    };

    return levelMap[level || ""] || undefined;
  }

  private static formatTime(date: Date): string {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

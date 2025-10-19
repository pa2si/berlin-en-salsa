/**
 * EVENT FACTORY FUNCTIONS
 *
 * Factory functions to create specific event types with proper type safety
 * and validation. These ensure events are created correctly and consistently.
 *
 * These factories create RAW events (without scheduling information).
 * Scheduling is added later by the timeline configuration.
 */

import {
  RawMainStageEvent,
  RawDanceWorkshopEvent,
  RawMusicWorkshopEvent,
  RawTalkEvent,
  RawAviatrixTalkEvent,
  RawDanceShowEvent,
  TimetableEvent,
  Act,
  MediaSlide,
} from "../types/events";
import { AreaType } from "../data/timetable/types/area.types";

/**
 * Helper function to generate unique event IDs
 * Note: Day is no longer part of the ID since events are independent of scheduling
 * IDs are generated from area + title to ensure uniqueness across the system
 */
function generateEventId(area: AreaType, title: string): string {
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  return `${area}-${sanitizedTitle}`;
}

/**
 * Factory functions for creating specific event types
 */
export class EventFactory {
  /**
   * Create a main stage event (DJ set or live performance)
   * Note: startTime and endTime will be set by timeline configuration
   */
  static createMainStageEvent(params: {
    title: string;
    area: AreaType;
    performanceType: "live" | "dj-set";
    acts: Act[];
    genre?: string;
    image?: string;
    description?: string;
    slides?: MediaSlide[];
    // Dance show properties
    hasShow?: boolean;
    danceShow?: string;
    dancers?: string;
  }): RawMainStageEvent {
    const id = generateEventId(params.area, params.title);

    return {
      type: "main-stage",
      id,
      title: params.title,
      area: params.area,
      performanceType: params.performanceType,
      acts: params.acts,
      genre: params.genre,
      image: params.image,
      description: params.description,
      slides: params.slides,
      hasShow: params.hasShow,
      danceShow: params.danceShow,
      dancers: params.dancers,
    };
  }

  /**
   * Create a dance workshop event
   * Note: startTime, endTime, and duration will be set by timeline configuration
   */
  static createDanceWorkshop(params: {
    title: string;
    duration?: number; // Optional - set by timeline config
    area: AreaType;
    danceStyle: string;
    acts: Act[];
    level?: "beginner" | "intermediate" | "advanced";
    image?: string;
    description?: string;
  }): RawDanceWorkshopEvent {
    const id = generateEventId(params.area, params.title);

    return {
      type: "dance-workshop",
      id,
      title: params.title,
      area: params.area,
      danceStyle: params.danceStyle,
      ...(params.duration && { duration: params.duration }),
      acts: params.acts,
      level: params.level,
      image: params.image,
      description: params.description,
    };
  }

  /**
   * Create a music workshop event
   * Note: startTime, endTime, and duration will be set by timeline configuration
   */
  static createMusicWorkshop(params: {
    title: string;
    duration?: number; // Optional - set by timeline config
    area: AreaType;
    acts: Act[];
    instrument?: string;
    level?: "beginner" | "intermediate" | "advanced";
    image?: string;
    description?: string;
  }): RawMusicWorkshopEvent {
    const id = generateEventId(params.area, params.title);

    return {
      type: "music-workshop",
      id,
      title: params.title,
      area: params.area,
      ...(params.duration && { duration: params.duration }),
      acts: params.acts,
      instrument: params.instrument,
      level: params.level,
      image: params.image,
      description: params.description,
    };
  }

  /**
   * Create a regular talk event
   * Note: startTime and endTime will be set by timeline configuration
   */
  static createTalk(params: {
    title: string;
    area: AreaType;
    format: "presentation" | "interview" | "panel";
    acts: Act[];
    topic?: string;
    image?: string;
    description?: string;
    slides?: MediaSlide[];
  }): RawTalkEvent {
    const id = generateEventId(params.area, params.title);

    return {
      type: "talk",
      id,
      title: params.title,
      area: params.area,
      format: params.format,
      acts: params.acts,
      topic: params.topic,
      image: params.image,
      description: params.description,
      slides: params.slides,
    };
  }

  /**
   * Create an aviatrix talk event (special format with record discussion)
   * Note: startTime and endTime will be set by timeline configuration
   */
  static createAviatrixTalk(params: {
    title: string;
    area: AreaType;
    acts: Act[];
    artistDiscussed: string;
    recordDiscussed: string;
    moderatorComment?: string;
    backgroundInfo?: string;
    image?: string;
    description?: string;
    slides?: MediaSlide[];
  }): RawAviatrixTalkEvent {
    const id = generateEventId(params.area, params.title);

    return {
      type: "aviatrix-talk",
      id,
      title: params.title,
      area: params.area,
      acts: params.acts,
      artistDiscussed: params.artistDiscussed,
      recordDiscussed: params.recordDiscussed,
      moderatorComment: params.moderatorComment,
      backgroundInfo: params.backgroundInfo,
      image: params.image,
      description: params.description,
      slides: params.slides,
    };
  }

  /**
   * Create a dance show event
   * Note: startTime and endTime will be set by timeline configuration
   */
  static createDanceShow(params: {
    title: string;
    area: AreaType;
    showName: string;
    acts: Act[];
    overlapsWithEvent?: string;
    image?: string;
    description?: string;
  }): RawDanceShowEvent {
    const id = generateEventId(params.area, params.title);

    return {
      type: "dance-show",
      id,
      title: params.title,
      area: params.area,
      showName: params.showName,
      acts: params.acts,
      overlapsWithEvent: params.overlapsWithEvent,
      image: params.image,
      description: params.description,
    };
  }

  /**
   * Create a Act/item object for events
   */
  static createAct(params: {
    name: string;
    role: Act["role"];
    bio?: string;
    description?: string;
    image?: string;
  }): Act {
    return {
      name: params.name,
      role: params.role,
      bio: params.bio,
      description: params.description,
      image: params.image,
    };
  }

  /**
   * Create a media slide
   */
  static createSlide(params: {
    type: "image" | "text" | "mixed";
    image?: string;
    caption?: string;
    content?: string;
  }): MediaSlide {
    return {
      type: params.type,
      image: params.image,
      caption: params.caption,
      content: params.content,
    };
  }
}

/**
 * Utility functions for working with events
 * Note: These utilities require enriched events (with startTime/endTime set by timeline)
 */
export class EventUtils {
  /**
   * Check if an event spans multiple time slots
   * Note: Requires enriched event with startTime/endTime
   */
  static isMultiSlotEvent(event: TimetableEvent): boolean {
    if (!event.startTime || !event.endTime) return false;
    const [startHour, startMin] = event.startTime.split(":").map(Number);
    const [endHour, endMin] = event.endTime.split(":").map(Number);
    const durationMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);
    return durationMinutes > 30;
  }

  /**
   * Get the number of 30-minute slots an event spans
   * Note: Requires enriched event with startTime/endTime
   */
  static getSlotCount(event: TimetableEvent): number {
    if (!event.startTime || !event.endTime) return 1;
    const [startHour, startMin] = event.startTime.split(":").map(Number);
    const [endHour, endMin] = event.endTime.split(":").map(Number);
    const durationMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);
    return Math.ceil(durationMinutes / 30);
  }

  /**
   * Get all time slots that an event occupies
   * Note: Requires enriched event with startTime/endTime
   */
  static getEventTimeSlots(event: TimetableEvent): string[] {
    if (!event.startTime || !event.endTime) return [];

    const slots: string[] = [];
    const [startHour, startMin] = event.startTime.split(":").map(Number);
    const [endHour, endMin] = event.endTime.split(":").map(Number);

    let currentTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    while (currentTime < endTime) {
      const hour = Math.floor(currentTime / 60);
      const minute = currentTime % 60;
      slots.push(
        `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      );
      currentTime += 30;
    }

    return slots;
  }

  /**
   * Find acts in an event by role
   */
  static getActsByRole(event: TimetableEvent, role: Act["role"]): Act[] {
    if ("acts" in event) {
      return event.acts.filter((act) => act.role === role);
    }
    return [];
  }
}

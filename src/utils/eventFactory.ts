/**
 * EVENT FACTORY FUNCTIONS
 *
 * Factory functions to create specific event types with proper type safety
 * and validation. These ensure events are created correctly and consistently.
 */

import {
  TimetableEvent,
  MainStageEvent,
  DanceWorkshopEvent,
  MusicWorkshopEvent,
  TalkEvent,
  AviatrixTalkEvent,
  DanceShowEvent,
  Act,
  MediaSlide,
} from "../types/events";
import { AreaType } from "../data/timetable/types/area.types";

/**
 * Helper function to calculate end time based on start time and duration
 */
function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHour = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}

/**
 * Helper function to generate unique event IDs
 */
function generateEventId(area: AreaType, day: string, title: string): string {
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  return `${area}-${day}-${sanitizedTitle}`;
}

/**
 * Factory functions for creating specific event types
 */
export class EventFactory {
  /**
   * Create a main stage event (DJ set or live performance)
   */
  static createMainStageEvent(params: {
    title: string;
    startTime: string;
    endTime?: string;
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
    day?: string; // For ID generation
  }): MainStageEvent {
    const endTime = params.endTime || calculateEndTime(params.startTime, 30);
    const id = generateEventId(
      params.area,
      params.day || "unknown",
      params.title,
    );

    return {
      type: "main-stage",
      id,
      title: params.title,
      startTime: params.startTime,
      endTime,
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
   */
  static createDanceWorkshop(params: {
    title: string;
    startTime: string;
    duration: number; // in minutes
    area: AreaType;
    danceStyle: string;
    acts: Act[];
    level?: "beginner" | "intermediate" | "advanced";
    image?: string;
    description?: string;
    day?: string;
  }): DanceWorkshopEvent {
    const endTime = calculateEndTime(params.startTime, params.duration);
    const id = generateEventId(
      params.area,
      params.day || "unknown",
      params.title,
    );

    return {
      type: "dance-workshop",
      id,
      title: params.title,
      startTime: params.startTime,
      endTime,
      area: params.area,
      danceStyle: params.danceStyle,
      duration: params.duration,
      acts: params.acts,
      level: params.level,
      image: params.image,
      description: params.description,
    };
  }

  /**
   * Create a music workshop event
   */
  static createMusicWorkshop(params: {
    title: string;
    startTime: string;
    duration: number;
    area: AreaType;
    acts: Act[];
    instrument?: string;
    level?: "beginner" | "intermediate" | "advanced";
    image?: string;
    description?: string;
    day?: string;
  }): MusicWorkshopEvent {
    const endTime = calculateEndTime(params.startTime, params.duration);
    const id = generateEventId(
      params.area,
      params.day || "unknown",
      params.title,
    );

    return {
      type: "music-workshop",
      id,
      title: params.title,
      startTime: params.startTime,
      endTime,
      area: params.area,
      duration: params.duration,
      acts: params.acts,
      instrument: params.instrument,
      level: params.level,
      image: params.image,
      description: params.description,
    };
  }

  /**
   * Create a regular talk event
   */
  static createTalk(params: {
    title: string;
    startTime: string;
    endTime?: string;
    area: AreaType;
    format: "presentation" | "interview" | "panel";
    acts: Act[];
    topic?: string;
    image?: string;
    description?: string;
    day?: string;
  }): TalkEvent {
    const endTime = params.endTime || calculateEndTime(params.startTime, 30);
    const id = generateEventId(
      params.area,
      params.day || "unknown",
      params.title,
    );

    return {
      type: "talk",
      id,
      title: params.title,
      startTime: params.startTime,
      endTime,
      area: params.area,
      format: params.format,
      acts: params.acts,
      topic: params.topic,
      image: params.image,
      description: params.description,
    };
  }

  /**
   * Create an aviatrix talk event (special format with record discussion)
   */
  static createAviatrixTalk(params: {
    title: string;
    startTime: string;
    endTime?: string;
    area: AreaType;
    acts: Act[];
    artistDiscussed: string;
    recordDiscussed: string;
    moderatorComment?: string;
    backgroundInfo?: string;
    image?: string;
    description?: string;
    day?: string;
  }): AviatrixTalkEvent {
    const endTime = params.endTime || calculateEndTime(params.startTime, 30);
    const id = generateEventId(
      params.area,
      params.day || "unknown",
      params.title,
    );

    return {
      type: "aviatrix-talk",
      id,
      title: params.title,
      startTime: params.startTime,
      endTime,
      area: params.area,
      acts: params.acts,
      artistDiscussed: params.artistDiscussed,
      recordDiscussed: params.recordDiscussed,
      moderatorComment: params.moderatorComment,
      backgroundInfo: params.backgroundInfo,
      image: params.image,
      description: params.description,
    };
  }

  /**
   * Create a dance show event
   */
  static createDanceShow(params: {
    title: string;
    startTime: string;
    endTime?: string;
    area: AreaType;
    showName: string;
    acts: Act[];
    overlapsWithEvent?: string;
    image?: string;
    description?: string;
    day?: string;
  }): DanceShowEvent {
    const endTime = params.endTime || calculateEndTime(params.startTime, 30);
    const id = generateEventId(
      params.area,
      params.day || "unknown",
      params.title,
    );

    return {
      type: "dance-show",
      id,
      title: params.title,
      startTime: params.startTime,
      endTime,
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
 */
export class EventUtils {
  /**
   * Check if an event spans multiple time slots
   */
  static isMultiSlotEvent(event: TimetableEvent): boolean {
    const [startHour, startMin] = event.startTime.split(":").map(Number);
    const [endHour, endMin] = event.endTime.split(":").map(Number);
    const durationMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);
    return durationMinutes > 30;
  }

  /**
   * Get the number of 30-minute slots an event spans
   */
  static getSlotCount(event: TimetableEvent): number {
    const [startHour, startMin] = event.startTime.split(":").map(Number);
    const [endHour, endMin] = event.endTime.split(":").map(Number);
    const durationMinutes = endHour * 60 + endMin - (startHour * 60 + startMin);
    return Math.ceil(durationMinutes / 30);
  }

  /**
   * Get all time slots that an event occupies
   */
  static getEventTimeSlots(event: TimetableEvent): string[] {
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

/**
 * DATA TRANSFORMATION UTILITIES
 *
 * Utilities to convert existing TimeSlot data to the new Event-based structure.
 * This allows for gradual migration from the old system to the new one.
 */

import { TimeSlot, SlideContent } from "../types/timetable";
import { TimetableEvent, TimelineSlot, Act, MediaSlide } from "../types/events";
import { EventFactory } from "./eventFactory";
import { AreaType } from "../data/timetable/types/area.types";

/**
 * Convert legacy TimeSlot data to the new Event-based structure
 */
export class DataTransformer {
  /**
   * Transform an array of TimeSlots into TimelineSlots with Events
   */
  static transformToTimelineSlots(
    timeSlots: TimeSlot[],
    area: AreaType,
    day: string,
  ): TimelineSlot[] {
    const timelineSlots: TimelineSlot[] = [];
    const processedEventTimes = new Set<string>();

    // Create a map of time slots for easy lookup
    const slotMap = new Map<string, TimeSlot>();
    timeSlots.forEach((slot) => {
      slotMap.set(slot.time, slot);
    });

    // Process each time slot
    for (const slot of timeSlots) {
      // Skip if this time slot was already processed as part of a multi-slot event
      if (processedEventTimes.has(slot.time)) {
        continue;
      }

      const timelineSlot: TimelineSlot = {
        time: slot.time,
        events: [],
      };

      // If there's an event in this slot, convert it
      if (slot.event) {
        const event = this.convertTimeSlotToEvent(slot, area, day, slotMap);
        if (event) {
          timelineSlot.events.push(event);

          // Mark all time slots that this event spans as processed
          const eventTimeSlots = this.getEventTimeSlots(slot, slotMap);
          eventTimeSlots.forEach((time) => processedEventTimes.add(time));
        }
      }

      timelineSlots.push(timelineSlot);
    }

    return timelineSlots;
  }

  /**
   * Convert a single TimeSlot to a TimetableEvent
   */
  private static convertTimeSlotToEvent(
    slot: TimeSlot,
    area: AreaType,
    day: string,
    slotMap: Map<string, TimeSlot>,
  ): TimetableEvent | null {
    if (!slot.event) return null;

    // Calculate end time by finding consecutive slots with the same event
    const endTime = this.calculateEventEndTime(slot, slotMap);
    const duration = this.calculateDurationMinutes(slot.time, endTime);

    // Convert slides
    const slides = slot.slides ? this.convertSlides(slot.slides) : undefined;

    // Build acts array based on the slot's data
    const acts = this.extractActs(slot);

    // Determine event type and create appropriate event
    switch (area) {
      case "main-stage":
        return this.createMainStageEvent(
          slot,
          area,
          day,
          endTime,
          acts,
          slides,
        );

      case "dance-workshops":
        return this.createDanceWorkshopEvent(
          slot,
          area,
          day,
          endTime,
          duration,
          acts,
        );

      case "music-workshops":
        return this.createMusicWorkshopEvent(
          slot,
          area,
          day,
          endTime,
          duration,
          acts,
        );

      case "salsa-talks":
        return this.createTalkEvent(slot, area, day, endTime, acts);

      default:
        return null;
    }
  }

  /**
   * Create a main stage event from TimeSlot data
   */
  private static createMainStageEvent(
    slot: TimeSlot,
    area: AreaType,
    day: string,
    endTime: string,
    acts: Act[],
    slides?: MediaSlide[],
  ): TimetableEvent {
    const performanceType: "live" | "dj-set" =
      slot.actType === "Live" ? "live" : "dj-set";

    return EventFactory.createMainStageEvent({
      title: slot.event!,
      startTime: slot.time,
      endTime,
      area,
      performanceType,
      acts,
      image: slot.image,
      description: slot.description,
      slides,
      day,
    });
  }

  /**
   * Create a dance workshop event from TimeSlot data
   */
  private static createDanceWorkshopEvent(
    slot: TimeSlot,
    area: AreaType,
    day: string,
    endTime: string,
    duration: number,
    acts: Act[],
  ): TimetableEvent {
    return EventFactory.createDanceWorkshop({
      title: slot.event!,
      startTime: slot.time,
      duration,
      area,
      danceStyle: slot.event!, // Use event name as dance style for now
      acts,
      level: this.mapLevel(slot.level),
      image: slot.image,
      description: slot.description,
      day,
    });
  }

  /**
   * Create a music workshop event from TimeSlot data
   */
  private static createMusicWorkshopEvent(
    slot: TimeSlot,
    area: AreaType,
    day: string,
    endTime: string,
    duration: number,
    acts: Act[],
  ): TimetableEvent {
    return EventFactory.createMusicWorkshop({
      title: slot.event!,
      startTime: slot.time,
      duration,
      area,
      acts,
      instrument: undefined, // Not available in current data
      level: this.mapLevel(slot.level),
      image: slot.image,
      description: slot.description,
      day,
    });
  }

  /**
   * Create a talk event from TimeSlot data
   */
  private static createTalkEvent(
    slot: TimeSlot,
    area: AreaType,
    day: string,
    endTime: string,
    acts: Act[],
  ): TimetableEvent {
    // Check if it's an aviatrix format talk
    if (slot.actType === "aviatrix" || (slot.artist && slot.record)) {
      return EventFactory.createAviatrixTalk({
        title: slot.event!,
        startTime: slot.time,
        endTime,
        area,
        acts,
        artistDiscussed: slot.artist || "",
        recordDiscussed: slot.record || "",
        moderatorComment: slot.comment,
        backgroundInfo: slot.text,
        image: slot.image,
        description: slot.description,
        day,
      });
    }

    // Regular talk
    return EventFactory.createTalk({
      title: slot.event!,
      startTime: slot.time,
      endTime,
      area,
      format: "presentation", // Default format
      acts,
      image: slot.image,
      description: slot.description,
      day,
    });
  }

  /**
   * Extract acts from TimeSlot data
   */
  private static extractActs(slot: TimeSlot): Act[] {
    const acts: Act[] = [];

    // Add instructor(s)
    if (slot.instructor) {
      acts.push(
        EventFactory.createAct({
          name: slot.instructor,
          role: "instructor",
          bio: slot.bio,
          image: slot.image,
        }),
      );
    }
    if (slot.instructorTwo) {
      acts.push(
        EventFactory.createAct({
          name: slot.instructorTwo,
          role: "instructor",
          bio: slot.bioTwo,
          image: slot.imageTwo,
        }),
      );
    }

    // Add presenter
    if (slot.presenter) {
      acts.push(
        EventFactory.createAct({
          name: slot.presenter,
          role: "presenter",
          bio: slot.bio,
          image: slot.image,
        }),
      );
    }

    // Add moderator and guest for talks
    if (slot.moderator) {
      acts.push(
        EventFactory.createAct({
          name: slot.moderator,
          role: "moderator",
          bio: slot.bio,
        }),
      );
    }
    if (slot.guest) {
      acts.push(
        EventFactory.createAct({
          name: slot.guest,
          role: "guest",
        }),
      );
    }

    // Add DJs
    if (slot.djs) {
      // Parse DJ names (they might be comma-separated)
      const djNames = slot.djs.split(/[,&]/).map((name) => name.trim());
      djNames.forEach((djName) => {
        acts.push(
          EventFactory.createAct({
            name: djName,
            role: "dj",
            bio: slot.bio,
          }),
        );
      });
    }

    // Add dancers
    if (slot.dancers) {
      const dancerNames = slot.dancers.split(/[,&]/).map((name) => name.trim());
      dancerNames.forEach((dancerName) => {
        acts.push(
          EventFactory.createAct({
            name: dancerName,
            role: "dancer",
          }),
        );
      });
    }
    if (slot.dancer) {
      acts.push(
        EventFactory.createAct({
          name: slot.dancer,
          role: "dancer",
        }),
      );
    }

    return acts;
  }

  /**
   * Convert legacy slides to new MediaSlide format
   */
  private static convertSlides(slides: SlideContent[]): MediaSlide[] {
    return slides.map((slide) => ({
      type: "image" as const,
      image: slide.image,
      caption: slide.description,
      // Keep legacy fields for backward compatibility
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

  /**
   * Calculate the end time of an event by finding consecutive slots
   */
  private static calculateEventEndTime(
    slot: TimeSlot,
    slotMap: Map<string, TimeSlot>,
  ): string {
    let currentTime = slot.time;
    let nextSlot = this.getNextTimeSlot(currentTime, slotMap);

    // Keep looking for consecutive slots with the same event
    while (nextSlot && nextSlot.event === slot.event) {
      currentTime = this.addMinutesToTime(currentTime, 30);
      nextSlot = this.getNextTimeSlot(currentTime, slotMap);
    }

    return this.addMinutesToTime(currentTime, 30);
  }

  /**
   * Get time slots that an event spans
   */
  private static getEventTimeSlots(
    slot: TimeSlot,
    slotMap: Map<string, TimeSlot>,
  ): string[] {
    const timeSlots = [slot.time];
    let currentTime = slot.time;
    let nextSlot = this.getNextTimeSlot(currentTime, slotMap);

    while (nextSlot && nextSlot.event === slot.event) {
      currentTime = this.addMinutesToTime(currentTime, 30);
      timeSlots.push(currentTime);
      nextSlot = this.getNextTimeSlot(currentTime, slotMap);
    }

    return timeSlots;
  }

  /**
   * Get the next time slot (30 minutes later)
   */
  private static getNextTimeSlot(
    time: string,
    slotMap: Map<string, TimeSlot>,
  ): TimeSlot | undefined {
    const nextTime = this.addMinutesToTime(time, 30);
    return slotMap.get(nextTime);
  }

  /**
   * Add minutes to a time string
   */
  private static addMinutesToTime(time: string, minutes: number): string {
    const [hours, mins] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMins.toString().padStart(2, "0")}`;
  }

  /**
   * Calculate duration in minutes between two times
   */
  private static calculateDurationMinutes(
    startTime: string,
    endTime: string,
  ): number {
    const [startHours, startMins] = startTime.split(":").map(Number);
    const [endHours, endMins] = endTime.split(":").map(Number);
    return endHours * 60 + endMins - (startHours * 60 + startMins);
  }

  /**
   * Map legacy level strings to new format
   */
  private static mapLevel(
    level?: string,
  ): "beginner" | "intermediate" | "advanced" | undefined {
    if (!level) return undefined;

    const lowerLevel = level.toLowerCase();
    if (
      lowerLevel.includes("principiante") ||
      lowerLevel.includes("beginner")
    ) {
      return "beginner";
    }
    if (
      lowerLevel.includes("intermedio") ||
      lowerLevel.includes("intermediate")
    ) {
      return "intermediate";
    }
    if (lowerLevel.includes("avanzado") || lowerLevel.includes("advanced")) {
      return "advanced";
    }

    return undefined;
  }
}

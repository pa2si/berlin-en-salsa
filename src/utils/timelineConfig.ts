/**
 * TIMELINE CONFIGURATION
 *
 * This file defines the timeline by simply referencing events and their time slots.
 * The modal UI automatically adapts based on the event structure.
 *
 * Events are now unified (day-agnostic) and the timeline configuration determines which day they appear on.
 *
 * Phase 2 Refactor: Array-based configuration for true scalability
 */

import { AreaType } from "../data/timetable/types/area.types";
import { mainStageEvents } from "../data/timetable/events/main-stage";
import { danceWorkshopEvents } from "../data/timetable/events/dance-workshops";
import { musicWorkshopEvents } from "../data/timetable/events/music-workshops";
import { salsaTalksEvents } from "../data/timetable/events/salsa-talks";
import { TimetableEvent, RawTimetableEvent } from "../types/events";

/**
 * Timeline slot configuration - simple time + event reference
 */
export interface TimelineSlot {
  time: string; // Start time (e.g., "15:00")
  duration: number; // Duration in minutes
  eventId: string; // Reference to event by ID or title
}

/**
 * Schedule for a specific area on a specific day
 */
export interface DaySchedule {
  dayWeekday: string; // e.g., "saturday", "sunday"
  timeline: TimelineSlot[]; // Events for this day
}

/**
 * Timeline configuration for a single area
 */
export interface AreaTimelineConfig {
  area: AreaType;
  schedules: DaySchedule[];
}

/**
 * MAIN TIMELINE CONFIGURATION
 * Single source of truth for all timetable schedules
 * 
 * Array-based structure allows easy addition of new days - just add another object to schedules array
 */
export const TIMELINE_CONFIG: AreaTimelineConfig[] = [
  // ========================================
  // MAIN STAGE
  // ========================================
  {
    area: "main-stage",
    schedules: [
      {
        dayWeekday: "saturday",
        timeline: [
          { time: "13:00", duration: 60, eventId: "Timetable.events.mainStage.saturday.rodoElProfe" },
          { time: "14:00", duration: 60, eventId: "Timetable.events.mainStage.saturday.ecKubaSet" },
          { time: "15:00", duration: 60, eventId: "Timetable.events.mainStage.saturday.alfiaConIre" },
          { time: "16:00", duration: 60, eventId: "Timetable.events.mainStage.saturday.andrelux" },
          { time: "17:00", duration: 60, eventId: "Timetable.events.mainStage.saturday.djFeikes" },
          { time: "18:00", duration: 60, eventId: "Timetable.events.mainStage.saturday.burundanga" },
          { time: "19:00", duration: 60, eventId: "Timetable.events.mainStage.saturday.tempoHavana" },
          { time: "20:00", duration: 60, eventId: "Timetable.events.mainStage.saturday.djBongo" },
          { time: "21:00", duration: 60, eventId: "Timetable.events.mainStage.saturday.cayeye" },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          { time: "12:30", duration: 60, eventId: "Timetable.events.mainStage.sunday.floriWilber" },
          { time: "14:00", duration: 60, eventId: "Timetable.events.mainStage.sunday.laSonoraBerlin" },
          { time: "15:00", duration: 60, eventId: "Timetable.events.mainStage.sunday.elPuma" },
          { time: "16:30", duration: 60, eventId: "Timetable.events.mainStage.sunday.burundanga" },
          { time: "17:30", duration: 60, eventId: "Timetable.events.mainStage.sunday.anacaonaLaVecina" },
          { time: "19:00", duration: 60, eventId: "Timetable.events.mainStage.sunday.cayeye" },
          { time: "20:00", duration: 60, eventId: "Timetable.events.mainStage.sunday.bongo" },
          { time: "21:00", duration: 60, eventId: "Timetable.events.mainStage.sunday.berlinEnSalsaHostDJs" },
        ],
      },
    ],
  },

  // ========================================
  // DANCE WORKSHOPS
  // ========================================
  {
    area: "dance-workshops",
    schedules: [
      {
        dayWeekday: "saturday",
        timeline: [
          { time: "13:00", duration: 60, eventId: "Timetable.events.danceWorkshops.saturday.afroCubanDance" },
          { time: "16:00", duration: 60, eventId: "Timetable.events.danceWorkshops.saturday.sonCubano" },
          { time: "18:30", duration: 60, eventId: "Timetable.events.danceWorkshops.saturday.salsaCalena" },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          { time: "12:30", duration: 60, eventId: "Timetable.events.danceWorkshops.sunday.newYorkOn2" },
          { time: "15:00", duration: 60, eventId: "Timetable.events.danceWorkshops.sunday.casinoCubano" },
        ],
      },
    ],
  },

  // ========================================
  // MUSIC WORKSHOPS
  // ========================================
  {
    area: "music-workshops",
    schedules: [
      {
        dayWeekday: "saturday",
        timeline: [
          { time: "13:00", duration: 60, eventId: "Timetable.events.musicWorkshops.saturday.polyrhythmIntroduction" },
          { time: "14:00", duration: 60, eventId: "Timetable.events.musicWorkshops.saturday.ritmoDeClave" },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          { time: "13:00", duration: 60, eventId: "Timetable.events.musicWorkshops.sunday.campanaWorkshop" },
          { time: "15:30", duration: 60, eventId: "Timetable.events.musicWorkshops.sunday.soneoWorkshop" },
        ],
      },
    ],
  },

  // ========================================
  // SALSA TALKS
  // ========================================
  {
    area: "salsa-talks",
    schedules: [
      {
        dayWeekday: "saturday",
        timeline: [
          { time: "14:00", duration: 30, eventId: "Timetable.events.salsaTalks.saturday.sarahBalzatTalk.title" },
          { time: "14:30", duration: 30, eventId: "Timetable.events.salsaTalks.saturday.jessiVaneTalk.title" },
          { time: "16:00", duration: 30, eventId: "Timetable.events.salsaTalks.saturday.aviatrixChristian.title" },
          { time: "16:30", duration: 30, eventId: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.title" },
          { time: "17:00", duration: 30, eventId: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.title" },
          { time: "18:30", duration: 30, eventId: "Timetable.events.salsaTalks.saturday.salsancoTalk.title" },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          { time: "15:00", duration: 30, eventId: "Timetable.events.salsaTalks.sunday.aviatrixSuenaChelo.title" },
          { time: "15:30", duration: 30, eventId: "Timetable.events.salsaTalks.sunday.aviatrixDracaena.title" },
          { time: "16:00", duration: 30, eventId: "Timetable.events.salsaTalks.sunday.aviatrixEnilce.title" },
          { time: "17:30", duration: 90, eventId: "Timetable.events.salsaTalks.sunday.noLeLlamenSalsa.title" },
        ],
      },
    ],
  },
];

/**
 * Get timeline configuration for a specific area and day
 */
export function getTimelineForAreaAndDay(
  area: AreaType,
  dayWeekday: string,
): TimelineSlot[] {
  const areaConfig = TIMELINE_CONFIG.find((config) => config.area === area);
  if (!areaConfig) {
    console.warn(`No timeline configuration found for area: ${area}`);
    return [];
  }

  const daySchedule = areaConfig.schedules.find(
    (schedule) => schedule.dayWeekday === dayWeekday.toLowerCase(),
  );

  if (!daySchedule) {
    console.warn(`No schedule found for ${area} on ${dayWeekday}`);
    return [];
  }

  return daySchedule.timeline;
}

/**
 * Get all schedules for a specific area (all days)
 */
export function getSchedulesForArea(area: AreaType): DaySchedule[] {
  const areaConfig = TIMELINE_CONFIG.find((config) => config.area === area);
  return areaConfig?.schedules || [];
}

/**
 * Get all areas that have events on a specific day
 */
export function getAreasForDay(dayWeekday: string): AreaType[] {
  return TIMELINE_CONFIG.filter((config) =>
    config.schedules.some(
      (schedule) => schedule.dayWeekday === dayWeekday.toLowerCase(),
    ),
  ).map((config) => config.area);
}

// ============================================================================
// BACKWARD COMPATIBILITY LAYER
// These exports maintain compatibility with existing code during transition
// @deprecated - Use getTimelineForAreaAndDay() instead
// ============================================================================

/**
 * Simple timeline configuration for Main Stage Saturday
 * Just time slots with event references - the modal adapts automatically
 */
/**
 * Simple timeline configuration for Main Stage Saturday
 * Just time slots with event references - the modal adapts automatically
 * @deprecated Use getTimelineForAreaAndDay("main-stage", "saturday") instead
 */
export const mainStageSaturdayTimeline: TimelineSlot[] =
  getTimelineForAreaAndDay("main-stage", "saturday");

/**
 * Simple timeline configuration for Main Stage Sunday
 * @deprecated Use getTimelineForAreaAndDay("main-stage", "sunday") instead
 */
export const mainStageSundayTimeline: TimelineSlot[] =
  getTimelineForAreaAndDay("main-stage", "sunday");

/**
 * Simple timeline configuration for Dance Workshops Saturday
 * @deprecated Use getTimelineForAreaAndDay("dance-workshops", "saturday") instead
 */
export const danceWorkshopsSaturdayTimeline: TimelineSlot[] =
  getTimelineForAreaAndDay("dance-workshops", "saturday");

/**
 * Simple timeline configuration for Dance Workshops Sunday
 * @deprecated Use getTimelineForAreaAndDay("dance-workshops", "sunday") instead
 */
export const danceWorkshopsSundayTimeline: TimelineSlot[] =
  getTimelineForAreaAndDay("dance-workshops", "sunday");

/**
 * Simple timeline configuration for Music Workshops Saturday
 * @deprecated Use getTimelineForAreaAndDay("music-workshops", "saturday") instead
 */
export const musicWorkshopsSaturdayTimeline: TimelineSlot[] =
  getTimelineForAreaAndDay("music-workshops", "saturday");

/**
 * Simple timeline configuration for Music Workshops Sunday
 * @deprecated Use getTimelineForAreaAndDay("music-workshops", "sunday") instead
 */
export const musicWorkshopsSundayTimeline: TimelineSlot[] =
  getTimelineForAreaAndDay("music-workshops", "sunday");

/**
 * Simple timeline configuration for Salsa Talks Saturday
 * @deprecated Use getTimelineForAreaAndDay("salsa-talks", "saturday") instead
 */
export const salsaTalksSaturdayTimeline: TimelineSlot[] =
  getTimelineForAreaAndDay("salsa-talks", "saturday");

/**
 * Simple timeline configuration for Salsa Talks Sunday
 * @deprecated Use getTimelineForAreaAndDay("salsa-talks", "sunday") instead
 */
export const salsaTalksSundayTimeline: TimelineSlot[] =
  getTimelineForAreaAndDay("salsa-talks", "sunday");

// ============================================================================
// CORE FUNCTIONS - Timeline Processing and Enrichment
// ============================================================================

/**
 * Convert timeline slots to TimetableEvent format for the existing timetable system
 * Enriches RAW events with timing information from the timeline configuration
 * Returns fully enriched TimetableEvent objects with required startTime, endTime, and day
 */
export function createTimelineFromSimpleConfig(
  timelineSlots: TimelineSlot[],
  eventCollection: RawTimetableEvent[],
  day?: string, // Changed from "saturday" | "sunday" to accept any weekday
): TimetableEvent[] {
  const timeline: TimetableEvent[] = [];

  for (const slot of timelineSlots) {
    const event = eventCollection.find((e) => e.title === slot.eventId);

    if (event) {
      // Enrich the raw event with scheduling information
      const timelineEvent: TimetableEvent = {
        ...event,
        startTime: slot.time,
        endTime: calculateEndTime(slot.time, slot.duration),
        day: day || "saturday", // Default to saturday if not provided
        // Set duration for workshop events from timeline
        ...((event.type === "dance-workshop" ||
          event.type === "music-workshop") && { duration: slot.duration }),
      } as TimetableEvent; // Type assertion needed because we're adding required fields

      timeline.push(timelineEvent);
    } else {
      console.warn(`Event not found: ${slot.eventId}`);
    }
  }

  return timeline;
}

/**
 * Utility function to get event by ID from any event collection
 */
export function getEventById(eventId: string) {
  // Search in all unified event collections
  const allEvents = [
    ...mainStageEvents,
    ...danceWorkshopEvents,
    ...musicWorkshopEvents,
    ...salsaTalksEvents,
  ];

  return allEvents.find((event) => event.title === eventId);
}

/**
 * Utility function to calculate end time
 */
export function calculateEndTime(startTime: string, duration: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHour = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}

/**
 * CENTRALIZED TIMELINE SLOT GENERATION
 *
 * This is the ONLY place where timeline slots should be generated.
 * All other code should use this function with different timeline configurations.
 */

/**
 * Generate time slots with events from timeline configuration
 * This replaces all the individual generate*TimelineSlots functions
 */
export function generateTimeSlotsFromTimeline(
  timelineConfig: TimelineSlot[],
  eventCollection: RawTimetableEvent[],
  day: string = "saturday", // Changed from "saturday" | "sunday" to accept any weekday
): Array<{
  time: string;
  events: TimetableEvent[];
}> {
  const slots: Array<{
    time: string;
    events: TimetableEvent[];
  }> = [];

  // Generate all 30-minute slots from 12:30 to 22:00
  const startTime = 12 * 60 + 30; // 12:30 in minutes
  const endTime = 22 * 60; // 22:00 in minutes

  for (let time = startTime; time <= endTime; time += 30) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // Check if any timeline event is active at this time
    const activeTimelineSlot = timelineConfig.find((slot) => {
      const slotStart = slot.time.split(":").map(Number);
      const slotStartMinutes = slotStart[0] * 60 + slotStart[1];
      const slotEndMinutes = slotStartMinutes + slot.duration;

      return time >= slotStartMinutes && time < slotEndMinutes;
    });

    if (activeTimelineSlot) {
      const event = eventCollection.find(
        (e) => e.title === activeTimelineSlot.eventId,
      );
      if (event) {
        // Enrich raw event with scheduling information
        const enrichedEvent: TimetableEvent = {
          ...event,
          startTime: activeTimelineSlot.time,
          endTime: calculateEndTime(
            activeTimelineSlot.time,
            activeTimelineSlot.duration,
          ),
          day,
          // Add duration for workshop events
          ...((event.type === "dance-workshop" ||
            event.type === "music-workshop") && {
            duration: activeTimelineSlot.duration,
          }),
        } as TimetableEvent;

        slots.push({
          time: timeString,
          events: [enrichedEvent],
        });
      } else {
        // Event not found, create empty slot
        console.warn(`Event not found: ${activeTimelineSlot.eventId}`);
        slots.push({ time: timeString, events: [] });
      }
    } else {
      // No event for this time slot
      slots.push({ time: timeString, events: [] });
    }
  }

  return slots;
}

/**
 * Convenience functions for specific areas
 * These now simply call the generic function with the right config using unified event collections
 */
export function generateMainStageTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    mainStageSaturdayTimeline,
    mainStageEvents,
    "saturday",
  );
}

export function generateDanceWorkshopsSaturdayTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    danceWorkshopsSaturdayTimeline,
    danceWorkshopEvents,
    "saturday",
  );
}

export function generateDanceWorkshopsSundayTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    danceWorkshopsSundayTimeline,
    danceWorkshopEvents,
    "sunday",
  );
}

export function generateMusicWorkshopsSaturdayTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    musicWorkshopsSaturdayTimeline,
    musicWorkshopEvents,
    "saturday",
  );
}

export function generateMusicWorkshopsSundayTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    musicWorkshopsSundayTimeline,
    musicWorkshopEvents,
    "sunday",
  );
}

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

import { AreaType } from "../types/area.types";
import { mainStageEvents } from "../events/main-stage";
import { danceWorkshopEvents } from "../events/dance-workshops";
import { musicWorkshopEvents } from "../events/music-workshops";
import { salsaTalksEvents } from "../events/salsa-talks";
import { TimetableEvent, RawTimetableEvent } from "../../../types/events";

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
        dayWeekday: "friday",
        timeline: [
          {
            time: "16:00",
            duration: 60,
            eventId: "Timetable.events.artists.mangle", //text done (german text with translated with Chat GPT), image missing
          },
          {
            time: "17:00",
            duration: 60,
            eventId: "Timetable.events.artists.somos", //MISSING
          },
          {
            time: "18:30",
            duration: 60,
            eventId: "Timetable.events.artists.alafiaConIre", // MISSING
          },
          {
            time: "19:30",
            duration: 60,
            eventId: "Timetable.events.artists.sonObrero", //MISSING
          },
          {
            time: "21:00",
            duration: 60,
            eventId: "Timetable.events.artists.cayeye", //text done, image missing
          },
        ],
      },
      {
        dayWeekday: "saturday",
        timeline: [
          {
            time: "12:30",
            duration: 90,
            eventId: "Timetable.events.artists.malandrea", //text done, image missing
          },
          {
            time: "14:00",
            duration: 90,
            eventId: "Timetable.events.artists.dayle", //text done, image missing
          },
          {
            time: "15:30",
            duration: 90,
            eventId: "Timetable.events.artists.laCataMontesa", //text done (translation with Chat GPT), image missing
          },
          {
            time: "17:30",
            duration: 60,
            eventId: "Timetable.events.artists.burundanga", //MISSING
          },
          {
            time: "18:30",
            duration: 90,
            eventId: "Timetable.events.artists.lionza", //text done, image missing
          },
          {
            time: "20:30",
            duration: 60,
            eventId: "Timetable.events.artists.laMelodica", //MISSING
          },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          {
            time: "12:30",
            duration: 90,
            eventId: "Timetable.events.artists.elJavierB", //text done, image missing
          },
          {
            time: "14:00",
            duration: 90,
            eventId: "Timetable.events.artists.suenaCheloB2BEcuajey", //text done, image missing
          },
          {
            time: "16:00",
            duration: 60,
            eventId: "Timetable.events.artists.lasHienas", //text done (spanish text translated by chat GPT), image missing
          },
          {
            time: "17:00",
            duration: 90,
            eventId: "Timetable.events.artists.ednaMartinez", //MISSING
          },
          {
            time: "19:00",
            duration: 90,
            eventId: "Timetable.events.artists.gerardoRosalesSalsaLegendaria", //text done, image missing
          },
          {
            time: "20:30",
            duration: 90,
            eventId: "Timetable.events.artists.besHosts",
          },
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
          {
            time: "13:00",
            duration: 60,
            eventId: "Timetable.events.danceWorkshops.saturday.afroCubanDance",
          },
          {
            time: "16:00",
            duration: 60,
            eventId: "Timetable.events.danceWorkshops.saturday.sonCubano",
          },
          {
            time: "18:30",
            duration: 60,
            eventId: "Timetable.events.danceWorkshops.saturday.salsaCalena",
          },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          {
            time: "12:30",
            duration: 60,
            eventId: "Timetable.events.danceWorkshops.sunday.newYorkOn2",
          },
          {
            time: "15:00",
            duration: 60,
            eventId: "Timetable.events.danceWorkshops.sunday.casinoCubano",
          },
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
          {
            time: "13:00",
            duration: 60,
            eventId:
              "Timetable.events.musicWorkshops.saturday.polyrhythmIntroduction",
          },
          {
            time: "14:00",
            duration: 60,
            eventId: "Timetable.events.musicWorkshops.saturday.ritmoDeClave",
          },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          {
            time: "13:00",
            duration: 60,
            eventId: "Timetable.events.musicWorkshops.sunday.campanaWorkshop",
          },
          {
            time: "15:30",
            duration: 60,
            eventId: "Timetable.events.musicWorkshops.sunday.soneoWorkshop",
          },
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
          {
            time: "14:00",
            duration: 30,
            eventId:
              "Timetable.events.salsaTalks.saturday.sarahBalzatTalk.title",
          },
          {
            time: "14:30",
            duration: 30,
            eventId: "Timetable.events.salsaTalks.saturday.jessiVaneTalk.title",
          },
          {
            time: "16:00",
            duration: 30,
            eventId:
              "Timetable.events.salsaTalks.saturday.aviatrixChristian.title",
          },
          {
            time: "16:30",
            duration: 30,
            eventId:
              "Timetable.events.salsaTalks.saturday.aviatrixRaicez.title",
          },
          {
            time: "17:00",
            duration: 30,
            eventId: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.title",
          },
          {
            time: "18:30",
            duration: 30,
            eventId: "Timetable.events.salsaTalks.saturday.salsancoTalk.title",
          },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          {
            time: "15:00",
            duration: 30,
            eventId:
              "Timetable.events.salsaTalks.sunday.aviatrixSuenaChelo.title",
          },
          {
            time: "15:30",
            duration: 30,
            eventId:
              "Timetable.events.salsaTalks.sunday.aviatrixDracaena.title",
          },
          {
            time: "16:00",
            duration: 30,
            eventId: "Timetable.events.salsaTalks.sunday.aviatrixEnilce.title",
          },
          {
            time: "17:30",
            duration: 90,
            eventId: "Timetable.events.salsaTalks.sunday.noLeLlamenSalsa.title",
          },
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

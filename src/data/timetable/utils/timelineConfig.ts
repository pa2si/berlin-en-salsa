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
import { danceAreaEvents } from "../events/dance-area";
import { musicWorkshopEvents } from "../events/music-workshops";
import { salsaTalksEvents } from "../events/salsa-talks";
import { TimetableEvent, RawTimetableEvent } from "../../../types/events";

/**
 * Timeline slot configuration - simple time + event reference
 */
export interface EventTimelineSlot {
  time: string; // Start time (e.g., "15:00")
  duration: number; // Duration in minutes
  eventId: string; // Reference to event by ID or title
  tba?: false;
}

export interface TbaTimelineSlot {
  time: string; // Start time (e.g., "15:00")
  duration: number; // Duration in minutes
  tba: true; // Creates a non-clickable TBA slot in the timetable
  eventId?: string; // Optional symbolic event reference (#sym:...) for custom display labels
}

export type TimelineSlot = EventTimelineSlot | TbaTimelineSlot;

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
            eventId: "Timetable.events.artists.somos", //DONE
          },
          {
            time: "17:00",
            duration: 60,
            eventId: "Timetable.events.artists.mangle", //DONE
          },
          {
            time: "18:30",
            duration: 60,
            eventId: "Timetable.events.artists.alafiaConIre", // DONE
          },
          {
            time: "19:30",
            duration: 60,
            eventId: "Timetable.events.artists.sonObrero", //DONE
          },
          {
            time: "21:00",
            duration: 60,
            eventId: "Timetable.events.artists.cayeye", //DONE
          },
        ],
      },
      {
        dayWeekday: "saturday",
        timeline: [
          {
            time: "12:30",
            duration: 90,
            eventId: "Timetable.events.artists.malandrea", //DONE
          },
          {
            time: "14:00",
            duration: 90,
            eventId: "Timetable.events.artists.dayle", //DONE
          },
          {
            time: "15:30",
            duration: 90,
            eventId: "Timetable.events.artists.laCataMontesa", //DONE
          },
          {
            time: "17:30",
            duration: 60,
            eventId: "Timetable.events.artists.burundanga", //DONE
          },
          {
            time: "18:30",
            duration: 90,
            eventId: "Timetable.events.artists.lionza", //DONE
          },
          {
            time: "20:30",
            duration: 60,
            eventId: "Timetable.events.artists.laMelodica", //DONE
          },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          {
            time: "12:30",
            duration: 90,
            eventId: "Timetable.events.artists.elJavierB", // DONE
          },
          {
            time: "14:00",
            duration: 90,
            eventId: "Timetable.events.artists.suenaCheloB2BEcuajey", //DONE
          },
          {
            time: "16:00",
            duration: 60,
            eventId: "Timetable.events.artists.lasHienas", //DONE
          },
          {
            time: "17:00",
            duration: 90,
            eventId: "Timetable.events.artists.ednaMartinez", //DONE
          },
          {
            time: "19:00",
            duration: 90,
            eventId:
              "Timetable.events.artists.gerardoRosalesYSuSalsaLegendaria", //DONE
          },
          {
            time: "20:30",
            duration: 90,
            eventId: "Timetable.events.artists.besHostDJs", //DONE , missing individuals
          },
        ],
      },
    ],
  },

  // ========================================
  // DANCE AREA
  // ========================================
  {
    area: "dance-area",
    schedules: [
      {
        dayWeekday: "friday",
        timeline: [],
      },
      {
        dayWeekday: "saturday",
        timeline: [
          {
            time: "14:30",
            duration: 60,
            eventId: "Timetable.events.danceClasses.nYStyle", //DONE
          },

          {
            time: "15:30",
            duration: 60,
            eventId: "Timetable.events.danceClasses.sonCubano", //DONE
          },
          {
            time: "16:30",
            duration: 60,
            eventId: "Timetable.events.danceClasses.caliStyle", //DONE
          },
          {
            time: "18:30",
            duration: 30,
            tba: true, //
            eventId: "Timetable.events.danceShows.titleSaturday", // PLACEHOLDER. text except for various done
          },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          {
            time: "14:00",
            duration: 60,
            eventId: "Timetable.events.danceClasses.ruedaDeCasino", //DONE
          },
          {
            time: "15:00",
            duration: 60,
            eventId: "Timetable.events.danceClasses.chaChaCha", //DONE
          },
          {
            time: "17:00",
            duration: 60,
            eventId: "Timetable.events.danceClasses.afroCuban", //DONE
          },
          {
            time: "18:00",
            duration: 30,
            tba: true,
            eventId: "Timetable.events.danceShows.titleSunday", // PLACEHOLDER. text except for various done
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
        dayWeekday: "friday",
        timeline: [
          {
            time: "17:30",
            duration: 45,
            tba: true,
            eventId: "Timetable.events.musicWorkshops.ritmoDeClave.title", // PLACEHOLDER . Text done, only missing image
          },
        ],
      },
      {
        dayWeekday: "saturday",
        timeline: [
          {
            time: "12:30",
            duration: 45,
            tba: true,
            eventId: "Timetable.events.musicWorkshops.campanaWorkshop.title", // PLACEHOLDER . Text done, only missing image
          },
          {
            time: "13:30",
            duration: 45,
            tba: true,
            eventId: "Timetable.events.musicWorkshops.guiroWorkshop.title", // PLACEHOLDER . Text done, only missing image
          },
          {
            time: "15:00",
            duration: 90,
            tba: false,
            eventId: "Timetable.events.musicWorkshops.latinJam.title", // DONE . No design for foto
          },
          {
            time: "16:30",
            duration: 150,
            tba: false,
            eventId:
              "Timetable.events.musicWorkshops.clubDeBaileSaturday.title", // DONE
          },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          {
            time: "17:00",
            duration: 180,
            tba: false,
            eventId: "Timetable.events.musicWorkshops.clubDeBaileSunday.title", // Done
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
            time: "13:00",
            duration: 60,
            tba: false,
            eventId: "Timetable.events.salsaTalks.clubDeBaile.title", // DONE
          },
          {
            time: "14:00",
            duration: 30,
            tba: false,
            eventId: "Timetable.events.aviatrix.diablasFinas.title", // DONE
          },
          {
            time: "15:00",
            duration: 30,
            tba: false,
            eventId: "Timetable.events.aviatrix.bongo.title", // DONE
          },
          {
            time: "16:00",
            duration: 30,
            tba: false,
            eventId: "Timetable.events.aviatrix.dayle.title", // DONE
          },
          {
            time: "16:30",
            duration: 60,
            tba: false,
            eventId: "Timetable.events.salsaTalks.elBarrio.title", // DONE
          },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          {
            time: "13:00",
            duration: 30,
            tba: false,
            eventId: "Timetable.events.aviatrix.amantesDelWax.title", // DONE
          },
          {
            time: "13:30",
            duration: 30,
            tba: false,
            eventId: "Timetable.events.aviatrix.anacaona.title", // DONE
          },
          {
            time: "14:00",
            duration: 30,
            tba: false,
            eventId: "Timetable.events.aviatrix.dayan.title", // DONE
          },
          {
            time: "15:00",
            duration: 60,
            tba: false,
            eventId: "Timetable.events.salsaTalks.libroSalsa.title", //DONE
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
  area?: AreaType,
): TimetableEvent[] {
  const timeline: TimetableEvent[] = [];
  const symbolEventPrefix = "#sym:";
  const tbaTranslationKey = "Timetable.modal.tbaAnnouncement";

  for (const slot of timelineSlots) {
    if ("tba" in slot && slot.tba) {
      const titleFromSymbol =
        "eventId" in slot &&
        typeof slot.eventId === "string" &&
        slot.eventId.trim().length > 0
          ? slot.eventId
          : tbaTranslationKey;

      const tbaEvent: TimetableEvent = {
        type: "main-stage",
        id: `tba-${area || "unknown"}-${slot.time}`,
        title: titleFromSymbol,
        area: area || "main-stage",
        performanceType: "dj-set",
        acts: [],
        isTba: true,
        startTime: slot.time,
        endTime: calculateEndTime(slot.time, slot.duration),
        day: day || "saturday",
      };

      timeline.push(tbaEvent);
      continue;
    }

    const isSymbolEvent = slot.eventId.startsWith(symbolEventPrefix);
    const resolvedEventId = isSymbolEvent
      ? slot.eventId.slice(symbolEventPrefix.length).trim()
      : slot.eventId;
    const event = eventCollection.find((e) => e.title === resolvedEventId);

    if (event) {
      const resolvedEvent: RawTimetableEvent = isSymbolEvent
        ? event.type === "aviatrix-talk"
          ? {
              ...event,
              title: slot.eventId,
              artistDiscussed: tbaTranslationKey,
            }
          : {
              ...event,
              title: slot.eventId,
            }
        : event;

      // Enrich the raw event with scheduling information
      const timelineEvent: TimetableEvent = {
        ...resolvedEvent,
        startTime: slot.time,
        endTime: calculateEndTime(slot.time, slot.duration),
        day: day || "saturday", // Default to saturday if not provided
        // Set duration for workshop events from timeline
        ...((resolvedEvent.type === "dance-area" ||
          resolvedEvent.type === "music-workshop") && {
          duration: slot.duration,
        }),
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
    ...danceAreaEvents,
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

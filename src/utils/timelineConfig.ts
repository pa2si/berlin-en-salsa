/**
 * TIMELINE CONFIGURATION
 *
 * This file defines the timeline by simply referencing events and their time slots.
 * The modal UI automatically adapts based on the event structure.
 */

import { mainStageSaturdayEvents } from "../data/timetable/events/main-stage/main-stage-saturday";
import { mainStageSundayEvents } from "../data/timetable/events/main-stage/main-stage-sunday";
import { danceWorkshopSaturdayEvents } from "../data/timetable/events/dance-workshops/dance-workshops-saturday";
import { danceWorkshopSundayEvents } from "../data/timetable/events/dance-workshops/dance-workshops-sunday";
import { musicWorkshopSaturdayEvents } from "../data/timetable/events/music-workshops/music-workshops-saturday";
import { musicWorkshopSundayEvents } from "../data/timetable/events/music-workshops/music-workshops-sunday";
import { salsaTalksSaturdayEvents } from "../data/timetable/events/salsa-talks/salsa-talks-saturday";
import { salsaTalksSundayEvents } from "../data/timetable/events/salsa-talks/salsa-talks-sunday";
import { TimetableEvent } from "../types/events";

/**
 * Timeline slot configuration - simple time + event reference
 */
export interface TimelineSlot {
  time: string; // Start time (e.g., "15:00")
  duration: number; // Duration in minutes
  eventId: string; // Reference to event by ID or title
}

/**
 * Simple timeline configuration for Main Stage Saturday
 * Just time slots with event references - the modal adapts automatically
 */
export const mainStageSaturdayTimeline: TimelineSlot[] = [
  {
    time: "13:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.rodoElProfe",
  },
  {
    time: "14:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.ecKubaSet",
  },
  {
    time: "15:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.alfiaConIre",
  },
  {
    time: "16:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.andrelux",
  },
  {
    time: "17:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.djFeikes",
  },
  {
    time: "18:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.burundanga",
  },
  {
    time: "19:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.tempoHavana",
  },
  {
    time: "20:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.djBongo",
  },
  {
    time: "21:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.cayeye",
  },
];

/**
 * Simple timeline configuration for Main Stage Sunday
 */
export const mainStageSundayTimeline: TimelineSlot[] = [
  {
    time: "12:30",
    duration: 60,
    eventId: "Timetable.events.mainStage.sunday.floriWilber",
  },
  {
    time: "14:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.sunday.laSonoraBerlin",
  },
  {
    time: "15:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.sunday.elPuma",
  },
  {
    time: "16:30",
    duration: 60,
    eventId: "Timetable.events.mainStage.sunday.burundanga",
  },
  {
    time: "17:30",
    duration: 60,
    eventId: "Timetable.events.mainStage.sunday.anacaonaLaVecina",
  },
  {
    time: "19:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.sunday.cayeye",
  },
  {
    time: "20:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.sunday.bongo",
  },
  {
    time: "21:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.sunday.berlinEnSalsaHostDJs",
  },
];

/**
 * Simple timeline configuration for Dance Workshops Saturday
 */
export const danceWorkshopsSaturdayTimeline: TimelineSlot[] = [
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
];

/**
 * Simple timeline configuration for Dance Workshops Sunday
 */
export const danceWorkshopsSundayTimeline: TimelineSlot[] = [
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
];

/**
 * Simple timeline configuration for Music Workshops Saturday
 */
export const musicWorkshopsSaturdayTimeline: TimelineSlot[] = [
  {
    time: "13:00",
    duration: 60,
    eventId: "Timetable.events.musicWorkshops.saturday.polyrhythmIntroduction",
  },
  {
    time: "14:00",
    duration: 60,
    eventId: "Timetable.events.musicWorkshops.saturday.ritmoDeClave",
  },
];

/**
 * Simple timeline configuration for Music Workshops Sunday
 */
export const musicWorkshopsSundayTimeline: TimelineSlot[] = [
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
];

/**
 * Simple timeline configuration for Salsa Talks Saturday
 */
export const salsaTalksSaturdayTimeline: TimelineSlot[] = [
  {
    time: "14:00",
    duration: 30,
    eventId: "Timetable.events.salsaTalks.saturday.sarahBalzatTalk.title",
  },
  {
    time: "14:30",
    duration: 30,
    eventId: "Timetable.events.salsaTalks.saturday.jessiVaneTalk.title",
  },
  {
    time: "16:00",
    duration: 30,
    eventId: "Timetable.events.salsaTalks.saturday.aviatrixChristian.title",
  },
  {
    time: "16:30",
    duration: 30,
    eventId: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.title",
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
];

/**
 * Simple timeline configuration for Salsa Talks Sunday
 */
export const salsaTalksSundayTimeline: TimelineSlot[] = [
  {
    time: "15:00",
    duration: 30,
    eventId: "Timetable.events.salsaTalks.sunday.aviatrixSuenaChelo.title",
  },
  {
    time: "15:30",
    duration: 30,
    eventId: "Timetable.events.salsaTalks.sunday.aviatrixDracaena.title",
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
];

/**
 * Convert timeline slots to TimetableEvent format for the existing timetable system
 */
export function createTimelineFromSimpleConfig(
  timelineSlots: TimelineSlot[],
  eventCollection: TimetableEvent[],
): TimetableEvent[] {
  const timeline: TimetableEvent[] = [];

  for (const slot of timelineSlots) {
    const event = eventCollection.find((e) => e.title === slot.eventId);

    if (event) {
      const timelineEvent: TimetableEvent = {
        ...event,
        startTime: slot.time,
        endTime: calculateEndTime(slot.time, slot.duration),
      };

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
  // Search in all event collections
  const allEvents = [
    ...mainStageSaturdayEvents,
    ...mainStageSundayEvents,
    ...danceWorkshopSaturdayEvents,
    ...danceWorkshopSundayEvents,
    ...musicWorkshopSaturdayEvents,
    ...musicWorkshopSundayEvents,
    ...salsaTalksSaturdayEvents,
    ...salsaTalksSundayEvents,
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
 * Generic function to generate timeline slots from any timeline configuration
 * This replaces all the individual generate*TimelineSlots functions
 */
export function generateTimeSlotsFromTimeline(
  timelineConfig: TimelineSlot[],
  eventCollection: TimetableEvent[],
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
        slots.push({
          time: timeString,
          events: [
            {
              ...event,
              startTime: activeTimelineSlot.time,
              endTime: calculateEndTime(
                activeTimelineSlot.time,
                activeTimelineSlot.duration,
              ),
            },
          ],
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
 * These now simply call the generic function with the right config
 */
export function generateMainStageTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    mainStageSaturdayTimeline,
    mainStageSaturdayEvents,
  );
}

export function generateDanceWorkshopsSaturdayTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    danceWorkshopsSaturdayTimeline,
    danceWorkshopSaturdayEvents,
  );
}

export function generateDanceWorkshopsSundayTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    danceWorkshopsSundayTimeline,
    danceWorkshopSundayEvents,
  );
}

export function generateMusicWorkshopsSaturdayTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    musicWorkshopsSaturdayTimeline,
    musicWorkshopSaturdayEvents,
  );
}

export function generateMusicWorkshopsSundayTimelineSlots() {
  return generateTimeSlotsFromTimeline(
    musicWorkshopsSundayTimeline,
    musicWorkshopSundayEvents,
  );
}

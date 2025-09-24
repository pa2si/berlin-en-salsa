/**
 * Simple Timeline Configuration Utility
 *
 * Easy way to configure events for existing timetable system.
 * Just specify time, duration, and event reference -
 * the system will generate the proper time slots.
 */

import { TimetableEvent } from "../types/events";

export interface SimpleTimeSlot {
  time: string; // Start time (e.g., "13:00")
  duration: number; // Duration in minutes
  eventRef: string; // Reference to event in main-stage-saturday-new.ts
}

/**
 * Convert simple time slots to TimetableEvent format that your system expects
 */
export function createTimelineFromSimpleConfig(
  simpleSlots: SimpleTimeSlot[],
  eventCollection: TimetableEvent[],
): TimetableEvent[] {
  const timeline: TimetableEvent[] = [];

  for (const slot of simpleSlots) {
    // Find the referenced event
    const event = eventCollection.find((e) => e.title === slot.eventRef);

    if (event) {
      // Calculate end time
      const endTime = calculateEndTime(slot.time, slot.duration);

      // Create timeline event with timing from config
      const timelineEvent: TimetableEvent = {
        ...event, // Copy all event data (acts, images, dance shows, etc.)
        startTime: slot.time,
        endTime: endTime,
        // Override any existing timing with our config
      };

      timeline.push(timelineEvent);
    } else {
      console.warn(`Event not found: ${slot.eventRef}`);
    }
  }

  return timeline;
}

/**
 * Calculate end time from start time and duration
 */
function calculateEndTime(startTime: string, duration: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHour = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}

/**
 * SIMPLE CONFIGURATION FOR MAIN STAGE SATURDAY
 *
 * This is all you need to edit to change the timeline!
 * Just set time, duration, and event reference.
 */
export const mainStageSaturdaySimpleConfig: SimpleTimeSlot[] = [
  {
    time: "13:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.rodoElProfe",
  },
  {
    time: "14:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.ecKubaSet",
  },
  {
    time: "15:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.alfiaConIre",
  },
  {
    time: "16:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.andrelux",
  },
  {
    time: "17:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.djFeikes",
  },
  {
    time: "18:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.burundanga",
  },
  {
    time: "19:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.tempoHavana",
  },
  {
    time: "20:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.djBongo",
  },
  {
    time: "21:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.cayeye",
  },
  {
    time: "22:00",
    duration: 60,
    eventRef: "Timetable.events.mainStage.saturday.djMc0ld",
  },
];

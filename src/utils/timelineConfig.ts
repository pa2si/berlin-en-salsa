/**
 * TIMELINE CONFIGURATION
 *
 * This file defines the timeline by simply referencing events and their time slots.
 * The modal UI automatically adapts based on the event structure.
 */

import { mainStageSaturdayEvents } from "../data/timetable/events/main-stage-saturday-new";
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
  {
    time: "22:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.djMc0ld",
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
 * Utility function to get event by ID
 */
export function getEventById(eventId: string) {
  return mainStageSaturdayEvents.find((event) => event.title === eventId);
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
 * Generate 30-minute time slots with events
 */
export function generateTimelineSlots() {
  const slots: {
    time: string;
    event?: TimetableEvent & { endTime: string };
  }[] = [];

  // Generate all 30-minute slots from 12:30 to 23:00
  const startTime = 12 * 60 + 30; // 12:30 in minutes
  const endTime = 23 * 60; // 23:00 in minutes

  for (let time = startTime; time <= endTime; time += 30) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // Check if any timeline event is active at this time
    const activeTimelineSlot = mainStageSaturdayTimeline.find((slot) => {
      const slotStart = slot.time.split(":").map(Number);
      const slotStartMinutes = slotStart[0] * 60 + slotStart[1];
      const slotEndMinutes = slotStartMinutes + slot.duration;

      return time >= slotStartMinutes && time < slotEndMinutes;
    });

    if (activeTimelineSlot) {
      const event = getEventById(activeTimelineSlot.eventId);
      if (event) {
        slots.push({
          time: timeString,
          event: {
            ...event,
            // Add timeline-specific properties
            endTime: calculateEndTime(
              activeTimelineSlot.time,
              activeTimelineSlot.duration,
            ),
          },
        });
      } else {
        // Event not found, create empty slot
        slots.push({ time: timeString });
      }
    } else {
      // No event for this time slot
      slots.push({ time: timeString });
    }
  }

  return slots;
}

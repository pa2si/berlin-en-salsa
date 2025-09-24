/**
 * Timeline Builder Utility
 *
 * Super simple way to create timelines:
 *
 * const timeline = createTimeline()
 *   .addEvent("13:00", 30, "Timetable.events.mainStage.saturday.rodoElProfe")
 *   .addEvent("13:30", 60, "Timetable.events.mainStage.saturday.ecKubaSet")
 *   .build();
 */

import { mainStageSaturdayEvents } from "../events/main-stage-saturday-new";

export interface TimelineEvent {
  startTime: string;
  duration: number;
  endTime: string;
  event: any; // The actual event data
}

export interface TimelineSlot {
  time: string;
  event?: TimelineEvent;
  isEmpty: boolean;
}

class TimelineBuilder {
  private events: Array<{
    time: string;
    duration: number;
    eventId: string;
  }> = [];

  addEvent(time: string, duration: number, eventId: string) {
    this.events.push({ time, duration, eventId });
    return this;
  }

  build(): TimelineSlot[] {
    const slots: TimelineSlot[] = [];

    // Generate 30-minute slots from 12:30 to 23:00
    const startTime = 12 * 60 + 30; // 12:30 in minutes
    const endTime = 23 * 60; // 23:00 in minutes

    for (let time = startTime; time <= endTime; time += 30) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const timeString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

      // Find active event for this time slot
      const activeEvent = this.events.find((eventConfig) => {
        const eventStart = this.timeToMinutes(eventConfig.time);
        const eventEnd = eventStart + eventConfig.duration;
        return time >= eventStart && time < eventEnd;
      });

      if (activeEvent) {
        // Find the event data
        const eventData = mainStageSaturdayEvents.find(
          (e) => e.title === activeEvent.eventId,
        );

        if (eventData) {
          const endTime = this.minutesToTime(
            this.timeToMinutes(activeEvent.time) + activeEvent.duration,
          );

          slots.push({
            time: timeString,
            event: {
              startTime: activeEvent.time,
              duration: activeEvent.duration,
              endTime,
              event: eventData,
            },
            isEmpty: false,
          });
        } else {
          // Event not found, create empty slot
          slots.push({
            time: timeString,
            isEmpty: true,
          });
        }
      } else {
        // No event for this time slot
        slots.push({
          time: timeString,
          isEmpty: true,
        });
      }
    }

    return slots;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  private minutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
  }
}

/**
 * Create a new timeline builder
 */
export function createTimeline() {
  return new TimelineBuilder();
}

/**
 * Pre-configured timeline for Main Stage Saturday
 * This is the simple way to define your schedule
 */
export const mainStageSaturdayTimeline = createTimeline()
  .addEvent("13:00", 30, "Timetable.events.mainStage.saturday.rodoElProfe")
  .addEvent("13:30", 60, "Timetable.events.mainStage.saturday.ecKubaSet")
  .addEvent("15:00", 60, "Timetable.events.mainStage.saturday.alfiaConIre")
  .addEvent("16:00", 60, "Timetable.events.mainStage.saturday.andrelux")
  .addEvent("17:00", 60, "Timetable.events.mainStage.saturday.djFeikes")
  .addEvent("18:00", 60, "Timetable.events.mainStage.saturday.burundanga")
  .addEvent("19:00", 60, "Timetable.events.mainStage.saturday.tempoHavana")
  .addEvent("20:00", 60, "Timetable.events.mainStage.saturday.djBongo")
  .addEvent("21:00", 60, "Timetable.events.mainStage.saturday.cayeye")
  .addEvent("22:00", 60, "Timetable.events.mainStage.saturday.djMc0ld")
  .build();

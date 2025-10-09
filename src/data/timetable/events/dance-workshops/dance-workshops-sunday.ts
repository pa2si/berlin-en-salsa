/**
 * DANCE WORKSHOP SUNDAY EVENTS - NEW STRUCTURE
 *
 * Using the new event-based structure with EventFactory for proper type safety.
 */

import { EventFactory } from "@/utils/eventFactory";
import { DanceWorkshopEvent } from "@/types/events";

/**
 * Sunday dance workshop events using the new event structure
 */
export const danceWorkshopSundayEvents: DanceWorkshopEvent[] = [
  // New York On2 Workshop (12:30 - 13:30)
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.sunday.newYorkOn2",
    startTime: "12:30",
    duration: 60,
    area: "dance-workshops",
    danceStyle: "New York On2",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.niya",
        role: "instructor",
        bio: "Timetable.events.descriptions.niya",
        image: "/niya.webp",
      }),
    ],
    description: "Timetable.events.descriptions.newYorkOn2",
    image: "/niya.webp",
  }),

  // Casino Cubano Workshop (15:00 - 16:00)
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.sunday.casinoCubano",
    startTime: "15:00",
    duration: 60,
    area: "dance-workshops",
    danceStyle: "Casino Cubano",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.lei",
        role: "instructor",
        bio: "Timetable.events.descriptions.lei",
        image: "/lei.webp",
      }),
    ],
    description: "Timetable.events.descriptions.casinoCubano",
    image: "/lei.webp",
  }),
];

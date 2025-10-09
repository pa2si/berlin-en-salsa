/**
 * DANCE WORKSHOP SATURDAY EVENTS - NEW STRUCTURE
 *
 * Using the new event-based structure with EventFactory for proper type safety.
 */

import { EventFactory } from "@/utils/eventFactory";
import { DanceWorkshopEvent } from "@/types/events";

/**
 * Saturday dance workshop events using the new event structure
 */
export const danceWorkshopSaturdayEvents: DanceWorkshopEvent[] = [
  // Afro-Cuban Dance Workshop (13:00 - 14:00)
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.saturday.afroCubanDance",
    startTime: "13:00",
    duration: 60,
    area: "dance-workshops",
    danceStyle: "Afro-Cuban",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.leidiana",
        role: "instructor",
        bio: "Timetable.events.bios.leidiana",
        image: "/leidiana.webp",
      }),
    ],
    description: "Timetable.events.descriptions.afroCubanDance",
    image: "/leidiana.webp",
  }),

  // Son Cubano Workshop (16:00 - 17:00)
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.saturday.sonCubano",
    startTime: "16:00",
    duration: 60,
    area: "dance-workshops",
    danceStyle: "Son Cubano",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.helen",
        role: "instructor",
        bio: "Timetable.events.bios.helen",
        image: "/yago-helen.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.yago",
        role: "instructor",
        bio: "Timetable.events.bios.yago",
        image: "/yago-helen.webp",
      }),
    ],
    description: "Timetable.events.descriptions.sonCubano",
    image: "/yago-helen.webp",
  }),

  // Salsa Caleña Workshop (18:30 - 19:30)
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.saturday.salsaCalena",
    startTime: "18:30",
    duration: 60,
    area: "dance-workshops",
    danceStyle: "Salsa Caleña",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.julian",
        role: "instructor",
        bio: "Timetable.events.descriptions.julian",
        image: "/julian.webp",
      }),
    ],
    description: "Timetable.events.descriptions.salsaCalena",
    image: "/julian.webp",
  }),
];

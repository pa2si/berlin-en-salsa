/**
 * DANCE WORKSHOP EVENTS - UNIFIED
 *
 * All dance workshop events in one file. The timeline configuration determines which day they appear on.
 */

import { EventFactory } from "@/utils/eventFactory";
import { RawDanceWorkshopEvent } from "@/types/events";

/**
 * All dance workshop events for the festival
 */
export const danceWorkshopEvents: RawDanceWorkshopEvent[] = [
  // Afro-Cuban Dance Workshop
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.saturday.afroCubanDance",
    area: "dance-workshops",
    danceStyle: "Afro-Cuban",
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

  // Son Cubano Workshop
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.saturday.sonCubano",
    area: "dance-workshops",
    danceStyle: "Son Cubano",
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

  // Salsa Caleña Workshop
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.saturday.salsaCalena",
    area: "dance-workshops",
    danceStyle: "Salsa Caleña",
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

  // New York On2 Workshop
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.sunday.newYorkOn2",
    area: "dance-workshops",
    danceStyle: "New York On2",
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

  // Casino Cubano Workshop
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.sunday.casinoCubano",
    area: "dance-workshops",
    danceStyle: "Casino Cubano",
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

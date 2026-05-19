/**
 * DANCE AREA EVENTS - UNIFIED
 *
 * All dance area events (workshops and shows) in one file. The timeline configuration determines which day they appear on.
 */

import { EventFactory } from "@/utils/eventFactory";
import { RawDanceAreaEvent } from "@/types/events";

/**
 * All dance area events for the festival
 */
export const danceAreaEvents: RawDanceAreaEvent[] = [
  // Son Cubano Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.sonCubano",
    area: "dance-area",
    danceAreaType: "charla-bailar",
    danceStyle: "Son Cubano",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.dancers.lynetRivero",
        role: "instructor",
        bio: "Timetable.events.bios.lynetRivero",
        image: "/yago-helen.webp",
      }),
    ],
    description: "Timetable.events.descriptions.sonCubano",
    image: "/yago-helen.webp",
  }),

  // Cha Cha Cha Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.chaChaCha",
    area: "dance-area",
    danceAreaType: "workshop",
    danceStyle: "Cha Cha Cha",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.nora",
        role: "instructor",
        // bio: "Timetable.events.descriptions.nora",
        image: "/niya.webp",
      }),
    ],
    description: "Timetable.events.descriptions.chaChaCha",
    image: "/niya.webp",
  }),

  // Afro-Cuban Dance Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.saturday.afroCubanDance",
    area: "dance-area",
    danceAreaType: "workshop",
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

  // Salsa Caleña Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.saturday.salsaCalena",
    area: "dance-area",
    danceAreaType: "workshop",
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

  // Casino Cubano Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.sunday.casinoCubano",
    area: "dance-area",
    danceAreaType: "workshop",
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

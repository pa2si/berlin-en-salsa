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
  // NY Style Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.nYStyle",
    area: "dance-area",
    danceAreaType: "workshop",
    danceStyle: "New York Style",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceWorkshopTeachers.nYStyle",
        role: "instructor",
        bio: "Timetable.events.danceWorkshopBioTeachers.nYStyle",
        image: "/ny-style.webp",
      }),
    ],
    description: "Timetable.events.danceWorkshopDescriptions.nYStyle",
    image: "/ny-style.webp",
  }),

  // Son Cubano Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.sonCubano",
    area: "dance-area",
    danceAreaType: "workshop",
    danceStyle: "Son Cubano",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceWorkshopTeachers.sonCubano",
        role: "instructor",
        bio: "Timetable.events.danceWorkshopBioTeachers.sonCubano",
        image: "/helen-yago.webp",
      }),
    ],
    description: "Timetable.events.danceWorkshopDescriptions.sonCubano",
    image: "/helen-yago.webp",
  }),

  // Cali Style Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.caliStyle",
    area: "dance-area",
    danceAreaType: "workshop",
    danceStyle: " Salsa Caleña, Cali Style",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceWorkshopTeachers.caliStyle",
        role: "instructor",
        bio: "Timetable.events.danceWorkshopBioTeachers.caliStyle",
        image: "/cali-style.webp",
      }),
    ],
    description: "Timetable.events.danceWorkshopDescriptions.caliStyle",
    image: "/cali-style.webp",
  }),

  // Rueda de Casino Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.ruedaDeCasino",
    area: "dance-area",
    danceAreaType: "workshop",
    danceStyle: "Rueda de Casino",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceWorkshopTeachers.ruedaDeCasino",
        role: "instructor",
        bio: "Timetable.events.danceWorkshopBioTeachers.ruedaDeCasino",
        image: "/rueda-de-casino.webp",
      }),
    ],
    description: "Timetable.events.danceWorkshopDescriptions.ruedaDeCasino",
    image: "/rueda-de-casino.webp",
  }),

  // Cha Cha Cha Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.chaChaCha",
    area: "dance-area",
    danceAreaType: "workshop",
    danceStyle: "Cha Cha Cha",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceWorkshopTeachers.chaChaCha",
        role: "instructor",
        bio: "Timetable.events.danceWorkshopBioTeachers.chaChaCha",
        image: "/cha-cha-cha.webp",
      }),
    ],
    description: "Timetable.events.descriptions.chaChaCha",
    image: "/cha-cha-cha.webp",
  }),

  // Afro-Cuban Dance Workshop
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceWorkshops.afroCuban",
    area: "dance-area",
    danceAreaType: "workshop",
    danceStyle: "Afro-Cuban",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceWorkshopTeachers.afroCuban",
        role: "instructor",
        bio: "Timetable.events.danceWorkshopBioTeachers.afroCuban",
        image: "/afro-cuban.webp",
      }),
    ],
    description: "Timetable.events.danceWorkshopDescriptions.afroCuban",
    image: "/afro-cuban.webp",
  }),
];

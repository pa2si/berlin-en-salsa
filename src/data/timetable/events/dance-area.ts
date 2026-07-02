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
  // NY Style Class
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceClasses.nYStyle",
    area: "dance-area",
    danceAreaType: "class",
    enableSubscription: false,
    danceStyle: "New York Style",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceClassTeachers.nYStyle",
        role: "instructor",
        bio: "Timetable.events.danceClassBioTeachers.nYStyle",
        image: "/ny-style.webp",
      }),
    ],
    description: "Timetable.events.danceClassDescriptions.nYStyle",
    image: "/ny-style.webp",
  }),

  // Son Cubano Class
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceClasses.sonCubano",
    area: "dance-area",
    danceAreaType: "class",
    enableSubscription: false,
    danceStyle: "Son Cubano",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceClassTeachers.sonCubano",
        role: "instructor",
        bio: "Timetable.events.danceClassBioTeachers.sonCubano",
        image: "/helen-yago.webp",
      }),
    ],
    description: "Timetable.events.danceClassDescriptions.sonCubano",
    image: "/helen-yago.webp",
  }),

  // Cali Style Class
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceClasses.caliStyle",
    area: "dance-area",
    danceAreaType: "class",
    enableSubscription: false,
    danceStyle: " Salsa Caleña, Cali Style",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceClassTeachers.caliStyle",
        role: "instructor",
        bio: "Timetable.events.danceClassBioTeachers.caliStyle",
        image: "/cali-style.webp",
      }),
    ],
    description: "Timetable.events.danceClassDescriptions.caliStyle",
    image: "/cali-style.webp",
  }),

  // Rueda de Casino Class
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceClasses.ruedaDeCasino",
    area: "dance-area",
    danceAreaType: "class",
    enableSubscription: true,
    danceStyle: "Rueda de Casino",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceClassTeachers.ruedaDeCasino",
        role: "instructor",
        bio: "Timetable.events.danceClassBioTeachers.ruedaDeCasino",
        image: "/rueda-de-casino.webp",
      }),
    ],
    description: "Timetable.events.danceClassDescriptions.ruedaDeCasino",
    image: "/rueda-de-casino.webp",
  }),

  // Cha Cha Cha Class
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceClasses.chaChaCha",
    area: "dance-area",
    danceAreaType: "class",
    enableSubscription: false,
    danceStyle: "Cha Cha Cha",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceClassTeachers.chaChaCha",
        role: "instructor",
        bio: "Timetable.events.danceClassBioTeachers.chaChaCha",
        image: "/cha-cha-cha.webp",
      }),
    ],
    description: "Timetable.events.danceClassDescriptions.chaChaCha",
    image: "/cha-cha-cha.webp",
  }),

  // Afro-Cuban Dance Class
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceClasses.afroCuban",
    area: "dance-area",
    danceAreaType: "class",
    enableSubscription: false,
    danceStyle: "Afro-Cuban",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceClassTeachers.afroCuban",
        role: "instructor",
        bio: "Timetable.events.danceClassBioTeachers.afroCuban",
        image: "/afro-cuban.webp",
      }),
    ],
    description: "Timetable.events.danceClassDescriptions.afroCuban",
    image: "/afro-cuban.webp",
  }),

  // Performance Shows Saturday
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceShows.titleSaturday",
    area: "dance-area",
    danceAreaType: "show",
    enableSubscription: false,
    danceStyle: "Various styles",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceShows.instructor.helenYago",
        role: "dancer",
        description: "Timetable.events.danceShows.descriptions.helenYago",
      }),
      EventFactory.createAct({
        name: "Timetable.events.danceShows.instructor.leiAyna",
        role: "dancer",
        description: "Timetable.events.danceShows.descriptions.leiAyna",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/helen-yago-show.webp",
        caption: "Timetable.events.danceShows.instructor.helenYago",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/ley-ayna.webp",
        caption: "Timetable.events.danceShows.instructor.leiAyna",
      }),
    ],
  }),

  // Performance Shows Sunday
  EventFactory.createDanceAreaEvent({
    title: "Timetable.events.danceShows.titleSunday",
    area: "dance-area",
    danceAreaType: "show",
    enableSubscription: false,
    danceStyle: "Various styles",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.danceShows.instructor.jessiJuli",
        role: "dancer",
        description: "Timetable.events.danceShows.descriptions.jessiJuli",
      }),
      EventFactory.createAct({
        name: "Timetable.events.danceShows.instructor.vassilAgnes",
        role: "dancer",
        description: "Timetable.events.danceShows.descriptions.vassilAgnes",
      }),
      EventFactory.createAct({
        name: "Timetable.events.danceShows.instructor.leiAyna",
        role: "dancer",
        description: "Timetable.events.danceShows.descriptions.leiAyna",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/jessi-juli.webp",
        caption: "Timetable.events.danceShows.instructor.jessiJuli",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/vassil-agnes.webp",
        caption: "Timetable.events.danceShows.instructor.vassilAgnes",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/ley-ayna.webp",
        caption: "Timetable.events.danceShows.instructor.leiAyna",
      }),
    ],
  }),
];

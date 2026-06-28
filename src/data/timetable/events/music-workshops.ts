/**
 * MUSIC WORKSHOP EVENTS - UNIFIED
 *
 * All music workshop events in one file. The timeline configuration determines which day they appear on.
 */

import { EventFactory } from "@/utils/eventFactory";
import { RawMusicWorkshopEvent } from "@/types/events";

/**
 * All music workshop events for the festival
 */
export const musicWorkshopEvents: RawMusicWorkshopEvent[] = [
  // Ritmo de Clave Workshop
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.ritmoDeClave.title",
    area: "music-workshops",
    description: "Timetable.events.musicWorkshops.ritmoDeClave.description",
    location: "Timetable.events.musicWorkshops.ritmoDeClave.location",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.musicWorkshops.ritmoDeClave.name",
        role: "instructor",
        image: "/angel-candeaux.webp",
      }),
    ],
  }),

  // Guiro Workshop
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.guiroWorkshop.title",
    area: "music-workshops",
    description: "Timetable.events.musicWorkshops.guiroWorkshop.description",
    image: "/angel-candeaux.webp",
    location: "Timetable.events.musicWorkshops.guiroWorkshop.location",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.musicWorkshops.guiroWorkshop.name",
        role: "instructor",
        image: "/angel-candeaux.webp",
      }),
    ],
  }),

  // Campana Workshop
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.campanaWorkshop.title",
    area: "music-workshops",
    description: "Timetable.events.musicWorkshops.campanaWorkshop.description",
    location: "Timetable.events.musicWorkshops.campanaWorkshop.location",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.musicWorkshops.campanaWorkshop.name",
        role: "instructor",
        bio: "Timetable.events.musicWorkshops.campanaWorkshop.bio",
        image: "/chucho-palma.jpeg",
      }),
    ],
  }),

  // Latin Jam
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.latinJam.title",
    area: "music-workshops",
    actType: "jam",
    description: "Timetable.events.musicWorkshops.latinJam.description",
    location: "Timetable.events.musicWorkshops.latinJam.location",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.musicWorkshops.latinJam.name",
        role: "instructor",
        image: "/latin-jam.webp",
      }),
    ],
  }),

  // Club de Baile Saturday
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.clubDeBaileSaturday.title",
    area: "music-workshops",
    actType: "workshop",
    description:
      "Timetable.events.musicWorkshops.clubDeBaileSaturday.description",
    image: "/club-de-baile-logo.webp",
    location: "Timetable.events.musicWorkshops.clubDeBaileSaturday.location",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.musicWorkshops.clubDeBaileSaturday.name",
        role: "instructor",
        image: "/club-de-baile-logo.webp",
        bio: "Timetable.events.musicWorkshops.clubDeBaileSaturday.bio",
      }),
    ],
  }),

  // Club de Baile Sunday
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.clubDeBaileSunday.title",
    area: "music-workshops",
    actType: "workshop",
    description:
      "Timetable.events.musicWorkshops.clubDeBaileSunday.description",
    location: "Timetable.events.musicWorkshops.clubDeBaileSunday.location",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.musicWorkshops.clubDeBaileSunday.name",
        role: "instructor",
        bio: "Timetable.events.musicWorkshops.clubDeBaileSunday.bio",
        image: "/club-de-baile-logo.webp",
      }),
    ],
  }),
];

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
  // Polyrhythm Introduction Workshop
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.saturday.polyrhythmIntroduction",
    area: "music-workshops",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.angelCandeaux",
        role: "instructor",
        bio: "Timetable.events.bios.angelCandeaux",
        image: "/angel-candeaux.webp",
      }),
    ],
    description: "Timetable.events.descriptions.polyrhythmIntroduction",
    image: "/angel-candeaux.webp",
  }),

  // Ritmo de Clave Workshop
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.saturday.ritmoDeClave",
    area: "music-workshops",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.guillermoDiaz",
        role: "instructor",
        image: "/guillermo-diaz.webp",
      }),
    ],
    description: "Timetable.events.descriptions.ritmoDeClave",
    image: "/guillermo-diaz.webp",
  }),

  // Campana Workshop
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.sunday.campanaWorkshop",
    area: "music-workshops",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.chuchoPalma",
        role: "instructor",
        bio: "Timetable.events.descriptions.chuchoPalma",
        image: "/chucho-palma.jpeg",
      }),
    ],
    description: "Timetable.events.descriptions.campanaWorkshop",
    image: "/chucho-palma.jpeg",
  }),

  // Soneo Workshop
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.sunday.soneoWorkshop",
    area: "music-workshops",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.harryMunoz",
        role: "instructor",
        image: "/harry-munoz.jpeg",
      }),
    ],
    description: "Timetable.events.descriptions.soneoWorkshop",
    image: "/harry-munoz.jpeg",
  }),
];

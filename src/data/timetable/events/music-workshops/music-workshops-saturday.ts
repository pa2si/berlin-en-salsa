/**
 * MUSIC WORKSHOP SATURDAY EVENTS - NEW STRUCTURE
 *
 * Using the new event-based structure with EventFactory for proper type safety.
 */

import { EventFactory } from "@/utils/eventFactory";
import { MusicWorkshopEvent } from "@/types/events";

/**
 * Saturday music workshop events using the new event structure
 */
export const musicWorkshopSaturdayEvents: MusicWorkshopEvent[] = [
  // Polyrhythm Introduction Workshop (13:00 - 14:00)
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.saturday.polyrhythmIntroduction",
    startTime: "13:00",
    duration: 60,
    area: "music-workshops",
    day: "saturday",
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

  // Ritmo de Clave Workshop (14:00 - 15:00)
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.saturday.ritmoDeClave",
    startTime: "14:00",
    duration: 60,
    area: "music-workshops",
    day: "saturday",
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
];

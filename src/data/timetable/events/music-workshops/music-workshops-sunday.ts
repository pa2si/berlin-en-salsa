/**
 * MUSIC WORKSHOP SUNDAY EVENTS - NEW STRUCTURE
 *
 * Using the new event-based structure with EventFactory for proper type safety.
 */

import { EventFactory } from "@/utils/eventFactory";
import { MusicWorkshopEvent } from "@/types/events";

/**
 * Sunday music workshop events using the new event structure
 */
export const musicWorkshopSundayEvents: MusicWorkshopEvent[] = [
  // Campana Workshop (13:00 - 14:00)
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.sunday.campanaWorkshop",
    startTime: "13:00",
    duration: 60,
    area: "music-workshops",
    day: "sunday",
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

  // Soneo Workshop (15:30 - 16:30)
  EventFactory.createMusicWorkshop({
    title: "Timetable.events.musicWorkshops.sunday.soneoWorkshop",
    startTime: "15:30",
    duration: 60,
    area: "music-workshops",
    day: "sunday",
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

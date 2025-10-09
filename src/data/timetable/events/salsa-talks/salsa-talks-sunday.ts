/**
 * SALSA TALKS SUNDAY EVENTS - NEW STRUCTURE
 *
 * Using the new event-based structure with proper type safety.
 */

import { EventFactory } from "@/utils/eventFactory";
import { TimetableEvent } from "@/types/events";

/**
 * Salsa talks Sunday events using the new event structure
 */
export const salsaTalksSundayEvents: TimetableEvent[] = [
  // Aviatrix - Suena Chelo (15:00 - 15:30)
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.sunday.aviatrixSuenaChelo.title",
    startTime: "15:00",
    endTime: "15:30",
    area: "salsa-talks",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.suenaChelo",
        role: "guest",
        bio: "Timetable.events.salsaTalks.sunday.aviatrixSuenaChelo.bio",
        image: "/suena-chelo.webp",
      }),
    ],
    artistDiscussed:
      "Timetable.events.salsaTalks.sunday.aviatrixSuenaChelo.artist",
    recordDiscussed:
      "Timetable.events.salsaTalks.sunday.aviatrixSuenaChelo.record",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/suena-chelo.webp",
        caption: "Timetable.events.artists.suenaChelo",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/the-hustler.webp",
        caption: "Timetable.events.artists.theHustler",
      }),
    ],
  }),

  // Aviatrix - Dracaena (15:30 - 16:00)
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.sunday.aviatrixDracaena.title",
    startTime: "15:30",
    endTime: "16:00",
    area: "salsa-talks",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.dracaena",
        role: "guest",
        bio: "Timetable.events.salsaTalks.sunday.aviatrixDracaena.bio",
        image: "/dracaena-charla.webp",
      }),
    ],
    artistDiscussed:
      "Timetable.events.salsaTalks.sunday.aviatrixDracaena.artist",
    recordDiscussed:
      "Timetable.events.salsaTalks.sunday.aviatrixDracaena.record",
    moderatorComment:
      "Timetable.events.salsaTalks.sunday.aviatrixDracaena.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/dracaena-charla.webp",
        caption: "Timetable.events.artists.dracaena",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/cielo-de-tambores.webp",
        caption: "Timetable.events.artists.cieloDeTambores",
      }),
    ],
  }),

  // Aviatrix - Enilce Feikes (16:00 - 16:30)
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.sunday.aviatrixEnilce.title",
    startTime: "16:00",
    endTime: "16:30",
    area: "salsa-talks",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.enilceFeikes",
        role: "guest",
        bio: "Timetable.events.salsaTalks.sunday.aviatrixEnilce.bio",
        image: "/enilce.webp",
      }),
    ],
    artistDiscussed: "Timetable.events.salsaTalks.sunday.aviatrixEnilce.artist",
    recordDiscussed: "Timetable.events.salsaTalks.sunday.aviatrixEnilce.record",
    moderatorComment:
      "Timetable.events.salsaTalks.sunday.aviatrixEnilce.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/enilce.webp",
        caption: "Timetable.events.artists.enilceFeikes",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/joe-arroyo.jpg",
        caption: "Timetable.events.artists.joeArroyo",
      }),
    ],
  }),

  // No Le Llamen Salsa Documentary (17:30 - 19:00)
  EventFactory.createTalk({
    title: "Timetable.events.salsaTalks.sunday.noLeLlamenSalsa.title",
    startTime: "17:30",
    endTime: "19:00",
    area: "salsa-talks",
    format: "presentation",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.salsaTalks.sunday.noLeLlamenSalsa.presenters",
        role: "presenter",
      }),
    ],
    description:
      "Timetable.events.salsaTalks.sunday.noLeLlamenSalsa.description",
    image: "/no-le-llamen-salsa-a-mi-son.webp",
  }),
];

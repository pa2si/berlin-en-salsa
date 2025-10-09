/**
 * SALSA TALKS SATURDAY EVENTS - NEW STRUCTURE
 *
 * Using the new event-based structure with proper type safety.
 */

import { EventFactory } from "@/utils/eventFactory";
import { TimetableEvent } from "@/types/events";

/**
 * Salsa talks Saturday events using the new event structure
 */
export const salsaTalksSaturdayEvents: TimetableEvent[] = [
  // Sarah Balzat Talk (14:00 - 14:30)
  EventFactory.createTalk({
    title: "Timetable.events.salsaTalks.saturday.sarahBalzatTalk.title",
    startTime: "14:00",
    endTime: "14:30",
    area: "salsa-talks",
    format: "presentation",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.sarahBalzat",
        role: "presenter",
        image: "/sarah-balzat.jpeg",
      }),
    ],
    description:
      "Timetable.events.salsaTalks.saturday.sarahBalzatTalk.description",
    image: "/sarah-balzat.jpeg",
  }),

  // Jessi & Vane Talk (14:30 - 15:00)
  EventFactory.createTalk({
    title: "Timetable.events.salsaTalks.saturday.jessiVaneTalk.title",
    startTime: "14:30",
    endTime: "15:00",
    area: "salsa-talks",
    format: "presentation",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.jessiVane",
        role: "presenter",
        image: "/jessi.jpeg",
      }),
    ],
    description:
      "Timetable.events.salsaTalks.saturday.jessiVaneTalk.description",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/jessi.jpeg",
        caption: "Timetable.events.artists.jessi",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/vane.jpg",
        caption: "Timetable.events.artists.vane",
      }),
    ],
  }),

  // Aviatrix - DJ Christian (16:00 - 16:30)
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.saturday.aviatrixChristian.title",
    startTime: "16:00",
    endTime: "16:30",
    area: "salsa-talks",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.djChristian",
        role: "guest",
        bio: "Timetable.events.salsaTalks.saturday.aviatrixChristian.bio",
        image: "/christian.webp",
      }),
    ],
    artistDiscussed:
      "Timetable.events.salsaTalks.saturday.aviatrixChristian.artist",
    recordDiscussed:
      "Timetable.events.salsaTalks.saturday.aviatrixChristian.record",
    moderatorComment:
      "Timetable.events.salsaTalks.saturday.aviatrixChristian.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/eddie-palmieri.jpeg",
        caption: "Timetable.events.artists.eddiePalmieri",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/christian.webp",
        caption: "Timetable.events.artists.djChristian",
      }),
    ],
  }),

  // Aviatrix - Raicez Koncretaz (16:30 - 17:00)
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.title",
    startTime: "16:30",
    endTime: "17:00",
    area: "salsa-talks",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.raicezKoncretaz",
        role: "guest",
        bio: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.bio",
        image: "/raicez-concretaz.webp",
      }),
    ],
    artistDiscussed:
      "Timetable.events.salsaTalks.saturday.aviatrixRaicez.artist",
    recordDiscussed:
      "Timetable.events.salsaTalks.saturday.aviatrixRaicez.record",
    moderatorComment:
      "Timetable.events.salsaTalks.saturday.aviatrixRaicez.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/francisco-aguabella.webp",
        caption: "Timetable.events.artists.franciscoAguabella",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/raicez-concretaz.webp",
        caption: "Timetable.events.artists.raicezKoncretaz",
      }),
    ],
  }),

  // Aviatrix - DJ MC0LD (17:00 - 17:30)
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.title",
    startTime: "17:00",
    endTime: "17:30",
    area: "salsa-talks",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.djMc0ld",
        role: "guest",
        bio: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.bio",
        image: "/dj-mc0ld.webp",
      }),
    ],
    artistDiscussed:
      "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.artist",
    recordDiscussed:
      "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.record",
    moderatorComment:
      "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/frankie-dante.jpg",
        caption: "Timetable.events.artists.frankieDante",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/dj-mc0ld.webp",
        caption: "Timetable.events.artists.djMc0ld",
      }),
    ],
  }),

  // Salsanco Talk (18:30 - 19:00)
  EventFactory.createTalk({
    title: "Timetable.events.salsaTalks.saturday.salsancoTalk.title",
    startTime: "18:30",
    endTime: "19:00",
    area: "salsa-talks",
    format: "panel",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.paulWelchGuerra",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.salsaTalks.saturday.salsancoTalk.guests",
        role: "guest",
      }),
    ],
    description:
      "Timetable.events.salsaTalks.saturday.salsancoTalk.description",
    image: "/salsanco.webp",
  }),
];

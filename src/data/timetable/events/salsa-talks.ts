/**
 * SALSA TALKS EVENTS - UNIFIED
 *
 * All salsa talks events in one file. The timeline configuration determines which day they appear on.
 */

import { EventFactory } from "@/utils/eventFactory";
import { RawTimetableEvent } from "@/types/events";

/**
 * All salsa talks events for the festival
 */
export const salsaTalksEvents: RawTimetableEvent[] = [
  // ===== SATURDAY EVENTS =====

  // Sarah Balzat Talk
  EventFactory.createTalk({
    title: "Timetable.events.salsaTalks.saturday.sarahBalzatTalk.title",
    area: "salsa-talks",
    format: "presentation",
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

  // Jessi & Vane Talk
  EventFactory.createTalk({
    title: "Timetable.events.salsaTalks.saturday.jessiVaneTalk.title",
    area: "salsa-talks",
    format: "presentation",
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

  // Aviatrix - DJ Christian
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.aviatrix.diablasFinas.title",
    area: "salsa-talks",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.renatrix",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.aviatrix.diablasFinas.guest",
        role: "guest",
        bio: "Timetable.events.aviatrix.diablasFinas.bio",
        image: "/diablas-finas.webp",
      }),
    ],
    artistDiscussed: "Timetable.events.aviatrix.diablasFinas.artist",
    recordDiscussed: "Timetable.events.aviatrix.diablasFinas.record",
    moderatorComment: "Timetable.events.aviatrix.diablasFinas.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/diablas-finas-disco.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/diablas-finas.webp",
        caption: "Timetable.events.aviatrix.diablasFinas.guest",
      }),
    ],
  }),

  // Aviatrix - Bongo
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.aviatrix.bongo.title",
    area: "salsa-talks",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.renatrix",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.aviatrix.bongo.guest",
        role: "guest",
        bio: "Timetable.events.aviatrix.bongo.bio",
        image: "/bongo.webp",
      }),
    ],
    artistDiscussed: "Timetable.events.aviatrix.bongo.artist",
    recordDiscussed: "Timetable.events.aviatrix.bongo.record",
    moderatorComment: "Timetable.events.aviatrix.bongo.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/bongo-disco.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/bongo.webp",
        caption: "Timetable.events.aviatrix.bongo.guest",
      }),
    ],
  }),

  // Aviatrix - Daylé
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.aviatrix.dayle.title",
    area: "salsa-talks",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.renatrix",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.aviatrix.dayle.guest",
        role: "guest",
        bio: "Timetable.events.aviatrix.dayle.bio",
        image: "/dayle-aviatrix.webp",
      }),
    ],
    artistDiscussed: "Timetable.events.aviatrix.dayle.artist",
    recordDiscussed: "Timetable.events.aviatrix.dayle.record",
    moderatorComment: "Timetable.events.aviatrix.dayle.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/dayle-disco.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/dayle-aviatrix.webp",
        caption: "Timetable.events.aviatrix.dayle.guest",
      }),
    ],
  }),

  // Salsanco Talk
  EventFactory.createTalk({
    title: "Timetable.events.salsaTalks.saturday.salsancoTalk.title",
    area: "salsa-talks",
    format: "panel",
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

  // ===== SUNDAY EVENTS =====

  // Aviatrix - Amantes del Wax
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.aviatrix.amantesDelWax.title",
    area: "salsa-talks",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.aviatrix.amantesDelWax.guest",
        role: "guest",
        bio: "Timetable.events.aviatrix.amantesDelWax.bio",
        image: "/amantes-del-wax.webp",
      }),
    ],
    artistDiscussed: "Timetable.events.aviatrix.amantesDelWax.artist",
    recordDiscussed: "Timetable.events.aviatrix.amantesDelWax.record",
    moderatorComment: "Timetable.events.aviatrix.amantesDelWax.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/amantes-del-wax-disco.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/amantes-del-wax.webp",
        caption: "Timetable.events.aviatrix.amantesDelWax.guest",
      }),
    ],
  }),

  // Aviatrix - Anacaona
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.aviatrix.anacaona.title",
    area: "salsa-talks",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.aviatrix.anacaona.guest",
        role: "guest",
        bio: "Timetable.events.aviatrix.anacaona.bio",
        image: "/anacaona.webp",
      }),
    ],
    artistDiscussed: "Timetable.events.aviatrix.anacaona.artist",
    recordDiscussed: "Timetable.events.aviatrix.anacaona.record",
    moderatorComment: "Timetable.events.aviatrix.anacaona.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/anacaona-disco.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/anacaona.webp",
        caption: "Timetable.events.aviatrix.anacaona.guest",
      }),
    ],
  }),
  // Aviatrix - Dayán
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.aviatrix.dayan.title",
    area: "salsa-talks",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "moderator",
      }),
      EventFactory.createAct({
        name: "Timetable.events.aviatrix.dayan.guest",
        role: "guest",
        bio: "Timetable.events.aviatrix.dayan.bio",
        image: "/dayan.webp",
      }),
    ],
    artistDiscussed: "Timetable.events.aviatrix.dayan.artist",
    recordDiscussed: "Timetable.events.aviatrix.dayan.record",
    moderatorComment: "Timetable.events.aviatrix.dayan.comment",
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/dayan-disco.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/dayan.webp",
        caption: "Timetable.events.aviatrix.dayan.guest",
      }),
    ],
  }),

  // No Le Llamen Salsa Documentary
  EventFactory.createTalk({
    title: "Timetable.events.salsaTalks.sunday.noLeLlamenSalsa.title",
    area: "salsa-talks",
    format: "presentation",
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

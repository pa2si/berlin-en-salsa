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
    title: "Timetable.events.salsaTalks.saturday.aviatrixChristian.title",
    area: "salsa-talks",
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

  // Aviatrix - Raicez Koncretaz
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.title",
    area: "salsa-talks",
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

  // Aviatrix - DJ MC0LD
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.title",
    area: "salsa-talks",
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

  // Aviatrix - Suena Chelo
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.sunday.aviatrixSuenaChelo.title",
    area: "salsa-talks",
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

  // Aviatrix - Dracaena
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.sunday.aviatrixDracaena.title",
    area: "salsa-talks",
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

  // Aviatrix - Enilce Feikes
  EventFactory.createAviatrixTalk({
    title: "Timetable.events.salsaTalks.sunday.aviatrixEnilce.title",
    area: "salsa-talks",
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

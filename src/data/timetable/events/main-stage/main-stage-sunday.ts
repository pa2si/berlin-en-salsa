/**
 * MAIN STAGE SUNDAY EVENTS - NEW STRUCTURE
 *
 * Using the new event-based structure with proper type safety.
 */

import { EventFactory } from "@/utils/eventFactory";
import { TimetableEvent } from "@/types/events";

/**
 * Main stage Sunday events using the new event structure
 */
export const mainStageSundayEvents: TimetableEvent[] = [
  // Flori & Wilber DJ Set (12:30 - 13:30)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.floriWilber",
    startTime: "12:30",
    endTime: "13:30",
    area: "main-stage",
    performanceType: "dj-set",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.floriWilber",
        role: "dj",
        description: "Timetable.events.descriptions.floriWilber",
        image: "/flori-wilber.webp",
      }),
    ],
    image: "/flori-wilber.webp",
    description: "Timetable.events.descriptions.floriWilber",
  }),

  // La Sonora Berlin Live Performance (14:00 - 15:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.laSonoraBerlin",
    startTime: "14:00",
    endTime: "15:00",
    area: "main-stage",
    performanceType: "live",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.laSonoraBerlin",
        role: "band",
        description: "Timetable.events.descriptions.laSonoraBerlin",
        image: "/sonora-berlin.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.niya",
        role: "dancer",
        bio: "Timetable.events.bios.niya",
        image: "/niya.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/sonora-berlin.webp",
        caption: "Timetable.events.descriptions.laSonoraBerlin",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/niya.webp",
        caption: "Timetable.events.bios.niya",
      }),
    ],
    image: "/sonora-berlin.webp",
    hasShow: true,
    danceShow: "Timetable.events.danceShows.nyOn2",
    dancers: "Timetable.events.dancers.niya",
  }),

  // El Puma DJ Set (15:00 - 16:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.elPuma",
    startTime: "15:00",
    endTime: "16:00",
    area: "main-stage",
    performanceType: "dj-set",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.elPuma",
        role: "dj",
        bio: "Timetable.events.bios.elPuma",
        image: "/el-puma.webp",
      }),
    ],
    image: "/el-puma.webp",
  }),

  // Burundanga Live Performance (16:30 - 17:30)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.burundanga",
    startTime: "16:30",
    endTime: "17:30",
    area: "main-stage",
    performanceType: "live",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.burundanga",
        role: "band",
        description: "Timetable.events.descriptions.burundanga",
        image: "/burundanga.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.lei",
        role: "dancer",
        bio: "Timetable.events.bios.lei",
        image: "/lei-ayna.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.ayna",
        role: "dancer",
        bio: "Timetable.events.bios.ayna",
        image: "/lei-ayna.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/burundanga.webp",
        caption: "Timetable.events.descriptions.burundanga",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/lei-ayna.webp",
        caption: "Timetable.events.bios.lei",
      }),
    ],
    image: "/burundanga.webp",
    description: "Timetable.events.descriptions.burundanga",
    hasShow: true,
    danceShow: "Timetable.events.danceShows.casinoCubano",
    dancers: "Timetable.events.dancers.leiAyna",
  }),

  // Anacaona & La Vecina DJ Set (17:30 - 18:30)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.anacaonaLaVecina",
    startTime: "17:30",
    endTime: "18:30",
    area: "main-stage",
    performanceType: "dj-set",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.anacaona",
        role: "dj",
        bio: "Timetable.events.bios.anacaona",
        image: "/la-vecina-anacaona.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.laVecina",
        role: "dj",
        bio: "Timetable.events.bios.laVecina",
        image: "/la-vecina-anacaona.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/la-vecina-anacaona.webp",
        caption: "Timetable.events.descriptions.anacaonaLaVecina",
      }),
    ],
    image: "/la-vecina-anacaona.webp",
    description: "Timetable.events.descriptions.anacaonaLaVecina",
  }),

  // Cayeye Live Performance (19:00 - 20:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.cayeye",
    startTime: "19:00",
    endTime: "20:00",
    area: "main-stage",
    performanceType: "live",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.cayeye",
        role: "band",
        description: "Timetable.events.descriptions.cayeye",
        image: "/cayeye.webp",
      }),
    ],
    image: "/cayeye.webp",
    description: "Timetable.events.descriptions.cayeye",
    genre: "Salsa",
  }),

  // DJ Bongo Set (20:00 - 21:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.bongo",
    startTime: "20:00",
    endTime: "21:00",
    area: "main-stage",
    performanceType: "dj-set",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.bongo",
        role: "dj",
        bio: "Timetable.events.bios.bongo",
        image: "/dj-bongo.webp",
      }),
    ],
    image: "/dj-bongo.webp",
  }),

  // Berlin en Salsa Host DJs (21:00 - 22:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.berlinEnSalsaHostDJs",
    startTime: "21:00",
    endTime: "22:00",
    area: "main-stage",
    performanceType: "dj-set",
    day: "sunday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.dracaena",
        role: "dj",
        description: "Timetable.events.descriptions.dracaena",
        image: "/dracaena.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.elVago",
        role: "dj",
        description: "Timetable.events.descriptions.elVago",
        image: "/el-vago.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.elMelomanoAleman",
        role: "dj",
        description: "Timetable.events.descriptions.elMelomanoAleman",
        image: "/el-melomano-aleman.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.andrelux",
        role: "dj",
        description: "Timetable.events.descriptions.andrelux",
        image: "/andrelux.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/dracaena.webp",
        caption: "Timetable.events.descriptions.dracaena",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/el-vago.webp",
        caption: "Timetable.events.descriptions.elVago",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/el-melomano-aleman.webp",
        caption: "Timetable.events.descriptions.elMelomanoAleman",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/andrelux.webp",
        caption: "Timetable.events.descriptions.andrelux",
      }),
    ],
    description: "Timetable.events.descriptions.berlinEnSalsaHostDJs",
  }),
];

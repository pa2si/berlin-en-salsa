/**
 * MAIN STAGE EVENTS - UNIFIED
 *
 * All main stage events in one file. The timeline configuration determines which day they appear on.
 */

import { EventFactory } from "@/utils/eventFactory";
import { RawTimetableEvent } from "@/types/events";

/**
 * All main stage events for the festival
 */
export const mainStageEvents: RawTimetableEvent[] = [
  // ===== FRIDAY EVENTS =====

  // Mangle DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.friday.mangle",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.mangle",
        role: "dj",
        bio: "Timetable.events.bios.mangle",
        image: "/ec-kuba.webp",
      }),
    ],
  }),

  // SOMOS SOMOS DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.friday.somos",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.ela",
        role: "dj",
        bio: "Timetable.events.bios.ela",
        image: "/rodo-le-fou.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.wadWill",
        role: "dj",
        bio: "Timetable.events.bios.wadWill",
        image: "/el-profe.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/rodo-le-fou.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/el-profe.webp",
      }),
    ],
  }),

  // Alafia con Ire Live Performance
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.friday.alafiaConIre",
    area: "main-stage",
    performanceType: "live",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.alafiaConIre",
        role: "band",
        description: "Timetable.events.descriptions.alafiaConIre",
        image: "/alafia-con-ire.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.leidiana",
        role: "dancer",
        bio: "Timetable.events.bios.leidiana",
        image: "/leidiana.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.roger",
        role: "dancer",
        bio: "Timetable.events.bios.roger",
        image: "/roger.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/alafia-con-ire.webp",
        caption: "Timetable.events.descriptions.alafiaConIre",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/leidiana-roger.webp",
        caption: "Timetable.events.descriptions.leidianaRoger",
      }),
    ],
    genre: "Afro-Cuban",
    hasShow: true,
    danceShow: "Timetable.events.danceShows.afroCuban",
    dancers: "Timetable.events.dancers.leidianaRoger",
  }),

  // Son Obrero DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.friday.sonObrero",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.sonObrero1",
        role: "dj",
        bio: "Timetable.events.bios.sonObrero1",
        image: "/rodo-le-fou.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.sonObrero2",
        role: "dj",
        bio: "Timetable.events.bios.sonObrero2",
        image: "/el-profe.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/rodo-le-fou.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/el-profe.webp",
      }),
    ],
  }),

  // Cayeye  Live Performance
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.friday.cayeye",
    area: "main-stage",
    performanceType: "live",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.cayeye",
        role: "band",
        description: "Timetable.events.descriptions.cayeye",
        image: "/cayeye.webp",
      }),
    ],
  }),

  // ===== SATURDAY EVENTS =====

  // Malandrea DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.malandrea",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.malandrea",
        role: "dj",
        bio: "Timetable.events.bios.malandrea",
        image: "/dj-feikes.webp",
      }),
    ],
  }),

  // Dayle DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.dayle",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.dayle",
        role: "dj",
        bio: "Timetable.events.bios.dayle",
        image: "/dj-feikes.webp",
      }),
    ],
  }),

  // La Cata Montesa DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.laCataMontesa",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.laCataMontesa",
        role: "band",
        bio: "Timetable.events.bios.laCataMontesa",
        image: "/burundanga.webp",
      }),
    ],
  }),

  // Burundanga Live Performance
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.burundanga",
    area: "main-stage",
    performanceType: "live",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.burundanga",
        role: "band",
        description: "Timetable.events.descriptions.burundanga",
        image: "/tempo-havana.webp",
      }),
    ],
    genre: "Son Cubano",
  }),

  // Lionza DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.lionza",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.lionza",
        role: "dj",
        bio: "Timetable.events.bios.lionza",
        image: "/dj-bongo.webp",
      }),
    ],
  }),

  // La Melodica Live Performance
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.laMelodica",
    area: "main-stage",
    performanceType: "live",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.laMelodica",
        role: "band",
        description: "Timetable.events.descriptions.laMelodica",
        image: "/cayeye.webp",
      }),
    ],
    genre: "Salsa",
  }),

  // ===== SUNDAY EVENTS =====

  // Flori & Wilber DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.floriWilber",
    area: "main-stage",
    performanceType: "dj-set",
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

  // La Sonora Berlin Live Performance
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.laSonoraBerlin",
    area: "main-stage",
    performanceType: "live",
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

  // El Puma DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.elPuma",
    area: "main-stage",
    performanceType: "dj-set",
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

  // Burundanga Live Performance (Sunday)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.burundanga",
    area: "main-stage",
    performanceType: "live",
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

  // Anacaona & La Vecina DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.anacaonaLaVecina",
    area: "main-stage",
    performanceType: "dj-set",
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

  // Cayeye Live Performance (Sunday)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.cayeye",
    area: "main-stage",
    performanceType: "live",
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

  // DJ Bongo Set (Sunday)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.bongo",
    area: "main-stage",
    performanceType: "dj-set",
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

  // Berlin en Salsa Host DJs
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.sunday.berlinEnSalsaHostDJs",
    area: "main-stage",
    performanceType: "dj-set",
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

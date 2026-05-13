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
    title: "Timetable.events.artists.mangle",
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
    title: "Timetable.events.artists.somos",
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
    title: "Timetable.events.artists.alafiaConIre",
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
    title: "Timetable.events.artists.sonObrero",
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
    title: "Timetable.events.artists.cayeye",
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
    title: "Timetable.events.artists.malandrea",
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
    title: "Timetable.events.artists.dayle",
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
    title: "Timetable.events.artists.laCataMontesa",
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
    title: "Timetable.events.artists.burundanga",
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
    title: "Timetable.events.artists.lionza",
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
    title: "Timetable.events.artists.laMelodica",
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

  // El Javier B. DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.artists.elJavierB",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.elJavierB",
        role: "dj",
        bio: "Timetable.events.bios.elJavierB",
        image: "/dj-bongo.webp",
      }),
    ],
  }),

  // Suena Chelo b2b Ecuajey DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.artists.suenaCheloB2BEcuajey",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.suenaChelo",
        role: "dj",
        bio: "Timetable.events.bios.suenaChelo",
        image: "/rodo-le-fou.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.ecuajey",
        role: "dj",
        bio: "Timetable.events.bios.ecuajey",
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

  // Las Hienas Live Performance
  EventFactory.createMainStageEvent({
    title: "Timetable.events.artists.lasHienas",
    area: "main-stage",
    performanceType: "live",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.lasHienas",
        role: "band",
        description: "Timetable.events.descriptions.lasHienas",
        image: "/cayeye.webp",
      }),
    ],
    genre: "Salsa",
  }),

  // Edna Martinez DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.artists.ednaMartinez",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.ednaMartinez",
        role: "dj",
        bio: "Timetable.events.bios.ednaMartinez",
        image: "/dj-bongo.webp",
      }),
    ],
  }),

  // Gerardo Rosales Salsa Legendaria Live Performance (Sunday)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.artists.gerardoRosalesSalsaLegendaria",
    area: "main-stage",
    performanceType: "live",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.gerardoRosalesSalsaLegendaria",
        role: "band",
        description:
          "Timetable.events.descriptions.gerardoRosalesSalsaLegendaria",
        image: "/burundanga.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.gerardoRosales",
        role: "dancer",
        bio: "Timetable.events.bios.gerardoRosales",
        image: "/lei-ayna.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/burundanga.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/lei-ayna.webp",
      }),
    ],
  }),

  // Berlin en Salsa Host DJs
  EventFactory.createMainStageEvent({
    title: "Timetable.events.artists.besHosts",
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.dracaena",
        role: "dj",
        bio: "Timetable.events.bios.dracaena",
        image: "/la-vecina-anacaona.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.andrelux",
        role: "dj",
        bio: "Timetable.events.bios.andrelux",
        image: "/la-vecina-anacaona.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.elVago",
        role: "dj",
        bio: "Timetable.events.bios.elVago",
        image: "/la-vecina-anacaona.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.elMelomanoAleman",
        role: "dj",
        bio: "Timetable.events.bios.elMelomanoAleman",
        image: "/la-vecina-anacaona.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/la-vecina-anacaona.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/la-vecina-anacaona.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/la-vecina-anacaona.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/la-vecina-anacaona.webp",
      }),
    ],
  }),
];

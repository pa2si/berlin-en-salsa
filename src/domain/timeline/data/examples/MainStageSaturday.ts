/**
 * Timeline Data Structure Design
 *
 * New scalable data file structure with 30-minute intervals and class-based approach
 * Each area has its own data file per day with structured act definitions
 */

import { ActType } from "../../models/ActType";
import { Artist } from "../../models/Artist";
import {
  ActCategory,
  EventType,
  ArtistType,
  SlideType,
} from "../../models/types";

/**
 * Example: Main Stage Saturday Data
 * Each act is defined as a complete object with all necessary information
 */

// Artists Library - Centralized artist definitions
export const ARTISTS_SATURDAY = {
  rodoLeFou: new Artist({
    id: "rodo-le-fou",
    name: "Rodo Le Fou",
    type: ArtistType.DJ,
    bio: "DJ, record collector and lover of tropical music. Co-founder of La Noche collective and Aviatrix Listening Sessions.",
    image: "/rodo-le-fou.webp",
    location: "Berlin, Germany",
    nationality: "Colombian",
    djGenres: ["Salsa Brava", "Cumbia", "Caribbean Rhythms"],
    isHeadliner: true,
    instagram: "@rodolefou",
  }),

  elProfe: new Artist({
    id: "el-profe",
    name: "El Profe",
    type: ArtistType.DJ,
    bio: "Afro-Colombian selector based in Berlin. Passionate vinyl collector bringing dancefloors to life with powerful sets.",
    image: "/el-profe.webp",
    location: "Berlin, Germany",
    nationality: "Colombian",
    djGenres: ["Salsa Brava", "Cumbia", "Vallenato", "African music"],
    isLocal: true,
  }),

  ecKuba: new Artist({
    id: "ec-kuba",
    name: "EC Kuba",
    type: ArtistType.DJ,
    bio: "Berlin-based DJ specializing in Cuban rhythms and tropical music.",
    image: "/ec-kuba.webp",
    location: "Berlin, Germany",
    djGenres: ["Cuban music", "Salsa", "Son"],
    isLocal: true,
  }),

  leidiana: new Artist({
    id: "leidiana",
    name: "Leidiana",
    type: ArtistType.INSTRUCTOR,
    bio: "Cuban dance instructor living in Berlin. Passionate about Cuban culture and specialized in Rueda de Casino.",
    image: "/leidiana.webp",
    location: "Berlin, Germany",
    nationality: "Cuban",
    danceStyles: ["Rueda de Casino", "Afro-Cuban", "Rumba"],
    teachingSpecialties: ["Afro-Cuban Dance", "Cuban Folklore"],
    experience: "5+ years teaching",
  }),

  roger: new Artist({
    id: "roger",
    name: "Roger",
    type: ArtistType.DANCER,
    bio: "Professional Cuban dancer specializing in traditional Cuban styles.",
    image: "/leidiana-roger.webp",
    nationality: "Cuban",
    danceStyles: ["Afro-Cuban", "Rumba", "Casino"],
    isGuest: true,
  }),
};

/**
 * Acts for Main Stage Saturday
 * Each act has complete information and references to artists
 */
export const MAIN_STAGE_SATURDAY_ACTS = [
  new ActType({
    id: "main-stage-rodo-el-profe-1230",
    title: "Rodo Le Fou & El Profe",
    category: ActCategory.PERFORMANCE,
    type: EventType.DJ_SET,
    startTime: "12:30",
    duration: 60, // 1 hour (2 slots: 12:30-13:30)
    artists: [ARTISTS_SATURDAY.rodoLeFou, ARTISTS_SATURDAY.elProfe],
    primaryArtist: ARTISTS_SATURDAY.rodoLeFou,
    description:
      "Opening DJ set featuring two of Berlin's finest tropical music selectors.",
    images: ["/rodo-le-fou.webp", "/el-profe.webp"],
    slides: [
      {
        id: "slide-rodo",
        artist: ARTISTS_SATURDAY.rodoLeFou,
        image: "/rodo-le-fou.webp",
        type: SlideType.ARTIST_PROFILE,
        order: 0,
      },
      {
        id: "slide-el-profe",
        artist: ARTISTS_SATURDAY.elProfe,
        image: "/el-profe.webp",
        type: SlideType.ARTIST_PROFILE,
        order: 1,
      },
    ],
    tags: ["opening-set", "tropical-music"],
    isHighlight: true,
  }),

  new ActType({
    id: "main-stage-ec-kuba-1330",
    title: "EC Kuba DJ Set",
    category: ActCategory.PERFORMANCE,
    type: EventType.DJ_SET,
    startTime: "13:30",
    duration: 60, // 1 hour (2 slots: 13:30-14:30)
    artists: [ARTISTS_SATURDAY.ecKuba],
    primaryArtist: ARTISTS_SATURDAY.ecKuba,
    description: "Cuban rhythms and tropical beats to keep the energy flowing.",
    images: ["/ec-kuba.webp"],
    tags: ["cuban-music", "tropical"],
  }),

  new ActType({
    id: "main-stage-alafia-1500",
    title: "Alafía con Iré",
    category: ActCategory.PERFORMANCE,
    type: EventType.LIVE_MUSIC,
    startTime: "15:00",
    duration: 60, // 1 hour (2 slots: 15:00-16:00)
    artists: [], // Band members would be defined separately
    description:
      "Live Afro-Cuban music featuring traditional Rumba and original compositions.",
    images: ["/alafia-con-ire.webp"],
    hasDanceShow: true,
    danceShowTitle: "Afro-Cuban Dance Show",
    danceShowDancers: [ARTISTS_SATURDAY.leidiana, ARTISTS_SATURDAY.roger],
    tags: ["live-music", "afro-cuban", "dance-show"],
    isHighlight: true,
  }),
];

/**
 * Data structure for each column/area:
 * - 30-minute time slots from 12:30 to 21:30
 * - Acts placed in appropriate slots based on duration
 * - Empty slots remain unoccupied
 * - Multi-slot acts automatically handle continuation
 */

export const MAIN_STAGE_SATURDAY_COLUMN = {
  area: "main-stage" as const,
  day: "saturday" as const,
  acts: MAIN_STAGE_SATURDAY_ACTS,

  // Time slots structure (auto-generated by TimelineColumn)
  timeSlots: [
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ],
};

/**
 * Benefits of this approach:
 *
 * 1. Scalable: Easy to add new act types without changing interfaces
 * 2. Consistent: All acts use the same ActType class with relevant fields populated
 * 3. Flexible: Modal automatically displays appropriate content based on available data
 * 4. Maintainable: Artists defined once, referenced everywhere
 * 5. Type-safe: Full TypeScript support with proper typing
 * 6. Translatable: Translation keys can be used for all text content
 * 7. Structured: Clear separation between data definition and UI logic
 *
 * Migration strategy:
 * 1. Create new data files for each area/day combination
 * 2. Define artists in centralized libraries
 * 3. Convert existing TimeSlot data to ActType instances
 * 4. Update components to use new classes
 * 5. Remove legacy data files and interfaces
 */

export default MAIN_STAGE_SATURDAY_COLUMN;

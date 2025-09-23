/**
 * Example Timeline Data - Shows how your current data would work with the new class system
 * This demonstrates the migration from your current structure to the new ActType/TimelineColumn approach
 */

import { ActType } from "../models/ActType";
import { TimelineColumn } from "../models/TimelineColumn";
import { Artist } from "../models/Artist";
import {
  ActCategory,
  EventType,
  SkillLevel,
  ArtistType,
  SlideType,
} from "../models/types";

/**
 * Example column configurations based on your current areas
 */
export const COLUMN_CONFIGS = {
  mainStage: {
    id: "main-stage",
    title: "Timetable.areas.mainStage",
    category: ActCategory.PERFORMANCE,
    color: "#FF6B6B",
    icon: "🎵",
    order: 1,
  },
  danceWorkshops: {
    id: "dance-workshops",
    title: "Timetable.areas.danceWorkshops",
    category: ActCategory.WORKSHOP,
    color: "#4ECDC4",
    icon: "💃",
    order: 2,
  },
  musicWorkshops: {
    id: "music-workshops",
    title: "Timetable.areas.musicWorkshops",
    category: ActCategory.WORKSHOP,
    color: "#45B7D1",
    icon: "🎼",
    order: 3,
  },
  salsaTalks: {
    id: "salsa-talks",
    title: "Timetable.areas.salsaTalks",
    category: ActCategory.TALK,
    color: "#96CEB4",
    icon: "🎤",
    order: 4,
  },
};

/**
 * Example artists based on your actual data
 */
export const EXAMPLE_ARTISTS = {
  rodoLeFou: new Artist({
    id: "rodo-le-fou",
    name: "Timetable.events.artists.rodoLeFou",
    type: ArtistType.DJ,
    bio: "Timetable.events.bios.rodoLeFou",
    image: "/rodo-le-fou.webp",
    location: "Paris",
    styles: ["Salsa Cubana", "Timba"],
    instagram: "@rodolefou",
  }),

  elVago: new Artist({
    id: "el-vago",
    name: "Timetable.events.artists.elVago",
    type: ArtistType.DJ,
    bio: "Timetable.events.bios.elVago",
    image: "/el-vago.webp",
    location: "Havana",
    styles: ["Son Cubano", "Salsa Dura"],
  }),

  leidiana: new Artist({
    id: "leidiana",
    name: "Timetable.events.artists.leidiana",
    type: ArtistType.INSTRUCTOR,
    bio: "Timetable.events.bios.leidiana",
    image: "/leidiana.webp",
    location: "Cuba",
    styles: ["Cuban Salsa", "Rumba"],
  }),

  roger: new Artist({
    id: "roger",
    name: "Timetable.events.artists.roger",
    type: ArtistType.INSTRUCTOR,
    bio: "Timetable.events.bios.roger",
    image: "/leidiana-roger.webp",
    location: "Cuba",
    styles: ["Cuban Salsa", "Son"],
  }),

  ciempieDeTambores: new Artist({
    id: "ciempie-de-tambores",
    name: "Timetable.events.artists.ciempieDeTambores",
    type: ArtistType.BAND,
    bio: "Timetable.events.bios.ciempieDeTambores",
    image: "/cielo-de-tambores.webp",
    location: "Berlin",
    styles: ["Live Cuban Music", "Rumba"],
  }),
};

/**
 * Example ActTypes based on your Saturday Main Stage data
 */
export const EXAMPLE_ACTS = {
  // DJ Set example (from your main-stage/saturday.ts)
  rodoElProfeDJSet: new ActType({
    id: "rodo-el-profe-saturday-1430",
    title: "Timetable.events.mainStage.saturday.rodoElProfe",
    category: ActCategory.PERFORMANCE,
    type: EventType.DJ_SET,
    startTime: "14:30",
    duration: 60,

    // People (matches your data structure)
    djs: "Timetable.events.artists.rodoLeFou",
    primaryArtist: EXAMPLE_ARTISTS.rodoLeFou,

    // Content
    description: "Timetable.events.descriptions.rodoElProfe",
    primaryImage: "/rodo-le-fou.webp",

    // Performance specific
    actType: "DJ Set",

    // Tags for filtering/search
    tags: ["opening", "cuban-style"],
    isHighlight: false,
  }),

  // Live Music with Dance Show (from your data patterns)
  ciempieLive: new ActType({
    id: "ciempie-live-saturday-2200",
    title: "Timetable.events.mainStage.saturday.ciempieLive",
    category: ActCategory.PERFORMANCE,
    type: EventType.LIVE_MUSIC,
    startTime: "22:00",
    duration: 60, // Multi-slot event

    // Live band
    primaryArtist: EXAMPLE_ARTISTS.ciempieDeTambores,
    actType: "Live",

    // Dance show component (from your hasShow/danceShow pattern)
    hasDanceShow: true,
    danceShowTitle: "Timetable.events.danceShows.cubanRumba",
    danceShowDancers: [EXAMPLE_ARTISTS.leidiana, EXAMPLE_ARTISTS.roger],

    // Content
    description: "Timetable.events.descriptions.ciempieLive",
    primaryImage: "/cielo-de-tambores.webp",

    tags: ["live-music", "dance-show", "highlight"],
    isHighlight: true,
  }),

  // Workshop example (from your dance-workshops data)
  leidianaRogerWorkshop: new ActType({
    id: "leidiana-roger-workshop-saturday-1500",
    title: "Timetable.events.danceWorkshops.saturday.leidianaRoger",
    category: ActCategory.WORKSHOP,
    type: EventType.DANCE_WORKSHOP,
    startTime: "15:00",
    duration: 60,

    // Instructors (matches your instructor/instructorTwo pattern)
    instructor: "Timetable.events.artists.leidiana",
    instructorTwo: "Timetable.events.artists.roger",
    bio: "Timetable.events.bios.leidiana",
    bioTwo: "Timetable.events.bios.roger",

    // Workshop specific
    level: SkillLevel.INTERMEDIATE,
    capacity: 30,
    prerequisites: ["Basic Cuban Salsa steps"],
    learningObjectives: [
      "Advanced partner work",
      "Cuban styling",
      "Musical interpretation",
    ],

    // Content
    description: "Timetable.events.descriptions.leidianaRogerWorkshop",
    primaryImage: "/leidiana-roger.webp",

    tags: ["cuban-salsa", "partner-work"],
    requiresRegistration: true,
  }),

  // Aviatrix Talk example (from your salsa-talks data)
  aviatrixChucho: new ActType({
    id: "aviatrix-chucho-saturday-1630",
    title: "Timetable.events.salsaTalks.saturday.aviatrixChucho",
    category: ActCategory.TALK,
    type: EventType.AVIATRIX,
    startTime: "16:30",
    duration: 30,

    // Aviatrix specific (matches your moderator/guest/artist/record pattern)
    moderator: "Timetable.events.artists.elMelomanoAleman",
    guest: "Timetable.events.artists.djBongo",
    discussedArtist: "Timetable.events.artists.chuchoPalma",
    discussedRecord: "Timetable.events.records.chuchoClassics",
    moderatorComments: "Timetable.events.comments.chuchoModeratorIntro",

    // Content
    description: "Timetable.events.descriptions.aviatrixChucho",
    primaryImage: "/chucho-palma.jpeg",

    // Slides (matches your slides structure)
    slides: [
      {
        id: "chucho-bio",
        title: "Timetable.events.slides.chuchoBio.title",
        description: "Timetable.events.slides.chuchoBio.description",
        image: "/chucho-palma.jpeg",
        type: SlideType.BIO,
      },
      {
        id: "chucho-discography",
        title: "Timetable.events.slides.chuchoDiscography.title",
        description: "Timetable.events.slides.chuchoDiscography.description",
        image: "/chucho-records.webp",
        type: SlideType.INFO,
      },
    ],

    tags: ["aviatrix", "music-history", "cuban-legends"],
  }),

  // Sunday Example - DJ Set
  florieWilberSunday: new ActType({
    id: "florie-wilber-sunday-1400",
    title: "Timetable.events.mainStage.sunday.floriWilber",
    category: ActCategory.PERFORMANCE,
    type: EventType.DJ_SET,
    startTime: "14:00",
    duration: 90,

    // People
    djs: "Timetable.events.artists.flori, Timetable.events.artists.wilber",
    primaryArtist: EXAMPLE_ARTISTS.rodoLeFou, // Using existing artist for now

    // Content
    description: "Timetable.events.descriptions.floriWilber",
    primaryImage: "/flori-wilber.webp",

    // Performance specific
    actType: "DJ Set",

    tags: ["sunday", "peruvian-djs", "salsa-classics"],
    isHighlight: true,
  }),
};

/**
 * Create example timeline with populated columns
 */
export function createExampleTimeline(): Map<string, TimelineColumn> {
  const columns = new Map<string, TimelineColumn>();

  // Create columns
  const mainStage = new TimelineColumn(COLUMN_CONFIGS.mainStage);
  const danceWorkshops = new TimelineColumn(COLUMN_CONFIGS.danceWorkshops);
  const musicWorkshops = new TimelineColumn(COLUMN_CONFIGS.musicWorkshops);
  const salsaTalks = new TimelineColumn(COLUMN_CONFIGS.salsaTalks);

  // Add acts to columns
  mainStage.addAct(EXAMPLE_ACTS.rodoElProfeDJSet); // Saturday
  mainStage.addAct(EXAMPLE_ACTS.ciempieLive); // Saturday
  mainStage.addAct(EXAMPLE_ACTS.florieWilberSunday); // Sunday

  danceWorkshops.addAct(EXAMPLE_ACTS.leidianaRogerWorkshop); // Saturday

  salsaTalks.addAct(EXAMPLE_ACTS.aviatrixChucho); // Saturday

  // Store in map
  columns.set("main-stage", mainStage);
  columns.set("dance-workshops", danceWorkshops);
  columns.set("music-workshops", musicWorkshops);
  columns.set("salsa-talks", salsaTalks);

  return columns;
}

/**
 * Legacy data format (your current TimeSlot structure)
 */
interface LegacyEventData {
  event: string;
  time: string;
  duration?: number;
  description?: string;
  image?: string;
  [key: string]: unknown;
}

/**
 * Example of how to convert your current data format to new classes
 */
export function convertLegacyEvent(
  legacyData: LegacyEventData,
  category: ActCategory,
): ActType {
  return new ActType({
    id: `${category}-${legacyData.time}-${Date.now()}`,
    title: legacyData.event,
    category,
    type: inferEventType(legacyData, category),
    startTime: legacyData.time,
    duration: legacyData.duration || 30,
    description: legacyData.description,
    primaryImage:
      typeof legacyData.image === "string" ? legacyData.image : undefined,
  });
}

function inferEventType(
  data: LegacyEventData,
  category: ActCategory,
): EventType {
  if (category === ActCategory.PERFORMANCE) {
    return data.actType === "Live" ? EventType.LIVE_MUSIC : EventType.DJ_SET;
  } else if (category === ActCategory.WORKSHOP) {
    return EventType.DANCE_WORKSHOP;
  } else if (category === ActCategory.TALK) {
    return data.artist || data.record ? EventType.AVIATRIX : EventType.TALK;
  }
  return EventType.DJ_SET;
}

/**
 * Example usage and testing
 */
export function demonstrateNewSystem() {
  console.log("=== Berlin en Salsa - New Timeline System Demo ===");

  // Create timeline
  const timeline = createExampleTimeline();

  // Show column stats
  timeline.forEach((column, id) => {
    const summary = column.getSummary();
    console.log(`\n${column.title} (${id}):`);
    console.log(`  - ${summary.acts.length} acts scheduled`);
    console.log(
      `  - ${summary.occupiedSlots}/${summary.totalSlots} slots occupied`,
    );
    console.log(
      `  - ${((summary.occupiedSlots / summary.totalSlots) * 100).toFixed(1)}% utilization`,
    );
  });

  // Show multi-slot handling
  const liveAct = EXAMPLE_ACTS.ciempieLive;
  console.log(`\nMulti-slot example: ${liveAct.title}`);
  console.log(`  - Occupies slots: ${liveAct.getTimeSlots().join(", ")}`);
  console.log(`  - Duration: ${liveAct.duration} minutes`);
  console.log(`  - Has dance show: ${liveAct.hasDanceShow}`);

  // Show modal content generation
  const modalContent = liveAct.getModalContent();
  console.log(`\nModal content for ${liveAct.title}:`);
  console.log(`  - Type: ${modalContent.type}`);
  console.log(`  - Has show: ${modalContent.hasShow}`);
  console.log(`  - Dancers: ${modalContent.dancers}`);

  return timeline;
}

/**
 * NEW MAIN STAGE SATURDAY DATA
 *
 * Using the new event-based structure with proper type safety.
 * This demonstrates how much cleaner and more maintainable the data becomes.
 */

import { EventFactory } from "../../../utils/eventFactory";
import { TimetableEvent } from "../../../types/events";

/**
 * Main stage Saturday events using the new event structure
 */
export const mainStageSaturdayEvents: TimetableEvent[] = [
  // Rodo & El Profe DJ Set (12:30 - 13:30)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.rodoElProfe",
    startTime: "13:00",
    endTime: "13:30",
    area: "main-stage",
    performanceType: "dj-set",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "dj",
        bio: "Timetable.events.bios.rodoLeFou",
        image: "/rodo-le-fou.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.elProfe",
        role: "dj",
        bio: "Timetable.events.bios.elProfe",
        image: "/el-profe.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/rodo-le-fou.webp",
        caption: "Timetable.events.bios.rodoLeFou",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/el-profe.webp",
        caption: "Timetable.events.bios.elProfe",
      }),
    ],
  }),

  // EC Kuba DJ Set (13:30 - 14:30)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.ecKubaSet",
    startTime: "13:30",
    endTime: "14:30",
    area: "main-stage",
    performanceType: "dj-set",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.ecKuba",
        role: "dj",
        bio: "Timetable.events.bios.ecKuba",
        image: "/ec-kuba.webp",
      }),
    ],
    image: "/ec-kuba.webp",
  }),

  // Alafia con Ire Live Performance (15:00 - 16:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.alfiaConIre",
    startTime: "15:00",
    endTime: "16:00",
    area: "main-stage",
    performanceType: "live",
    day: "saturday",
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
    image: "/alafia-con-ire.webp",
    genre: "Afro-Cuban",
    // Dance show properties
    hasShow: true,
    danceShow: "Timetable.events.danceShows.afroCuban",
    dancers: "Timetable.events.dancers.leidianaRoger",
  }),

  // Andrelux Live Performance (16:00 - 17:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.andrelux",
    startTime: "16:00",
    endTime: "17:00",
    area: "main-stage",
    performanceType: "live",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.andrelux",
        role: "band",
        bio: "Timetable.events.bios.andrelux",
        image: "/andrelux.webp",
      }),
    ],
    image: "/andrelux.webp",
    genre: "Salsa",
  }),

  // DJ Feikes Set (17:00 - 18:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.djFeikes",
    startTime: "17:00",
    endTime: "18:00",
    area: "main-stage",
    performanceType: "dj-set",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.djFeikes",
        role: "dj",
        bio: "Timetable.events.bios.djFeikes",
        image: "/dj-feikes.webp",
      }),
    ],
    image: "/dj-feikes.webp",
  }),

  // Burundanga Live Performance (18:00 - 19:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.burundanga",
    startTime: "18:00",
    endTime: "19:00",
    area: "main-stage",
    performanceType: "live",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.burundanga",
        role: "band",
        bio: "Timetable.events.bios.burundanga",
        image: "/burundanga.webp",
      }),
    ],
    image: "/burundanga.webp",
    genre: "Salsa",
  }),

  // Tempo Havana Live Performance (19:00 - 20:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.tempoHavana",
    startTime: "19:00",
    endTime: "20:00",
    area: "main-stage",
    performanceType: "live",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.tempoHavana",
        role: "band",
        bio: "Timetable.events.bios.tempoHavana",
        image: "/tempo-havana.webp",
      }),
    ],
    image: "/tempo-havana.webp",
    genre: "Son Cubano",
  }),

  // DJ Bongo Set (20:00 - 21:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.djBongo",
    startTime: "20:00",
    endTime: "21:00",
    area: "main-stage",
    performanceType: "dj-set",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.djBongo",
        role: "dj",
        bio: "Timetable.events.bios.djBongo",
        image: "/dj-bongo.webp",
      }),
    ],
    image: "/dj-bongo.webp",
  }),

  // Cayeye Live Performance (21:00 - 22:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.cayeye",
    startTime: "21:00",
    endTime: "22:00",
    area: "main-stage",
    performanceType: "live",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.cayeye",
        role: "band",
        bio: "Timetable.events.bios.cayeye",
        image: "/cayeye.webp",
      }),
    ],
    image: "/cayeye.webp",
    genre: "Salsa",
  }),

  // DJ MC0LD Set (22:00 - 23:00)
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.djMc0ld",
    startTime: "22:00",
    endTime: "23:00",
    area: "main-stage",
    performanceType: "dj-set",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.djMc0ld",
        role: "dj",
        bio: "Timetable.events.bios.djMc0ld",
        image: "/dj-mc0ld.webp",
      }),
    ],
    image: "/dj-mc0ld.webp",
  }),
];

/**
 * Generate timeline slots for main stage Saturday
 * This function creates the fixed 30-minute timeline slots and places events in them
 */
export function generateMainStageTimelineSlots() {
  const timeSlots = [
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
    "22:00",
    "22:30",
    "23:00",
  ];

  return timeSlots.map((time) => ({
    time,
    events: mainStageSaturdayEvents.filter((event) => {
      // Check if this event starts at or spans through this time slot
      const eventStartMinutes = timeToMinutes(event.startTime);
      const eventEndMinutes = timeToMinutes(event.endTime);
      const slotMinutes = timeToMinutes(time);

      return slotMinutes >= eventStartMinutes && slotMinutes < eventEndMinutes;
    }),
  }));
}

/**
 * Helper function to convert time string to minutes for comparison
 */
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

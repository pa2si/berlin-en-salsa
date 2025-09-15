import { TranslatableTimeSlot } from "../../types/translatable.types";

/**
 * Main stage Saturday timetable using translation keys
 * This is the new format that supports internationalization
 */
export const mainStageSaturday: TranslatableTimeSlot[] = [
  {
    time: "12:30",
    event: "Timetable.events.mainStage.saturday.rodoElProfeSet",
    actType: "DJ Set",
    type: "main",
    slides: [
      {
        djName: "Timetable.events.artists.rodoLeFou",
        image: "/rodo-le-fou.webp",
        description: "Timetable.events.descriptions.rodoLeFou",
      },
      {
        djName: "Timetable.events.artists.elProfe",
        image: "/el-profe.webp",
        description: "Timetable.events.descriptions.elProfe",
      },
    ],
  },
  {
    time: "13:00",
    event: "Timetable.events.mainStage.saturday.rodoElProfeSet",
    actType: "DJ Set",
    type: "main",
  },
  {
    time: "13:30",
    event: "Timetable.events.mainStage.saturday.ecKubaSet",
    actType: "DJ Set",
    type: "main",
    image: "/ec-kuba.webp",
    description: "Timetable.events.descriptions.ecKuba",
  },
  {
    time: "14:00",
    event: "Timetable.events.mainStage.saturday.ecKubaSet",
    actType: "DJ Set",
    type: "main",
  },
  { time: "14:30" },
  {
    time: "15:00",
    event: "Timetable.events.mainStage.saturday.alafiaLive",
    actType: "Live",
    type: "main",
  },
  {
    time: "15:30",
    event: "Timetable.events.mainStage.saturday.alafiaLive",
    actType: "Live",
    type: "main",
    hasShow: true,
    danceShow: "Timetable.events.danceShows.afroCuban",
    dancers: "Timetable.events.dancers.leidianaRoger",
    slides: [
      {
        image: "/alafia-con-ire.webp",
        djName: "Timetable.events.artists.alafía", // Using djName for band name (reusing the field)
        description: "Timetable.events.descriptions.alafía",
      },
      {
        dancerOne: "Timetable.events.descriptions.leidiana",
        dancerTwo: "Timetable.events.descriptions.roger",
        image: "/leidiana-roger.webp",
        description: "Timetable.events.descriptions.leidianaRoger",
      },
    ],
  },
  {
    time: "16:00",
    event: "Timetable.events.mainStage.saturday.djFeikes",
    actType: "DJ Set",
    type: "main",
    image: "/dj-feikes.webp",
    description: "Timetable.events.descriptions.djFeikes",
  },
  {
    time: "16:30",
    event: "Timetable.events.mainStage.saturday.djFeikes",
    actType: "DJ Set",
    type: "main",
  },
  { time: "17:00" },
  {
    time: "17:30",
    event: "Timetable.events.mainStage.saturday.tempoHavanna",
    actType: "Live",
    type: "main",
  },
  {
    time: "18:00",
    event: "Timetable.events.mainStage.saturday.tempoHavanna",
    actType: "Live",
    type: "main",
    hasShow: true,
    danceShow: "Timetable.events.danceShows.sonCubano",
    dancers: "Timetable.events.dancers.helenYago",
    slides: [
      {
        image: "/tempo-havana.webp",
        djName: "Timetable.events.artists.tempoHavanna", // Using djName for band name
        description: "Timetable.events.descriptions.tempoHavanna",
      },
      {
        dancerOne: "Timetable.events.descriptions.helen",
        dancerTwo: "Timetable.events.descriptions.yago",
        image: "/yago-helen.webp",
        description: "Helen & Yago - Son Cubano Dance Show",
      },
    ],
  },
  {
    time: "18:30",
    event: "Timetable.events.mainStage.saturday.necios",
    actType: "DJ Set",
    type: "main",
    image: "/necios.webp",
    description: "Timetable.events.descriptions.necios",
  },
  {
    time: "19:00",
    event: "Timetable.events.mainStage.saturday.necios",
    actType: "DJ Set",
    type: "main",
  },
  { time: "19:30" },
  {
    time: "20:00",
    event: "Timetable.events.mainStage.saturday.laMelodica",
    actType: "Live",
    type: "main",
  },
  {
    time: "20:30",
    event: "Timetable.events.mainStage.saturday.laMelodica",
    actType: "Live",
    type: "main",
    hasShow: true,
    danceShow: "Timetable.events.danceShows.salsaCaleña",
    dancers: "Timetable.events.dancers.jessicaJulian",
    slides: [
      {
        image: "/la-melodica.webp",
        djName: "Timetable.events.artists.laMelodica", // Using djName for band name
        description: "Timetable.events.descriptions.laMelodica",
      },
      {
        dancerOne: "Timetable.events.descriptions.jessica",
        dancerTwo: "Timetable.events.descriptions.julian",
        image: "/jessi-julian.webp",
        description: "Jessica & Julian - Salsa Caleña Dance Show",
      },
    ],
  },
  {
    time: "21:00",
    event: "Timetable.events.mainStage.saturday.sacaSal",
    actType: "DJ Set",
    type: "main",
    djs: "Timetable.events.artists.calamidadesLola & Timetable.events.artists.amuletoManuela",
    slides: [
      {
        image: "/saca-sal.webp",
        description: "Timetable.events.descriptions.sacaSal",
        djOne: "Timetable.events.artists.calamidadesLola",
        djTwo: "Timetable.events.artists.amuletoManuela",
        djOneDescription: "Timetable.events.descriptions.calamidadesLola",
        djTwoDescription: "Timetable.events.descriptions.amuletoManuela",
      },
    ],
  },
  {
    time: "21:30",
    event: "Timetable.events.mainStage.saturday.sacaSal",
    actType: "DJ Set",
    type: "main",
    djs: "Timetable.events.artists.calamidadesLola & Timetable.events.artists.amuletoManuela",
  },
];

import { TranslatableTimeSlot } from "../../types/translatable.types";

/**
 * Main stage Saturday timetable using translation keys
 * This is the new format that supports internationalization
 */
export const mainStageSaturday: TranslatableTimeSlot[] = [
  {
    time: "12:30",
    event: "Timetable.events.mainStage.saturday.rodoElProfe",
    actType: "DJ Set",
    type: "main",
    slides: [
      {
        djName: "Timetable.events.artists.rodoLeFou",
        image: "/rodo-le-fou.webp",
        bio: "Timetable.events.bios.rodoLeFou",
      },
      {
        djName: "Timetable.events.artists.elProfe",
        image: "/el-profe.webp",
        bio: "Timetable.events.bios.elProfe",
      },
    ],
  },
  {
    time: "13:00",
    event: "Timetable.events.mainStage.saturday.rodoElProfe",
    actType: "DJ Set",
    type: "main",
  },
  {
    time: "13:30",
    event: "Timetable.events.mainStage.saturday.ecKubaSet",
    actType: "DJ Set",
    type: "main",
    image: "/ec-kuba.webp",
    bio: "Timetable.events.bios.ecKuba",
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
    event: "Timetable.events.mainStage.saturday.alfiaConIre",
    actType: "Live",
    type: "main",
  },
  {
    time: "15:30",
    event: "Timetable.events.mainStage.saturday.alfiaConIre",
    actType: "Live",
    type: "main",
    hasShow: true,
    danceShow: "Timetable.events.danceShows.afroCuban",
    dancers: "Timetable.events.dancers.leidianaRoger",
    slides: [
      {
        image: "/alafia-con-ire.webp",
        bandName: "Timetable.events.artists.alafiaConIre",
        description: "Timetable.events.descriptions.alafiaConIre",
      },
      {
        dancerOne: "Timetable.events.artists.leidiana",
        dancerTwo: "Timetable.events.artists.roger",
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
    bio: "Timetable.events.bios.djFeikes",
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
        bandName: "Timetable.events.artists.tempoHavanna", // Using bandName for band name
        description: "Timetable.events.descriptions.tempoHavanna",
      },
      {
        dancerOne: "Timetable.events.artists.helen",
        dancerTwo: "Timetable.events.artists.yago",
        dancerOneBio: "Timetable.events.bios.helen",
        dancerTwoBio: "Timetable.events.bios.yago",
        image: "/yago-helen.webp",
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
        bandName: "Timetable.events.artists.laMelodica", // Using bandName for band name
        description: "Timetable.events.descriptions.laMelodica",
      },
      {
        dancerOne: "Timetable.events.artists.jessica",
        dancerTwo: "Timetable.events.artists.julian",
        image: "/jessi-julian.webp",
        dancerOneBio: "Timetable.events.bios.jessica",
        dancerTwoBio: "Timetable.events.bios.julian",
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
        djOneBio: "Timetable.events.bios.calamidadesLola",
        djTwoBio: "Timetable.events.bios.amuletoManuela",
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

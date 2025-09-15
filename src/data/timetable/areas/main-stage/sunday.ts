import { TranslatableTimeSlot } from "../../types/translatable.types";

/**
 * Main stage Sunday timetable using translation keys
 * This is the new format that supports internationalization
 */
export const mainStageSunday: TranslatableTimeSlot[] = [
  {
    time: "12:30",
    event: "Timetable.events.mainStage.sunday.floriWilber",
    actType: "DJ Set",
    type: "main",
    description: "Timetable.events.descriptions.floriWilber",
    image: "/flori-wilber.webp",
  },
  {
    time: "13:00",
    event: "Timetable.events.mainStage.sunday.floriWilber",
    actType: "DJ Set",
    type: "main",
  },
  { time: "13:30" },
  {
    time: "14:00",
    event: "Timetable.events.mainStage.sunday.laSonoraBerlin",
    actType: "Live",
    type: "main",
  },
  {
    time: "14:30",
    event: "Timetable.events.mainStage.sunday.laSonoraBerlin",
    actType: "Live",
    type: "main",
    hasShow: true,
    danceShow: "Timetable.events.danceShows.nyOn2",
    dancers: "Timetable.events.dancers.niya",
    slides: [
      {
        image: "/sonora-berlin.webp",
        djName: "Timetable.events.artists.laSonoraBerlin", // Using djName for band name
        description: "Timetable.events.descriptions.laSonoraBerlin",
      },
      {
        image: "/niya.webp",
        djName: "Timetable.events.artists.niya", // Using djName for dancer name
        description: "Timetable.events.descriptions.niya",
      },
    ],
  },
  {
    time: "15:00",
    event: "Timetable.events.mainStage.sunday.elPuma",
    actType: "DJ Set",
    type: "main",
    description: "Timetable.events.descriptions.elPuma",
    image: "/el-puma.webp",
  },
  {
    time: "15:30",
    event: "Timetable.events.mainStage.sunday.elPuma",
    actType: "DJ Set",
    type: "main",
  },
  { time: "16:00" },
  {
    time: "16:30",
    event: "Timetable.events.mainStage.sunday.burundanga",
    actType: "Live",
    type: "main",
    description: "Timetable.events.descriptions.burundanga",
  },
  {
    time: "17:00",
    event: "Timetable.events.mainStage.sunday.burundanga",
    actType: "Live",
    type: "main",
    hasShow: true,
    danceShow: "Timetable.events.danceShows.casinoCubano",
    dancers: "Timetable.events.dancers.leiAyna",
    slides: [
      {
        image: "/burundanga.webp",
        djName: "Timetable.events.artists.burundanga", // Using djName for band name
        description: "Timetable.events.descriptions.burundanga",
      },
      {
        image: "/lei-ayna.webp",
        dancerOne: "Timetable.events.descriptions.lei",
        dancerTwo: "Timetable.events.descriptions.ayna",
        description: "Lei & Ayna - Casino Cubano Dance Show",
      },
    ],
  },
  {
    time: "17:30",
    event: "Timetable.events.mainStage.sunday.anacaonaLaVecina",
    actType: "DJ Set",
    type: "main",
    djs: "Timetable.events.artists.anacaona, Timetable.events.artists.laVecina",
    slides: [
      {
        djOne: "Timetable.events.artists.anacaona",
        djTwo: "Timetable.events.artists.laVecina",
        image: "/la-vecina-anacaona.webp",
        djOneDescription: "Timetable.events.descriptions.anacaona",
        djTwoDescription: "Timetable.events.descriptions.laVecina",
        description: "Timetable.events.descriptions.anacaonaLaVecina",
      },
    ],
  },
  {
    time: "18:00",
    event: "Timetable.events.mainStage.sunday.anacaonaLaVecina",
    actType: "DJ Set",
    type: "main",
    djs: "Timetable.events.artists.anacaona, Timetable.events.artists.laVecina",
  },
  { time: "18:30" },
  {
    time: "19:00",
    event: "Timetable.events.mainStage.sunday.cayeye",
    actType: "Live",
    type: "main",
    description: "Timetable.events.descriptions.cayeye",
    image: "/cayeye.webp",
  },
  {
    time: "19:30",
    event: "Timetable.events.mainStage.sunday.cayeye",
    actType: "Live",
    type: "main",
  },
  {
    time: "20:00",
    event: "Timetable.events.mainStage.sunday.bongo",
    actType: "DJ Set",
    type: "main",
    description: "Timetable.events.descriptions.bongo",
    image: "/dj-bongo.webp",
  },
  {
    time: "20:30",
    event: "Timetable.events.mainStage.sunday.bongo",
    actType: "DJ Set",
    type: "main",
  },
  {
    time: "21:00",
    event: "Timetable.events.mainStage.sunday.berlinEnSalsaHostDJs",
    actType: "DJ Set",
    type: "main",
    djs: "Timetable.events.artists.andrelux, Timetable.events.artists.dracaena, Timetable.events.artists.elVago, Timetable.events.artists.elMelomanoAleman",
    description: "Timetable.events.descriptions.berlinEnSalsaHostDJs",
    slides: [
      {
        djName: "Timetable.events.artists.dracaena",
        image: "/dracaena.webp",
        description: "Timetable.events.descriptions.dracaena",
      },
      {
        djName: "Timetable.events.artists.elVago",
        image: "/el-vago.webp",
        description: "Timetable.events.descriptions.elVago",
      },
      {
        djName: "Timetable.events.artists.elMelomanoAleman",
        image: "/el-melomano-aleman.webp",
        description: "Timetable.events.descriptions.elMelomanoAleman",
      },
      {
        djName: "Timetable.events.artists.andrelux",
        image: "/andrelux.webp",
        description: "Timetable.events.descriptions.andrelux",
      },
    ],
  },
  {
    time: "21:30",
    event: "Timetable.events.mainStage.sunday.berlinEnSalsaHostDJs",
    actType: "DJ Set",
    type: "main",
    djs: "Timetable.events.artists.andrelux, Timetable.events.artists.dracaena, Timetable.events.artists.elVago, Timetable.events.artists.elMelomanoAleman",
  },
];

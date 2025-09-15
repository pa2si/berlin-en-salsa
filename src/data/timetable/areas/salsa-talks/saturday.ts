import { TranslatableTimeSlot } from "../../types/translatable.types";

export const salsaTalksSaturday: TranslatableTimeSlot[] = [
  { time: "12:30" },
  { time: "13:00" },
  { time: "13:30" },
  {
    time: "14:00",
    event: "Timetable.events.salsaTalks.saturday.sarahBalzatTalk.title",
    type: "talk",
    actType: "talk",
    presenter: "Timetable.events.artists.sarahBalzat",
    description:
      "Timetable.events.salsaTalks.saturday.sarahBalzatTalk.description",
    image: "/sarah-balzat.jpeg",
  },
  {
    time: "14:30",
    event: "Timetable.events.salsaTalks.saturday.jessiVaneTalk.title",
    type: "talk",
    actType: "talk",
    presenter: "Timetable.events.artists.jessiVane",
    description:
      "Timetable.events.salsaTalks.saturday.jessiVaneTalk.description",
    slides: [
      {
        image: "/jessi.jpeg",
      },
      {
        image: "/vane.jpg",
      },
    ],
  },
  { time: "15:00" },
  { time: "15:30" },
  {
    time: "16:00",
    event: "Timetable.events.salsaTalks.saturday.aviatrixChristian.title",
    type: "talk",
    actType: "aviatrix",
    moderator: "Timetable.events.artists.rodoLeFou",
    guest: "Timetable.events.artists.djChristian",
    artist: "Timetable.events.salsaTalks.saturday.aviatrixChristian.artist",
    record: "Timetable.events.salsaTalks.saturday.aviatrixChristian.record",
    bio: "Timetable.events.salsaTalks.saturday.aviatrixChristian.bio",
    comment: "Timetable.events.salsaTalks.saturday.aviatrixChristian.comment",
    slides: [
      {
        image: "/eddie-palmieri.jpeg",
      },
      {
        image: "/christian.webp",
      },
    ],
  },
  {
    time: "16:30",
    event: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.title",
    type: "talk",
    actType: "aviatrix",
    moderator: "Timetable.events.artists.rodoLeFou",
    guest: "Timetable.events.artists.raicezKoncretaz",
    artist: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.artist",
    record: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.record",
    bio: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.bio",
    comment: "Timetable.events.salsaTalks.saturday.aviatrixRaicez.comment",
    slides: [
      {
        image: "/francisco-aguabella.webp",
      },
      {
        image: "/raicez-concretaz.webp",
      },
    ],
  },
  {
    time: "17:00",
    event: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.title",
    type: "talk",
    actType: "aviatrix",
    moderator: "Timetable.events.artists.rodoLeFou",
    guest: "Timetable.events.artists.djMc0ld",
    artist: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.artist",
    record: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.record",
    image: "/joe-arroyo.jpg",
    bio: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.bio",
    comment: "Timetable.events.salsaTalks.saturday.aviatrixMc0ld.comment",
    slides: [
      {
        image: "/joe-arroyo.jpg",
      },
      {
        image: "/dj-mc0ld.webp",
      },
    ],
  },
  { time: "17:30" },
  { time: "18:00" },
  {
    time: "18:30",
    event: "Timetable.events.salsaTalks.saturday.salsancoTalk.title",
    type: "talk",
    actType: "talk",
    moderator: "Timetable.events.artists.paulWelchGuerra",
    guest: "Timetable.events.salsaTalks.saturday.salsancoTalk.guests",
    description:
      "Timetable.events.salsaTalks.saturday.salsancoTalk.description",
    image: "/salsanco.webp",
  },
  { time: "19:00" },
  { time: "19:30" },
  { time: "20:00" },
  { time: "20:30" },
  { time: "21:00" },
  { time: "21:30" },
];

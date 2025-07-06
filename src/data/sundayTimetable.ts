import { Column } from "../types/timetable";

// Sunday timetable data
export const sundayTimetableData: Column[] = [
  {
    title: "Main Stage",
    slots: [
      {
        time: "12:30",
        event: "DJ SET: Bongo",
        type: "main",
        description:
          "Day 2 kicks off with DJ Salero bringing smooth Latin vibes and infectious rhythms to warm up the festival crowd.",
      },
      {
        time: "13:00",
        event: "DJ SET: Bongo",
        type: "main",
        description:
          "Day 2 kicks off with DJ Salero bringing smooth Latin vibes and infectious rhythms to warm up the festival crowd.",
      },
      { time: "13:30" },
      {
        time: "14:00",
        event: "Live: La Sonora Berlin",
        type: "main",
        description:
          "Experience the electrifying performance of Mercadonegro Berlin, a collective bringing authentic Afro-Latin sounds with their full orchestra setup.",
      },
      {
        time: "14:30",
        event: "Live: La Sonora Berlin",
        type: "main",
        description:
          "Experience the electrifying performance of Mercadonegro Berlin, a collective bringing authentic Afro-Latin sounds with their full orchestra setup.",
        hasShow: true,
        danceShow: "NY On 2 Dance Show",
      },
      {
        time: "15:00",
        event: "DJ SET: El Puma",
        type: "main",
        description:
          "DJ Yuri takes over the decks with his impressive collection of classic and contemporary salsa hits that showcase the diversity of the genre.",
      },
      {
        time: "15:30",
        event: "DJ SET: El Puma",
        type: "main",
        description:
          "DJ Yuri takes over the decks with his impressive collection of classic and contemporary salsa hits that showcase the diversity of the genre.",
      },
      { time: "16:00" },
      {
        time: "16:30",
        event: "Live: Burundanga",
        type: "main",
        description:
          "The internationally acclaimed Che Sudaka brings their powerful fusion of Latin rhythms, reggae, and punk energy to create an unforgettable festival moment.",
      },
      {
        time: "17:00",
        event: "Live: Burundanga",
        type: "main",
        description:
          "The internationally acclaimed Che Sudaka brings their powerful fusion of Latin rhythms, reggae, and punk energy to create an unforgettable festival moment.",
        hasShow: true,
        danceShow: "Casino Cubano Dance Show",
      },
      {
        time: "17:30",
        event: "DJ SET: Anacaona & La Vecina",
        type: "main",
        description:
          "The internationally acclaimed Che Sudaka brings their powerful fusion of Latin rhythms, reggae, and punk energy to create an unforgettable festival moment.",
      },
      {
        time: "18:00",
        event: "DJ SET: Anacaona & La Vecina",
        type: "main",
        description:
          "The internationally acclaimed Che Sudaka brings their powerful fusion of Latin rhythms, reggae, and punk energy to create an unforgettable festival moment.",
      },
      { time: "18:30" },
      {
        time: "19:00",
        event: "Live: Cayeye",
        type: "main",
        description:
          "The highlight of the festival - watch Berlin's top salsa performers showcase choreographed routines featuring various Latin dance styles in this spectacular performance.",
      },
      {
        time: "19:30",
        event: "Live: Cayeye",
        type: "main",
        description:
          "The highlight of the festival - watch Berlin's top salsa performers showcase choreographed routines featuring various Latin dance styles in this spectacular performance.",
      },
      {
        time: "20:00",
        event: "DJ SET: FLori % Wilber",
        type: "main",
        description:
          "Son Palenque delivers authentic Colombian champeta and Afro-Caribbean sounds with their dynamic percussion section and captivating vocals.",
      },
      {
        time: "20:30",
        event: "DJ SET: FLori % Wilber",
        type: "main",
        description:
          "Son Palenque delivers authentic Colombian champeta and Afro-Caribbean sounds with their dynamic percussion section and captivating vocals.",
      },
      {
        time: "21:00",
        event: "DJ Set: Berlin En Salsa Host DJs",
        type: "main",
        djs: "Andrelux, Dracaena, El Vago, El Melómano Alemán",
        description:
          "Join us for the festival finale as Berlin's finest DJs close out the weekend with a high-energy set of the best salsa, bachata, and Latin rhythms.",
      },
      {
        time: "21:30",
        event: "DJ Set: Berlin En Salsa Host DJs",
        type: "main",
        djs: "Andrelux, Dracaena, El Vago, El Melómano Alemán",
        image: "/el-melomano-aleman.webp",
        description:
          "Join us for the festival finale as Berlin's finest DJs close out the weekend with a high-energy set of the best salsa, bachata, and Latin rhythms.",
      },
      { time: "22:00" },
    ],
  },
  {
    title: "Dance Workshops",
    slots: [
      {
        time: "12:30",
        event: "New York On 2",
        instructor: "Niya",
        type: "workshop",
        description:
          "Explore the sensual style of bachata with Maria & Carlos. This workshop focuses on body movement, connection, and expressive techniques that characterize the modern sensual bachata style.",
      },
      {
        time: "13:00",
        event: "New York On 2",
        instructor: "Niya",
        type: "workshop",
        description:
          "Explore the sensual style of bachata with Maria & Carlos. This workshop focuses on body movement, connection, and expressive techniques that characterize the modern sensual bachata style.",
      },
      { time: "13:30" },
      {
        time: "14:00",
      },
      { time: "14:30" },

      {
        time: "15:00",
        event: "Casino Cubano",
        instructor: "Lei",
        type: "workshop",
        description:
          "Experience the distinctive style of Colombian salsa with Diana & Juan. This workshop focuses on the fast footwork, unique styling, and energetic movements characteristic of Cali-style salsa.",
      },
      {
        time: "15:30",
        event: "Casino Cubano",
        instructor: "Lei",
        type: "workshop",
        description:
          "Experience the distinctive style of Colombian salsa with Diana & Juan. This workshop focuses on the fast footwork, unique styling, and energetic movements characteristic of Cali-style salsa.",
      },
      { time: "16:30" },
      { time: "17:00" },
      { time: "17:30" },
      { time: "18:00" },
      { time: "18:30" },
      { time: "19:00" },
      { time: "19:30" },
      { time: "20:00" },
      { time: "20:30" },
      { time: "21:00" },
      { time: "21:30" },
      { time: "22:00" },
    ],
  },
  {
    title: "Music Workshops",
    slots: [
      { time: "12:30" },
      {
        time: "13:00",
        event: "La Campana",
        instructor: "Chucho Palma",
        type: "workshop",
        description:
          "Learn how to play the güiro, a traditional Latin American percussion instrument essential to salsa music. Linda will teach proper technique and rhythmic patterns for this distinctive scraper.",
      },
      {
        time: "13:30",
        event: "La Campana",
        instructor: "Chucho Palma",
        type: "workshop",
        description:
          "Learn how to play the güiro, a traditional Latin American percussion instrument essential to salsa music. Linda will teach proper technique and rhythmic patterns for this distinctive scraper.",
      },
      { time: "14:00" },
      {
        time: "14:30",
      },
      {
        time: "15:00",
      },
      {
        time: "15:30",
        event: "Soneo Workshop",
        instructor: "Harry Muñoz",
        type: "workshop",
        description:
          "Join vocalist Hardy Munoz for this interactive workshop on soneo (vocal improvisation) in salsa music. Learn techniques for creating and delivering improvised verses that respond to the chorus.",
      },
      {
        time: "16:00",
        event: "Soneo Workshop",
        instructor: "Harry Muñoz",
        type: "workshop",
        description:
          "Join vocalist Hardy Munoz for this interactive workshop on soneo (vocal improvisation) in salsa music. Learn techniques for creating and delivering improvised verses that respond to the chorus.",
      },
      { time: "16:30" },
      { time: "17:00" },
      { time: "17:30" },
      { time: "18:00" },
      { time: "18:30" },
      { time: "19:00" },
      { time: "19:30" },
      { time: "20:00" },
      { time: "20:30" },
      { time: "21:00" },
      { time: "21:30" },
      { time: "22:00" },
    ],
  },
  {
    title: "Salsa Talks",
    slots: [
      { time: "12:30" },
      { time: "13:00" },
      { time: "13:30" },
      { time: "14:00" },
      { time: "14:30" },
      {
        time: "15:00",
        event: "The Hustler (Willie colon/Hector lavoe)",
        presenter: "Suena Chelo",
        host: "Aviatrix",
        type: "talk",
        description:
          "Professor Martinez presents a comprehensive overview of salsa's rich history, from its origins in Cuba and Puerto Rico to its evolution and global influence across different regions and eras.",
      },
      {
        time: "15:30",
        event: "Cielo De Tambores (Grupo Niche)",
        presenter: "Dracaena",
        host: "Aviatrix",
        type: "talk",
        description:
          "Professor Martinez presents a comprehensive overview of salsa's rich history, from its origins in Cuba and Puerto Rico to its evolution and global influence across different regions and eras.",
      },
      {
        time: "16:00",
        event: "Me le fugue a la andela (Joe Arroyo)",
        presenter: "Enilce",
        host: "Aviatrix",
        type: "talk",
        description:
          "Professor Martinez presents a comprehensive overview of salsa's rich history, from its origins in Cuba and Puerto Rico to its evolution and global influence across different regions and eras.",
      },
      { time: "16:30" },
      {
        time: "17:00",
      },
      {
        time: "17:30",
        event: "No Le llamen salsa a mi son",
        presenter: "DJ Feikes, Christoph Twickel & Guests",
        host: "DJ Feikes, Christoph Twickel",
        type: "talk",
        description:
          "Professor Martinez presents a comprehensive overview of salsa's rich history, from its origins in Cuba and Puerto Rico to its evolution and global influence across different regions and eras.",
      },
      {
        time: "18:00",
        event: "No Le llamen salsa a mi son",
        presenter: "DJ Feikes, Christoph Twickel & Guests",
        host: "DJ Feikes, Christoph Twickel",
        type: "talk",
        description:
          "Professor Martinez presents a comprehensive overview of salsa's rich history, from its origins in Cuba and Puerto Rico to its evolution and global influence across different regions and eras.",
      },
      {
        time: "18:30",
        event: "No Le llamen salsa a mi son",
        presenter: "DJ Feikes, Christoph Twickel & Guests",
        host: "DJ Feikes, Christoph Twickel",
        type: "talk",
        description:
          "Professor Martinez presents a comprehensive overview of salsa's rich history, from its origins in Cuba and Puerto Rico to its evolution and global influence across different regions and eras.",
      },
      { time: "19:00" },
      { time: "19:30" },
      { time: "20:00" },
      { time: "20:30" },
      { time: "21:00" },
      { time: "21:30" },
      { time: "22:00" },
    ],
  },
];

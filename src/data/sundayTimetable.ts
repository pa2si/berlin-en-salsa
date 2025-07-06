import { Column } from "../types/timetable";

// Sunday timetable data
export const sundayTimetableData: Column[] = [
  {
    title: "Main Stage",
    slots: [
      {
        time: "12:30",
        event: "Bongo",
        actType: "DJ Set",
        type: "main",
        description:
          "Day 2 kicks off with DJ Salero bringing smooth Latin vibes and infectious rhythms to warm up the festival crowd.",
      },
      {
        time: "13:00",
        event: "Bongo",
        actType: "DJ Set",
        type: "main",
        description:
          "Day 2 kicks off with DJ Salero bringing smooth Latin vibes and infectious rhythms to warm up the festival crowd.",
      },
      { time: "13:30" },
      {
        time: "14:00",
        event: "La Sonora Berlin",
        actType: "Live",
        type: "main",
        description:
          "Experience the electrifying performance of Mercadonegro Berlin, a collective bringing authentic Afro-Latin sounds with their full orchestra setup.",
      },
      {
        time: "14:30",
        event: "La Sonora Berlin",
        actType: "Live",
        type: "main",
        description:
          "Experience the electrifying performance of Mercadonegro Berlin, a collective bringing authentic Afro-Latin sounds with their full orchestra setup.",
        hasShow: true,
        danceShow: "NY On 2 Dance Show",
      },
      {
        time: "15:00",
        event: "El Puma",
        actType: "DJ Set",
        type: "main",
        description:
          "DJ Yuri takes over the decks with his impressive collection of classic and contemporary salsa hits that showcase the diversity of the genre.",
      },
      {
        time: "15:30",
        event: "El Puma",
        actType: "DJ Set",
        type: "main",
        description:
          "DJ Yuri takes over the decks with his impressive collection of classic and contemporary salsa hits that showcase the diversity of the genre.",
      },
      { time: "16:00" },
      {
        time: "16:30",
        event: "Burundanga",
        actType: "Live",
        type: "main",
        description:
          "The internationally acclaimed Che Sudaka brings their powerful fusion of Latin rhythms, reggae, and punk energy to create an unforgettable festival moment.",
      },
      {
        time: "17:00",
        event: "Burundanga",
        actType: "Live",
        type: "main",
        description:
          "The internationally acclaimed Che Sudaka brings their powerful fusion of Latin rhythms, reggae, and punk energy to create an unforgettable festival moment.",
        hasShow: true,
        danceShow: "Casino Cubano Dance Show",
      },
      {
        time: "17:30",
        event: "Anacaona & La Vecina",
        actType: "DJ Set",
        type: "main",
        description:
          "The internationally acclaimed Che Sudaka brings their powerful fusion of Latin rhythms, reggae, and punk energy to create an unforgettable festival moment.",
      },
      {
        time: "18:00",
        event: "Anacaona & La Vecina",
        actType: "DJ Set",
        type: "main",
        description:
          "The internationally acclaimed Che Sudaka brings their powerful fusion of Latin rhythms, reggae, and punk energy to create an unforgettable festival moment.",
      },
      { time: "18:30" },
      {
        time: "19:00",
        event: "Cayeye",
        actType: "Live",
        type: "main",
        description:
          "The highlight of the festival - watch Berlin's top salsa performers showcase choreographed routines featuring various Latin dance styles in this spectacular performance.",
      },
      {
        time: "19:30",
        event: "Cayeye",
        actType: "Live",
        type: "main",
        description:
          "The highlight of the festival - watch Berlin's top salsa performers showcase choreographed routines featuring various Latin dance styles in this spectacular performance.",
      },
      {
        time: "20:00",
        event: "FLori % Wilber",
        actType: "DJ Set",
        type: "main",
        description:
          "Son Palenque delivers authentic Colombian champeta and Afro-Caribbean sounds with their dynamic percussion section and captivating vocals.",
      },
      {
        time: "20:30",
        event: "FLori % Wilber",
        actType: "DJ Set",
        type: "main",
        description:
          "Son Palenque delivers authentic Colombian champeta and Afro-Caribbean sounds with their dynamic percussion section and captivating vocals.",
      },
      {
        time: "21:00",
        event: "Berlin En Salsa Host DJs",
        actType: "DJ Set",
        type: "main",
        djs: "Andrelux, Dracaena, El Vago, El Melómano Alemán",
        description:
          "Join us for the festival finale as Berlin's finest DJs close out the weekend with a high-energy set of the best salsa, bachata, and Latin rhythms.",
        slides: [
          {
            djName: "Dracaena",
            image: "/dracaena.webp",
            description:
              "Dracaena es selectora y coleccionista de discos, nacida en Cali, Colombia y radicada en Berlín. Sus sets son enérgicos y envolventes, con un enfoque en potentes solos de percusión y piano, pensados tanto para bailar como para escuchar con atención. Su propuesta gira en torno a la salsa y los sonidos de la diáspora, especialmente ritmos afrocaribeños, afrolatinos y latinoamericanos. Es parte activa de la comunidad de coleccionistas en Berlín y del equipo organizador del Berlin en Salsa Festival. Dracaena también ha participado en charlas y paneles —entre ellos con DLD— compartiendo su experiencia como selectora y coleccionista en el cruce entre música, cultura e identidad.",
          },
          {
            djName: "El Vago",
            image: "/el-vago.webp",
            description:
              "El Vago es un DJ, coleccionista y gestor cultural radicado en Berlín. Desde hace varios años, es el co-host de La Regla Party, una de las fiestas más emblemáticas y queridas dentro de la escena latina de la ciudad. Actualmente coordina el Festival Berlín en Salsa.",
          },
          {
            djName: "El Melómano Alemán",
            image: "/el-melomano-aleman.webp",
            description:
              "Apasionado coleccionista de vinilos con un oído fino para los ritmos latinoamericanos, ha cultivado desde 2006 una profunda conexión con la cultura musical colombiana. La salsa, en especial, ha capturado su atención hasta convertirse en el eje central de su colección. El sonido clásico de los años 50 a los 70 hace hervir su sangre, décadas donde considera que reside la esencia pura y vibrante de esa magistral mezcla de géneros.",
          },
          {
            djName: "Andrelux",
            image: "/andrelux-dj.webp",
            description:
              "Andrelux brings a unique blend of classic salsa and contemporary Latin hits, creating an unmissable dance experience.",
          },
        ],
      },
      {
        time: "21:30",
        event: "Berlin En Salsa Host DJs",
        actType: "DJ Set",
        type: "main",
        djs: "Andrelux, Dracaena, El Vago, El Melómano Alemán",
        slides: [
          {
            djName: "Andrelux",
            image: "/andrelux-dj.webp",
            description:
              "Andrelux brings a unique blend of classic salsa and contemporary Latin hits, creating an unmissable dance experience.",
          },
          {
            djName: "Dracaena",
            image: "/dracaena-dj.webp",
            description:
              "Known for her infectious energy, Dracaena specializes in bachata and salsa fusion that keeps the dance floor packed.",
          },
          {
            djName: "El Vago",
            image: "/el-vago-dj.webp",
            description:
              "El Vago's signature selection ranges from timeless salsa classics to cutting-edge Latin beats, creating the perfect festival atmosphere.",
          },
          {
            djName: "El Melómano Alemán",
            image: "/el-melomano-aleman.webp",
            description:
              "The German music lover brings his passion for authentic Latin sounds, offering a carefully curated selection of dance floor favorites.",
          },
        ],
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
        event: "Me le fugué a la candela (Joe Arroyo)",
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

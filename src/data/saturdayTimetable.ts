import { Column } from "../types/timetable";

// Saturday timetable data
export const saturdayTimetableData: Column[] = [
  {
    title: "Main Stage",
    slots: [
      {
        time: "12:30",
        event: "DJ Set: Rodo Le Fou & El Profe",
        type: "main",
        description:
          "Get the festival started with Rodo and Raul's energetic mix of classic salsa hits and contemporary Latin beats.",
      },
      {
        time: "13:00",
        event: "DJ Set: Rodo Le Fou & El Profe",
        type: "main",
        description:
          "Get the festival started with Rodo and Raul's energetic mix of classic salsa hits and contemporary Latin beats.",
      },
      {
        time: "13:30",
        event: "DJ Set: EC Kuba DJ",
        type: "main",
        description:
          "EC Kuba DJ brings his unique selection of Cuban rhythms and tropical beats to warm up the crowd.",
      },
      {
        time: "14:00",
        event: "DJ Set: EC Kuba DJ",
        type: "main",
        description:
          "EC Kuba DJ brings his unique selection of Cuban rhythms and tropical beats to warm up the crowd.",
      },
      { time: "14:30" }, // Removed soundcheck
      {
        time: "15:00",
        event: "Alafía con Iré",
        type: "main",
        description:
          "Experience the powerful Afro-Cuban sounds of Alafía con Iré, bringing authentic rhythms and vibrant energy to the stage.",
      },
      {
        time: "15:30",
        event: "Alafía con Iré",
        type: "main",
        description:
          "Experience the powerful Afro-Cuban sounds of Alafía con Iré, bringing authentic rhythms and vibrant energy to the stage.",
        hasShow: true,
        danceShow: "TANZSHOW 1",
      },
      {
        time: "16:00",
        event: "DJ Set: DJ Feikes",
        type: "main",
        description:
          "DJ Feikes takes over the decks with a masterful selection of salsa, timba, and Latin beats to keep the party going.",
      },
      {
        time: "16:30",
        event: "DJ Set: DJ Feikes",
        type: "main",
        description:
          "DJ Feikes takes over the decks with a masterful selection of salsa, timba, and Latin beats to keep the party going.",
      },
      { time: "17:00" }, // Removed soundcheck
      {
        time: "17:30",
        event: "Tempo Havanna",
        type: "main",
        description:
          "Feel the rhythm of Tempo Havanna as they deliver authentic Cuban sounds with their vibrant percussion and soulful vocals.",
      },
      {
        time: "18:00",
        event: "Tempo Havanna",
        type: "main",
        description:
          "Feel the rhythm of Tempo Havanna as they deliver authentic Cuban sounds with their vibrant percussion and soulful vocals.",
        hasShow: true,
        danceShow: "TANZSHOW 2",
      },
      {
        time: "18:30",
        event: "DJ Set: Necios",
        type: "main",
        description:
          "Necios brings their unique blend of traditional salsa with modern influences, creating an irresistible sound that will have everyone dancing.",
      },
      {
        time: "19:00",
        event: "DJ Set: Necios",
        type: "main",
        description:
          "Necios brings their unique blend of traditional salsa with modern influences, creating an irresistible sound that will have everyone dancing.",
      },
      { time: "19:30" }, // Removed soundcheck
      {
        time: "20:00",
        event: "La Melodica",
        type: "main",
        description:
          "La Melodica delivers a powerful performance with their rich orchestral sound, blending classic salsa arrangements with contemporary influences.",
      },
      {
        time: "20:30",
        event: "La Melodica",
        type: "main",
        description:
          "La Melodica delivers a powerful performance with their rich orchestral sound, blending classic salsa arrangements with contemporary influences.",
        hasShow: true,
        danceShow: "TANZSHOW 3",
      },
      {
        time: "21:00",
        event: "DJ Set: Saca Sal",
        type: "main",
        djs: "Calamidades Lola & Amuleto Manuela",
        description:
          "Experience the unique sounds selected by Calamidades Lola & Amuleto Manuela as they close the night with an eclectic mix of Latin beats.",
      },
      {
        time: "21:30",
        event: "DJ Set: Saca Sal",
        type: "main",
        djs: "Calamidades Lola & Amuleto Manuela",
        description:
          "Experience the unique sounds selected by Calamidades Lola & Amuleto Manuela as they close the night with an eclectic mix of Latin beats.",
      },
      { time: "22:00" },
    ],
  },
  {
    title: "Dance Workshops",
    slots: [
      {
        time: "12:30",
        event: "N.Y. On2",
        instructor: "by Niya",
        type: "workshop",
        description:
          "Learn the fundamentals of New York style On2 salsa with instructor Niya. This workshop covers timing, footwork, and basic turn patterns suitable for beginners and intermediate dancers.",
      },
      { time: "13:00" },
      { time: "13:30" },
      { time: "14:00" },
      { time: "14:30" },
      {
        time: "15:00",
        event: "Casino Cubano",
        instructor: "by Lej",
        type: "workshop",
        description:
          "Dive into the rhythmic world of Cuban-style salsa casino with Lej. This workshop focuses on circular movements, partner work, and the improvisational aspects that make Cuban salsa unique.",
      },
      { time: "15:30" },
      { time: "16:00" },
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
      {
        time: "12:30",
        event: "Campana Workshop",
        instructor: "Chucho",
        type: "workshop",
        description:
          "Master the art of campana (bell pattern) rhythms essential to Afro-Cuban music with percussionist Chucho. Perfect for musicians and dancers wanting to deepen their understanding of salsa's rhythmic foundation.",
      },
      { time: "13:00" },
      { time: "13:30" },
      { time: "14:00" },
      { time: "14:30" },
      {
        time: "15:00",
        event: "Soneo Workshop",
        instructor: "Hardy Munoz",
        type: "workshop",
        description:
          "Join vocalist Hardy Munoz for this interactive workshop on soneo (vocal improvisation) in salsa music. Learn techniques for creating and delivering improvised verses that respond to the chorus.",
      },
      { time: "15:30" },
      { time: "16:00" },
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
        event: "Aviatrix Listening Session",
        type: "talk",
        description:
          "Join us for a guided listening experience featuring rare salsa recordings, with in-depth discussion of the musical elements, historical context, and cultural significance.",
      },
      {
        time: "15:30",
        event: "Aviatrix Listening Session2",
        type: "talk",
        description:
          "Part 2 of our guided listening experience continues with analysis of classic arrangements and the evolution of the salsa sound through different eras.",
      },
      {
        time: "16:00",
        event: "Aviatrix Listening Session3",
        type: "talk",
        description:
          "The final segment of our listening session explores contemporary salsa innovations and fusion genres that are shaping the future of Latin music.",
      },
      { time: "16:30" },
      { time: "17:00" },
      {
        time: "17:30",
        event: "Jorg",
        type: "talk",
        description:
          "Join salsa historian Jorg for an engaging talk on the evolution of salsa music from its roots in Cuba and Puerto Rico to its global impact today.",
      },
      {
        time: "18:00",
        event: "Jorg",
        type: "talk",
        description:
          "Join salsa historian Jorg for an engaging talk on the evolution of salsa music from its roots in Cuba and Puerto Rico to its global impact today.",
      },
      {
        time: "18:30",
        event: "Jorg",
        type: "talk",
        description:
          "Join salsa historian Jorg for an engaging talk on the evolution of salsa music from its roots in Cuba and Puerto Rico to its global impact today.",
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

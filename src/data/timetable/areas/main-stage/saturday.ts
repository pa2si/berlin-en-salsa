import { TimeSlot } from "../../types/event.types";

export const mainStageSaturday: TimeSlot[] = [
  {
    time: "12:30",
    event: "Rodo Le Fou & El Profe",
    actType: "DJ Set",
    type: "main",
    slides: [
      {
        djName: "Rodo Le Fou",
        image: "/rodo-le-fou.webp",
        description:
          "DJ y coleccionista de discos amante de la música tropical. Es cofundador del colectivo La Noche y de las Aviatrix Listening Sessions, así como miembro del grupo de salsa Cayeye y del grupo de punk Severo Esfínter.",
      },
      {
        djName: "El Profe",
        image: "/el-profe.webp",
        description: `El Profe es el alias de Raúl Payares, un selector afrocolombiano radicado en Berlín. Apasionado por los vinilos, Raúl lleva más de cuatro años haciendo vibrar las pistas con sets cargados de Salsa Brava, Cumbia tradicional, Ritmos del Caribe, Vallenato clásico y joyas africanas de los 60, 70 y 80. Originario de Cartagena, Colombia, y criado entre tambores, acordeones y Picos. El Profe combina su herencia afro con una curaduría musical profunda, bailable y siempre honesta. Es el creador de fiestas como "LA NOCHE" and "It's a SALSA BRAVA Thing, eventos que han sacudido la escena alternativa en Berlín, ofreciendo espacios donde la música de raíz afro-latina se celebra en su forma más pura: en vinilo y con corazón. Cada set es una experiencia que va más allá del baile: es un viaje sonoro que conecta culturas, cuerpos y memorias.`,
      },
    ],
  },
  {
    time: "13:00",
    event: "Rodo Le Fou & El Profe",
    actType: "DJ Set",
    type: "main",
  },
  {
    time: "13:30",
    event: "EC Kuba DJ",
    actType: "DJ Set",
    type: "main",
    image: "/ec-kuba.webp",
    description:
      "Nacido en la cuidad donde se creó la rumba Ciudad de Matanzas Cuba. Reside en Berlín ya hace varios años y dando a conocer lo mejor de la música cubana en diferentes eventos y festivales como festival Berlín fiesta Elegante, Bérgamo en Salsa Italia , Berlín Salsa congresos ,entre otros y sociales como Soda Club Berlin .Amante de la música De su tierra y siempre interesado por otra culturas musicalmente. Berlín en Salsa preparó un set de Timba, Salsa y Son Cubano.",
  },
  {
    time: "14:00",
    event: "EC Kuba DJ",
    actType: "DJ Set",
    type: "main",
  },
  { time: "14:30" },
  {
    time: "15:00",
    event: "Alafía con Iré",
    actType: "Live",
    type: "main",
  },
  {
    time: "15:30",
    event: "Alafía con Iré",
    actType: "Live",
    type: "main",
    hasShow: true,
    danceShow: "Afro-Cuban Dance Show",
    dancers: "Leidiana & Roger, Laura & Kimberly",
    slides: [
      {
        image: "/alafia-con-ire.webp",
        bandName: "Alafía con Iré",
        description:
          "En el año 2004, jóvenes músicos en La Habana fundaron la banda Alafia con Iré movidos por su gran pasión por la música y el deseo de interpretar por sí mismos la diversa música de su país natal. Con Rasiel Almanza Cairo, esta idea llegó en 2022 a Berlín, donde el proyecto fue revivido con una formación mayormente nueva. Alafia con Iré interpreta, entre otros estilos, música afrocubana —especialmente rumba—, además de composiciones propias. El nombre de la banda proviene de la religión afrocubana Regla de Ocha. Alafia significa en yoruba bienestar y paz interior, mientras que Iré representa un refuerzo adicional de ese deseo positivo.",
      },
      {
        dancerOne: "Leidiana",
        dancerTwo: "Roger",
        image: "/leidiana-roger.webp",
        description:
          "Roger y Leidiana son un dúo de bailarines cubanos reconocidos por fusionar la tradición con la modernidad en cada presentación. Su estilo único combina la fuerza del movimiento urbano, la elegancia de la danza tradicional cubana y la profundidad expresiva del afro-contemporáneo.",
      },
    ],
  },
  {
    time: "16:00",
    event: "DJ Feikes",
    actType: "DJ Set",
    type: "main",
    image: "/dj-feikes.webp",
    description: `DJ Feikes lleva más de 35 años recorriendo el Caribe con los oídos siempre atentos. Y tras cada viaje, le acompaña el mismo dilema: ¿cómo meter todos esos discos en el avión y traerlos sanos y salvos hasta Berlín? Cada primer miércoles de mes, DJ Feikes y su compañero DJ Christian presentan su "Salsa Café" en el Club «wilder als erwartet», frente al Nordbahnhof. Estos dos apasionados de la música ofrecen a su público una exquisita selección de su extensa colección de discos: desde los clásicos cubanos de los años 50 —con mambo, danzón y charanga—, pasando por la enérgica "salsa callejera" del Nueva York de los 60, la poderosa "salsa brava" orquestada de los 70, la salsa más melódica de los 80, hasta llegar a los sonidos románticos de los 90. Además, también suenan otros ritmos afrocaribeños como la cumbia colombiana, el merengue dominicano o incluso la salsa africana con raíces cubanas. Lo esencial: ¡que la música te conquiste y se sienta el swing!`,
  },
  {
    time: "16:30",
    event: "DJ Feikes",
    actType: "DJ Set",
    type: "main",
  },
  { time: "17:00" },
  {
    time: "17:30",
    event: "Tempo Havanna",
    actType: "Live",
    type: "main",
  },
  {
    time: "18:00",
    event: "Tempo Havanna",
    actType: "Live",
    type: "main",
    hasShow: true,
    danceShow: "Son Cubano Dance Show",
    dancers: "Helen & Yago",
    slides: [
      {
        image: "/tempo-havana.webp",
        bandName: "Tempo Havanna",
        description:
          "Tempo Havanna hace resonar el alma musical de Cuba, plasmada en apasionantes composiciones propias, modernas y con un estilo urbano-cubano. Ritmos latinoamericanos, desde la salsa y el son hasta el bolero y el cha cha chá, traen consigo el encanto de La Habana en el equipaje y sacian el anhelo de ligereza caribeña, pasión y alegría de vivir.",
      },
      {
        image: "/yago-helen.webp",
        dancerOne: "Helen",
        dancerTwo: "Yago",
        dancerOneDescription:
          'Helen ha estado enseñando en Berlín durante más de cinco años, especializándose en Rueda de Casino. Su pasión por la cultura y la danza cubanas enriquece enormemente sus excepcionales habilidades como profesora y bailarina. La rumba también ocupa un lugar especial en su corazón, ya que le permite expresarse libremente de una manera elegante y femenina que celebra la feminidad. Helen es una firme defensora de empoderar a sus estudiantes para que valoren y disfruten el baile como una experiencia compartida entre parejas, donde tanto líderes como seguidores contribuyen por igual. Sigue desarrollando principios específicos de "seguimiento activo" para promover la idea de que los seguidores merecen el mismo reconocimiento dentro de la comunidad de baile en Berlín. Su estilo ha sido influenciado principalmente por Sofía de Endaya, Sassan AliValiollahi y Luis Duarte.',
        dancerTwoDescription:
          "Yago es conocido por su estilo espontáneo e improvisado en la pista de baile. Para él, es muy importante ser un líder preciso y considerado, con el fin de ofrecer a su pareja una buena experiencia de baile. Gracias a su formación en ciencias del deporte, Yago brinda explicaciones claras y enfocadas, identificando rápidamente limitaciones físicas para ofrecer correcciones efectivas. Enseña con mucha pasión y cree que el baile es la purificación suprema del alma. Según él, cuando una persona está completamente inmersa en la música y el baile, alcanza el estado más alto de presencia. Yago ha desarrollado sus habilidades bajo la tutela de reconocidos instructores internacionales como Cristian Mauricio, Luis Duarte y Leiván García, director del Conjunto Folklórico Nacional.",
      },
    ],
  },
  {
    time: "18:30",
    event: "Necios",
    actType: "DJ Set",
    type: "main",
    image: "/necios.webp",
    description: `Emergiendo de las profundidades de noches llenas de ritmos de cumbia y 'baldosas de salsa', un profundo amor por la música transformó a tres amigos en NECIOS. Originalmente de Colombia y Ecuador, este colectivo de SELECTORES SONOROS, con sede en Berlín, ha dado vida a un viaje impulsado por vinilos y agujas. Su colección es una fusión fascinante de sonidos que abarca la amplitud y longitud de América Latina, explorando sus raíces más profundas y nuevos horizontes electrónicos. 'Necio' o 'Necia' es alguien testarudo, que va hasta las últimas consecuencias por lo que realmente cree. ¡Aunque eso signifique no seguir las reglas!`,
  },
  {
    time: "19:00",
    event: "Necios",
    actType: "DJ Set",
    type: "main",
  },
  { time: "19:30" },
  {
    time: "20:00",
    event: "La Melodica",
    actType: "Live",
    type: "main",
  },
  {
    time: "20:30",
    event: "La Melodica",
    actType: "Live",
    type: "main",
    hasShow: true,
    danceShow: "Salsa Caleña Dance Show",
    dancers: "Jessica & Julian",
    slides: [
      {
        image: "/la-melodica.webp",
        bandName: "La Melodica",
        description:
          "¡La Melodica – Salsa Dura sin compromisos! Diez músicos de primer nivel, un ritmo arrollador y pura energía: La Melodica representa la Salsa Dura en su forma más potente. Bajo la dirección del pianista Jonatan Morgenstern, la banda lleva a escena un sonido explosivo, con metales contundentes, percusiones virtuosas y una voz que arrastra al público al baile.",
      },
      {
        image: "/jessi-julian.webp",
        dancerOne: "Jessica",
        dancerTwo: "Julian",
        dancerOneDescription:
          "Jessica es de Cali, Colombia, y lleva más de 10 años bailando salsa caleña de forma profesional y social. En Berlín lleva la esencia de la salsa más allá del aula: no solo enseña, sino que también expone y comparte la salsa caleña como una expresión cultural viva, tal como se vive en Cali. Ha tenido la oportunidad de participar abriendo los conciertos del Grupo Niche y Gilberto Santa Rosa en Berlín, dar clases de salsa caleña en el Congreso de Salsa de Berlín y formar parte del equipo organizador del evento Berlin en Salsa.",
        dancerTwoDescription:
          "Julián es un apasionado bailarín e instructor de salsa caleña con más de seis años de experiencia y más de tres años enseñando en Berlín. Ha participado en numerosos festivales y eventos en toda Alemania. Originario de Colombia, enseña en la academia Dolce Vita Dance Studio, enfocándose en el trabajo de pies rápido y la técnica de guía y seguimiento. Más que solo pasos: sus clases se centran en la conexión, la intención y la musicalidad, siempre honrando y promoviendo los ritmos y la cultura de América Latina.",
      },
    ],
  },
  {
    time: "21:00",
    event: "Saca Sal",
    actType: "DJ Set",
    type: "main",
    djs: "Calamidades Lola & Amuleto Manuela",
    slides: [
      {
        image: "/saca-sal.webp",
        description:
          "Saca Sal es un ritual en forma de espacio sonoro que ocurre en la pista de baile cuando un colectivo de personas se reúne para danzar y dejarse llevar por los ecos y ritmos seleccionados por sus dos anfitrionas.",
        djOne: "Calamidades Lola",
        djTwo: "Amuleto Manuela",
        djOneDescription:
          "Calamidades Lola es una cazadora de discos y DJ/selector nacida y criada en Barranquilla, una ciudad en la costa caribeña de Colombia con una poderosa cultura fiestera, donde la música es un camino seguro hacia la alegría y la liberación. Radicada en Berlín, gran parte de su colección y selección musical está guiada por su experiencia migratoria.",
        djTwoDescription:
          "Amuleto Manuela es una artista sonora y DJ colombiana radicada en Berlín. En su trabajo basado en procesos (paisajes sonoros, esculturas sonoras, prácticas colectivas de escucha y programas de radio), la escucha es el principio y surge como una respuesta contextual a la búsqueda de espacios de encuentro. Aborda temas de diáspora e identidad con el deseo de desaprender y recordar otras formas de habitar nuestra experiencia colectiva de vida.",
      },
    ],
  },
  {
    time: "21:30",
    event: "Saca Sal",
    actType: "DJ Set",
    type: "main",
    djs: "Calamidades Lola & Amuleto Manuela",
  },
];

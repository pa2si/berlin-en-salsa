import { Column } from "../types/timetable";

// Saturday timetable data
export const saturdayTimetableData: Column[] = [
  {
    title: "Tarima Principal",
    slots: [
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
            description:
              "El Profe es el alias de Raúl Payares, un selector afrocolombiano radicado en Berlín. Apasionado por los vinilos, Raúl lleva más de cuatro años haciendo vibrar las pistas con sets cargados de Salsa Brava, Cumbia tradicional, Ritmos del Caribe, Vallenato clásico y joyas africanas de los 60, 70 y 80. Originario de Cartagena, Colombia, y criado entre tambores, acordeones y Picos. El Profe combina su herencia afro con una curaduría musical profunda, bailable y siempre honesta. Es el creador de fiestas como “LA NOCHE” and “It’s a SALSA BRAVA Thing, eventos que han sacudido la escena alternativa en Berlín, ofreciendo espacios donde la música de raíz afro-latina se celebra en su forma más pura: en vinilo y con corazón. Cada set es una experiencia que va más allá del baile: es un viaje sonoro que conecta culturas, cuerpos y memorias.",
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
        description:
          "Nacido en la cuidad donde se creó la rumba Ciudad de Matanzas Cuba. Reside en Berlín ya hace varios años y dando a conocer lo mejor de la música cubana en diferentes eventos y festivales como festival  Berlín fiesta Elegante, Bérgamo en Salsa Italia , Berlín Salsa congresos ,entre otros y sociales como Soda Club Berlin .Amante de la música De su tierra y siempre interesado por otra culturas musicalmente. Berlín en Salsa preparó un set de Timba, Salsa y Son Cubano.",
        image: "/ec-kuba.webp",
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
        description:
          "DJ Feikes lleva más de 35 años recorriendo el Caribe con los oídos siempre atentos. Y tras cada viaje, le acompaña el mismo dilema: ¿cómo meter todos esos discos en el avión y traerlos sanos y salvos hasta Berlín? Cada primer miércoles de mes, DJ Feikes y su compañero DJ Christian presentan su “Salsa Café” en el Club  «wilder als erwartet», frente al Nordbahnhof. Estos dos apasionados de la música ofrecen a su público una exquisita selección de su extensa colección de discos: desde los clásicos cubanos de los años 50 —con mambo, danzón y charanga—, pasando por la enérgica “salsa callejera” del Nueva York de los 60, la poderosa “salsa brava” orquestada de los 70, la salsa más melódica de los 80, hasta llegar a los sonidos románticos de los 90. Además, también suenan otros ritmos afrocaribeños como la cumbia colombiana, el merengue dominicano o incluso la salsa africana con raíces cubanas. Lo esencial: ¡que la música te conquiste y se sienta el swing!",
        image: "/dj-feikes.webp",
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
              "Helen ha estado enseñando en Berlín durante más de cinco años, especializándose en Rueda de Casino. Su pasión por la cultura y la danza cubanas enriquece enormemente sus excepcionales habilidades como profesora y bailarina. La rumba también ocupa un lugar especial en su corazón, ya que le permite expresarse libremente de una manera elegante y femenina que celebra la feminidad. Helen es una firme defensora de empoderar a sus estudiantes para que valoren y disfruten el baile como una experiencia compartida entre parejas, donde tanto líderes como seguidores contribuyen por igual. Sigue desarrollando principios específicos de “seguimiento activo” para promover la idea de que los seguidores merecen el mismo reconocimiento dentro de la comunidad de baile en Berlín. Su estilo ha sido influenciado principalmente por Sofía de Endaya, Sassan AliValiollahi y Luis Duarte.",
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
        description:
          "Emergiendo de las profundidades de noches llenas de ritmos de cumbia y 'baldosas de salsa', un profundo amor por la música transformó a tres amigos en NECIOS. Originalmente de Colombia y Ecuador, este colectivo de SELECTORES SONOROS, con sede en Berlín, ha dado vida a un viaje impulsado por vinilos y agujas. Su colección es una fusión fascinante de sonidos que abarca la amplitud y longitud de América Latina, explorando sus raíces más profundas y nuevos horizontes electrónicos. 'Necio' o 'Necia' es alguien testarudo, que va hasta las últimas consecuencias por lo que realmente cree. ¡Aunque eso signifique no seguir las reglas!",
        image: "/necios.webp",
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
    ],
  },
  {
    title: "Talleres de Baile",
    slots: [
      { time: "12:30" },
      {
        time: "13:00",
        event: "Afro-Cuban Dance",
        instructor: "Leidiana",
        image: "/leidiana.webp",
        type: "workshop",
        bio: "Leidiana viene de Cuba y ahora vive en Berlín — ¿y qué es lo que más le apasiona? ¡Bailar! Desde que era pequeña, la música y el movimiento forman parte de su vida cotidiana. Con su estilo único y la alegría de vivir que trae de su tierra natal, llena de luz cualquier lugar al que va. Para ella, bailar no es solo una profesión, sino una verdadera pasión",
        description:
          "El estilo afrocubano es raíz, cuerpo, conexión con la tierra. Nace de las tradiciones africanas traídas a Cuba, y su esencia vive en cada paso de rumba, cada movimiento del torso, cada gesto espiritual. Es la base rítmica y corporal sobre la que se construyen muchos estilos de salsa. Bailar afrocubano es honrar los orígenes.",
      },
      {
        time: "13:30",
        event: "Afro-Cuban Dance",
        instructor: "Leidiana",
        type: "workshop",
      },
      { time: "14:00" },
      { time: "14:30" },
      { time: "15:00" },
      { time: "15:30" },
      {
        time: "16:00",
        event: "Son Cubano",
        instructor: "Helen",
        instructorTwo: "Yago",
        image: "/yago-helen.webp",
        type: "workshop",
        bio: "Helen ha estado enseñando en Berlín durante más de cinco años, especializándose en Rueda de Casino. Su pasión por la cultura y la danza cubanas enriquece enormemente sus excepcionales habilidades como profesora y bailarina. La rumba también ocupa un lugar especial en su corazón, ya que le permite expresarse libremente de una manera elegante y femenina que celebra la feminidad. Helen es una firme defensora de empoderar a sus estudiantes para que valoren y disfruten el baile como una experiencia compartida entre parejas, donde tanto líderes como seguidores contribuyen por igual. Sigue desarrollando principios específicos de 'seguimiento activo' para promover la idea de que los seguidores merecen el mismo reconocimiento dentro de la comunidad de baile en Berlín. Su estilo ha sido influenciado principalmente por Sofia de Endaya, Sassan AliValiollahi y Luis Duarte.",
        bioTwo:
          "Yago es conocido por su estilo espontáneo e improvisado en la pista de baile. Para él, es muy importante ser un líder preciso y considerado, con el fin de ofrecer a su pareja una buena experiencia de baile. Gracias a su formación en ciencias del deporte, Yago brinda explicaciones claras y enfocadas, identificando rápidamente limitaciones físicas para ofrecer correcciones efectivas. Enseña con mucha pasión y cree que el baile es la purificación suprema del alma. Según él, cuando una persona está completamente inmersa en la música y el baile, alcanza el estado más alto de presencia. Yago ha desarrollado sus habilidades bajo la tutela de reconocidos instructores internacionales como Cristian Mauricio, Luis Duarte y Leiván García, director del Conjunto Folklórico Nacional.",
        description:
          "El son cubano es el corazón elegante de la salsa. Nació en los campos del oriente cubano, donde el tambor y la guitarra se encontraron para contar historias y compartir emociones. Con su paso básico suave y cadencioso, el Son dio estructura y sabor al baile que hoy conocemos como salsa. Sin son, no hay salsa.",
      },
      {
        time: "16:30",
        event: "Son Cubano",
        instructor: "Helen",
        instructorTwo: "Yago",
        type: "workshop",
      },
      { time: "17:00" },
      { time: "17:30" },
      { time: "18:00" },
      {
        time: "18:30",
        event: "Salsa Caleña",
        instructor: "Julian",
        image: "/julian.webp",
        type: "workshop",
        bio: "Apasionado bailarín e instructor de salsa caleña con más de seis años de experiencia y más de tres años enseñando en Berlín, Julian ha actuado en numerosos festivales y eventos en toda Alemania. Originario de Colombia, enseña en el estudio Dolce Vita Dance Studio, donde se enfoca en la rapidez del juego de pies y en la técnica de guía y seguimiento. Pero sus clases son mucho más que pasos: se centran en la conexión, la intención y la musicalidad, honrando y promoviendo los ritmos y la cultura de América Latina.",
        description:
          "Salsa, sabor y control - Desde la capital mundial de la salsa, Cali, Colombia. Este estilo se distingue por su velocidad y precisión en los pasos. Es un estilo dinámico, enfocado en el footwork, giros rápidos y continuos característicos del Cali Style. Cada paso celebra la identidad cultural de Cali. ¡Auténtica, poderosa y llena de vida!",
      },
      {
        time: "19:00",
        event: "Salsa Caleña",
        instructor: "Julian",
        type: "workshop",
      },
      { time: "19:30" },
      { time: "20:00" },
      { time: "20:30" },
      { time: "21:00" },
      { time: "21:30" },
    ],
  },
  {
    title: "Talleres de música",
    slots: [
      { time: "12:30" },
      {
        time: "13:00",
        event: "Introduction to Polyrhythm",
        instructor: "Angel Candeaux",
        type: "workshop",
        description:
          "¿Te has preguntado cómo varios ritmos pueden coexistir y crear una experiencia colectiva poderosa? Este taller, guiado por Angel Candeaux, es una invitación a descubrir la magia de la polirritmia afrocubana y su impacto en la conexión humana. La polirritmia es el arte de superponer varios ritmos independientes, logrando una riqueza sonora y una experiencia grupal única. En la tradición afrocubana, cada tambor mantiene su propio patrón, pero juntos crean un diálogo musical que invita a la escucha, la concentración y la creatividad colectiva. ¿Qué Vivirás en el Taller? - Exploración de tu ritmo interno: Aprende a mantener tu propio patrón mientras escuchas y dialogas con el grupo. - Conexión auténtica: Ejercicios de percusión grupal que fortalecen los lazos y la comunicación no verbal. - Equilibrio entre estructura y libertad: Descubre cómo seguir el pulso colectivo y, a la vez, atreverte a romper el patrón para expresar tu individualidad. - Momentos de comunión y expresión personal: Alterna entre el unísono grupal y la oportunidad de alzar tu propia voz rítmica. - Desarrollo de habilidades cognitivas y emocionales: Mejora la concentración, la coordinación y la apertura sensorial. ¿Por Qué Participar? - No necesitas experiencia previa, solo ganas de explorar y dejarte llevar por el ritmo. - Descubrirás herramientas para fortalecer la comunicación, la empatía y el trabajo en equipo. - Vivirás una experiencia transformadora que une cuerpo, mente y comunidad a través de la música. Angel Candeaux te invita a sumergirte en la polirritmia: un viaje donde cada latido cuenta y la suma de las diferencias crea armonía.",
        image: "/angel-candeaux.webp",
        bio: 'Angel Candeaux es un cubano de La Habana que lleva el ritmo en la sangre y la curiosidad en la cabeza. Psicólogo de formación y percusionista de corazón, ha recorrido espacios en Cuba, Europa y Estados Unidos mezclando tradición afrocubana con nuevas formas de conectar a las personas. Desde 2006 vive en Berlín, donde no solo toca tambores: crea espacios para que la gente se encuentre, se escuche y descubra su propio ritmo. Fundador del proyecto "desapalencao", Angel es de esos que creen que la música puede cambiarte el día (y la vida) y que todos tenemos un pulso único que aportar al grupo. ¿Te has preguntado cómo varios ritmos pueden coexistir y crear una experiencia colectiva poderosa? Este taller, guiado por Angel Candeaux, es una invitación a descubrir la magia de la polirritmia afrocubana y su impacto en la conexión humana. La polirritmia es el arte de superponer varios ritmos independientes, logrando una riqueza sonora y una experiencia grupal única. En la tradición afrocubana, cada tambor mantiene su propio patrón, pero juntos crean un diálogo musical que invita a la escucha, la concentración y la creatividad colectiva.',
      },
      {
        time: "13:30",
        event: "Introduction to Polyrhythm",
        instructor: "Angel Candeaux",
        type: "workshop",
      },
      {
        time: "14:00",
        event: "Ritmo de Clave",
        instructor: "Guillermo Diaz",
        type: "workshop",
        image: "/guillermo-diaz.webp",
        description:
          "La salsa como muchos otros géneros, se compone tanto de su instrumentación e interpretación, como también de la escucha y el baile. Para interpretarla, es primordial la comprensión de la clave, ya que toda su instrumentación gira en torno a ésta. Siendo la clave el adn de la salsa y de muchos otros géneros con fuerte origen africano, es un recurso casi imprescindible pero ante todo muy útil para comprenderla en cualquier nivel y forma de interacción con el género. En este taller, nos sumergiremos brevemente en el secreto mejor guardado de la salsa: la clave. El objetivo del taller es ofrecer un entendimiento básico pero esencial, para poder tocar, bailar y escuchar esta música que tanto amamos desde un lugar mucho más familiar y cercano. El taller es tanto para principiantes como para aquellxs que no tienen formación musical. Se recomienda traer cualquier instrumento de percusión, desde tambores, claves y campanas, hasta tazas, sartenes y cucharas de palo.",
      },
      {
        time: "14:30",
        event: "Ritmo de Clave",
        instructor: "Guillermo Diaz",
        type: "workshop",
      },
      { time: "15:00" },
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
    ],
  },
  {
    title: "Charlas Salseras",
    slots: [
      { time: "12:30" },
      { time: "13:00" },
      { time: "13:30" },
      {
        time: "14:00",
        event:
          "Fusionando historias: El estilo personal como diálogo entre la tradición y el yo. ",
        type: "talk",
        presenter: "Sarah Balzat",
        image: "/sarah-balzat.jpeg",
        description:
          "El estilo personal en la danza no se inventa de la nada, nace en el cruce entre la historia propia y la colectiva. A través del lente de la salsa, reflexionaremos sobre cómo la tradición no es algo estático que se conserva, sino un diálogo vivo entre quienes nos precedieron y las historias que llevamos dentro. Lo que surge de este encuentro no es imitación, sino autenticidad: un estilo propio, enraizado en la conciencia, moldeado por la práctica y lleno de memoria.",
      },
      {
        time: "14:30",
        event:
          "¿Estilo musical o estilo de baile? ¡Ambos y ninguno! Una reflexión sobre las categorías rígidas en la salsa",
        type: "talk",
        presenter: "Jessi y Vane",
        image: "/jessi.jpeg",
        imageTwo: "/vane.jpg",
        description:
          '¿Bailas salsa en línea o cubana? ¿Prefieres la timba, la salsa dura o el bugalú? En el mundo salsero, los "estilos" parecen decirlo todo: cómo bailamos, qué música escuchamos, incluso con quién nos sentimos parte. Pero… ¿y si estas categorías más que guiar, nos limitan? En esta charla abrimos el debate: ¿cuánto de nuestro baile responde a la música, cuánto a la técnica y cuánto a la identidad? ¿Es posible moverse entre estilos sin perder autenticidad? Una invitación a cuestionar esas ideas fijas sobre los estilos de baile ligados a estilos de música concretos.',
      },
      {
        time: "15:00",
      },
      {
        time: "15:30",
      },
      {
        time: "16:00",
        event: "Aviatrix & DJ Christian",
        presenter: "DJ Christian",
        host: "Aviatrix",
        type: "talk",
        image: "/eddie-palmieri.jpeg",
        imageTwo: "/christian.webp",
        artist: "Eddie Palmieri",
        record: "Echando Pa’lante (Straight Ahead)",
        bio: "DJ Christian ist Mitbegründer von @salsacafeberlin, wo er gemeinsam mit @hijodesiboney jeden ersten Mittwoch im Monat die Tanzfläche zum Beben bringt. Seine Liebe zu den lateinamerikanischen Rhythmen entspringt seiner engen Verbindung zur Latinx-Community in Berlin. Dort engagiert er sich aktiv in Initiativen und Räumen der lateinamerikanischen Diaspora – inspiriert von seiner interkulturellen Familiengeschichte. Obwohl er alle Musikrichtungen schätzt, fühlt er sich besonders zur Musik mit afrikanischen Wurzeln hingezogen – deren Spuren sich in fast jedem Genre wiederfinden lassen.",
        comment:
          "Ich habe das Album „Echando Pa’lante (Straight Ahead)“ ausgewählt, weil es ein bedeutendes Werk in der Geschichte der Salsa ist und den innovativen Stil von Eddie Palmieri sowie das Talent seiner Band zeigt. Veröffentlicht im Jahr 1964, wird das Album für seine kraftvollen Rhythmen, komplexen Arrangements und den unverwechselbaren Klang der sogenannten „Trombanga“ gefeiert – einer Besetzung, die Posaunen in die traditionelle lateinamerikanische Musik einführte.",
      },
      {
        time: "16:30",
        event: "Aviatrix & Raicez Koncretaz",
        presenter: "Raicez Koncretaz",
        type: "talk",
        host: "Aviatrix",
        image: "/francisco-aguabella.webp",
        imageTwo: "/raicez-concretaz.webp",
        artist: "Francisco Aguabella",
        record: "Hitting Hard",
        bio: "Es un colectivo de Crate Diggers y tornamesistas de Colombia que tienen cómo objetivo no dejar morir el formato análogo y mantenerlo vivo.",
        comment:
          "Se escogió este disco por la gran variedad de Ritmos que pueden Converger en una producción músical y que La salsa así como muchos géneros tiene muchas influencias de otros géneros musicales",
      },
      {
        time: "17:00",
        event: "Aviatrix & DJ Mc0ld",
        presenter: "DJ Mc0ld",
        type: "talk",
        host: "Aviatrix",
        image: "/frankie-dante.jpg",
        imageTwo: "/dj-Mc0ld.webp",
        artist: "Frankie Dante & Orquesta Flamboyán con Larry Harlow",
        record: "Frankie Dante & Orquesta Flamboyan Con Larry Harlow",
        bio: "Soy DJ Mc0ld, parte de Son Obrero. Nací en el norte de Cali, criado entre los vinilos de mi padre y el punk rock de la calle. Después de un tiempo viviendo en Alemania, empecé a reconectar con mi barrio y mis raíces. Ahí entendí algo que no sabía: Lo profundo que estaba la salsa en mi. Desde entonces he estado explorando las movidas bailables de la Latinoamérica underground. Mi set en vinilo es Salsa ortodoxa. También toco en digital pero eso es otro viaje.",
        comment:
          "Escogí el disco Frankie Dante & Orquesta Flamboyán con Larry Harlow porque representa una fusión única: la magia musical de Harlow con la crudeza y rebeldía de Frankie Dante, un salsero que no se doblegó. Sus convicciones políticas le cerraron puertas, pero su coraje y talento abrieron otras. Ese espíritu rebelde y honesto resuena con lo que soy y lo que busco compartir en cada mezcla",
      },
      { time: "17:30" },

      { time: "18:00" },

      {
        time: "18:30",
        event: "Salsancó y los comienzos de la salsa en Berlín",
        presenter: "tba",
        image: "/salsanco.webp",
        type: "talk",
        description:
          "Eduardo Villegas y Rolo Rodriguez cuentan cómo en 1977 nació la primera orquesta de salsa en Berlín. Inspirados por Santana y Palmieri, formaron un proyecto propio junto a músicos de las big bands del RIAS y el SFB. Relatan cómo fueron los ensayos, las primeras presentaciones y el sonido que marcó los clubes berlineses. Una conversación sobre trabajo pionero y escena musical vivida.",
      },
      {
        time: "19:00",
        event:
          "Transbarrio dialogues: Las raices afroestadounidenses de la salsa",
        presenter: "Matti Steinitz",
        image: "/matti.webp",
        type: "talk",
        bio: "DJ Matatu aka Dr. Matti Steinitz es coleccionista de vinilos e investigador de los sonidos y movimientos de la diáspora africana en las Américas. Recién salió su libro sobre los diálogos transnacionales entre comunidades afroestadounidenses y afrolatinoamericanos en la época de los 1960 y 1970 y como éstas se han manifestado en el surgimiento de escenas de Afro-Latin Soul en zonas de contacto como Nueva York, Panamá y Rio de Janeiro. (https://www.degruyterbrill.com/document/doi/10.1515/9783110665550/html)",
      },

      { time: "19:30" },
      { time: "20:00" },
      { time: "20:30" },
      { time: "21:00" },
      { time: "21:30" },
    ],
  },
];

import { Column } from "../types/timetable";

// Sunday timetable data
export const sundayTimetableData: Column[] = [
  {
    title: "Tarima Principal",
    slots: [
      {
        time: "12:30",
        event: "FLori % Wilber",
        actType: "DJ Set",
        type: "main",
        description:
          "DJ Flori y DJ Wilber son dos hermanos peruanos que hacen vibrar la escena salsera de Berlín. Crecieron con los sonidos clásicos de La Fania y La Sonora Matancera, y hoy hacen bailar al público con Mambo, Cha-Cha-Cha y Salsa al estilo 70' de New York. En Berlín, su hogar musical, unen a salseros de todo el mundo bajo un mismo ritmo. Han puesto a bailar a miles en fiestas legendarias como Tu Candela, Mi Salsa y Zuckerbrot. ¡Donde pinchan Flori y Wilber, la pista se enciende con sabor de guaguanco!",
        image: "/flori-wilber.webp",
      },
      {
        time: "12:00",
        event: "FLori % Wilber",
        actType: "DJ Set",
        type: "main",
      },
      { time: "13:30" },
      {
        time: "14:00",
        event: "La Sonora Berlin",
        actType: "Live",
        type: "main",
      },
      {
        time: "14:30",
        event: "La Sonora Berlin",
        actType: "Live",
        type: "main",
        hasShow: true,
        danceShow: "NY On 2 Dance Show",
        dancers: "Niya",
        slides: [
          {
            image: "/sonora-berlin.webp",
            bandName: "Sonora Berlin",
            description:
              "Sonora Berlín es una orquesta de salsa de once integrantes con sede en Berlín, formada por músicos de distintos países unidos por una misma pasión: la música salsa. Su repertorio combina clásicos conocidos del género con composiciones propias: poderosas, bailables y llenas de alegría interpretativa. La banda existe desde 2023 y se caracteriza por su enérgica presencia escénica y su precisión musical. Sus presentaciones crean una atmósfera vibrante que entusiasma tanto a bailarines como a amantes de la música. Sonora Berlín ya ha actuado en escenarios y eventos de renombre, entre ellos: – el 75º aniversario del Parlamento Alemán en el marco del Festival por la Democracia – la Volksbühne Berlin (Grüner Salon) – el Hotel nHow – el centro comercial Bikini Berlin – y numerosas noches de club y eventos al aire libre Con su música, Sonora Berlín lleva el poder rítmico y la alegría de la salsa a cualquier escenario: ya sea en festivales, eventos culturales o celebraciones privadas. Más impresiones: https://www.youtube.com/watch?v=o4Evwcrc1vA https://www.instagram.com/sonora_berlin/",
          },
          {
            image: "/niya.webp",
            dancerName: "Niya",
            description:
              "Soy Niya, nacida en Sofía, Bulgaria, donde comenzó mi camino en la danza con ballet, danza moderna y hip hop. Más adelante descubrí mi gran pasión: la salsa, y en especial el mambo. Como miembro de un equipo de salsa, tuve la oportunidad de representar a Bulgaria en festivales internacionales y adquirir valiosa experiencia en salsa, bachata y cha cha cha. Desde 2023 doy clases en Berlín. En mis clases me enfoco en la coordinación, la conciencia corporal y una técnica clara y precisa. Lo que más me motiva es compartir mi entusiasmo por el mambo y ayudarles a descubrir su propio amor por la música. ¡Estoy muy emocionada de verlos en el festival y bailar juntos!",
          },
        ],
      },
      {
        time: "15:00",
        event: "El Puma",
        actType: "DJ Set",
        type: "main",
        description:
          "El Puma Dj nacido en Venezuela y criado en Colombia lleva la salsa en la sangre por su familia, su tío melómano y locutor y su hermano melómano y coleccionista de vinilos heredó la salsa con tanta pasión que se ha ganado el respeto de grandes djs y me molomanos de Europa.",
        image: "/el-puma.webp",
      },
      {
        time: "15:30",
        event: "El Puma",
        actType: "DJ Set",
        type: "main",
      },
      { time: "16:00" },
      {
        time: "16:30",
        event: "Burundanga",
        actType: "Live",
        type: "main",
        description:
          "The internationally acclaimed Che Sudaka brings their powerful fusion of Latin rhythms, reggae, and punk energy to create an unforgettable festival moment. Formación: Sonia Solarte – Voz Doris Alzarte – Voz Susanne Schulz – Piano, Violín Ramani Krishna – Bajo Philipp Beerwald – Congas Doro Wesseling – Batería Gisela Meßollen – Trompeta Tanja Becker – Trombón",
      },
      {
        time: "17:00",
        event: "Burundanga",
        actType: "Live",
        type: "main",
        hasShow: true,
        danceShow: "Casino Cubano Dance Show",
        dancers: "Lei y Ayna",
        slides: [
          {
            image: "/burundanga.webp",
            bandName: "Burundanga",
            description:
              "Ocho burundangueras de Colombia, India y Alemania sacan a cualquiera del asiento con su ardiente mezcla de salsa, merengue y rumba. Combinando elementos de jazz y flamenco, presentan versiones reinterpretadas de arreglos tradicionales de salsa. Fundada en 1992 como una banda de salsa integrada exclusivamente por mujeres, el grupo ha evolucionado hasta convertirse en una banda emocionante, multicultural y abierta, que mira hacia atrás con orgullo por los muchos conciertos y experiencias compartidas en diversas formaciones. Frente a esta poderosa formación de músicos experimentados, canta, baila, cuenta historias, bromea y ríe Sonia Solarte — poeta y cantante de Cali, la capital salsera de Colombia. Con Doris Alzarte, oriunda de Medellín, estas dos mujeres llenas de energía traen la alegría de vivir de América Latina a Berlín.",
          },
          {
            image: "lei-ayna.webp",
            dancerOne: "Lei",
            dancerTwo: "Ayna",

            dancerOneDescription:
              "De niño siempre se interesó por las manifestaciones artísticas y a los 15 años ingresó en la escuela de Instructores de Arte de su ciudad natal, en la especialidad de teatro. Al graduarse se profesionalizó como bailarín de espectáculos y variedades y se mantuvo activo desde entonces hasta que se trasladó a Alemania en el 2021, donde se ejerce como profesor de ritmos cubanos y latinos en la ciudad de Berlín, y haciendo presentaciones en eventos, festivales, además de preparar y asesorar parejas para bodas y otros intereses.",
            dancerTwoDescription: "tba",
          },
        ],
      },
      {
        time: "17:30",
        event: "Anacaona & La Vecina",
        actType: "DJ Set",
        type: "main",
        djs: "Anacaona, La Vecina",
        slides: [
          {
            djOne: "Anacaona",
            djTwo: "La Vecina",
            image: "/la-vecina-anacaona.webp",
            djOneDescription:
              "La prodigiosa bruja de Caracas, Anacaona, ha hecho vibrar la escena latina de Berlín con sus potentes mezclas de salsa, merengue y boogaloo, tanto en las fiestas más importantes como en su programa “Camino a Casa” en 1btn radio. Su estilo aporta arte y sigilo a la ciudad, consolidándose como una selectress y artista visual de 0% compromiso, con una profunda pasión por el alma afrocaribeña y la salsa old school.",
            djTwoDescription:
              "La Vecina, melómana y musicóloga colombiana, es curiosa por explorar la historia de las migraciones musicales entre Abya Yala y África. Sus sets se centran en lo afrocaribeño, la cumbia, la salsa y otros ritmos que invitan a “echar paso” y evocan la riqueza de la diáspora africana en la música latina.",
            descriptionTwoDjsTogether:
              "Para esta ocasión especial, ambas unirán fuerzas en una selección que explora las raíces africanas del universo de la salsa, presentes en ritmos como el afrocubano, oriza, plenas, bombas y mozambique. Así, rinden homenaje a estos sonidos de resistencia, portadores de saberes y memorias culturales.",
          },
        ],
      },
      {
        time: "18:00",
        event: "Anacaona & La Vecina",
        actType: "DJ Set",
        type: "main",
        djs: "Anacaona, La Vecina",
      },
      { time: "18:30" },
      {
        time: "19:00",
        event: "Cayeye",
        actType: "Live",
        type: "main",
        description:
          "Cayeye, un plato originario del Caribe a base de plátano verde y mucha salsa, da nombre a una banda de Salsa Brava de 10 integrantes con sede en Berlín. Así como sus diversos ingredientes convierten al Cayeye en un plato dulce y muy popular en el norte de Colombia, la banda interpreta sonidos cálidos y bailables que evocan la tradición musical latinoamericana de los años 70. Al igual que en la receta del plato, en la banda también se mezclan distintos sabores: lxs integrantes de la orquesta fusionan influencias de Europa y América Latina para crear una experiencia musical vibrante sobre el escenario. La banda se formó a principios de 2022 y ofrece un repertorio amplio de salsa latinoamericana, tocando e improvisando con energía y pasión. ¡El Cayeye se disfruta mejor recién salido de la sartén! En vivo, en el club, donde clásicos, composiciones propias y arreglos originales se funden en un verdadero espectáculo de ritmos. Ven a nuestra fiesta, baila con nosotros toda la noche y siente el verdadero calor de América Latina – ¡Salsa pura, directa al corazón y a las caderas! —",
        image: "/cayeye.webp",
      },
      {
        time: "19:30",
        event: "Cayeye",
        actType: "Live",
        type: "main",
      },
      {
        time: "20:00",
        event: "Bongo",
        actType: "DJ Set",
        type: "main",
        description:
          "Desde Cali, DJ Bongo revive el espíritu de la vieja escuela: salsa brava, calle y sudor. Un sonido sin adornos, directo al alma del bailador. ¡Salsa con corazón!",
        image: "/dj-bongo.webp",
      },
      {
        time: "20:30",
        event: "Bongo",
        actType: "DJ Set",
        type: "main",
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
            image: "/andrelux.webp",
            description:
              "@_andreluxx_ es un DJ y coleccionista que lleva más de 20 años creando espacios en los cuales se promueve y se celebra la cultura latinoamericana en Alemania. Desde luego ya perdió la cuenta de cuantas fiestas ha montado pero sigue convencido de que la rumba es el escenario ideal para acercar a la gente y tender puentes entre culturas.Actualmente hace parte del equipo de @berlinensalsa y es quien dio vida y forma a su identidad visual",
          },
        ],
      },
      {
        time: "21:30",
        event: "Berlin En Salsa Host DJs",
        actType: "DJ Set",
        type: "main",
        djs: "Andrelux, Dracaena, El Vago, El Melómano Alemán",
      },
    ],
  },
  {
    title: "Talleres de Baile",
    slots: [
      {
        time: "12:30",
        event: "New York On 2",
        instructor: "Niya",
        image: "/niya.webp",
        type: "workshop",
        bio: "¡Hola a todos! Soy Niya, nacida en Sofía, Bulgaria, donde comenzó mi camino en la danza con ballet, danza moderna y hip hop. Más adelante descubrí mi gran pasión: la salsa, y en especial el mambo. Como miembro de un equipo de salsa, tuve la oportunidad de representar a Bulgaria en festivales internacionales y adquirir valiosa experiencia en salsa, bachata y cha cha cha. Desde 2023 doy clases en Berlín. En mis clases me enfoco en la coordinación, la conciencia corporal y una técnica clara y precisa. Lo que más me motiva es compartir mi entusiasmo por el mambo y ayudarles a descubrir su propio amor por la música. ¡Estoy muy emocionada de verlos en el festival y bailar juntos!",
        description:
          "Precisión, elegancia y musicalidad. La salsa estilo New York (On2) nació en la Gran Manzana, influenciada por el jazz, el mambo y la migración latina. Se baila 'en línea', con énfasis en los tiempos 2 y 6. Es un estilo técnico y expresivo, ideal para contar historias con el cuerpo.",
      },
      {
        time: "13:00",
        event: "New York On 2",
        instructor: "Niya",
        type: "workshop",
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
        image: "/lei.webp",
        type: "workshop",
        bio: "De niño siempre se interesó por las manifestaciones artísticas y a los 15 años ingresó en la escuela de Instructores de Arte de su ciudad natal, en la especialidad de teatro. Al graduarse se profesionalizó como bailarín de espectáculos y variedades y se mantuvo activo desde entonces hasta que se trasladó a Alemania en el 2021, donde se ejerce como profesor de ritmos cubanos y latinos en la ciudad de Berlín, y haciendo presentaciones en eventos, festivales, además de preparar y asesorar parejas para bodas y otros intereses.",
        description:
          "Mas que baile, es pura gozadera! El casino cubano es un estilo de baile social originado en Cuba, caracterizado por su alegría, sabor caribeño y movimientos circulares. Se baila en pareja y en rueda, destacando la improvisación, la conexión y la energía del son, la salsa y otros ritmos afrocubanos. ¡Pura fiesta y sabor cubano en movimiento!",
      },
      {
        time: "15:30",
        event: "Casino Cubano",
        instructor: "Lei",
        type: "workshop",
      },
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
    title: "Talleres de música",
    slots: [
      { time: "12:30" },
      {
        time: "13:00",
        event: "Taller de Campana",
        instructor: "Chucho Palma",
        type: "workshop",
        image: "/chucho-palma.jpeg",
        bio: "Percusionista venezolano radicado en Berlin, actual bongocero de la orquesta La Melodíca.",
        description:
          "Muestra de los fundamentos basicos de la campana de mano en los diferentes ritmos latinos donde ella se ejecuta. Muestra de como ejecutar un solo de campana utilizando los patrones de solos de la conga, el timbal y el bongo",
      },
      {
        time: "13:30",
        event: "Taller de Campana",
        instructor: "Chucho Palma",
        type: "workshop",
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
        image: "/harry-munoz.jpeg",
        description:
          "En una orquesta, una delantera; en una delantera, unos cantantes… ¡y entre ellos, los soneros! Estaremos hablando de esta especial categoría de intérprete dentro del género salsero. ¿Y quién sabe? De pronto, y de repente… ¡nos ponemos a sonear! Nos vemos el 20 de julio.",
      },
      {
        time: "16:00",
        event: "Soneo Workshop",
        instructor: "Harry Muñoz",
        type: "workshop",
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
    ],
  },
  {
    title: "Charlas Salseras",
    slots: [
      { time: "12:30" },
      { time: "13:00" },
      { time: "13:30" },
      { time: "14:00" },
      { time: "14:30" },
      {
        time: "15:00",
        event: " Aviatrix & Suena Chelo",
        presenter: "Suena Chelo",
        host: "Aviatrix",
        type: "talk",
        record: "The Hustler",
        artist: "Willie Colon & Hector Lavoe",
        image: "/the-hustler.webp",
        imageTwo: "/suena-chelo.webp",
        bio: "Suena Chelo es selector de sonidos afrocaribeños y una de las mentes detrás de movidas culturales como @la_popular_space y @fierasalsa en Göttingen. Su inspiración nace del deseo de abrir espacios donde las diásporas del Sur Global puedan expresarse, conectar y construir comunidad juntxs",
      },
      {
        time: "15:30",
        event: "Aviatrix & Dracaena",
        presenter: "Dracaena",
        host: "Aviatrix",
        type: "talk",
        artist: "Grupo Niche",
        record: "Cielo de Tambores",
        image: "/cielo-de-tambores.webp",
        imageTwo: "/dracaena-charla.webp",
        bio: "Dracaena es selectora y coleccionista de discos, nacida en Cali, Colombia y radicada en Berlín. Su práctica se enfoca en la exploración de la salsa y los sonidos de la diáspora, con especial interés en ritmos afrocaribeños, afrolatinos y latinoamericanos. A través del vinilo, sus sets buscan crear puentes entre memoria, identidad y cuerpo, combinando energía, escucha y baile. ",
        comment:
          "Cielo de Tambores (1990) del Grupo Niche, es una obra clave en la historia de la salsa colombiana. Publicado en Cali, este álbum marcó una nueva etapa en la evolución del género, posicionando a la salsa caleña en la escena internacional y afirmando a Cali como capital cultural del movimiento salsero en América Latina.",
      },
      {
        time: "16:00",
        event: "Avaitrix & Enilce Feikes Álvarez",
        presenter: "Enilce Feikes Álvarez",
        host: "Aviatrix",
        type: "talk",
        image: "/joe-arroyo.jpg",
        imageTwo: "/enilce.webp",
        artist: "Joe Arroyo",
        record: "Me Le Fugue A La Candela",
        bio: "Soy bailarina y docente con formación en danzas tradicionales afrocolombianas, y una amplia experiencia en la enseñanza de éstas. Además, soy una melómana empedernida: escucho, bailo y disfruto la música salsa desde que estaba en el jardín infantil.",
        comment:
          "Algunos artistas se han vuelto parte de mi historia personal, casi como familia. Uno de ellos es mi coterráneo Joe Arroyo. Su música, que fusiona salsa, cumbia, porro, soca, reggae y ritmos africanos, dio vida a un sonido único que él llamó 'Joeson'. Joe fue más que un cantante: fue un narrador musical de la experiencia afrodescendiente en Colombia. Muchos lo conocen como el cronista de la negritud. Hoy quiero invitarles a escuchar conmigo uno de sus discos más potentes: Me le fugué a la candela (1985), que incluye temas como Me le fugué a la candela, El barbero, Dolores tiene un piano y El Tumbatecho. No me presento aquí como una experta académica en salsa, sino como lo que soy: una bailadora gozona y admiradora profunda de Joe Arroyo.",
      },
      { time: "16:30" },
      {
        time: "17:00",
      },
      {
        time: "17:30",
        event: "No Le llamen salsa a mi son",
        presenter: "DJ Feikes, Christoph Twickel, Pedro Abreu & friends",
        type: "talk",
        image: "/no-le-llamen-salsa-a-mi-son.webp",
        description:
          "El tulo de la canción „No le llamen Salsa a mi Son... dile música Cubana“ del cantante cubano Monguito “El Único” lo deja claro: la 'Salsa' no fue en un principio más que una etqueta comercial ingeniosa — usada para una música profundamente enraizada en la tradición del Son Cubano. Solo en el Nueva York de los años 60, al mezclarse con otros ritmos e influencias, se transformó en lo que hoy conocemos como Salsa: un sonido urbano, una forma de expresión del sentimento colectvo de muchas comunidades latnas. Sin embargo, desde sus comienzos, la Salsa estuvo en riesgo de perder su vitalidad, atrapada en los esquemas musicales establecidos — en gran parte por el exitoso pero cada vez más predecible sello Fania. Lo que la mantuvo viva fueron los impulsos renovadores: compositores y arreglistas creatvos provenientes de Cuba, que constantemente aportaban nueva energía al género. Junto al periodista hamburgués Christoph Twickel y al reconocido músico cubano y director de orquesta afincado en Berlín, Pedro Abreu, el Salsomano y moderador Jörg Feikes examina más de cerca la compleja —y a veces tensa— relación entre la Salsa y la música cubana.",
      },
      {
        time: "18:00",
        event: "No Le llamen salsa a mi son",
        presenter: "DJ Feikes, Christoph Twickel, Pedro Abreu & friends",
        type: "talk",
      },
      {
        time: "18:30",
        event: "No Le llamen salsa a mi son",
        presenter: "DJ Feikes, Christoph Twickel, Pedro Abreu & friends",
        type: "talk",
      },
      { time: "19:00" },
      { time: "19:30" },
      { time: "20:00" },
      { time: "20:30" },
      { time: "21:00" },
      { time: "21:30" },
    ],
  },
];

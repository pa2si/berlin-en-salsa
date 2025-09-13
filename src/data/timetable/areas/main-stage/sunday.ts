import { TimeSlot } from "../../../../types/timetable";

export const mainStageSunday: TimeSlot[] = [
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
    time: "13:00",
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
        image: "/lei-ayna.webp",
        dancerOne: "Lei",
        dancerTwo: "Ayna",

        dancerOneDescription:
          "De niño siempre se interesó por las manifestaciones artísticas y a los 15 años ingresó en la escuela de Instructores de Arte de su ciudad natal, en la especialidad de teatro. Al graduarse se profesionalizó como bailarín de espectáculos y variedades y se mantuvo activo desde entonces hasta que se trasladó a Alemania en el 2021, donde se ejerce como profesor de ritmos cubanos y latinos en la ciudad de Berlín, y haciendo presentaciones en eventos, festivales, además de preparar y asesorar parejas para bodas y otros intereses.",
        dancerTwoDescription:
          "Ayna Nació en Perú, donde desde muy temprana edad se conectó con la danza a través de las danzas folclóricas peruanas, especialmente los ritmos afroperuanos, que marcaron profundamente su identidad artística. Con su llegada a Berlín, descubrió una nueva pasión en los ritmos cubanos. Desde entonces, se ha dedicado principalmente al casino y al son cubano, encontrando en ellos una forma vibrante de expresión y conexión cultural.",
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
];

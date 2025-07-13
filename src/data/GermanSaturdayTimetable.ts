import { Column } from "../types/timetable";

// Saturday timetable data
export const GermanSaturdayTimetableData: Column[] = [
  {
    title: "Hauptbühne",
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
              "DJ, Plattensammler und Liebhaber der tropischen Musik. Er ist Mitbegründer des Kollektivs La Noche und der Aviatrix Listening Sessions sowie Mitglied der Salsa-Band Cayeye und der Punkband Severo Esfínter.",
          },
          {
            djName: "El Profe",
            image: "/el-profe.webp",
            description:
              "El Profe ist das Alias von Raúl Payares, einem afrokolumbianischen Selector mit Wohnsitz in Berlin. Raúl ist leidenschaftlicher Vinylsammler und bringt seit über vier Jahren die Tanzflächen zum Beben – mit kraftvollen Sets voller Salsa Brava, traditioneller Cumbia, karibischer Rhythmen, klassischem Vallenato und afrikanischen Perlen aus den 60er-, 70er- und 80er-Jahren. Geboren in Cartagena, Kolumbien, und aufgewachsen zwischen Trommeln, Akkordeons und Picos, verbindet El Profe seine afro-kolumbianische Herkunft mit einer tiefgehenden, tanzbaren und ehrlichen Musikauswahl. Er ist der Gründer von Partys wie LA NOCHE und It’s a SALSA BRAVA Thing – Veranstaltungen, die die alternative Szene Berlins geprägt haben und Räume schaffen, in denen afro-lateinamerikanische Musik in ihrer ursprünglichsten Form gefeiert wird: auf Vinyl und mit Herz. Jedes seiner Sets ist mehr als nur Musik zum Tanzen – es ist eine klangliche Reise, die Kulturen, Körper und Erinnerungen miteinander verbindet.",
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
          "Geboren in der Stadt, in der die Rumba entstand – Matanzas, Kuba – lebt er seit mehreren Jahren in Berlin und bringt dort das Beste der kubanischen Musik auf die Bühne. Er ist auf zahlreichen Events und Festivals vertreten, darunter das Festival Berlín Fiesta Elegante, Bérgamo en Salsa (Italien), der Berlin Salsa Congress und viele weitere – auch in bekannten sozialen Locations wie dem Soda Club Berlin. Als leidenschaftlicher Liebhaber der Musik seiner Heimat zeigt er zugleich großes Interesse an anderen Kulturen und deren musikalischen Ausdrucksformen. Für Berlín en Salsa hat er ein Set mit Timba, Salsa und Son Cubano vorbereitet.",
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
        dancers: "Leidiana & Roger",
        slides: [
          {
            image: "/alafia-con-ire.webp",
            bandName: "Alafía con Iré",
            description:
              "Im Jahr 2004 gründeten jugendliche Musiker in Havanna die Band Alafia con Iré aufgrund ihrer großen Leidenschaft für Musik und dem Wunsch, selbst die vielfältige Musik ihres Heimatlandes zu spielen. Mit Rasiel Almanza Cairo gelangte diese Idee 2022 nach Berlin, wo das Projekt in überwiegend neuer Besetzung wieder ins Leben gerufen wurde. Alafia con Iré spielt unter anderem afrokubanische Musik, insbesondere auch Rumba, und zudem eigene Kompositionen. Der Name der Band stammt aus der afrokubanischen Religion 'Regla de Ocha'. Alafia bedeutet auf Yoruba so viel wie Wohlbefinden und innerer Frieden und Iré stellt eine zusätzliche Verstärkung dar.",
          },
          {
            dancerOne: "Leidiana",
            dancerTwo: "Roger",
            description:
              "Roger und Leidiana sind ein Duo kubanischer Tänzer, die dafür anerkannt sind, Tradition mit Moderne bei jeder Aufführung zu verschmelzen Sein einzigartiger Stil vereint die Stärke der urbanen Bewegung, die Eleganz des traditionellen kubanischen Tanzes und die ausdrucksstarke Tiefe des Afro-Contemporanen",
          },
        ],
      },
      {
        time: "16:00",
        event: "DJ Feikes",
        actType: "DJ Set",
        type: "main",
        description:
          "DJ Feikes bereist seit über 35 Jahren mit wachem Ohr die Karibik – und steht bei der Rückreise jedes Mal vor derselben Herausforderung: Wie bekomme ich bloß all die Schallplatten heil ins Flugzeug und sicher nach Berlin? An jedem ersten Mittwoch im Monat präsentieren DJ Feikes und sein DJ-Partner Christian ihr „Salsa Café“ im Club „wilder al -erwartet“ am Nordbahnhof. Die beiden Musikliebhaber bringen ihrem Publikum eine exquisite Auswahl aus ihrer umfangreichen Plattensammlung mit: von kubanischen Klassikern der 50er Jahre – mit Mambo, Danzón und Charanga – über die kraftvolle „Street Salsa“ aus dem New York der späten 60er, die opulent arrangierte „Salsa Brava“ der 70er, die melodische Salsa der 80er bis hin zur romantischen Salsa der 90er – alles ist dabei. Auch andere afrokubanische und karibische Rhythmen finden ihren Platz, darunter Cumbia aus Kolumbien, Merengue und Bachata aus der Dominikanischen Republik oder kubanisch inspirierte afrikanische Salsa. Hauptsache, die Musik geht ins Ohr und bringt den richtigen Swing auf die Tanzfläche!",
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
              "Tempo Havanna lassen die musikalische Seele Kubas erklingen, festgehalten in mitreißenden eigenen Kompositionen, modern und urban-kubanisch. Lateinamerikanische Rhythmen von Salsa und Son bis Bolero und Cha Cha Cha tragen das Flair Havannas im Reisegepäck und stillen die Sehnsucht nach karibischer Leichtigkeit, Leidenschaft und Lebenslust. Romantisch-beschwingt bis energetisch, bei diesen Klängen werden Erinnerungen an heiße Abende und kühle Drinks im Sonnenuntergang wach. Tempo Havanna inspiriert sein Publikum, südländische Entschleunigung zu wagen, das Leben pur zu genießen und die Freude am Tanz zu feiern - ganz im Tempo Havanna.",
          },
          {
            image: "/son-cubano.webp",
            dancerOne: "Helen",
            dancerTwo: "Yago",
            dancerOneDescription:
              "Seit über fünf Jahren unterrichtet sie in Berlin mit dem Schwerpunkt auf Rueda de Casino. Ihre Leidenschaft für die kubanische Kultur und den Tanz bereichert ihr außergewöhnliches Talent als Tänzerin und Lehrerin. Besonders die Rumba liegt ihr am Herzen – sie ermöglicht es ihr, sich auf anmutige und feminine Weise frei auszudrücken und die Weiblichkeit zu feiern.",
            dancerTwoDescription:
              "Yago ist bekannt für seine Spontanität und sein improvisatorisches Gespür auf der Tanzfläche. Es ist ihm sehr wichtig, ein präziser und einfühlsamer Führender zu sein, um demder Tanzpartnerin ein angenehmes Tanzerlebnis zu ermöglichen. Dank seines sportwissenschaftlichen Hintergrunds gibt Yago gezielte Erklärungen und erkennt körperliche Einschränkungen schnell, um wirksame Korrekturen vorzunehmen. Mit großer Leidenschaft unterrichtend, betrachtet er das Tanzen als die ultimative Reinigung der Seele. Wenn sich ein Mensch ganz der Musik und dem Tanz hingibt, so meint er, erreicht er den höchsten Zustand der Präsenz. Yago hat seine Fähigkeiten unter der Anleitung international anerkannter Lehrer wie Cristian Mauricio, Luis Duarte und Leiván García – dem Direktor des Conjunto Folklórico Nacional – entwickelt.",
          },
        ],
      },
      {
        time: "18:30",
        event: "Necios",
        actType: "DJ Set",
        type: "main",
        description:
          "Aus den Tiefen von Nächten voller Cumbia-Rhythmen und 'Salsa Baldosas' auftauchend, verwandelte eine tiefe Liebe zur Musik drei Freunde in NECIOS. Ursprünglich aus Kolumbien und Ecuador stammend, hat dieses in Berlin ansässige Kollektiv von KLANGSELEKTOREN eine Reise ins Leben gerufen, die von Vinyl und Nadeln angetrieben wird. Ihre Sammlung ist eine faszinierende Fusion von Klängen, die die gesamte Breite und Länge Lateinamerikas umfasst und sowohl tief verwurzelte Traditionen als auch neue elektronische Horizonte erforscht. 'Necio' oder 'Necia' bezeichnet jemanden, der stur ist und bis zum Äußersten für das eintritt, woran er wirklich glaubt – selbst wenn das bedeutet, die Regeln zu brechen!",
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
              "Zehn erstklassige Musiker, ein treibender Groove und pure Energie: La Melodica steht für Salsa Dura in ihrer kraftvollsten Form! Unter der Leitung des Pianisten Jonatan Morgenstern bringt die Band einen explosiven Sound auf die Bühne – mit scharfen Bläsern, virtuosen Percussions und mitreißendem Gesang.",
          },
          {
            image: "/jessi-julian.webp",
            dancerOne: "Jessica",
            dancerTwo: "Julian",
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
              "SACA SAL ist ein kollektives musikalisches Ritual, das von Rhythmen und Echos unserer Vorfahren geleitet wird und uns in einen Raum der Freude und Befreiung einlädt. Mit Musik aus dem sogenannten globalen Süden, aufgelegt auf Vinyl, katalysiert und erschüttert dieses kollektive Ritual Emotionen, Schmerzen und Ängste – und heißt sie willkommen, um durch Körperbewegung und das Lauschen auf den eigenen Körper transformiert zu werden. SACA SAL ist ein Ritual in Form eines Klangraums, der auf der Tanzfläche entsteht, wenn sich ein Kollektiv von Menschen versammelt, um zu tanzen und sich von den ausgewählten Rhythmen und Echos seiner beiden Gastgeberinnen mitreißen zu lassen. SACA SAL sind Calamidades Lola @pissandlove & @amuletomanuela.",
            djOne: "Calamidades Lola",
            djTwo: "Amuleto Manuela",
            djOneDescription:
              "Calamidades Lola ist eine Plattensammlerin und DJ/Selector, geboren und aufgewachsen in Barranquilla – einer Stadt an der karibischen Küste Kolumbiens mit einer kraftvollen Festkultur, in der Musik ein sicherer Weg zu Freude und Befreiung ist. Heute lebt sie in Berlin, und ein Großteil ihrer Musiksammlung und Auswahl wird von ihrer Migrationserfahrung geprägt.",
            djTwoDescription:
              "Amuleto Manuela ist eine Klangkünstlerin und DJ aus Kolumbien, die in Berlin lebt. In ihrer prozessorientierten Arbeit – bestehend aus Klanglandschaften, Klangskulpturen, kollektiven Hörpraktiken und Radiosendungen – steht das Hören im Mittelpunkt und entsteht als kontextuelle Antwort auf die Suche nach Begegnungsräumen. Sie setzt sich mit Themen wie Diaspora und Identität auseinander, mit dem Wunsch, zu verlernen und sich an andere Formen zu erinnern, wie wir unsere kollektive Lebenserfahrung bewohnen können.",
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
      { time: "22:00" },
    ],
  },
  {
    title: "Tanz-Workshops",
    slots: [
      {
        time: "13:00",
        event: "Afro-Cuban Dance",
        instructor: "Leidiana",
        type: "workshop",
        bio: "Leijana kommt aus Kuba und lebt jetzt in Berlin – und was sie am meisten liebt? Tanzen! Schon seit sie klein ist, gehört Musik und Bewegung zu ihrem Alltag. Mit ihrem ganz eigenen Stil und der Lebensfreude aus ihrer Heimat bringt sie jeden Raum zum Strahlen. Für sie ist Tanzen nicht nur ein Beruf, sondern pure Leidenschaft.",
        description:
          "Afrokubanischer Tanz ist Wurzel, Körper und tiefe Verbindung zur Erde. Er entstand aus afrikanischen Traditionen, die nach Kuba gebracht wurden. In jedem Rumba-Schritt, jeder Torso-Bewegung und jedem spirituellen Ausdruck lebt seine Kraft. Er ist das rhythmische und körperliche Fundament vieler Salsa-Stile. Afrokubanisch zu tanzen heißt, die Wurzeln zu ehren.",
      },
      {
        time: "13:30",
        event: "Afro-Cuban Dance",
        instructor: "Leidiana",
        type: "workshop",
      },
      { time: "13:30" },
      { time: "14:00" },
      { time: "14:30" },
      { time: "15:00" },
      { time: "15:30" },
      {
        time: "16:00",
        event: "Son Cubano",
        instructor: "Helen",
        instructorTwo: "Yago",
        type: "workshop",
        bio: "Seit über fünf Jahren unterrichtet sie in Berlin mit dem Schwerpunkt auf Rueda de Casino. Ihre Leidenschaft für die kubanische Kultur und den Tanz bereichert ihre außergewöhnlichen Fähigkeiten als Tänzerin und Lehrerin. Besonders die Rumba hat einen besonderen Platz in ihrem Herzen – sie ermöglicht ihr, sich frei, anmutig und feminin auszudrücken und dabei die Weiblichkeit zu feiern. Helen setzt sich mit Überzeugung dafür ein, ihre Schülerinnen zu ermutigen, das Tanzen als gemeinsames Erlebnis zwischen beiden Partnerinnen zu schätzen und zu genießen – ein Zusammenspiel, bei dem Führende und Folgende gleichermaßen beitragen. Sie entwickelt kontinuierlich spezifische Prinzipien des „aktiven Folgens“, um die Idee zu fördern, dass Folgende innerhalb der Berliner Tanzszene die gleiche Anerkennung verdienen. Ihr Tanzstil wurde vor allem von Sofia de Endaya, Sassan AliValiollahi und Luis Duarte geprägt.",
        bioTwo:
          "Yago ist bekannt für seine Spontanität und sein improvisatorisches Gespür auf der Tanzfläche. Es ist ihm besonders wichtig, ein präziser und achtsamer Führender zu sein, um seinemseiner Tanzpartnerin ein angenehmes und bereicherndes Tanzerlebnis zu ermöglichen. Mit seinem sportwissenschaftlichen Hintergrund gibt Yago gezielte Erklärungen und erkennt körperliche Einschränkungen schnell, um wirksame Korrekturen vorzunehmen. Er unterrichtet mit großer Leidenschaft und ist überzeugt davon, dass Tanzen die ultimative Reinigung der Seele ist. Wenn ein Mensch ganz in der Musik und im Tanz aufgeht, so meint er, erreicht er den höchsten Zustand von Präsenz. Yago hat seine tänzerischen Fähigkeiten unter der Anleitung international anerkannter Lehrer wie Cristian Mauricio, Luis Duarte und Leiván García – dem Direktor des Conjunto Folklórico Nacional – weiterentwickelt.",
        description:
          "Son Cubano ist das elegante Herz der Salsa. Geboren im Osten Kubas, wo Trommeln und Saiten zusammenkamen, um Geschichten zu erzählen. Mit seinem sanften, fließenden Grundschritt gab der Son der Salsa ihre Struktur und ihren Geschmack. Ohne Son – keine Salsa.",
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
        type: "workshop",
        bio: "Julian ist ein leidenschaftlicher Salsa-Caleña-Tänzer und -Lehrer mit über sechs Jahren Erfahrung und mehr als drei Jahren Unterrichtstätigkeit in Berlin. Er hat bei zahlreichen Festivals und Events in ganz Deutschland getanzt. Ursprünglich aus Kolumbien stammend, unterrichtet er im Dolce Vita Dance Studio – mit einem Fokus auf schnellem Fußspiel sowie präziser Lead-&-Follow-Technik. In seinen Kursen geht es um mehr als nur Schritte – im Mittelpunkt stehen Verbindung, Intention und Musikalität. Dabei ehrt und vermittelt er die Rhythmen und die Kultur Lateinamerikas.",
        description:
          "Salsa, sabor y control - Aus der Welthauptstadt der Salsa: Cali, Kolumbien. Dieser Stil zeichnet sich durch seine Schnelligkeit und präzisen Schritte aus. Er ist dynamisch, mit Fokus auf ausgefeiltem Footwork und den schnellen, Drehungen, die den Cali Style ausmachen. Jeder Schritt feiert die kulturelle Identität von Cali. Authentisch, kraftvoll und voller Leben!",
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
      { time: "22:00" },
    ],
  },
  {
    title: "Musik-Workshops",
    slots: [
      { time: "12:30" },
      {
        time: "13:00",
        event: "Ritmo de Clave",
        instructor: "Guillermo",
        type: "workshop",
        description:
          "La salsa como muchos otros géneros, se compone tanto de su instrumentación e interpretación, como también de la escucha y el baile. Para interpretarla, es primordial la comprensión de la clave, ya que toda su instrumentación gira en torno a ésta. Siendo la clave el adn de la salsa y de muchos otros géneros con fuerte origen africano, es un recurso casi imprescindible pero ante todo muy útil para comprenderla en cualquier nivel y forma de interacción con el género. En este taller, nos sumergiremos brevemente en el secreto mejor guardado de la salsa: la clave. El objetivo del taller es ofrecer un entendimiento básico pero esencial, para poder tocar, bailar y escuchar esta música que tanto amamos desde un lugar mucho más familiar y cercano. El taller es tanto para principiantes como para aquellxs que no tienen formación musical. Se recomienda traer cualquier instrumento de percusión, desde tambores, claves y campanas, hasta tazas, sartenes y cucharas de palo.",
      },
      {
        time: "13:30",
        event: "Ritmo de Clave",
        instructor: "Guillermo",
        type: "workshop",
      },

      {
        time: "14:00",
        event: "Introduction to Polyrhythm",
        instructor: "Angel Candeaux",
        type: "workshop",
        description:
          "¿Te has preguntado cómo varios ritmos pueden coexistir y crear una experiencia colectiva poderosa? Este taller, guiado por Angel Candeaux, es una invitación a descubrir la magia de la polirritmia afrocubana y su impacto en la conexión humana. La polirritmia es el arte de superponer varios ritmos independientes, logrando una riqueza sonora y una experiencia grupal única. En la tradición afrocubana, cada tambor mantiene su propio patrón, pero juntos crean un diálogo musical que invita a la escucha, la concentración y la creatividad colectiva. ¿Qué Vivirás en el Taller? - Exploración de tu ritmo interno: Aprende a mantener tu propio patrón mientras escuchas y dialogas con el grupo. - Conexión auténtica: Ejercicios de percusión grupal que fortalecen los lazos y la comunicación no verbal. - Equilibrio entre estructura y libertad: Descubre cómo seguir el pulso colectivo y, a la vez, atreverte a romper el patrón para expresar tu individualidad. - Momentos de comunión y expresión personal: Alterna entre el unísono grupal y la oportunidad de alzar tu propia voz rítmica. - Desarrollo de habilidades cognitivas y emocionales: Mejora la concentración, la coordinación y la apertura sensorial. ¿Por Qué Participar? - No necesitas experiencia previa, solo ganas de explorar y dejarte llevar por el ritmo. - Descubrirás herramientas para fortalecer la comunicación, la empatía y el trabajo en equipo. - Vivirás una experiencia transformadora que une cuerpo, mente y comunidad a través de la música. Angel Candeaux te invita a sumergirte en la polirritmia: un viaje donde cada latido cuenta y la suma de las diferencias crea armonía.",
        image: "/angel-candeaux.jpeg",
        bio: 'Angel Candeaux es un cubano de La Habana que lleva el ritmo en la sangre y la curiosidad en la cabeza. Psicólogo de formación y percusionista de corazón, ha recorrido espacios en Cuba, Europa y Estados Unidos mezclando tradición afrocubana con nuevas formas de conectar a las personas. Desde 2006 vive en Berlín, donde no solo toca tambores: crea espacios para que la gente se encuentre, se escuche y descubra su propio ritmo. Fundador del proyecto "desapalencao", Angel es de esos que creen que la música puede cambiarte el día (y la vida) y que todos tenemos un pulso único que aportar al grupo. ¿Te has preguntado cómo varios ritmos pueden coexistir y crear una experiencia colectiva poderosa? Este taller, guiado por Angel Candeaux, es una invitación a descubrir la magia de la polirritmia afrocubana y su impacto en la conexión humana. La polirritmia es el arte de superponer varios ritmos independientes, logrando una riqueza sonora y una experiencia grupal única. En la tradición afrocubana, cada tambor mantiene su propio patrón, pero juntos crean un diálogo musical que invita a la escucha, la concentración y la creatividad colectiva.',
      },
      {
        time: "14:30",
        event: "Introduction to Polyrhythm",
        instructor: "Angel Candeaux",
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
      { time: "22:00" },
    ],
  },
  {
    title: "Salsa-Talks",
    slots: [
      { time: "12:30" },
      { time: "13:00" },
      { time: "13:30" },
      {
        time: "14:00",
        event:
          "Fusionando historias: El estilo personal como diálogo entre la tradición y el yo",
        type: "talk",
        presenter: "Sarah Balzat",
        description:
          "El estilo personal en la danza no se inventa de la nada, nace en el cruce entre la historia propia y la colectiva. A través del lente de la salsa, reflexionaremos sobre cómo la tradición no es algo estático que se conserva, sino un diálogo vivo entre quienes nos precedieron y las historias que llevamos dentro. Lo que surge de este encuentro no es imitación, sino autenticidad: un estilo propio, enraizado en la conciencia, moldeado por la práctica y lleno de memoria.",
      },
      {
        time: "14:00",
        event: "Musical Style or Dance Style? Both and Neither!",
        type: "talk",
        presenter: "Jessi y Vane",
        description: "",
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
        bio: "DJ Christian es miembro cofundador de @salsacafeberlin, donde enciende la pista de baile cada primer miércoles del mes junto a @hijodesiboney. Su amor por los ritmos latinoamericanos nace de su estrecha conexión con la comunidad latinx en Berlín, donde participa activamente en iniciativas y espacios de la diáspora latinoamericana, inspirándose en su familia intercultural. Aunque disfruta de todos los géneros musicales, siente una especial afinidad por la música de raíces africanas, cuyas huellas se pueden rastrear en casi cualquier estilo.",
        comment:
          "Elegí el álbum “Echando Pa’lante (Straight Ahead)” porque es una obra importante en la historia de la salsa y muestra el estilo innovador de Eddie Palmieri, así como el talento de su banda. Lanzado en 1964, el álbum es celebrado por sus potentes ritmos, arreglos complejos y el sonido distintivo de la “trombanga”, que introdujo los trombones en la música tradicional latinoamericana.",
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
      { time: "22:00" },
    ],
  },
];

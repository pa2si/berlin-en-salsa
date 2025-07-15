import { Column } from "../types/timetable";

// Sunday timetable data
export const GermanSundayTimetableData: Column[] = [
  {
    title: "Hauptbühne",
    slots: [
      {
        time: "12:30",
        event: "FLori % Wilber",
        actType: "DJ Set",
        type: "main",
        description:
          "DJ Flori und DJ Wilber sind zwei peruanische Brüder, die die Berliner Salsa-Szene zum Beben bringen. Aufgewachsen mit den klassischen Klängen von La Fania und La Sonora Matancera, lassen sie heute ihr Publikum mit Mambo, Cha-Cha-Cha und Salsa im 70er-Jahre-New-York-Stil tanzen. In Berlin – ihrem musikalischen Zuhause – vereinen sie Salseros aus aller Welt unter einem gemeinsamen Rhythmus. Sie haben bereits Tausende auf legendären Partys wie Tu Candela, Mi Salsa und Zuckerbrot zum Tanzen gebracht.",
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
              "Sonora Berlín ist eine elfköpfige Salsa-Band aus Berlin, bestehend aus Musikern aus verschiedenen Ländern, die eine gemeinsame Leidenschaft für Salsa-Musik verbindet. Ihr Repertoire kombiniert bekannte Salsa-Klassiker mit eigenen Kompositionen – kraftvoll, tanzbar und voller Spielfreude. Die Band existiert seit 2023 und steht für eine energiegeladene Bühnenpräsenz und musikalische Präzision. Ihre Auftritte schaffen eine mitreißende Atmosphäre, die sowohl Tänzerinnen als auch Musikliebhaberinnen begeistert. Sonora Berlín war bereits auf renommierten Bühnen und Events zu erleben, darunter: – das 75. Jubiläum des Deutschen Bundestags im Rahmen des Demokratiefests – die Volksbühne Berlin (Grüner Salon) – das nHow Hotel – die Bikini Mall Berlin – und zahlreiche Clubnächte und Open-Air-Events Mit ihrer Musik bringt Sonora Berlín die rhythmische Kraft und Lebensfreude der Salsa auf jede Bühne – ob Festival, Kulturveranstaltung oder private Feier. Weitere Informationen und Eindrücke: https://www.youtube.com/watch?v=o4Evwcrc1vA https://www.instagram.com/sonora_berlin/",
          },
          {
            image: "niya.webp",
            dancerName: "Niya",
            description:
              "Hallo zusammen! Ich bin Niya, geboren in Sofia, Bulgarien, wo meine tänzerische Reise mit Ballett, Modern Dance und Hip Hop begann. Später fand ich meine große Leidenschaft: Salsa – und ganz besonders Mambo. Als Mitglied eines Salsa-Teams durfte ich Bulgarien auf internationalen Festivals vertreten und sammelte dabei wertvolle Erfahrungen in Salsa, Bachata und Cha Cha Cha. Seit 2023 unterrichte ich in Berlin. In meinem Unterricht stehen Koordination, Bewegungsbewusstsein und technische Klarheit im Mittelpunkt. Was mir besonders am Herzen liegt: meine Begeisterung für Mambo weiterzugeben – und euch dabei zu unterstützen, eure eigene Liebe zur Musik zu entdecken. Ich freue mich darauf, euch beim Festival zu sehen und gemeinsam mit euch zu tanzen!",
          },
        ],
      },
      {
        time: "15:00",
        event: "El Puma",
        actType: "DJ Set",
        type: "main",
        description:
          "El Puma DJ, geboren in Venezuela und aufgewachsen in Kolumbien, trägt die Salsa im Blut – eine Leidenschaft, die tief in seiner Familie verwurzelt ist. Inspiriert von seinem musikbegeisterten Onkel, der als Radiomoderator tätig war, und seinem Bruder, einem Vinylsammler und Melomanen, hat er die Liebe zur Salsa mit solcher Intensität übernommen, dass er sich den Respekt vieler namhafter DJs und Musikliebhaber:innen in ganz Europa verdient hat.",
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
              "8 Burundanguer-as- und -itos  aus Kolumbien, Indien und Deutschland locken mit ihrer heißen Mischung aus  Salsa , Merengue und Rumba jeden aus dem Sessel. Ergänzt  mit Elementen aus Jazz und Flamenco präsentieren sie  Bearbeitungen traditioneller Salsa -  Arrangements. 1992 als reine Frauen Salsa Band gegründet, haben sie sich zu einer spannenden, multikulturellen und offenen Band entwickelt, die auf viele schöne Konzerte und Erlebnisse in verschiedenen Besetzungen zurückblicken kann. Vor der starken Formation aus versierten Musiker:Innen singt, tanzt, erzählt, scherzt und lacht Sonia Solarte - Dichterin und Sängerin aus Cali, der Salsa-Metropole Kolumbiens. Mit Doris Alzarte aus Medellin bringen die beiden Power Frauen die Lebensfreude Lateinamerikas nach Berlin! Besetzung: Sonia Solarte  Voc Doris Alzarte  Voc Susanne Schulz   Piano, Violin Ramani Krishna  Bass Philipp Beerwald  Congas Doro Wesseling  Drums Gisela Meßollen Trompete Tanja Becker   Posaune",
          },
          {
            image: "lei-ayna.webp",
            dancerOne: "Lei",
            dancerTwo: "Ayna",

            dancerOneDescription:
              "Schon als Kind interessierte er sich für künstlerische Ausdrucksformen und trat mit 15 Jahren in die Schule für Kunsterzieher in seiner Heimatstadt ein, mit dem Schwerpunkt Theater. Nach seinem Abschluss machte er sich als Show- und Varieté-Tänzer selbstständig und war seither in diesem Bereich tätig, bis er 2021 nach Deutschland zog. Hier arbeitet er als Lehrer für kubanische und lateinamerikanische Rhythmen in Berlin, tritt bei Veranstaltungen und Festivals auf und bereitet Paare für Hochzeiten und andere Anlässe vor und berät sie.",
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
              'Die grandiose Hexe aus Caracas – Anacaona – bringt die Latin-Szene in Berlin ordentlich zum Beben! Mit ihren kraftvollen Salsa-, Merengue- und Boogaloo-Mixes sorgt sie bei den heißesten Partys der Stadt für Stimmung – und auch in ihrer Radioshow "Camino a Casa" auf 1btn Radio. Ihr Style ist eine Mischung aus Kunst, Vibes und Understatement – eine echte Selectress mit Leidenschaft für Afro-Karibik und Oldschool-Salsa, ganz ohne Kompromisse.',
            djTwoDescription:
              "La Vecina – Musikliebhaberin und studierte Musikwissenschaftlerin aus Kolumbien – taucht tief in die Geschichte musikalischer Migrationsbewegungen zwischen Abya Yala und Afrika ein. Ihre Sets feiern Afro-Klänge, Cumbia, Salsa und alles, was zum Tanzen einlädt – voller Energie, Geschichte und Seele.",
            descriptionTwoDjsTogether:
              "An diesem besonderen Abend legen sie gemeinsam auf – mit einer kraftvollen Auswahl, die die afrikanischen Wurzeln der Salsa feiert: afrokubanische Rhythmen, Oriza, Plena, Bomba, Mozambique und mehr. Ein musikalischer Abend der Widerstand, Kultur und Erinnerungen lebendig macht – tanzbar und mit ganz viel Herz.",
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
          "Cayeye, ein aus der Karibik stammendes Gericht auf Basis von Kochbananen und viel Salsa, ist eine 10-köpfige Salsa Brava Band aus Berlin. Sowie seine unterschiedlichen Zutaten Cayeye zu einem süßen, allseits beliebten Gericht im Norden Kolumbiens machen, spielt die Band warme, tanzbare Sounds, die an die Musiktradition der 70er Jahre im lateinamerikanischen Raum erinnern. Wie bei den Zutaten des Gerichts, drücken sich verschiedene Geschmacksmischung auch bei der Band aus: Die Musiker*innen bringen Einflüsse aus Europa und Lateinamerika zusammen, und kreieren ein mitreißendes Musikerlebnis auf der Bühne. Die Band hat sich Anfang 2022 gegründet und spielt und improvisiert zu einem breiten lateinamerikanischen Salsa. Cayeye wird am besten frisch aus der Fritteuse genossen: Live im Club wo Klassiker, Eigenkompositionen und eigene Arrangements zu einem Feuerwerk der Rhythmen verschmelzen. Kommt zu unserer Party, tanzt mit uns durch die Nacht und spürt die wahre Hitze Lateinamerikas – Salsa pur, direkt ins Herz und die Hüften.",
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
          "Direkt aus Cali bringt DJ Bongo pure Salsa Brava: Barrio, Schweiß und Seele. Ein Sound ohne Schnörkel, der den Tanzboden brennen lässt. ¡Salsa mit echtem Corazón!",
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
        slides: [
          {
            djName: "Dracaena",
            image: "/dracaena.webp",
            description:
              "Dracaena ist DJ und Plattensammlerin, geboren in Cali, Kolumbien, und lebt heute in Berlin. Ihre Sets sind energiegeladen und fesselnd, mit einem besonderen Fokus auf kraftvolle Percussion- und Piano-Soli – gedacht sowohl zum Tanzen als auch zum aufmerksamen Zuhören. Ihr musikalisches Konzept dreht sich rund um Salsa und die Klänge der Diaspora, insbesondere afrokaribische, afrolateinamerikanische und lateinamerikanische Rhythmen. Sie ist ein aktives Mitglied der Berliner Sammler:innen-Community und Teil des Organisationsteams des Berlin en Salsa Festival. Dracaena hat außerdem an Talks und Panels teilgenommen – unter anderem mit DLD – und dort ihre Perspektive als DJ und Sammlerin im Spannungsfeld von Musik, Kultur und Identität geteilt.",
          },
          {
            djName: "El Vago",
            image: "/el-vago.webp",
            description:
              "El Vago ist DJ, Plattensammler und Kulturschaffender mit Wohnsitz in Berlin. Seit mehreren Jahren ist er Co-Host der La Regla Party – einer der bekanntesten und beliebtesten Veranstaltungen der lateinamerikanischen Szene der Stadt. Aktuell ist er zudem Koordinator des Festivals Berlín en Salsa.",
          },
          {
            djName: "El Melómano Alemán",
            image: "/el-melomano-aleman.webp",
            description:
              "Leidenschaftlicher Vinylsammler mit einem feinen Gehör für lateinamerikanische Rhythmen, hat er seit 2006 eine tiefe Verbindung zur kolumbianischen Musikkultur aufgebaut. Besonders die Salsa hat seine Aufmerksamkeit erregt und steht heute im Mittelpunkt seiner Sammlung. Der klassische Sound der 1950er bis 1970er Jahre lässt sein Blut in Wallung geraten – Jahrzehnte, in denen seiner Meinung nach das pure, lebendige Wesen dieser meisterhaften Mischung von Musikrichtungen liegt. Co-Founder of El Golpe  & resident DJ at Salsa Pal Pueb",
          },
          {
            djName: "Andrelux",
            image: "/andrelux.webp",
            description:
              "@andreluxx ist ein DJ und Sammler, der seit über 20 Jahren Räume schafft, in denen die lateinamerikanische Kultur in Deutschland gefördert und gefeiert wird. Er hat natürlich längst den Überblick verloren, wie viele Partys er veranstaltet hat, ist aber weiterhin davon überzeugt, dass die Rumba der ideale Schauplatz ist, um Menschen zusammenzubringen und Brücken zwischen den Kulturen zu schlagen. Aktuell ist er Teil des Teams von @berlinensalsa und hat dessen visueller Identität Leben und Form gegeben.",
          },
        ],
      },
      {
        time: "21:30",
        event: "Berlin En Salsa Host DJs",
        actType: "DJ Set",
        type: "main",
      },
      { time: "22:00" },
    ],
  },
  {
    title: "Tanz-Workshops",
    slots: [
      {
        time: "12:30",
        event: "New York On 2",
        instructor: "Niya",
        image: "/niya.webp",
        type: "workshop",
        bio: "Hallo zusammen! Ich bin Niya, geboren in Sofia, Bulgarien, wo meine tänzerische Reise mit Ballett, Modern Dance und Hip Hop begann. Später fand ich meine große Leidenschaft: Salsa – und ganz besonders Mambo. Als Mitglied eines Salsa-Teams durfte ich Bulgarien auf internationalen Festivals vertreten und sammelte dabei wertvolle Erfahrungen in Salsa, Bachata und Cha Cha Cha. Seit 2023 unterrichte ich in Berlin. In meinem Unterricht stehen Koordination, Bewegungsbewusstsein und technische Klarheit im Mittelpunkt. Was mir besonders am Herzen liegt: meine Begeisterung für Mambo weiterzugeben – und euch dabei zu unterstützen, eure eigene Liebe zur Musik zu entdecken. Ich freue mich darauf, euch beim Festival zu sehen und gemeinsam mit euch zu tanzen!",
        description:
          'Präzision, Eleganz und Musikalität. Salsa im New York Style (On2) entstand im Big Apple, beeinflusst von Jazz, Mambo und der lateinamerikanischen Diaspora. Sie wird "on2", also auf den Zählzeiten 2 und 6, in einer Linie getanzt. Ein technischer und ausdrucksstarker Stil – ideal, um Geschichten mit dem Körper zu erzählen.',
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
        type: "workshop",
        image: "/lei.webp",
        bio: "Schon als Kind interessierte er sich für künstlerische Ausdrucksformen und trat mit 15 Jahren in die Schule für Kunsterzieher in seiner Heimatstadt ein, mit dem Schwerpunkt Theater. Nach seinem Abschluss machte er sich als Show- und Varieté-Tänzer selbstständig und war seither in diesem Bereich tätig, bis er 2021 nach Deutschland zog. Hier arbeitet er als Lehrer für kubanische und lateinamerikanische Rhythmen in Berlin, tritt bei Veranstaltungen und Festivals auf und bereitet Paare für Hochzeiten und andere Anlässe vor und berät sie.",
        description:
          "Mehr als nur Tanz – pures Lebensgefühl! Kubanisches Casino ist ein sozialer Tanzstil aus Kuba, bekannt für seine Lebensfreude, seinen karibischen Flair und die typischen Kreisbewegungen. Man tanzt es als Paar oder in der Rueda, mit viel Improvisation, Verbindung und der mitreißenden Energie von Son, Salsa und afrokubanischen Rhythmen. Eine echte Feier kubanischer Lebensfreude in Bewegung!",
      },
      {
        time: "15:30",
        event: "Casino Cubano",
        instructor: "Lei",
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
      { time: "22:00" },
    ],
  },
  {
    title: "Musik-Workshops",
    slots: [
      { time: "12:30" },
      {
        time: "13:00",
        event: "Campana Workshop",
        instructor: "Chucho Palma",
        type: "workshop",
        image: "/chucho-palma.jpeg",
        bio: "In Berlin lebender venezolanischer Perkussionist, derzeitiger Bongo-Spieler des Orchesters La Melodíca.",
        description:
          "Demonstration der Grundlagen der Hand-Cowbell in den verschiedenen lateinamerikanischen Rhythmen, in denen sie gespielt wird. Es wird gezeigt, wie man ein Cowbell-Solo spielt, indem die Solo-Muster von Conga, Timbal und Bongo verwendet werden.",
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
          'In einem Orchester gibt es eine Frontline, in der Frontline die Sänger ... und unter ihnen die Soneros! Wir werden über diese besondere Kategorie von Interpreten im Salsa-Genre sprechen. Und wer weiß? Plötzlich und unerwartet... fangen wir an zu "sonear"! Wir sehen uns am 20. Juli.',
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
      { time: "22:00" },
    ],
  },
  {
    title: "Salsa-Talks",
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
        bio: "Suena Chelo ist Selector für afrokaribische Sounds und einer der Köpfe hinter kulturellen Bewegungen wie @la_popular_space und @fierasalsa in Göttingen. Seine Inspiration entsteht aus dem Wunsch, Räume zu schaffen, in denen die Diasporen des Globalen Südens sich ausdrücken, vernetzen und gemeinsam Gemeinschaft bilden können.",
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
        bio: "Dracaena ist DJ und Plattensammlerin, geboren in Cali, Kolumbien, und lebt heute in Berlin. Ihre Sets sind energiegeladen und fesselnd, mit einem besonderen Fokus auf kraftvolle Percussion- und Piano-Soli – gedacht sowohl zum Tanzen als auch zum aufmerksamen Zuhören. Ihr musikalisches Konzept dreht sich rund um Salsa und die Klänge der Diaspora, insbesondere afrokaribische, afrolateinamerikanische und lateinamerikanische Rhythmen. Sie ist ein aktives Mitglied der Berliner Sammler:innen-Community und Teil des Organisationsteams des Berlin en Salsa Festival. Dracaena hat außerdem an Talks und Panels teilgenommen – unter anderem mit DLD – und dort ihre Perspektive als DJ und Sammlerin im Spannungsfeld von Musik, Kultur und Identität geteilt. ",
        comment:
          "Cielo de Tambores“ (1990) von Grupo Niche ist ein Schlüsselwerk in der Geschichte des kolumbianischen Salsa. Das in Cali veröffentlichte Album markierte eine neue Etappe in der Entwicklung des Genres, positionierte den Salsa aus Cali (Salsa Caleña) auf der internationalen Bühne und festigte den Ruf der Stadt als kulturelle Hauptstadt der Salsa-Bewegung in Lateinamerika.",
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
        bio: "Ich bin Tänzerin und Dozentin mit einer Ausbildung in traditionellen afrokolumbianischen Tänzen und besitze umfassende Erfahrung im Unterrichten derselben. Außerdem bin ich eine leidenschaftliche Musikliebhaberin: Ich höre, tanze und genieße Salsa-Musik, seit ich im Kindergarten war.",
        comment:
          "Manche Künstler sind ein Teil meiner persönlichen Geschichte geworden, fast wie Familie. Einer von ihnen ist mein Landsmann Joe Arroyo. Seine Musik, eine Fusion aus Salsa, Cumbia, Porro, Soca, Reggae und afrikanischen Rhythmen, brachte einen einzigartigen Sound hervor, den er „Joeson“ nannte. Joe war mehr als nur ein Sänger: Er war ein musikalischer Erzähler der afro-kolumbianischen Erfahrung. Viele kennen ihn als den Chronisten des Schwarzseins („la negritud“). Heute möchte ich euch einladen, mit mir eines seiner stärksten Alben zu hören: „Me le fugué a la candela“ (1985), das Titel wie „Me le fugué a la candela“, „El barbero“, „Dolores tiene un piano“ und „El Tumbatecho“ enthält. Ich präsentiere mich hier nicht als akademische Salsa-Expertin, sondern als das, was ich bin: eine lebensfrohe Tänzerin und eine tiefe Bewunderin von Joe Arroyo.",
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
          "Der Songtitel „No le llamen Salsa a mi Son“ … díle música Cubana („Nennt meinen kubanischen Son nicht ‚Salsa‘“) vom kubanischen Sänger Monguito „El Único“ bringt es auf den Punkt: „Salsa“ war ursprünglich nichts anderes als ein cleveres Verkaufslabel – verwendet für eine Musik, die tief in der kubanischen Tradition des Son Cubano verwurzelt ist. Erst im New York der 60er Jahre, durch die Vermischung mit anderen Rhythmen und Einflüssen, wurde daraus das, was wir heute als Salsa kennen: ein urbaner Sound, ein Ausdruck des Lebensgefühls vieler Latino-Communities. Doch schon früh stand die Salsa vor dem Risiko, sich in festen Klangschemata zu verlieren – geprägt vor allem durch das erfolgreiche, aber formelhaft werdende Fania-Label. Was sie am Leben hielt, waren frische Impulse: kreative Komponisten und Arrangeure aus Kuba, die immer wieder neue Energie einbrachten. Gemeinsam mit dem Hamburger Journalisten Christoph Twickel und dem kubanischen Musiker und Berliner Bandleader Pedro Abreu wirft der Salsa DJ und Moderator Jörg Feikes einen genaueren Blick auf die komplexe, manchmal spannungsgeladene Beziehung zwischen Salsa und kubanischer Musik.",
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
      { time: "22:00" },
    ],
  },
];

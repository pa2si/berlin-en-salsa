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
        dancers: "Leidiana & Roger, Laura & Kimberly",
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
            image: "/leidiana-roger.webp",
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
            image: "/yago-helen.webp",
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
            dancerOneDescription:
              "Jessica kommt aus Cali, Kolumbien, und tanzt seit über 10 Jahren professionell und sozial Salsa Caleña. In Berlin bringt sie die Essenz des Salsas über den Unterricht hinaus: Sie unterrichtet nicht nur, sondern präsentiert und vermittelt die Salsa Caleña auch als lebendige kulturelle Ausdrucksform, so wie sie in Cali gelebt wird. Sie hatte die Gelegenheit, bei den Konzerten von Grupo Niche und Gilberto Santa Rosa in Berlin aufzutreten, Salsa Caleña beim Berliner Salsa Kongress zu unterrichten und Teil des Organisationsteams des Events Berlin en Salsa zu sein.",
            dancerTwoDescription:
              "Julian ist ein leidenschaftlicher Tänzer und Lehrer für Salsa Caleña mit über sechs Jahren Erfahrung und mehr als drei Jahren Unterrichtserfahrung in Berlin. Er hat bei zahlreichen Festivals und Veranstaltungen in ganz Deutschland aufgetreten. Ursprünglich aus Kolumbien, unterrichtet er im Dolce Vita Dance Studio und legt dabei den Fokus auf schnelle Fußarbeit sowie auf die Technik von Führen und Folgen. Mehr als nur Schritte – in seinen Kursen geht es um Verbindung, Intention und Musikalität, immer mit dem Ziel, die Rhythmen und die Kultur Lateinamerikas zu ehren und weiterzugeben.",
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
    ],
  },
  {
    title: "Tanz-Workshops",
    slots: [
      { time: "12:30" },
      {
        time: "13:00",
        event: "Afro-Cuban Dance",
        instructor: "Leidiana",
        image: "/leidiana.webp",
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
      { time: "14:00" },
      { time: "14:30" },
      { time: "15:00" },
      { time: "15:30" },
      {
        time: "16:00",
        event: "Son Cubano",
        instructor: "Helen",
        image: "/yago-helen.webp",
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
        image: "/julian.webp",
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
    ],
  },
  {
    title: "Musik-Workshops",
    slots: [
      { time: "12:30" },
      {
        time: "13:00",
        event: "Einführung in die Polyrhythmik",
        instructor: "Angel Candeaux",
        type: "workshop",
        description:
          "Hast du dich schon einmal gefragt, wie verschiedene Rhythmen gleichzeitig existieren und dabei eine kraftvolle kollektive Erfahrung schaffen können? Dieser Workshop unter der Leitung von Ángel Candeaux ist eine Einladung, die Magie der afrokubanischen Polyrhythmik und ihre Wirkung auf menschliche Verbindung zu entdecken. Polyrhythmik ist die Kunst, mehrere eigenständige Rhythmen übereinanderzulegen – sie erzeugt eine klangliche Vielfalt und ein einzigartiges Gruppenerlebnis. In der afrokubanischen Tradition spielt jeder Trommler sein eigenes rhythmisches Muster, doch gemeinsam entsteht ein musikalischer Dialog, der zum Zuhören, zur Konzentration und zur kollektiven Kreativität einlädt. Was erwartet dich im Workshop? Erforschung deines inneren Rhythmus: Lerne, deinen eigenen Rhythmus zu halten und gleichzeitig im musikalischen Austausch mit der Gruppe zu bleiben. Authentische Verbindung: Gruppen-Percussion-Übungen stärken die nonverbale Kommunikation und das Gemeinschaftsgefühl. Gleichgewicht zwischen Struktur und Freiheit: Erlebe, wie du dich im kollektiven Puls bewegst – und gleichzeitig den Mut entwickelst, aus dem Muster auszubrechen, um deine Individualität auszudrücken. Momente der Gemeinschaft und der persönlichen Entfaltung: Wechsle zwischen dem gemeinsamen Unisono und dem Raum, deine eigene rhythmische Stimme zu erheben. Förderung kognitiver und emotionaler Fähigkeiten: Verbessere deine Konzentration, Koordination und sensorische Wahrnehmung. Warum solltest du teilnehmen? Du brauchst keine Vorkenntnisse – nur die Lust, dich auf den Rhythmus einzulassen. Du lernst Werkzeuge kennen, um Kommunikation, Empathie und Teamfähigkeit zu stärken. Du machst eine transformierende Erfahrung, die Körper, Geist und Gemeinschaft durch Musik verbindet. Ángel Candeaux lädt dich ein, in die Welt der Polyrhythmik einzutauchen: Eine Reise, bei der jeder Herzschlag zählt – und aus der Vielfalt Harmonie entsteht.",
        image: "/angel-candeaux.jpeg",
        bio: "Ángel Candeaux ist ein Kubaner aus Havanna, der den Rhythmus im Blut und die Neugier im Kopf trägt. Als ausgebildeter Psychologe und leidenschaftlicher Perkussionist bewegt er sich zwischen afrokubanischer Tradition und neuen Wegen, Menschen miteinander zu verbinden – sowohl in Kuba als auch in Europa und den USA. Seit 2006 lebt er in Berlin, wo er nicht nur Trommeln spielt, sondern Räume schafft, in denen Menschen einander begegnen, einander zuhören und ihren eigenen Rhythmus entdecken können. Als Gründer des Projekts „Desapalencao“ gehört Ángel zu jenen, die fest daran glauben, dass Musik nicht nur den Tag – sondern auch das Leben verändern kann. Und dass jeder Mensch einen einzigartigen Puls hat, den er in die Gruppe einbringen kann.",
      },
      {
        time: "13:30",
        event: "Einführung in die Polyrhythmik",
        instructor: "Angel Candeaux",
        type: "workshop",
      },
      {
        time: "14:00",
        event: "Der Clave-Rhythmus",
        instructor: "Guillermo Diaz",
        type: "workshop",
        image: "/guillermo-diaz.jpeg",
        description:
          "Salsa, wie viele andere Musikrichtungen, besteht sowohl aus ihrer Instrumentierung und Interpretation als auch aus dem Hören und Tanzen. Für ihre Interpretation ist das Verständnis der Clave von zentraler Bedeutung, da sich die gesamte Instrumentierung um dieses rhythmische Element dreht. Die Clave ist sozusagen die DNA der Salsa und vieler anderer Musikstile mit stark afrikanischem Ursprung – ein nahezu unverzichtbares, vor allem aber äußerst nützliches Mittel, um Salsa auf jeder Ebene und in jeder Form der Interaktion zu verstehen. In diesem Workshop tauchen wir kurz in das bestgehütete Geheimnis der Salsa ein: die Clave. Ziel des Workshops ist es, ein grundlegendes, aber wesentliches Verständnis zu vermitteln, um diese Musik, die wir so sehr lieben, mit mehr Vertrautheit und Nähe spielen, tanzen und hören zu können. Der Workshop richtet sich sowohl an Anfänger:innen als auch an Personen ohne musikalische Vorkenntnisse. Es wird empfohlen, ein beliebiges Perkussionsinstrument mitzubringen – von Trommeln, Claves und Kuhglocken bis hin zu Tassen, Pfannen oder Holzlöffeln.",
      },
      {
        time: "14:30",
        event: "Der Clave-Rhythmus",
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
    title: "Salsa-Talks",
    slots: [
      { time: "12:30" },
      { time: "13:00" },
      { time: "13:30" },
      {
        time: "14:00",
        event:
          "Geschichten verschmelzen: Persönlicher Stil als Dialog zwischen Tradition und Selbst",
        type: "talk",
        presenter: "Sarah Balzat",
        description:
          "Persönlicher Stil im Tanz entsteht nicht im luftleeren Raum, er wird geschmiedet im Spannungsfeld zwischen individueller und kollektiver Geschichte. Anhand von Salsa erkunden wir, wie Tradition kein starres Erbe ist, sondern ein lebendiger Dialog: zwischen denen, die vor uns getanzt haben, und dem, was wir selbst in uns tragen. Aus diesem Dialog entsteht kein bloßes Nachahmen, sondern ein individueller Ausdruck, der auf Bewusstsein basiert, durch Praxis geformt und von Erinnerung genährt ist.",
      },
      {
        time: "14:30",
        event:
          "Musikstil oder Tanzstil: Beides oder Keines von beiden? Eine Reflexion über die starren Kategorien im Salsa.",
        type: "talk",
        presenter: "Jessi y Vane",
        image: "/jessi.jpeg",
        imageTwo: "/vane.jpg",
        description:
          "Tanzt du Linien-Salsa oder kubanische Salsa? Bevorzugst du Timba, Salsa Dura oder Boogaloo? In der Salsa-Welt scheinen die „Stile“ alles vorzugeben: wie wir tanzen, welche Musik wir hören, sogar wem wir uns zugehörig fühlen. Aber … was, wenn uns diese Kategorien mehr einschränken, als dass sie uns leiten? In diesem Talk eröffnen wir die Debatte: Wie viel unseres Tanzes ist eine Reaktion auf die Musik, wie viel auf die Technik und wie viel auf die Identität? Ist es möglich, sich zwischen den Stilen zu bewegen, ohne an Authentizität zu verlieren? Eine Einladung, die festgefahrenen Vorstellungen über Tanzstile, die an konkrete Musikstile gebunden sind, zu hinterfragen.",
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
        bio: "Es handelt sich um ein Kollektiv von Crate Diggers und Turntable-Enthusiasten aus Kolumbien, das sich zum Ziel gesetzt hat, das analoge Format am Leben zu erhalten und sein Weiterbestehen zu sichern.",
        comment:
          "Dieses Album wurde ausgewählt, weil es die große Vielfalt an Rhythmen zeigt, die in einer Musikproduktion zusammenfließen können. Salsa – wie viele andere Musikrichtungen – ist stark von verschiedenen musikalischen Genres beeinflusst.",
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
        bio: "Ich bin DJ Mc0ld, Teil von Son Obrero. Geboren im Norden von Cali, aufgewachsen zwischen den Vinylplatten meines Vaters und dem Punkrock der Straße. Nach einiger Zeit in Deutschland begann ich, mich wieder mit meinem Viertel und meinen Wurzeln zu verbinden – und dabei entdeckte ich etwas, das mir vorher nicht bewusst war: Wie tief die Salsa in mir verankert ist. Seitdem erkunde ich die tanzbaren Strömungen der lateinamerikanischen Underground-Szene. Mein Set auf Vinyl ist orthodoxe Salsa. Ich lege auch digital auf – aber das ist eine ganz andere Reise.",
        comment:
          "Ich habe das Album Frankie Dante & Orquesta Flamboyán mit Larry Harlow ausgewählt, weil es eine einzigartige Fusion verkörpert: die musikalische Magie von Harlow mit der Rohheit und Rebellion von Frankie Dante – einem Salsero, der sich nie verbiegen ließ. Seine politischen Überzeugungen haben ihm viele Türen verschlossen, aber sein Mut und sein Talent haben andere geöffnet. Dieser rebellische und aufrichtige Geist spiegelt wider, wer ich bin und was ich mit jedem meiner Sets teilen möchte.",
      },
      { time: "17:30" },

      { time: "18:00" },

      {
        time: "18:30",
        event: "Salsancó und die Anfänge der Salsa in Berlin",
        presenter: "tba",
        image: "/salsanco.webp",
        type: "talk",
        description:
          "Eduardo Villegas und Rolo Rodríguez erzählen, wie 1977 das erste Salsa-Orchester in Berlin entstand. Inspiriert von Santana und Eddie Palmieri gründeten sie gemeinsam mit Musikern aus den Big Bands des RIAS und des SFB ihr eigenes Projekt. Sie berichten von den Proben, den ersten Auftritten und dem unverwechselbaren Sound, der die Berliner Clubszene prägte. Ein Gespräch über Pionierarbeit und eine lebendig gelebte Musikszene.",
      },
      {
        time: "19:00",
        event: "Transbarrio-Dialoge: Die afroamerikanischen Wurzeln der Salsa",
        presenter: "Matti Steinitz",
        image: "/matti.webp",
        type: "talk",
        bio: "DJ Matatu alias Dr. Matti Steinitz ist Platten-Sammler und Forscher der Sounds und Bewegungen der afrikanischen Diaspora in Nord-, Mittel- und Südamerika. Vor kurzem ist sein Buch über die transnationalen Dialoge zwischen afro-amerikanischen und afro-lateinamerikanischen Gemeinschaften in der Ära der 1960er und 1970er Jahre erschienen und wie diese sich in der Entstehung von Afro-Latin Soul Szenen in Kontaktzonen wie New York, Panama und Rio de Janeiro manifestiert haben. (https://www.degruyterbrill.com/document/doi/10.1515/9783110665550/html)",
      },

      { time: "19:30" },
      { time: "20:00" },
      { time: "20:30" },
      { time: "21:00" },
      { time: "21:30" },
    ],
  },
];

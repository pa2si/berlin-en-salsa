import React from "react";
import Link from "next/link";
import { Footer as GermanFooter } from "@/components/GermanFooter";
import type { Metadata } from "next";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Datenschutzerklärung von Berlin En Salsa. Informationen zur Verwendung und zum Schutz Ihrer personenbezogenen Daten.",
  alternates: {
    canonical: `${baseUrl}/de/datenschutz`,
    languages: {
      de: `${baseUrl}/de/datenschutz`,
      es: `${baseUrl}/privacidad`,
    },
  },
  openGraph: {
    title: "Datenschutzerklärung",
    url: `${baseUrl}/de/datenschutz`,
  },
};

export default function Datenschutz() {
  return (
    <div className="bg-bes-amber relative flex min-h-screen flex-col">
      {/* Background Logo with low opacity */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src="/bes-logo-color.webp"
          alt=""
          className="h-[80vh] w-auto max-w-none object-contain opacity-[0.03] select-none sm:h-[85vh] md:h-[95vh]"
          aria-hidden="true"
        />
      </div>

      {/* Absolutely positioned back button - hidden on mobile */}
      <Link
        href="/de"
        className="text-bes-red hover:text-bes-red/80 text-md absolute top-6 right-30 hidden items-center sm:flex sm:text-base md:text-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Zurück zur Startseite
      </Link>

      {/* Breadcrumb navigation */}
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  href="/de"
                  className="text-bes-red hover:text-bes-red/80 inline-flex items-center text-sm sm:text-base md:text-lg"
                >
                  <img
                    src="/bes-logo-color.webp"
                    alt="Berlin En Salsa"
                    className="h-20 w-auto sm:h-15"
                  />
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-1 text-gray-500">/</span>
                  <span className="text-bes-purple text-md sm:text-base md:text-xl">
                    Datenschutzerklärung
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto mb-16 px-4 py-8">
        <div className="prose text-bes-purple mx-auto max-w-none">
          <h1 className="text-bes-red mb-8 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
            Datenschutz&shy;erkl&auml;rung
          </h1>

          <p className="text-right text-sm">
            Zuletzt aktualisiert:{" "}
            {new Date().toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            1. Datenschutz auf einen Blick
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen &Uuml;berblick
            dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn
            Sie diese Website besuchen. Personenbezogene Daten sind alle Daten,
            mit denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen.
            Ausf&uuml;hrliche Informationen zum Thema Datenschutz entnehmen Sie
            unserer unter diesem Text aufgef&uuml;hrten
            Datenschutzerkl&auml;rung.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Datenerfassung auf dieser Website
          </h3>
          <h4 className="mt-4 mb-2 text-lg font-bold">
            Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser
            Website?
          </h4>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den
            Websitebetreiber. Dessen Kontaktdaten k&ouml;nnen Sie dem Abschnitt
            &bdquo;Hinweis zur Verantwortlichen Stelle&ldquo; in dieser
            Datenschutzerkl&auml;rung entnehmen.
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            Wie erfassen wir Ihre Daten?
          </h4>
          <p>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
            mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln, die Sie
            in ein Kontaktformular eingeben.
          </p>
          <p>
            Andere Daten werden automatisch oder nach Ihrer Einwilligung beim
            Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
            allem technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem
            oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
            automatisch, sobald Sie diese Website betreten.
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            Wof&uuml;r nutzen wir Ihre Daten?
          </h4>
          <p>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung
            der Website zu gew&auml;hrleisten. Andere Daten k&ouml;nnen zur
            Analyse Ihres Nutzerverhaltens verwendet werden. Sofern &uuml;ber
            die Website Vertr&auml;ge geschlossen oder angebahnt werden
            k&ouml;nnen, werden die &uuml;bermittelten Daten auch f&uuml;r
            Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen
            verarbeitet.
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            Welche Rechte haben Sie bez&uuml;glich Ihrer Daten?
          </h4>
          <p>
            Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber
            Herkunft, Empf&auml;nger und Zweck Ihrer gespeicherten
            personenbezogenen Daten zu erhalten. Sie haben au&szlig;erdem ein
            Recht, die Berichtigung oder L&ouml;schung dieser Daten zu
            verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
            haben, k&ouml;nnen Sie diese Einwilligung jederzeit f&uuml;r die
            Zukunft widerrufen. Au&szlig;erdem haben Sie das Recht, unter
            bestimmten Umst&auml;nden die Einschr&auml;nkung der Verarbeitung
            Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen
            ein Beschwerderecht bei der zust&auml;ndigen Aufsichtsbeh&ouml;rde
            zu.
          </p>
          <p>
            Hierzu sowie zu weiteren Fragen zum Thema Datenschutz k&ouml;nnen
            Sie sich jederzeit an uns wenden.
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            2. Hosting
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">Hosting über Vercel</h3>
          <p>
            Unsere Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut,
            CA 91789, USA, gehostet.
          </p>
          <p>
            Wenn Sie unsere Website besuchen, werden personenbezogene Daten auf
            den Servern von Vercel erfasst. Hierbei kann es sich v. a. um
            IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
            Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige
            Daten handeln, die über eine Website generiert werden.
          </p>
          <p>
            Das Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber
            unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b
            DSGVO) und im Interesse einer sicheren, schnellen und effizienten
            Bereitstellung unseres Online-Angebots durch einen professionellen
            Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            Datenübermittlung in die USA
          </h4>
          <p>
            Vercel ist ein Dienstleister aus den USA. Eine Datenübertragung in
            die USA kann daher nicht ausgeschlossen werden. Wir weisen darauf
            hin, dass nach Meinung des Europäischen Gerichtshofs derzeit kein
            angemessenes Schutzniveau für den Datentransfer in die USA besteht.
            Dies kann für Sie Risiken bezüglich der Rechtmäßigkeit und
            Sicherheit der Datenverarbeitung bedeuten.
          </p>
          <p>
            Als Grundlage für die Datenverarbeitung bei Empfängern mit Sitz in
            Drittstaaten haben wir mit Vercel einen Vertrag zur
            Auftragsverarbeitung (Data Processing Addendum, DPA) geschlossen.
            Dieser Vertrag enthält die von der EU-Kommission genehmigten
            Standardvertragsklauseln (Standard Contractual Clauses – SCCs).
            Durch diese Klauseln verpflichtet sich Vercel, bei der Verarbeitung
            Ihrer Daten das europäische Datenschutzniveau einzuhalten, auch wenn
            die Daten in den USA gespeichert und verarbeitet werden.
          </p>
          <p>
            Den mit uns geschlossenen Vertrag (DPA), der die
            Standardvertragsklauseln enthält, finden Sie unter:{" "}
            <a
              href="https://vercel.com/legal/dpa"
              className="text-bes-red hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://vercel.com/legal/dpa
            </a>
          </p>
          <p>
            Mehr über die Daten, die durch die Nutzung von Vercel verarbeitet
            werden, erfahren Sie in der Datenschutzerklärung von Vercel:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="text-bes-red hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://vercel.com/legal/privacy-policy
            </a>
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            3. Allgemeine Hinweise und Pflicht&shy;informationen
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer
            pers&ouml;nlichen Daten sehr ernst. Wir behandeln Ihre
            personenbezogenen Daten vertraulich und entsprechend den
            gesetzlichen Datenschutzvorschriften sowie dieser
            Datenschutzerkl&auml;rung.
          </p>
          <p>
            Wenn Sie diese Website benutzen, werden verschiedene
            personenbezogene Daten erhoben. Personenbezogene Daten sind Daten,
            mit denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen. Die
            vorliegende Datenschutzerkl&auml;rung erl&auml;utert, welche Daten
            wir erheben und wof&uuml;r wir sie nutzen. Sie erl&auml;utert auch,
            wie und zu welchem Zweck das geschieht.
          </p>
          <p>
            Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet
            (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken
            aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem
            Zugriff durch Dritte ist nicht m&ouml;glich.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Hinweis zur verantwortlichen Stelle
          </h3>
          <p>
            Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser
            Website ist:
          </p>
          <p>
            Paul Welch Guerra
            <br />
            Drorystr. 2
            <br />
            12055 Berlin
          </p>

          <p>
            Telefon: +49 176 47024026
            <br />
            E-Mail: info@berlinensalsa.de
          </p>
          <br />
          <p>
            Verantwortliche Stelle ist die nat&uuml;rliche oder juristische
            Person, die allein oder gemeinsam mit anderen &uuml;ber die Zwecke
            und Mittel der Verarbeitung von personenbezogenen Daten (z.&nbsp;B.
            Namen, E-Mail-Adressen o. &Auml;.) entscheidet.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">Speicherdauer</h3>
          <p>
            Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere
            Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten
            bei uns, bis der Zweck f&uuml;r die Datenverarbeitung entf&auml;llt.
            Wenn Sie ein berechtigtes L&ouml;schersuchen geltend machen oder
            eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre
            Daten gel&ouml;scht, sofern wir keine anderen rechtlich
            zul&auml;ssigen Gr&uuml;nde f&uuml;r die Speicherung Ihrer
            personenbezogenen Daten haben (z.&nbsp;B. steuer- oder
            handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall
            erfolgt die L&ouml;schung nach Fortfall dieser Gr&uuml;nde.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung
            auf dieser Website
          </h3>
          <p>
            Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten
            wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1
            lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere
            Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im
            Falle einer ausdr&uuml;cklichen Einwilligung in die &Uuml;bertragung
            personenbezogener Daten in Drittstaaten erfolgt die
            Datenverarbeitung au&szlig;erdem auf Grundlage von Art. 49 Abs. 1
            lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den
            Zugriff auf Informationen in Ihr Endger&auml;t (z.&nbsp;B. via
            Device-Fingerprinting) eingewilligt haben, erfolgt die
            Datenverarbeitung zus&auml;tzlich auf Grundlage von &sect; 25 Abs. 1
            TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten
            zur Vertragserf&uuml;llung oder zur Durchf&uuml;hrung
            vorvertraglicher Ma&szlig;nahmen erforderlich, verarbeiten wir Ihre
            Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren
            verarbeiten wir Ihre Daten, sofern diese zur Erf&uuml;llung einer
            rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6
            Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage
            unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO
            erfolgen. &Uuml;ber die jeweils im Einzelfall einschl&auml;gigen
            Rechtsgrundlagen wird in den folgenden Abs&auml;tzen dieser
            Datenschutzerkl&auml;rung informiert.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Empf&auml;nger von personenbezogenen Daten
          </h3>
          <p>
            Im Rahmen unserer Gesch&auml;ftst&auml;tigkeit arbeiten wir mit
            verschiedenen externen Stellen zusammen. Dabei ist teilweise auch
            eine &Uuml;bermittlung von personenbezogenen Daten an diese externen
            Stellen erforderlich. Wir geben personenbezogene Daten nur dann an
            externe Stellen weiter, wenn dies im Rahmen einer
            Vertragserf&uuml;llung erforderlich ist, wenn wir gesetzlich hierzu
            verpflichtet sind (z.&nbsp;B. Weitergabe von Daten an
            Steuerbeh&ouml;rden), wenn wir ein berechtigtes Interesse nach Art.
            6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine
            sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz
            von Auftragsverarbeitern geben wir personenbezogene Daten unserer
            Kunden nur auf Grundlage eines g&uuml;ltigen Vertrags &uuml;ber
            Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung
            wird ein Vertrag &uuml;ber gemeinsame Verarbeitung geschlossen.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Widerruf Ihrer Einwilligung zur Datenverarbeitung
          </h3>
          <p>
            Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer
            ausdr&uuml;cklichen Einwilligung m&ouml;glich. Sie k&ouml;nnen eine
            bereits erteilte Einwilligung jederzeit widerrufen. Die
            Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten
            Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen
            sowie gegen Direktwerbung (Art. 21 DSGVO)
          </h3>
          <p className="uppercase">
            WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E
            ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS
            GR&Uuml;NDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN
            DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH
            EINZULEGEN; DIES GILT AUCH F&Uuml;R EIN AUF DIESE BESTIMMUNGEN
            GEST&Uuml;TZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN
            EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER
            DATENSCHUTZERKL&Auml;RUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR
            IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES
            SEI DENN, WIR K&Ouml;NNEN ZWINGENDE SCHUTZW&Uuml;RDIGE GR&Uuml;NDE
            F&Uuml;R DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE
            UND FREIHEITEN &Uuml;BERWIEGEN ODER DIE VERARBEITUNG DIENT DER
            GELTENDMACHUNG, AUS&Uuml;BUNG ODER VERTEIDIGUNG VON
            RECHTSANSPR&Uuml;CHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
          </p>
          <p className="uppercase">
            WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU
            BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE
            VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
            DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH F&Uuml;R DAS
            PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT.
            WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN
            ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET
            (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Beschwerde&shy;recht bei der zust&auml;ndigen
            Aufsichts&shy;beh&ouml;rde
          </h3>
          <p>
            Im Falle von Verst&ouml;&szlig;en gegen die DSGVO steht den
            Betroffenen ein Beschwerderecht bei einer Aufsichtsbeh&ouml;rde,
            insbesondere in dem Mitgliedstaat ihres gew&ouml;hnlichen
            Aufenthalts, ihres Arbeitsplatzes oder des Orts des
            mutma&szlig;lichen Versto&szlig;es zu. Das Beschwerderecht besteht
            unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher
            Rechtsbehelfe.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Recht auf Daten&shy;&uuml;bertrag&shy;barkeit
          </h3>
          <p>
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
            oder in Erf&uuml;llung eines Vertrags automatisiert verarbeiten, an
            sich oder an einen Dritten in einem g&auml;ngigen, maschinenlesbaren
            Format aush&auml;ndigen zu lassen. Sofern Sie die direkte
            &Uuml;bertragung der Daten an einen anderen Verantwortlichen
            verlangen, erfolgt dies nur, soweit es technisch machbar ist.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Auskunft, Berichtigung und L&ouml;schung
          </h3>
          <p>
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen
            jederzeit das Recht auf unentgeltliche Auskunft &uuml;ber Ihre
            gespeicherten personenbezogenen Daten, deren Herkunft und
            Empf&auml;nger und den Zweck der Datenverarbeitung und ggf. ein
            Recht auf Berichtigung oder L&ouml;schung dieser Daten. Hierzu sowie
            zu weiteren Fragen zum Thema personenbezogene Daten k&ouml;nnen Sie
            sich jederzeit an uns wenden.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Recht auf Einschr&auml;nkung der Verarbeitung
          </h3>
          <p>
            Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen. Hierzu k&ouml;nnen Sie sich
            jederzeit an uns wenden. Das Recht auf Einschr&auml;nkung der
            Verarbeitung besteht in folgenden F&auml;llen:
          </p>
          <ul className="my-4 list-disc pl-6">
            <li>
              Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten
              personenbezogenen Daten bestreiten, ben&ouml;tigen wir in der
              Regel Zeit, um dies zu &uuml;berpr&uuml;fen. F&uuml;r die Dauer
              der Pr&uuml;fung haben Sie das Recht, die Einschr&auml;nkung der
              Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </li>
            <li>
              Wenn die Verarbeitung Ihrer personenbezogenen Daten
              unrechtm&auml;&szlig;ig geschah/geschieht, k&ouml;nnen Sie statt
              der L&ouml;schung die Einschr&auml;nkung der Datenverarbeitung
              verlangen.
            </li>
            <li>
              Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen,
              Sie sie jedoch zur Aus&uuml;bung, Verteidigung oder Geltendmachung
              von Rechtsanspr&uuml;chen ben&ouml;tigen, haben Sie das Recht,
              statt der L&ouml;schung die Einschr&auml;nkung der Verarbeitung
              Ihrer personenbezogenen Daten zu verlangen.
            </li>
            <li>
              Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt
              haben, muss eine Abw&auml;gung zwischen Ihren und unseren
              Interessen vorgenommen werden. Solange noch nicht feststeht,
              wessen Interessen &uuml;berwiegen, haben Sie das Recht, die
              Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten
              zu verlangen.
            </li>
          </ul>
          <p>
            Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
            eingeschr&auml;nkt haben, d&uuml;rfen diese Daten &ndash; von ihrer
            Speicherung abgesehen &ndash; nur mit Ihrer Einwilligung oder zur
            Geltendmachung, Aus&uuml;bung oder Verteidigung von
            Rechtsanspr&uuml;chen oder zum Schutz der Rechte einer anderen
            nat&uuml;rlichen oder juristischen Person oder aus Gr&uuml;nden
            eines wichtigen &ouml;ffentlichen Interesses der Europ&auml;ischen
            Union oder eines Mitgliedstaats verarbeitet werden.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            SSL- bzw. TLS-Verschl&uuml;sselung
          </h3>
          <p>
            Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der
            &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel
            Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber
            senden, eine SSL- bzw. TLS-Verschl&uuml;sselung. Eine
            verschl&uuml;sselte Verbindung erkennen Sie daran, dass die
            Adresszeile des Browsers von &bdquo;http://&ldquo; auf
            &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer
            Browserzeile.
          </p>
          <p>
            Wenn die SSL- bzw. TLS-Verschl&uuml;sselung aktiviert ist,
            k&ouml;nnen die Daten, die Sie an uns &uuml;bermitteln, nicht von
            Dritten mitgelesen werden.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Widerspruch gegen Werbe-E-Mails
          </h3>
          <p>
            Der Nutzung von im Rahmen der Impressumspflicht
            ver&ouml;ffentlichten Kontaktdaten zur &Uuml;bersendung von nicht
            ausdr&uuml;cklich angeforderter Werbung und Informationsmaterialien
            wird hiermit widersprochen. Die Betreiber der Seiten behalten sich
            ausdr&uuml;cklich rechtliche Schritte im Falle der unverlangten
            Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            4. Datenerfassung auf dieser Website
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
            Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
            angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und f&uuml;r
            den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
            wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs.
            1 lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung eines
            Vertrags zusammenh&auml;ngt oder zur Durchf&uuml;hrung
            vorvertraglicher Ma&szlig;nahmen erforderlich ist. In allen
            &uuml;brigen F&auml;llen beruht die Verarbeitung auf unserem
            berechtigten Interesse an der effektiven Bearbeitung der an uns
            gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
            Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt
            wurde; die Einwilligung ist jederzeit widerrufbar.
          </p>
          <p>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei
            uns, bis Sie uns zur L&ouml;schung auffordern, Ihre Einwilligung zur
            Speicherung widerrufen oder der Zweck f&uuml;r die Datenspeicherung
            entf&auml;llt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihrer
            Anfrage). Zwingende gesetzliche Bestimmungen &ndash; insbesondere
            Aufbewahrungsfristen &ndash; bleiben unber&uuml;hrt.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Anfrage per E-Mail, Telefon oder Telefax
          </h3>
          <p>
            Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird
            Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen
            Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei
            uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne
            Ihre Einwilligung weiter.
          </p>
          <p>
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs.
            1 lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung eines
            Vertrags zusammenh&auml;ngt oder zur Durchf&uuml;hrung
            vorvertraglicher Ma&szlig;nahmen erforderlich ist. In allen
            &uuml;brigen F&auml;llen beruht die Verarbeitung auf unserem
            berechtigten Interesse an der effektiven Bearbeitung der an uns
            gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
            Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt
            wurde; die Einwilligung ist jederzeit widerrufbar.
          </p>
          <p>
            Die von Ihnen an uns per Kontaktanfragen &uuml;bersandten Daten
            verbleiben bei uns, bis Sie uns zur L&ouml;schung auffordern, Ihre
            Einwilligung zur Speicherung widerrufen oder der Zweck f&uuml;r die
            Datenspeicherung entf&auml;llt (z.&nbsp;B. nach abgeschlossener
            Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen
            &ndash; insbesondere gesetzliche Aufbewahrungsfristen &ndash;
            bleiben unber&uuml;hrt.
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            5. Newsletterversand via Mailchimp
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">
            1. Beschreibung und Zweck der Datenverarbeitung
          </h3>
          <p>
            Für den Versand unseres Newsletters nutzen wir den Dienst
            &ldquo;Mailchimp&rdquo;, eine Newsletter-Versandplattform des
            US-Anbieters The Rocket Science Group, LLC, 675 Ponce de Leon Ave
            NE, Suite 5000, Atlanta, GA 30308, USA.
          </p>
          <p>
            Wenn Sie sich für unseren Newsletter anmelden, werden die von Ihnen
            im Anmeldeformular angegebenen Daten (in der Regel Ihre
            E-Mail-Adresse und optional Ihr Name) an die Server von Mailchimp in
            den USA übertragen und dort gespeichert.
          </p>
          <p>
            Zusätzlich zum Versand ermöglicht uns Mailchimp, den Erfolg unserer
            Newsletter-Kampagnen zu analysieren. So können wir sehen, ob eine
            Newsletter-Nachricht geöffnet und welche Links ggf. geklickt wurden.
            Diese Informationen helfen uns zu erkennen, welche Inhalte für
            unsere Leser besonders interessant sind und unseren Service stetig
            zu verbessern. Mailchimp nutzt diese Daten auch zur eigenen
            Serviceverbesserung. Eine Nutzung Ihrer Daten durch Mailchimp, um
            Sie direkt anzuschreiben oder an Dritte weiterzugeben, erfolgt
            nicht.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">2. Rechtsgrundlage</h3>
          <p>
            Der Versand des Newsletters und die damit verbundene Erfolgsmessung
            erfolgen auf Grundlage Ihrer ausdrücklichen Einwilligung gemäß Art.
            6 Abs. 1 lit. a DSGVO. Die Anmeldung zu unserem Newsletter erfolgt
            in einem sog. Double-Opt-In-Verfahren. Das heißt, Sie erhalten nach
            der Anmeldung eine E-Mail, in der Sie um die Bestätigung Ihrer
            Anmeldung gebeten werden. Diese Bestätigung ist notwendig, damit
            sich niemand mit fremden E-Mail-Adressen anmelden kann.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            3. Auftragsverarbeitungsvertrag
          </h3>
          <p>
            Wir haben mit Mailchimp einen sogenannten &ldquo;Data Processing
            Addendum&rdquo; (DPA) abgeschlossen. Hierbei handelt es sich um
            einen Vertrag, in dem sich Mailchimp verpflichtet, die Daten unserer
            Nutzer zu schützen, entsprechend dessen Datenschutzbestimmungen in
            unserem Auftrag zu verarbeiten und insbesondere nicht an Dritte
            weiterzugeben. Dieser Vertrag stellt sicher, dass Mailchimp sich an
            die europäischen Datenschutzstandards hält.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            4. Datenübertragung in die USA
          </h3>
          <p>
            Die Datenverarbeitung durch Mailchimp findet in den USA statt, einem
            Drittland ohne von der EU-Kommission anerkanntes angemessenes
            Datenschutzniveau. Um den Schutz Ihrer personenbezogenen Daten
            dennoch zu gewährleisten, stützt sich die Datenübermittlung auf die
            von der EU-Kommission genehmigten Standardvertragsklauseln (Standard
            Contractual Clauses – SCCs), die Bestandteil des mit Mailchimp
            geschlossenen DPA sind. Damit verpflichtet sich Mailchimp, bei der
            Verarbeitung Ihrer Daten das europäische Datenschutzniveau
            einzuhalten.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">5. Speicherdauer</h3>
          <p>
            Die von Ihnen zum Zwecke des Newsletterbezugs bei uns hinterlegten
            Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter
            gespeichert und nach der Abbestellung des Newsletters sowohl von
            unseren Servern als auch von den Servern von Mailchimp gelöscht.
            Daten, die zu anderen Zwecken bei uns gespeichert wurden, bleiben
            hiervon unberührt.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">6. Widerrufsrecht</h3>
          <p>
            Ihre Einwilligung in den Empfang des Newsletters und die damit
            verbundene Datenverarbeitung können Sie jederzeit für die Zukunft
            widerrufen. Den Widerruf können Sie durch Klick auf den in jedem
            Newsletter bereitgestellten &ldquo;Abmelden&rdquo;-Link, per E-Mail
            an info@beispielfirma.de oder durch eine Nachricht an die im
            Impressum angegebenen Kontaktdaten erklären. Durch den Widerruf der
            Einwilligung wird die Rechtmäßigkeit der aufgrund der Einwilligung
            bis zum Widerruf erfolgten Verarbeitung nicht berührt.
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            6. Schriftarten
          </h2>
          <p>
            Diese Website verwendet die folgenden Open-Source-Schriftarten, um
            die visuelle Darstellung der Inhalte zu verbessern. Diese
            Schriftarten werden vom Server geladen und unterliegen der im
            Folgenden detailliert beschriebenen Lizenz.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Verwendete Schriftarten:
          </h3>
          <ul className="my-4 list-disc pl-6">
            <li>
              <strong>Poppins:</strong> Copyright 2022 The Poppins Project
              Authors (https://github.com/itfoundry/poppins)
            </li>
            <li>
              <strong>Instrument Serif:</strong> Copyright 2022 The Instrument
              Serif Project Authors
              (https://github.com/Instrument/instrument-serif)
            </li>
          </ul>

          <p>
            Beide Schriftarten sind unter der SIL Open Font License, Version
            1.1, lizenziert. Nachfolgend finden Sie den vollständigen und
            originalen Lizenztext in englischer Sprache.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
          </h3>

          <h4 className="mt-4 mb-2 text-lg font-bold">PREAMBLE</h4>
          <p>
            The goals of the Open Font License (OFL) are to stimulate worldwide
            development of collaborative font projects, to support the font
            creation efforts of academic and linguistic communities, and to
            provide a free and open framework in which fonts may be shared and
            improved in partnership with others.
          </p>
          <p>
            The OFL allows the licensed fonts to be used, studied, modified and
            redistributed freely as long as they are not sold by themselves. The
            fonts, including any derivative works, can be bundled, embedded,
            redistributed and/or sold with any software provided that any
            reserved names are not used by derivative works. The fonts and
            derivatives, however, cannot be released under any other type of
            license. The requirement for fonts to remain under this license does
            not apply to any document created using the fonts or their
            derivatives.
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">DEFINITIONS</h4>
          <p>
            &ldquo;Font Software&rdquo; refers to the set of files released by
            the Copyright Holder(s) under this license and clearly marked as
            such. This may include source files, build scripts and
            documentation.
          </p>
          <p>
            &ldquo;Reserved Font Name&rdquo; refers to any names specified as
            such after the copyright statement(s).
          </p>
          <p>
            &ldquo;Original Version&rdquo; refers to the collection of Font
            Software components as distributed by the Copyright Holder(s).
          </p>
          <p>
            &ldquo;Modified Version&rdquo; refers to any derivative made by
            adding to, deleting, or substituting -- in part or in whole -- any
            of the components of the Original Version, by changing formats or by
            porting the Font Software to a new environment.
          </p>
          <p>
            &ldquo;Author&rdquo; refers to any designer, engineer, programmer,
            technical writer or other person who contributed to the Font
            Software.
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            PERMISSION &amp; CONDITIONS
          </h4>
          <p>
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of the Font Software, to use, study, copy, merge,
            embed, modify, redistribute, and sell modified and unmodified copies
            of the Font Software, subject to the following conditions:
          </p>
          <ol className="my-4 list-decimal pl-6">
            <li>
              Neither the Font Software nor any of its individual components, in
              Original or Modified Versions, may be sold by itself.
            </li>
            <li>
              Original or Modified Versions of the Font Software may be bundled,
              redistributed and/or sold with any software, provided that each
              copy contains the above copyright notice and this license. These
              can be included either as stand-alone text files, human-readable
              headers or in the appropriate machine-readable metadata fields
              within text or binary files as long as those fields can be easily
              viewed by the user.
            </li>
            <li>
              No Modified Version of the Font Software may use the Reserved Font
              Name(s) unless explicit written permission is granted by the
              corresponding Copyright Holder. This restriction only applies to
              the primary font name as presented to the users.
            </li>
            <li>
              The name(s) of the Copyright Holder(s) or the Author(s) of the
              Font Software shall not be used to promote, endorse or advertise
              any Modified Version, except to acknowledge the contribution(s) of
              the Copyright Holder(s) and the Author(s) or with their explicit
              written permission.
            </li>
            <li>
              The Font Software, modified or unmodified, in part or in whole,
              must be distributed entirely under this license, and must not be
              distributed under any other license. The requirement for fonts to
              remain under this license does not apply to any document created
              using the Font Software.
            </li>
          </ol>

          <h4 className="mt-4 mb-2 text-lg font-bold">TERMINATION</h4>
          <p>
            This license becomes null and void if any of the above conditions
            are not met.
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">DISCLAIMER</h4>
          <p className="uppercase">
            THE FONT SOFTWARE IS PROVIDED &ldquo;AS IS&rdquo;, WITHOUT WARRANTY
            OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN
            NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES
            OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT,
            INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF
            CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR
            INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE
            FONT SOFTWARE.
          </p>

          <p className="mt-8 text-right">
            Quelle:{" "}
            <a
              href="https://www.e-recht24.de"
              className="text-bes-red hover:underline"
            >
              https://www.e-recht24.de
            </a>
          </p>

          <p className="mt-8 text-right">
            Weitere Informationen zum Datenschutz bei Mailchimp finden Sie in
            deren Datenschutzbestimmungen unter:{" "}
            <a
              href="https://mailchimp.com/legal/privacy/"
              className="text-bes-red hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://mailchimp.com/legal/privacy/
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <GermanFooter />
    </div>
  );
}

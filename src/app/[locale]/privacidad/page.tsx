import React from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Política de Privacidad de Berlin En Salsa. Información sobre cómo usamos y protegemos tus datos personales.",
  alternates: {
    canonical: `${baseUrl}/privacidad`,
    languages: {
      de: `${baseUrl}/de/datenschutz`,
      es: `${baseUrl}/privacidad`,
    },
  },
  openGraph: {
    title: "Política de Privacidad",
    url: `${baseUrl}/privacidad`,
  },
};

export default function Privacidad() {
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
        href="/"
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
        Volver a Inicio
      </Link>

      {/* Breadcrumb navigation */}
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  href="/"
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
                    Política de Privacidad
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
            Política de Privacidad
          </h1>

          <p className="text-right text-sm">
            Última actualización: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            1. Privacidad de un vistazo
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">Información general</h3>
          <p>
            Las siguientes notas proporcionan una visión general sencilla de lo
            que sucede con sus datos personales cuando visita este sitio web.
            Los datos personales son todos aquellos mediante los cuales usted
            puede ser identificado personalmente. Encontrará información
            detallada sobre la protección de datos en nuestra política de
            privacidad que figura a continuación de este texto.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Recopilación de datos en este sitio web
          </h3>
          <h4 className="mt-4 mb-2 text-lg font-bold">
            ¿Quién es responsable de la recopilación de datos en este sitio web?
          </h4>
          <p>
            El tratamiento de datos en este sitio web lo realiza el operador del
            sitio web. Puede encontrar sus datos de contacto en la sección
            &ldquo;Información sobre la entidad responsable&rdquo; de esta
            política de privacidad.
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            ¿Cómo recopilamos sus datos?
          </h4>
          <p>
            Por un lado, sus datos se recopilan cuando usted nos los
            proporciona. Esto puede ser, por ejemplo, datos que introduce en un
            formulario de contacto.
          </p>
          <p>
            Otros datos son recopilados automáticamente o con su consentimiento
            por nuestros sistemas informáticos cuando visita el sitio web. Se
            trata principalmente de datos técnicos (por ejemplo, navegador de
            Internet, sistema operativo o hora de acceso a la página). Estos
            datos se recopilan automáticamente en cuanto accede a este sitio
            web.
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            ¿Para qué utilizamos sus datos?
          </h4>
          <p>
            Parte de los datos se recogen para garantizar que el sitio web se
            proporcione sin errores. Otros datos pueden utilizarse para analizar
            su comportamiento como usuario. Si a través del sitio web se pueden
            celebrar o iniciar contratos, los datos transmitidos también se
            tratarán para ofertas contractuales, pedidos u otras solicitudes de
            servicio.
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            ¿Qué derechos tiene con respecto a sus datos?
          </h4>
          <p>
            Tiene derecho, en cualquier momento y de forma gratuita, a recibir
            información sobre el origen, el destinatario y la finalidad de sus
            datos personales almacenados. También tiene derecho a solicitar la
            rectificación o supresión de estos datos. Si ha dado su
            consentimiento para el tratamiento de datos, puede revocarlo en
            cualquier momento con efecto futuro. También tiene derecho, en
            determinadas circunstancias, a solicitar la limitación del
            tratamiento de sus datos personales. Además, tiene derecho a
            presentar una reclamación ante la autoridad de control competente.
          </p>
          <p>
            Si tiene alguna pregunta sobre este tema o sobre la protección de
            datos, puede ponerse en contacto con nosotros en cualquier momento.
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            2. Alojamiento
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">
            Alojamiento a través de Vercel
          </h3>
          <p>
            Nuestro sitio web está alojado en Vercel Inc., 340 S Lemon Ave
            #4133, Walnut, CA 91789, EE.UU.
          </p>
          <p>
            Cuando visita nuestro sitio web, sus datos personales se recogen en
            los servidores de Vercel. Esto puede incluir direcciones IP,
            solicitudes de contacto, metadatos y datos de comunicación, datos
            contractuales, datos de contacto, nombres, accesos al sitio web y
            otros datos generados a través de un sitio web.
          </p>
          <p>
            El alojamiento se realiza con el fin de cumplir un contrato con
            nuestros clientes potenciales y existentes (Art. 6 Apdo. 1 lit. b
            RGPD) y en interés de proporcionar nuestros servicios en línea de
            forma segura, rápida y eficiente a través de un proveedor
            profesional (Art. 6 Apdo. 1 lit. f RGPD).
          </p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            Transferencia de datos a EE.UU.
          </h4>
          <p>
            Vercel es un proveedor de servicios con sede en EE.UU. Por lo tanto,
            no se puede excluir la transferencia de datos a EE.UU. Debemos
            señalar que, en opinión del Tribunal de Justicia Europeo,
            actualmente no existe un nivel adecuado de protección para la
            transferencia de datos a EE.UU. Esto puede suponer riesgos para
            usted en cuanto a la legalidad y seguridad del tratamiento de datos.
          </p>
          <p>
            Como base para el tratamiento de datos por parte de destinatarios
            ubicados en terceros países, hemos firmado un contrato de
            procesamiento de datos (Data Processing Addendum, DPA) con Vercel.
            Este contrato contiene las cláusulas contractuales estándar
            (Standard Contractual Clauses - SCCs) aprobadas por la Comisión
            Europea. Mediante estas cláusulas, Vercel se compromete a cumplir
            con el nivel europeo de protección de datos al procesar sus datos,
            incluso si estos se almacenan y procesan en EE.UU.
          </p>
          <p>
            El contrato (DPA) que contiene las cláusulas contractuales estándar
            firmado con nosotros puede encontrarse en:{" "}
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
            Puede obtener más información sobre los datos que se procesan al
            utilizar Vercel en la política de privacidad de Vercel:{" "}
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
            3. Información general y obligatoria
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">Protección de datos</h3>
          <p>
            Los operadores de este sitio web toman muy en serio la protección de
            sus datos personales. Tratamos sus datos personales de forma
            confidencial y de acuerdo con las regulaciones legales de protección
            de datos y esta política de privacidad.
          </p>
          <p>
            Cuando utiliza este sitio web, se recopilan diversos datos
            personales. Los datos personales son datos que permiten
            identificarle personalmente. Esta política de privacidad explica qué
            datos recopilamos y para qué los utilizamos. También explica cómo y
            con qué propósito se hace.
          </p>
          <p>
            Señalamos que la transmisión de datos en Internet (por ejemplo, la
            comunicación por correo electrónico) puede tener fallos de
            seguridad. No es posible una protección completa de los datos contra
            el acceso de terceros.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Información sobre la entidad responsable
          </h3>
          <p>
            La entidad responsable del tratamiento de datos en este sitio web
            es:
          </p>
          <p>
            Paul Welch Guerra
            <br />
            Drorystr. 2
            <br />
            12055 Berlin
          </p>

          <p>
            Teléfono: +49 176 47024026
            <br />
            Correo electrónico: info@berlinensalsa.de
          </p>
          <p>
            La entidad responsable es la persona física o jurídica que, sola o
            junto con otras, determina los fines y medios del tratamiento de
            datos personales (como nombres, direcciones de correo electrónico,
            etc.).
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Periodo de almacenamiento
          </h3>
          <p>
            A menos que se indique un periodo específico de almacenamiento en
            esta política de privacidad, sus datos personales permanecerán con
            nosotros hasta que se cumpla la finalidad para la que se procesan.
            Si presenta una solicitud legítima de eliminación o revoca su
            consentimiento para el procesamiento de datos, sus datos serán
            eliminados, a menos que tengamos otros motivos legalmente
            permisibles para almacenar sus datos personales (por ejemplo,
            períodos de retención fiscales o comerciales); en este último caso,
            la eliminación se llevará a cabo después de que estos motivos dejen
            de existir.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Información general sobre las bases jurídicas del procesamiento de
            datos en este sitio web
          </h3>
          <p>
            Si usted ha consentido al procesamiento de datos, procesamos sus
            datos personales sobre la base del Art. 6 Párr. 1 lit. a RGPD o Art.
            9 Párr. 2 lit. a RGPD, si se procesan categorías especiales de datos
            según el Art. 9 Párr. 1 RGPD. En caso de consentimiento expreso para
            la transferencia de datos personales a terceros países, el
            procesamiento de datos también se basa en el Art. 49 Párr. 1 lit. a
            RGPD. Si ha dado su consentimiento para el almacenamiento de cookies
            o el acceso a información en su dispositivo (por ejemplo, a través
            de la huella digital del dispositivo), el procesamiento de datos se
            realizará adicionalmente sobre la base del § 25 Párr. 1 TDDDG. El
            consentimiento puede ser revocado en cualquier momento. Si sus datos
            son necesarios para el cumplimiento de un contrato o para la
            ejecución de medidas precontractuales, procesamos sus datos en base
            al Art. 6 Párr. 1 lit. b RGPD. Además, procesamos sus datos si son
            necesarios para el cumplimiento de una obligación legal en base al
            Art. 6 Párr. 1 lit. c RGPD. El procesamiento de datos también puede
            realizarse en base a nuestro interés legítimo según el Art. 6 Párr.
            1 lit. f RGPD. Se le informará sobre las bases jurídicas específicas
            aplicables en cada caso en los siguientes párrafos de esta política
            de privacidad.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Destinatarios de datos personales
          </h3>
          <p>
            En el curso de nuestras actividades comerciales, trabajamos con
            varias entidades externas. Esto a veces también requiere la
            transferencia de datos personales a estas entidades externas. Solo
            transferimos datos personales a entidades externas si es necesario
            en el marco del cumplimiento de un contrato, si estamos legalmente
            obligados a hacerlo (por ejemplo, transferencia de datos a las
            autoridades fiscales), si tenemos un interés legítimo en la
            transferencia según el Art. 6 Párr. 1 lit. f RGPD, o si otra base
            legal permite la transferencia de datos. Al utilizar procesadores,
            solo transferimos datos personales de nuestros clientes sobre la
            base de un contrato válido de procesamiento de datos. En el caso de
            procesamiento conjunto, se celebra un contrato de procesamiento
            conjunto.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Revocación de su consentimiento para el procesamiento de datos
          </h3>
          <p>
            Muchas operaciones de procesamiento de datos solo son posibles con
            su consentimiento expreso. Puede revocar un consentimiento ya
            otorgado en cualquier momento. La legalidad del procesamiento de
            datos realizado hasta la revocación no se ve afectada por esta.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Derecho de oposición a la recopilación de datos en casos especiales
            y a la publicidad directa (Art. 21 RGPD)
          </h3>
          <p className="uppercase">
            SI EL PROCESAMIENTO DE DATOS SE REALIZA SOBRE LA BASE DEL ART. 6
            PÁRR. 1 LIT. E O F RGPD, USTED TIENE DERECHO A OPONERSE EN CUALQUIER
            MOMENTO, POR MOTIVOS DERIVADOS DE SU SITUACIÓN PARTICULAR, AL
            PROCESAMIENTO DE SUS DATOS PERSONALES; ESTO TAMBIÉN SE APLICA A LA
            ELABORACIÓN DE PERFILES BASADA EN ESTAS DISPOSICIONES. LAS
            RESPECTIVAS BASES JURÍDICAS EN LAS QUE SE BASA UN PROCESAMIENTO SE
            PUEDEN ENCONTRAR EN ESTA POLÍTICA DE PRIVACIDAD. SI USTED SE OPONE,
            NO PROCESAREMOS MÁS SUS DATOS PERSONALES AFECTADOS A MENOS QUE
            PODAMOS DEMOSTRAR MOTIVOS LEGÍTIMOS CONVINCENTES PARA EL
            PROCESAMIENTO QUE PREVALEZCAN SOBRE SUS INTERESES, DERECHOS Y
            LIBERTADES, O EL PROCESAMIENTO SIRVA PARA LA AFIRMACIÓN, EJERCICIO O
            DEFENSA DE RECLAMACIONES LEGALES (OPOSICIÓN SEGÚN EL ART. 21 PÁRR. 1
            RGPD).
          </p>
          <p className="uppercase">
            SI SUS DATOS PERSONALES SON PROCESADOS CON FINES DE PUBLICIDAD
            DIRECTA, TIENE DERECHO A OPONERSE EN CUALQUIER MOMENTO AL
            PROCESAMIENTO DE SUS DATOS PERSONALES CON FINES DE DICHA PUBLICIDAD;
            ESTO TAMBIÉN SE APLICA A LA ELABORACIÓN DE PERFILES EN LA MEDIDA EN
            QUE ESTÉ RELACIONADA CON DICHA PUBLICIDAD DIRECTA. SI USTED SE
            OPONE, SUS DATOS PERSONALES NO SERÁN UTILIZADOS POSTERIORMENTE PARA
            PUBLICIDAD DIRECTA (OPOSICIÓN SEGÚN ART. 21 PÁRR. 2 RGPD).
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Derecho de reclamación ante la autoridad supervisora competente
          </h3>
          <p>
            En caso de infracciones del RGPD, los afectados tienen derecho a
            presentar una reclamación ante una autoridad de control, en
            particular en el Estado miembro de su residencia habitual, su lugar
            de trabajo o el lugar de la presunta infracción. Este derecho de
            reclamación existe sin perjuicio de otros recursos administrativos o
            judiciales.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Derecho a la portabilidad de datos
          </h3>
          <p>
            Tiene derecho a que los datos que procesamos automáticamente en base
            a su consentimiento o en cumplimiento de un contrato le sean
            entregados a usted o a un tercero en un formato común y legible por
            máquina. Si solicita la transferencia directa de los datos a otro
            responsable, esto solo se hará en la medida en que sea técnicamente
            posible.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Información, rectificación y supresión
          </h3>
          <p>
            Dentro del marco de las disposiciones legales aplicables, tiene en
            todo momento el derecho a recibir información gratuita sobre sus
            datos personales almacenados, su origen y destinatario y la
            finalidad del procesamiento de datos y, si procede, el derecho a la
            rectificación o supresión de estos datos. Para ello, así como para
            otras cuestiones relativas a los datos personales, puede ponerse en
            contacto con nosotros en cualquier momento.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Derecho a la limitación del procesamiento
          </h3>
          <p>
            Tiene derecho a solicitar la limitación del procesamiento de sus
            datos personales. Para ello, puede ponerse en contacto con nosotros
            en cualquier momento. El derecho a la limitación del procesamiento
            existe en los siguientes casos:
          </p>
          <ul className="my-4 list-disc pl-6">
            <li>
              Si usted cuestiona la exactitud de sus datos personales
              almacenados por nosotros, generalmente necesitamos tiempo para
              verificarlos. Durante el período de verificación, tiene derecho a
              solicitar la limitación del procesamiento de sus datos personales.
            </li>
            <li>
              Si el procesamiento de sus datos personales se realizó/realiza
              ilegalmente, puede solicitar la limitación del procesamiento de
              datos en lugar de la eliminación.
            </li>
            <li>
              Si ya no necesitamos sus datos personales, pero usted los necesita
              para ejercer, defender o hacer valer reclamaciones legales, tiene
              derecho a solicitar la limitación del procesamiento de sus datos
              personales en lugar de la eliminación.
            </li>
            <li>
              Si ha presentado una objeción según el Art. 21 Párr. 1 RGPD, debe
              hacerse una ponderación entre sus intereses y los nuestros.
              Mientras no se haya determinado de quién son los intereses
              prevalentes, tiene derecho a exigir la limitación del
              procesamiento de sus datos personales.
            </li>
          </ul>
          <p>
            Si ha restringido el procesamiento de sus datos personales, estos
            datos -aparte de su almacenamiento- solo podrán procesarse con su
            consentimiento o para el establecimiento, ejercicio o defensa de
            reclamaciones legales o para la protección de los derechos de otra
            persona física o jurídica o por razones de interés público
            importante de la Unión Europea o de un Estado miembro.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">Cifrado SSL o TLS</h3>
          <p>
            Por razones de seguridad y para proteger la transmisión de
            contenidos confidenciales, como pedidos o consultas que nos envía
            como operador del sitio, este sitio utiliza cifrado SSL o TLS. Puede
            reconocer una conexión cifrada porque la línea de dirección del
            navegador cambia de &ldquo;http://&rdquo; a &ldquo;https://&rdquo; y
            por el símbolo de candado en la línea de su navegador.
          </p>
          <p>
            Si el cifrado SSL o TLS está activado, los datos que nos transmite
            no pueden ser leídos por terceros.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Oposición a los correos electrónicos publicitarios
          </h3>
          <p>
            Por la presente nos oponemos al uso de los datos de contacto
            publicados en el marco de la obligación de pie de imprenta para el
            envío de material publicitario e informativo no solicitado
            expresamente. Los operadores de este sitio se reservan expresamente
            el derecho a emprender acciones legales en caso de envío no
            solicitado de información publicitaria, por ejemplo, mediante
            correos electrónicos spam.
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            4. Recopilación de datos en este sitio web
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">
            Formulario de contacto
          </h3>
          <p>
            Si nos envía consultas a través del formulario de contacto, sus
            datos del formulario de solicitud, incluidos los datos de contacto
            que proporcionó allí, se almacenarán con nosotros para procesar la
            consulta y en caso de preguntas adicionales. No compartimos estos
            datos sin su consentimiento.
          </p>
          <p>
            El procesamiento de estos datos se basa en el Art. 6 Párr. 1 lit. b
            RGPD, si su solicitud está relacionada con el cumplimiento de un
            contrato o es necesaria para la ejecución de medidas
            precontractuales. En todos los demás casos, el procesamiento se basa
            en nuestro interés legítimo en el procesamiento efectivo de las
            solicitudes dirigidas a nosotros (Art. 6 Párr. 1 lit. f RGPD) o en
            su consentimiento (Art. 6 Párr. 1 lit. a RGPD) si se ha solicitado;
            el consentimiento puede ser revocado en cualquier momento.
          </p>
          <p>
            Los datos que introduce en el formulario de contacto permanecerán
            con nosotros hasta que nos solicite su eliminación, revoque su
            consentimiento al almacenamiento o la finalidad del almacenamiento
            de datos deje de aplicarse (por ejemplo, después de completar el
            procesamiento de su solicitud). Las disposiciones legales
            obligatorias -en particular los períodos de retención- no se ven
            afectadas.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            Consulta por correo electrónico, teléfono o fax
          </h3>
          <p>
            Si se pone en contacto con nosotros por correo electrónico, teléfono
            o fax, su solicitud, incluidos todos los datos personales
            resultantes (nombre, solicitud) se almacenarán y procesarán por
            nosotros con el fin de procesar su solicitud. No compartimos estos
            datos sin su consentimiento.
          </p>
          <p>
            El procesamiento de estos datos se basa en el Art. 6 Párr. 1 lit. b
            RGPD, si su solicitud está relacionada con el cumplimiento de un
            contrato o es necesaria para la ejecución de medidas
            precontractuales. En todos los demás casos, el procesamiento se basa
            en nuestro interés legítimo en el procesamiento efectivo de las
            solicitudes dirigidas a nosotros (Art. 6 Párr. 1 lit. f RGPD) o en
            su consentimiento (Art. 6 Párr. 1 lit. a RGPD) si se ha solicitado;
            el consentimiento puede ser revocado en cualquier momento.
          </p>
          <p>
            Los datos que nos envía a través de solicitudes de contacto
            permanecerán con nosotros hasta que nos solicite su eliminación,
            revoque su consentimiento al almacenamiento o la finalidad del
            almacenamiento de datos deje de aplicarse (por ejemplo, después de
            completar el procesamiento de su solicitud). Las disposiciones
            legales obligatorias -en particular los períodos legales de
            retención- no se ven afectadas.
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            5. Envío de boletines a través de Mailchimp
          </h2>
          <h3 className="mt-6 mb-2 text-xl font-bold">
            1. Descripción y propósito del procesamiento de datos
          </h3>
          <p>
            Para el envío de nuestro boletín utilizamos el servicio
            &ldquo;Mailchimp&rdquo;, una plataforma de envío de boletines del
            proveedor estadounidense The Rocket Science Group, LLC, 675 Ponce de
            Leon Ave NE, Suite 5000, Atlanta, GA 30308, EE.UU.
          </p>
          <p>
            Cuando se suscribe a nuestro boletín, los datos que proporciona en
            el formulario de registro (normalmente su dirección de correo
            electrónico y opcionalmente su nombre) se transfieren a los
            servidores de Mailchimp en EE.UU. y se almacenan allí.
          </p>
          <p>
            Además del envío, Mailchimp nos permite analizar el éxito de
            nuestras campañas de boletín. Así podemos ver si un mensaje de
            boletín ha sido abierto y qué enlaces se han clicado. Esta
            información nos ayuda a reconocer qué contenidos son especialmente
            interesantes para nuestros lectores y a mejorar continuamente
            nuestro servicio. Mailchimp también utiliza estos datos para mejorar
            su propio servicio. Mailchimp no utiliza sus datos para contactarle
            directamente o para transferirlos a terceros.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">2. Base legal</h3>
          <p>
            El envío del boletín y la medición del éxito asociada se realizan
            sobre la base de su consentimiento expreso de conformidad con el
            Art. 6 Párr. 1 lit. a RGPD. La suscripción a nuestro boletín se
            lleva a cabo en un proceso llamado de doble opt-in. Esto significa
            que después de registrarse, recibirá un correo electrónico en el que
            se le pedirá que confirme su registro. Esta confirmación es
            necesaria para que nadie pueda registrarse con direcciones de correo
            electrónico ajenas.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            3. Contrato de procesamiento de pedidos
          </h3>
          <p>
            Hemos firmado un llamado &ldquo;Anexo de procesamiento de
            datos&rdquo; (DPA) con Mailchimp. Este es un contrato en el que
            Mailchimp se compromete a proteger los datos de nuestros usuarios, a
            procesarlos de acuerdo con sus políticas de privacidad en nuestro
            nombre y, en particular, a no transferirlos a terceros. Este
            contrato asegura que Mailchimp cumpla con los estándares europeos de
            protección de datos.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            4. Transferencia de datos a EE.UU.
          </h3>
          <p>
            El procesamiento de datos por parte de Mailchimp se realiza en
            EE.UU., un país tercero sin un nivel adecuado de protección de datos
            reconocido por la Comisión de la UE. Para garantizar la protección
            de sus datos personales, la transferencia de datos se basa en las
            cláusulas contractuales estándar (Standard Contractual Clauses -
            SCCs) aprobadas por la Comisión de la UE, que forman parte del DPA
            firmado con Mailchimp. Con esto, Mailchimp se compromete a cumplir
            con el nivel europeo de protección de datos al procesar sus datos.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            5. Periodo de almacenamiento
          </h3>
          <p>
            Los datos que nos proporciona con el fin de recibir el boletín se
            almacenarán por nuestra parte hasta que se dé de baja del boletín y,
            tras la cancelación de la suscripción, se eliminarán tanto de
            nuestros servidores como de los servidores de Mailchimp. Los datos
            almacenados con nosotros para otros fines no se ven afectados.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            6. Derecho de revocación
          </h3>
          <p>
            Puede revocar su consentimiento para recibir el boletín y el
            procesamiento de datos asociado en cualquier momento con efecto
            futuro. Puede declarar la revocación haciendo clic en el enlace
            &ldquo;Cancelar suscripción&rdquo; proporcionado en cada boletín,
            por correo electrónico a info@beispielfirma.de o mediante un mensaje
            a los datos de contacto indicados en el aviso legal. La revocación
            del consentimiento no afecta a la legalidad del procesamiento
            realizado sobre la base del consentimiento hasta la revocación.
          </p>

          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            6. Tipografías (Fuentes)
          </h2>
          <p>
            Este sitio web utiliza las siguientes fuentes de código abierto para
            mejorar la presentación visual del contenido. Estas fuentes se
            cargan desde el servidor y se rigen por la licencia que se detalla a
            continuación.
          </p>

          <h3 className="mt-6 mb-2 text-xl font-bold">Fuentes utilizadas:</h3>
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
            Ambas fuentes están licenciadas bajo la SIL Open Font License,
            Versión 1.1. A continuación se incluye el texto completo y original
            de la licencia.
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
            Fuente:{" "}
            <a
              href="https://www.e-recht24.de"
              className="text-bes-red hover:underline"
            >
              https://www.e-recht24.de
            </a>
          </p>

          <p className="mt-8 text-right">
            Puede encontrar más información sobre la protección de datos en
            Mailchimp en su política de privacidad:{" "}
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
      <Footer />
    </div>
  );
}

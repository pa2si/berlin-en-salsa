import React from "react";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="text-bes-red mb-8 inline-block hover:underline"
        >
          ← Volver a Inicio
        </Link>

        <h1 className="text-bes-red mb-6 text-3xl font-bold">
          Política de Privacidad
        </h1>

        <div className="prose text-bes-purple max-w-none">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>

          <h2 className="mt-6 mb-3 text-xl font-bold">
            1. Información que recopilamos
          </h2>
          <p>
            En Berlin En Salsa, recopilamos información personal que nos
            proporciona directamente, como:
          </p>
          <ul className="my-4 ml-6 list-disc">
            <li>Nombre y apellido</li>
            <li>Dirección de correo electrónico</li>
            <li>
              Información que decide compartir a través de nuestros formularios
              de contacto
            </li>
          </ul>

          <h2 className="mt-6 mb-3 text-xl font-bold">
            2. Cómo utilizamos su información
          </h2>
          <p>Utilizamos la información que recopilamos para:</p>
          <ul className="my-4 ml-6 list-disc">
            <li>
              Enviar información sobre el festival Berlin En Salsa y eventos
              relacionados
            </li>
            <li>Responder a sus consultas y solicitudes</li>
            <li>Mejorar nuestro sitio web y servicios</li>
            <li>
              Enviar comunicaciones de marketing si ha dado su consentimiento
            </li>
          </ul>

          <h2 className="mt-6 mb-3 text-xl font-bold">
            3. Almacenamiento de datos
          </h2>
          <p>
            Utilizamos Mailchimp como proveedor de servicios para gestionar
            nuestra lista de correo y comunicaciones. Sus datos se almacenan en
            los servidores de Mailchimp de acuerdo con su política de
            privacidad.
          </p>

          <h2 className="mt-6 mb-3 text-xl font-bold">4. Sus derechos</h2>
          <p>Usted tiene derecho a:</p>
          <ul className="my-4 ml-6 list-disc">
            <li>Acceder a los datos personales que tenemos sobre usted</li>
            <li>Solicitar la corrección de datos inexactos</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Retirar su consentimiento en cualquier momento</li>
            <li>
              Presentar una queja ante la autoridad de protección de datos
            </li>
          </ul>

          <h2 className="mt-6 mb-3 text-xl font-bold">5. Contacto</h2>
          <p>
            Si tiene preguntas sobre esta política de privacidad, puede
            contactarnos en:{" "}
            <a
              href="mailto:info@berlinensalsa.com"
              className="text-bes-red hover:underline"
            >
              info@berlinensalsa.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

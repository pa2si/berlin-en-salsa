import React from "react";
import Link from "next/link";

export default function Impressum() {
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
          Aviso Legal / Impressum
        </h1>

        <div className="prose text-bes-purple max-w-none">
          <h2 className="mt-6 mb-3 text-xl font-bold">
            Información del Proveedor
          </h2>
          <p>
            Berlin En Salsa
            <br />
            [Dirección Postal]
            <br />
            Berlín, Alemania
          </p>

          <p className="mt-4">
            <strong>Correo electrónico:</strong>{" "}
            <a
              href="mailto:info@berlinensalsa.com"
              className="text-bes-red hover:underline"
            >
              info@berlinensalsa.com
            </a>
          </p>
          <p>
            <strong>Representante legal:</strong> [Nombre del Representante]
          </p>

          <h2 className="mt-6 mb-3 text-xl font-bold">
            Responsabilidad por el Contenido
          </h2>
          <p>
            Como proveedores de servicios, somos responsables de nuestro propio
            contenido en estas páginas de acuerdo con las leyes generales. Sin
            embargo, no estamos obligados a monitorear la información
            transmitida o almacenada por terceros o a investigar circunstancias
            que indiquen actividad ilegal.
          </p>

          <h2 className="mt-6 mb-3 text-xl font-bold">Derechos de Autor</h2>
          <p>
            El contenido y las obras proporcionadas en estas páginas están
            sujetos a la ley alemana de derechos de autor. La duplicación, el
            procesamiento, la distribución y cualquier tipo de explotación fuera
            de los límites de la ley de derechos de autor requieren el
            consentimiento por escrito del autor o creador respectivo.
          </p>

          <h2 className="mt-6 mb-3 text-xl font-bold">
            Resolución de Disputas
          </h2>
          <p>
            La Comisión Europea proporciona una plataforma para la resolución de
            disputas en línea, que se puede encontrar en{" "}
            <a
              href="http://ec.europa.eu/consumers/odr/"
              className="text-bes-red hover:underline"
            >
              http://ec.europa.eu/consumers/odr/
            </a>
            .
          </p>
          <p>
            No estamos obligados ni dispuestos a participar en procedimientos de
            resolución de disputas ante un organismo de arbitraje de consumo.
          </p>
        </div>
      </div>
    </div>
  );
}

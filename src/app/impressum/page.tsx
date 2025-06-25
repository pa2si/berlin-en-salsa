import React from "react";
import Link from "next/link";

export default function Impressum() {
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

      {/* Breadcrumb and back button navigation */}
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="text-bes-red hover:text-bes-red/80 inline-flex items-center text-sm sm:text-base md:text-lg"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-1 text-gray-500">/</span>
                  <span className="text-bes-purple text-sm sm:text-base md:text-lg">
                    Aviso Legal
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <Link
            href="/"
            className="text-bes-red hover:text-bes-red/80 mt-2 flex items-center text-sm sm:mt-0 sm:text-base md:text-lg"
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
        </div>
      </div>

      {/* Main content - vertically and horizontally centered */}
      <div className="flex flex-grow items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="prose text-bes-purple mx-auto max-w-none text-center">
            <h1 className="text-bes-red mb-8 text-3xl font-bold sm:text-4xl md:text-5xl">
              Aviso Legal
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl">
              Max Mustermann
              <br />
              Calle Ejemplo 111
              <br />
              Edificio 44
              <br />
              90210 Ciudad Ejemplo
            </p>

            <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              Contacto
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl">
              Teléfono: +49 (0) 123 44 55 66
              <br />
              Correo electrónico:{" "}
              <a
                href="mailto:mustermann@musterfirma.de"
                className="text-bes-red hover:underline"
              >
                mustermann@musterfirma.de
              </a>
            </p>

            <p className="mt-8 text-base sm:text-lg md:text-xl">
              Fuente:{" "}
              <a
                href="https://www.e-recht24.de"
                className="text-bes-red hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                eRecht24
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

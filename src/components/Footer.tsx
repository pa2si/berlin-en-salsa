import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="text-bes-red py-2 text-center md:py-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium md:gap-4">
          <Link
            href="/privacy"
            className="hover:text-bes-red/80 transition-colors hover:underline"
          >
            Política de Privacidad
          </Link>
          <span>|</span>
          <Link
            href="/impressum"
            className="hover:text-bes-red/80 transition-colors hover:underline"
          >
            Aviso Legal / Impressum
          </Link>
        </div>
        <div className="text-bes-purple mt-2 text-xs">
          © {new Date().getFullYear()} Berlin En Salsa. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
};

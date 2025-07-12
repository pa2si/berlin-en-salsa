"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LinksModal } from "./LinksModal";

export const Footer = () => {
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  return (
    <footer className="text-bes-red py-6 text-center lg:py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium md:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:flex-nowrap">
            <Link
              href="/privacidad"
              className="hover:text-bes-red/80 transition-colors hover:underline"
            >
              Política de Privacidad
            </Link>
            <span>|</span>
            <Link
              href="/legal"
              className="hover:text-bes-red/80 transition-colors hover:underline"
            >
              Aviso Legal
            </Link>
            <span>|</span>
            <a
              href="https://www.paypal.com/pools/c/9fSuynM3ot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bes-red/80 flex items-center transition-colors hover:underline"
            >
              <span className="mr-1">Donar</span>
              <img src="/paypal.png" alt="PayPal" className="h-4 w-auto" />
            </a>
          </div>
          <span className="hidden lg:inline">|</span>
          <div className="mt-1 w-full lg:mt-0 lg:w-auto">
            <button
              onClick={() => setIsLinksModalOpen(true)}
              className="hover:text-bes-red/80 transition-colors hover:underline"
            >
              Enlaces
            </button>
          </div>
        </div>
        <div className="text-bes-purple mt-2 text-xs">
          © {new Date().getFullYear()} Berlin En Salsa. Todos los derechos
          reservados.
        </div>
      </div>
      <LinksModal
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        language="es"
      />
    </footer>
  );
};

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LinksModal } from "./LinksModal";

export const Footer = () => {
  const [isLinksModalOpen, setIsLinksModalOpen] = useState(false);

  return (
    <footer className="text-bes-red pb-12 text-center font-medium md:pb-4">
      <div className="container mx-auto px-4">
        <div className="semibold flex flex-wrap items-center justify-center gap-2 text-sm md:gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:flex-nowrap">
            <Link
              href="/de/datenschutz"
              className="hover:text-bes-red/80 transition-colors hover:underline"
            >
              Datenschutz
            </Link>
            <span>|</span>
            <Link
              href="/de/impressum"
              className="hover:text-bes-red/80 transition-colors hover:underline"
            >
              Impressum
            </Link>
            <span>|</span>
            <a
              href="https://www.paypal.com/pools/c/9fSuynM3ot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-bes-red/80 flex items-center transition-colors hover:underline"
            >
              <span className="mr-1">Spende</span>
              <img src="/paypal.png" alt="PayPal" className="h-4 w-auto" />
            </a>
          </div>
          <span className="hidden lg:inline">|</span>
          <div className="mt-1 w-full lg:mt-0 lg:w-auto">
            <button
              onClick={() => setIsLinksModalOpen(true)}
              className="hover:text-bes-red/80 transition-colors hover:underline"
            >
              Links
            </button>
          </div>
        </div>
        <div className="text-bes-purple mt-2 text-xs">
          © {new Date().getFullYear()} Berlin En Salsa. Alle Rechte
          vorbehalten.
        </div>
      </div>
      <LinksModal
        isOpen={isLinksModalOpen}
        onClose={() => setIsLinksModalOpen(false)}
        language="de"
      />
    </footer>
  );
};

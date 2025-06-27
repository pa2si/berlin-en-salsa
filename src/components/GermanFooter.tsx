import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="text-bes-red pb-8 text-center md:pb-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium md:gap-4">
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
        </div>
        <div className="text-bes-purple mt-2 text-xs">
          © {new Date().getFullYear()} Berlin En Salsa. Alle Rechte
          vorbehalten.
        </div>
      </div>
    </footer>
  );
};

import React from "react";
import { Link } from "@/i18n/navigation";

interface BreadcrumbProps {
  currentPage: string;
}

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
  return (
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
                  {currentPage}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

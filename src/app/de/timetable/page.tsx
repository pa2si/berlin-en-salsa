"use client";

import React from "react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import GermanFestivalTimetable from "@/components/GermanFestivalTimetable";

export default function TimetablePage() {
  return (
    <div className="bg-bes-amber relative flex min-h-screen flex-col">
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
                    className="h-15 w-auto"
                  />
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-1 text-gray-500">/</span>
                  <span className="text-bes-purple text-lg sm:text-base md:text-xl">
                    Programm
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto flex-1 px-4 py-4">
        {/* Festival Timetable component */}
        <GermanFestivalTimetable />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

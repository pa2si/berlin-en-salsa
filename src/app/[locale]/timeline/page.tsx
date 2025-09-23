import React, { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/Footer";
import TimelinePage from "@/components/timeline/TimelinePage";
import { getTranslations } from "next-intl/server";

export default async function TimelinePageRoute() {
  const t = await getTranslations("Timetable.page");

  return (
    <div className="bg-bes-amber relative flex min-h-screen flex-col">
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
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        {t("backButton")}
      </Link>

      {/* Mobile back button */}
      <div className="bg-bes-red text-bes-amber flex items-center justify-between p-4 sm:hidden">
        <Link href="/" className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          {t("backButton")}
        </Link>

        {/* Badge to indicate this is the new timeline */}
        <div className="bg-bes-amber text-bes-red rounded px-2 py-1 text-xs font-bold">
          NEW TIMELINE
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <div className="bg-bes-red mb-4 inline-block rounded-full p-6">
                  <svg
                    className="text-bes-amber h-8 w-8 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
                <p className="text-bes-red font-medium">
                  Loading New Timeline...
                </p>
              </div>
            </div>
          }
        >
          <TimelinePage />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

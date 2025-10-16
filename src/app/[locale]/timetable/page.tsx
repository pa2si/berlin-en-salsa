import React, { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/Footer";
import TimetablePage from "@/components/timetable/TimetablePage";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as "de" | "es",
    namespace: "Metadata.timetable" as const,
  });

  const isGerman = locale === "de";
  const canonicalPath = isGerman ? "/programm" : "/es/programa";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        de: `${baseUrl}/programm`,
        es: `${baseUrl}/es/programa`,
      },
    },
    openGraph: {
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      url: `${baseUrl}${canonicalPath}`,
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: "Berlin En Salsa Festival",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      images: [`${baseUrl}/twitter-image.png`],
    },
  };
}

export default async function TimetablePageRoute() {
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
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        {t("backButton")}
      </Link>

      {/* Breadcrumb navigation */}
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
                    {t("breadcrumb")}
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
        <Suspense
          fallback={
            <div className="text-bes-red flex h-64 items-center justify-center text-xl">
              {t("loadingMessage")}
            </div>
          }
        >
          <TimetablePage />
        </Suspense>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

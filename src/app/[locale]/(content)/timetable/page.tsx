import React, { Suspense } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import TimetablePage from "@/components/timetable/TimetablePage";
import TimetableComingSoon from "@/components/TimetableComingSoon";
import { getTranslations } from "next-intl/server";
import { FESTIVAL_CONFIG } from "@/config/festival";
import type { Metadata } from "next";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

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
  const tComingSoon = await getTranslations("Sections.SectionFive.comingSoon");

  // Show coming soon modal if timetable is not available
  if (!FESTIVAL_CONFIG.timetable.isAvailable) {
    return (
      <TimetableComingSoon
        title={tComingSoon("title")}
        message={tComingSoon("message")}
        buttonText={tComingSoon("button")}
      />
    );
  }

  return (
    <>
      <Breadcrumb currentPage={t("breadcrumb")} />

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
    </>
  );
}

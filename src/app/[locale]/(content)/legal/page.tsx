import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as "de" | "es",
    namespace: "Metadata.legal" as const,
  });

  const isGerman = locale === "de";
  const canonicalPath = isGerman ? "/impressum" : "/es/legal";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        de: `${baseUrl}/impressum`,
        es: `${baseUrl}/es/legal`,
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

export default function Legal() {
  const t = useTranslations("Legal");

  return (
    <>
      <Breadcrumb currentPage={t("breadcrumb")} />

      {/* Main content - vertically and horizontally centered */}
      <div className="flex flex-grow items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="prose text-bes-purple mx-auto max-w-none text-center">
            <h1 className="text-bes-red mb-8 text-3xl font-bold sm:text-4xl md:text-5xl">
              {t("mainTitle")}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl">
              {t("contactSection.name")}
              <br />
              {t("contactSection.address")
                .split("\n")
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    {index <
                      t("contactSection.address").split("\n").length - 1 && (
                      <br />
                    )}
                  </span>
                ))}
            </p>

            <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              {t("contactSection.title")}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl">
              {t("contactSection.phone")}{" "}
              <a
                href="tel:+4917647024026"
                className="text-bes-red hover:underline"
              >
                +49 176 47024026
              </a>
            </p>
            <p className="text-lg sm:text-xl md:text-2xl">
              {t("contactSection.email")}{" "}
              <a
                href="mailto:info@berlinensalsa.de"
                className="text-bes-red hover:underline"
              >
                info@berlinensalsa.de
              </a>
            </p>

            <p className="mt-8 text-base sm:text-lg md:text-xl">
              {t("contactSection.source")}{" "}
              <a
                href="https://www.e-recht24.de"
                className="text-bes-red hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("contactSection.sourceText")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

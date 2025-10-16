import React from "react";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/Footer";
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
    <div className="bg-bes-amber relative flex min-h-screen flex-col">
      {/* Background Logo with low opacity */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src="/bes-logo-color.webp"
          alt=""
          className="h-[80vh] w-auto max-w-none object-contain opacity-[0.03] select-none sm:h-[85vh] md:h-[95vh]"
          aria-hidden="true"
        />
      </div>

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

      {/* Footer */}
      <Footer />
    </div>
  );
}

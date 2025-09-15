import React from "react";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/Footer";
import { useTranslations, useLocale } from "next-intl";
import type { Metadata } from "next";
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
    namespace: "Privacy" as const,
  });

  const isGerman = locale === "de";
  const canonicalPath = isGerman ? "/datenschutz" : "/es/privacidad";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: {
        de: `${baseUrl}/datenschutz`,
        es: `${baseUrl}/es/privacidad`,
      },
    },
    openGraph: {
      title: t("title"),
      url: `${baseUrl}${canonicalPath}`,
    },
  };
}

export default function Privacy() {
  const t = useTranslations("Privacy");
  const locale = useLocale();

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

      {/* Main content */}
      <div className="container mx-auto mb-16 px-4 py-8">
        <div className="prose text-bes-purple mx-auto max-w-none">
          <h1 className="text-bes-red mb-8 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
            {t("mainTitle")}
          </h1>

          <p className="text-right text-sm">
            {t("lastUpdated")}{" "}
            {new Date().toLocaleDateString(
              locale === "de" ? "de-DE" : "es-ES",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              },
            )}
          </p>

          {/* Section 1: Datenschutz auf einen Blick */}
          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            {t("section1.title")}
          </h2>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section1.subtitle1")}
          </h3>
          <p>{t("section1.paragraph1")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section1.subtitle2")}
          </h3>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            {t("section1.subtitle2_1")}
          </h4>
          <p>{t("section1.paragraph2_1")}</p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            {t("section1.subtitle2_2")}
          </h4>
          <p>{t("section1.paragraph2_2")}</p>
          <p>{t("section1.paragraph2_3")}</p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            {t("section1.subtitle2_3")}
          </h4>
          <p>{t("section1.paragraph2_4")}</p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            {t("section1.subtitle2_4")}
          </h4>
          <p>{t("section1.paragraph2_5")}</p>
          <p>{t("section1.paragraph2_6")}</p>

          {/* Section 2: Hosting */}
          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            {t("section2.title")}
          </h2>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section2.subtitle1")}
          </h3>
          <p>{t("section2.paragraph1")}</p>
          <p>{t("section2.paragraph2")}</p>
          <p>{t("section2.paragraph3")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section2.subtitle2")}
          </h3>
          <p>{t("section2.paragraph4")}</p>
          <p>{t("section2.paragraph5")}</p>
          <p>
            {t("section2.paragraph6").split("https://vercel.com/legal/dpa")[0]}
            <a
              href="https://vercel.com/legal/dpa"
              className="text-bes-red hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://vercel.com/legal/dpa
            </a>
          </p>
          <p>
            {
              t("section2.paragraph7").split(
                "https://vercel.com/legal/privacy-policy",
              )[0]
            }
            <a
              href="https://vercel.com/legal/privacy-policy"
              className="text-bes-red hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://vercel.com/legal/privacy-policy
            </a>
          </p>

          {/* Section 3: Allgemeine Hinweise und Pflichtinformationen */}
          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            {t("section3.title")}
          </h2>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle1")}
          </h3>
          <p>{t("section3.paragraph1")}</p>
          <p>{t("section3.paragraph2")}</p>
          <p>{t("section3.paragraph3")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle2")}
          </h3>
          <p>{t("section3.paragraph4")}</p>
          <p>
            {t("section3.paragraph5")
              .split("\n")
              .map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t("section3.paragraph5").split("\n").length - 1 && (
                    <br />
                  )}
                </span>
              ))}
          </p>
          <p>
            {t("section3.paragraph6")
              .split("\n")
              .map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t("section3.paragraph6").split("\n").length - 1 && (
                    <br />
                  )}
                </span>
              ))}
          </p>
          <br />
          <p>{t("section3.paragraph7")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle3")}
          </h3>
          <p>{t("section3.paragraph8")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle4")}
          </h3>
          <p>{t("section3.paragraph9")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle5")}
          </h3>
          <p>{t("section3.paragraph10")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle6")}
          </h3>
          <p>{t("section3.paragraph11")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle7")}
          </h3>
          <p className="uppercase">{t("section3.paragraph12")}</p>
          <p className="uppercase">{t("section3.paragraph13")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle8")}
          </h3>
          <p>{t("section3.paragraph14")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle9")}
          </h3>
          <p>{t("section3.paragraph15")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle10")}
          </h3>
          <p>{t("section3.paragraph16")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle11")}
          </h3>
          <p>{t("section3.paragraph17")}</p>
          <ul className="my-4 list-disc pl-6">
            {t.raw("section3.listItems1").map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>{t("section3.paragraph18")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle12")}
          </h3>
          <p>{t("section3.paragraph19")}</p>
          <p>{t("section3.paragraph20")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section3.subtitle13")}
          </h3>
          <p>{t("section3.paragraph21")}</p>

          {/* Section 4: Datenerfassung auf dieser Website */}
          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            {t("section4.title")}
          </h2>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section4.subtitle1")}
          </h3>
          <p>{t("section4.paragraph1")}</p>
          <p>{t("section4.paragraph2")}</p>
          <p>{t("section4.paragraph3")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section4.subtitle2")}
          </h3>
          <p>{t("section4.paragraph4")}</p>
          <p>{t("section4.paragraph5")}</p>
          <p>{t("section4.paragraph6")}</p>

          {/* Section 5: Newsletterversand via Mailchimp */}
          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            {t("section5.title")}
          </h2>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section5.subtitle1")}
          </h3>
          <p>{t("section5.paragraph1")}</p>
          <p>{t("section5.paragraph2")}</p>
          <p>{t("section5.paragraph3")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section5.subtitle2")}
          </h3>
          <p>{t("section5.paragraph4")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section5.subtitle3")}
          </h3>
          <p>{t("section5.paragraph5")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section5.subtitle4")}
          </h3>
          <p>{t("section5.paragraph6")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section5.subtitle5")}
          </h3>
          <p>{t("section5.paragraph7")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section5.subtitle6")}
          </h3>
          <p>{t("section5.paragraph8")}</p>

          {/* Section 6: Schriftarten */}
          <h2 className="text-bes-red mt-8 mb-4 text-2xl font-bold">
            {t("section6.title")}
          </h2>

          <p>{t("section6.paragraph1")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section6.subtitle1")}
          </h3>
          <ul className="my-4 list-disc pl-6">
            {t.raw("section6.fontList").map((font: string, index: number) => (
              <li key={index}>
                <strong>{font.split(":")[0]}:</strong>{" "}
                {font.split(":").slice(1).join(":")}
              </li>
            ))}
          </ul>

          <p>{t("section6.paragraph2")}</p>

          <h3 className="mt-6 mb-2 text-xl font-bold">
            {t("section6.subtitle2")}
          </h3>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            {t("section6.licenseSection1.title")}
          </h4>
          <p>{t("section6.licenseSection1.paragraph1")}</p>
          <p>{t("section6.licenseSection1.paragraph2")}</p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            {t("section6.licenseSection2.title")}
          </h4>
          {t
            .raw("section6.licenseSection2.definitions")
            .map((definition: string, index: number) => (
              <p key={index}>{definition}</p>
            ))}

          <h4 className="mt-4 mb-2 text-lg font-bold">
            {t("section6.licenseSection3.title")}
          </h4>
          <p>{t("section6.licenseSection3.introText")}</p>
          <ol className="my-4 list-decimal pl-6">
            {t
              .raw("section6.licenseSection3.conditions")
              .map((condition: string, index: number) => (
                <li key={index}>{condition}</li>
              ))}
          </ol>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            {t("section6.licenseSection4.title")}
          </h4>
          <p>{t("section6.licenseSection4.text")}</p>

          <h4 className="mt-4 mb-2 text-lg font-bold">
            {t("section6.licenseSection5.title")}
          </h4>
          <p className="uppercase">{t("section6.licenseSection5.text")}</p>

          <p className="mt-8 text-right">
            {t("section6.additionalInfo.source")}{" "}
            <a
              href="https://www.e-recht24.de"
              className="text-bes-red hover:underline"
            >
              https://www.e-recht24.de
            </a>
          </p>

          <p className="mt-8 text-right">
            {t("section6.additionalInfo.mailchimpInfo")}{" "}
            <a
              href="https://mailchimp.com/legal/privacy/"
              className="text-bes-red hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://mailchimp.com/legal/privacy/
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

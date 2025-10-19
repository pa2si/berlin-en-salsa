import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Instrument_Serif } from "next/font/google";
import { BannerProvider } from "@/context/BannerContext";
import DarkOverlay from "@/components/DarkOverlay";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

// Configure the Instrument Serif font
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as "de" | "es",
    namespace: "Metadata" as const,
  });

  return {
    // Basic metadata
    title: {
      default: t("title"),
      template: `${t("title")} | %s`,
    },
    description: t("description"),

    // Open Graph metadata for social media sharing
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "es_ES",
      url: locale === "de" ? baseUrl : `${baseUrl}/es`,
      siteName: t("title"),
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: "Berlin En Salsa Logo",
        },
      ],
    },

    // Twitter metadata
    twitter: {
      card: "summary_large_image",
      title: t("openGraph.title"),
      description: t("openGraph.description"),
      images: [`${baseUrl}/twitter-image.png`],
      creator: "@berlinensalsa",
    },

    // Icons - comprehensive favicon setup
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: { url: "/apple-touch-icon.png" },
      other: [
        {
          url: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },

    // Robots directive (encourage search engines to index and follow)
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Additional metadata
    keywords: [
      "salsa",
      "berlin",
      "festival",
      locale === "de" ? "musik" : "musica",
      "DJs",
      locale === "de" ? "tanz" : "baile",
      "latino",
      locale === "de" ? "kultur" : "cultura",
      locale === "de" ? "konzerte" : "conciertos",
    ],
    creator: "Berlin En Salsa",
    publisher: "Berlin En Salsa",

    // Canonical and alternate language URLs
    alternates: {
      canonical: locale === "de" ? baseUrl : `${baseUrl}/es`,
      languages: {
        de: baseUrl,
        es: `${baseUrl}/es`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  // This includes Error, Loading, and NotFound messages for error handling
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`overflow-x-hidden antialiased ${instrumentSerif.className}`}
      >
        <NextIntlClientProvider messages={messages}>
          <BannerProvider>
            <LanguageSwitcher />
            <DarkOverlay />
            {children}
          </BannerProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Instrument_Serif } from "next/font/google";
import { BannerProvider } from "@/context/BannerContext";
import DarkOverlay from "@/components/DarkOverlay";
import "../globals.css";

// Configure the Instrument Serif font
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Berlin En Salsa",
    template: "Berlin En Salsa | %s",
  },
  description:
    "Berlin En Salsa. Ein Salsa Festival für alle. Live-Musik, DJs, Tanz, Workshops und mehr.",

  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: `${baseUrl}/de`,
    siteName: "Berlin En Salsa",
    title: "Berlin En Salsa",
    description:
      "Berlin En Salsa. Ein Salsa Festival für alle. Live-Musik, DJs, Tanz, Workshops und mehr.",
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
    title: "Berlin En Salsa",
    description: "Berlin En Salsa. Ein Salsa Festival für alle.",
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

  // Robots directive
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
    "musik",
    "DJs",
    "tanz",
    "latino",
    "kultur",
    "konzerte",
  ],
  creator: "Berlin En Salsa",
  publisher: "Berlin En Salsa",

  // Canonical and alternate language URLs
  alternates: {
    canonical: `${baseUrl}/de`,
    languages: {
      de: `${baseUrl}/de`,
      es: `${baseUrl}`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`overflow-x-hidden antialiased ${instrumentSerif.className}`}
      >
        <BannerProvider>
          <LanguageSwitcher />
          <DarkOverlay />
          {children}
        </BannerProvider>
      </body>
    </html>
  );
}

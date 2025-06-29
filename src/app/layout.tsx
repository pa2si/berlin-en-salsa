import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "./globals.css";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Berlin En Salsa",
    template: "Berlin En Salsa | %s",
  },
  description:
    "Berlin En Salsa. Un festival de Salsa para todxs. Música en vivo, DJs, baile, talleres y mucho más.",

  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: baseUrl,
    siteName: "Berlin En Salsa",
    title: "Berlin En Salsa",
    description:
      "Berlin En Salsa. Un festival de Salsa para todxs. Música en vivo, DJs, baile, talleres y mucho más.",
    images: [
      {
        url: `${baseUrl}/Berlin-en-Salsa-Logo.png`,
        width: 800,
        height: 600,
        alt: "Berlin En Salsa Logo",
      },
    ],
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Berlin En Salsa",
    description: "Berlin En Salsa. Un festival de Salsa para todxs.",
    images: [`${baseUrl}/Berlin-en-Salsa-Logo.png`],
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
    "musica",
    "baile",
    "latin",
    "cultura",
    "conciertos",
  ],
  creator: "Berlin En Salsa",
  publisher: "Berlin En Salsa",

  // Canonical and alternate language URLs
  alternates: {
    canonical: baseUrl,
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
    <html lang="es">
      <body className="overflow-x-hidden antialiased">
        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}

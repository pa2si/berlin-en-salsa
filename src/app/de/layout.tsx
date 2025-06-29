import type { Metadata } from "next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "../globals.css";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

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
    description: "Berlin En Salsa. Ein Salsa Festival für alle.",
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
    "tanz",
    "latin",
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
      <body className="overflow-x-hidden antialiased">
        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}

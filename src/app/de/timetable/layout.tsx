import type { Metadata } from "next";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export const metadata: Metadata = {
  title: "Programm",
  description:
    "Berlin En Salsa Festival: Programm & Zeitplan. Alle Termine für Workshops, Shows und Konzerte. Jetzt das komplette Festival-Programm ansehen!",
  alternates: {
    canonical: `${baseUrl}/de/timetable`,
    languages: {
      es: `${baseUrl}/timetable`,
      de: `${baseUrl}/de/timetable`,
    },
  },
  openGraph: {
    title: "Berlin En Salsa | Programm",
    description:
      "Berlin En Salsa Festival: Programm & Zeitplan. Alle Termine für Workshops, Shows und Konzerte. Jetzt das komplette Festival-Programm ansehen!",
    url: `${baseUrl}/de/timetable`,
  },
};

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

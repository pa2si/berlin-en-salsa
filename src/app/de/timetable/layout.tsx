import type { Metadata } from "next";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export const metadata: Metadata = {
  title: "Programm",
  description:
    "Vollständiges Programm des Berlin En Salsa Festivals. Sieh dir die Zeitpläne aller Workshops, Shows und Konzerte an.",
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
      "Sieh dir die Zeitpläne aller Workshops, Shows und Konzerte des Berlin En Salsa Festivals an.",
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

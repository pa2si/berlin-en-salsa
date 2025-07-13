import type { Metadata } from "next";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export const metadata: Metadata = {
  title: "Programa",
  description:
    "Programa completo del Festival Berlin En Salsa. Consulta los horarios de todos los talleres, shows y conciertos.",
  alternates: {
    canonical: `${baseUrl}/timetable`,
    languages: {
      es: `${baseUrl}/timetable`,
    },
  },
  openGraph: {
    title: "Berlin En Salsa | Programa",
    description:
      "Consulta los horarios de todos los talleres, shows y conciertos del Festival Berlin En Salsa.",
    url: `${baseUrl}/timetable`,
  },
};

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

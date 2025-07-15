import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";

// Configure the Instrument Serif font
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export const metadata: Metadata = {
  title: "Programa",
  description:
    "Berlin En Salsa Festival: Programa y Horarios. Todas las fechas para talleres, shows y conciertos. ¡Consulta ahora el programa completo!",
  alternates: {
    canonical: `${baseUrl}/timetable`,
    languages: {
      es: `${baseUrl}/timetable`,
      de: `${baseUrl}/de/timetable`,
    },
  },
  openGraph: {
    title: "Berlin En Salsa | Programa",
    description:
      "Berlin En Salsa Festival: Programa y Horarios. Todas las fechas para talleres, shows y conciertos. ¡Consulta ahora el programa completo!",
    url: `${baseUrl}/timetable`,
  },
};

export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={instrumentSerif.className}>{children}</div>;
}

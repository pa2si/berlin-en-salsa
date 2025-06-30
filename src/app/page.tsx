import SectionFive from "./sections/SectionFive";
import SectionFour from "./sections/SectionFour";
import SectionOne from "./sections/SectionOne";
import SectionThree from "./sections/SectionThree";
import SectionTwo from "./sections/SectionTwo";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import ProgramTeaser from "@/components/ProgramTeaser";
import type { Metadata } from "next";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://berlinensalsa.de";

export const metadata: Metadata = {
  title: "Berlin En Salsa | Festival de Salsa en Berlín",
  description:
    "Berlin En Salsa. Un festival de Salsa para todxs. Música en vivo, DJs, baile, talleres y mucho más.",
  openGraph: {
    images: [
      {
        url: `${baseUrl}/bes-section-1-bg.webp`,
        width: 1200,
        height: 630,
        alt: "Berlin En Salsa Festival",
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <ComingSoonBanner />
      <ProgramTeaser />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </main>
  );
}

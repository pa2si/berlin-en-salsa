import SectionFive from "./sections/SectionFive";
import SectionFour from "./sections/SectionFour";
import SectionOne from "./sections/SectionOne";
import SectionSix from "./sections/SectionSix";
import SectionThree from "./sections/SectionThree";
import SectionTwo from "./sections/SectionTwo";
import GermanComingSoonBanner from "@/components/GermanComingSoonBanner";
import { Footer } from "@/components/GermanFooter";
import type { Metadata } from "next";

// Base URL for absolute URLs in metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  // For homepage, we use a specific title without using the template format
  title: "Salsa-Festival in Berlin",
  description:
    "Berlin En Salsa. Ein Salsa Festival für alle. Live-Musik, DJs, Tanz, Workshops und mehr.",
  openGraph: {
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Berlin En Salsa Festival",
      },
    ],
    locale: "de_DE",
  },
};

export default function Home() {
  return (
    <main>
      <GermanComingSoonBanner />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <div className="lg:flex lg:h-svh lg:flex-col">
        <div className="lg:flex-grow">
          <SectionSix />
        </div>
        <div className="bg-bes-amber lg:flex-shrink-0">
          <Footer />
        </div>
      </div>
    </main>
  );
}

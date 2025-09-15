import SectionFive from "./sections/SectionFive";
import SectionFour from "./sections/SectionFour";
import SectionOne from "./sections/SectionOne";
import SectionSix from "./sections/SectionSix";
import SectionThree from "./sections/SectionThree";
import SectionTwo from "./sections/SectionTwo";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import FestivalBanner from "@/components/FestivalBanner";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as "de" | "es",
    namespace: "Sections.SectionOne" as const,
  });

  // Base URL for absolute URLs in metadata
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: "Berlin En Salsa Festival",
        },
      ],
    },
  };
}

export default function Home() {
  return (
    <main>
      <FestivalBanner />
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

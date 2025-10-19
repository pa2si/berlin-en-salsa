import SectionFive from "./sections/SectionFive";
import SectionFour from "./sections/SectionFour";
import SectionOne from "./sections/SectionOne";
import SectionSix from "./sections/SectionSix";
import SectionThree from "./sections/SectionThree";
import SectionTwo from "./sections/SectionTwo";
import { Footer } from "@/components/Footer";
import FestivalBanner from "@/components/FestivalBanner";

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

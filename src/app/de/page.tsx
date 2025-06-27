import SectionFive from "./sections/SectionFive";
import SectionFour from "./sections/SectionFour";
import SectionOne from "./sections/SectionOne";
import SectionThree from "./sections/SectionThree";
import SectionTwo from "./sections/SectionTwo";
import GermanComingSoonBanner from "@/components/GermanComingSoonBanner";
import GermanProgramTeaser from "@/components/GermanProgramTeaser";

export default function Home() {
  return (
    <main>
      <GermanComingSoonBanner />
      <GermanProgramTeaser />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </main>
  );
}

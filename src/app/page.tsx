import SectionFive from "./sections/SectionFive";
import SectionFour from "./sections/SectionFour";
import SectionOne from "./sections/SectionOne";
import SectionThree from "./sections/SectionThree";
import SectionTwo from "./sections/SectionTwo";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import ProgramTeaser from "@/components/ProgramTeaser";

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

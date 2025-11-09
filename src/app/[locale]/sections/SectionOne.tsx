"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { formatFestivalDates } from "@/utils/formatFestivalDates";
import { FESTIVAL_CONFIG } from "@/config/festival";

const SectionOne = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const t = useTranslations("Sections.SectionOne");
  const locale = useLocale();

  const festivalDate = formatFestivalDates(locale);

  // Check if festival date has passed
  const isFestivalPast = new Date() > FESTIVAL_CONFIG.dates.end;

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:h-svh">
      <div
        ref={sectionRef}
        className="bg-bes-amber flex h-svh items-center justify-center sm:w-1/2"
      >
        <div className="flex flex-col items-center">
          <h1 className="sr-only">{t("h1")}</h1>
          <img
            src="/bes-logo-color.webp"
            alt="Berlin en Salsa Logo"
            className="h-auto max-h-[60vh] min-h-[150px] w-full max-w-[90%] object-contain md:max-w-[70%] lg:max-w-[100%] lg:min-w-[60%]"
          />
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            className="text-bes-red w-full max-w-[450px] text-center text-[clamp(1.7rem,5vh,3.8rem)] leading-[1em] font-bold sm:mb-2 md:mb-4 md:w-[95%] xl:w-[115%] xl:max-w-[500px] xl:text-[clamp(1.7rem,5.5vh,4rem)]"
          >
            {isFestivalPast ? (
              <>
                {t("cookingFestival.line1")} <br /> {t("cookingFestival.line2")}
              </>
            ) : (
              <>
                {festivalDate} <br />
                {FESTIVAL_CONFIG.venueIsKnown && t("venue")}
              </>
            )}
          </motion.p>
        </div>
      </div>

      <div
        className="flex h-svh flex-col items-center justify-center gap-10 bg-cover sm:w-1/2 sm:gap-4 lg:gap-10"
        style={{
          backgroundImage: 'url("/bes-section-1-bg.webp")',
          backgroundPosition: "100% 40%",
        }}
      >
        <div className="text-bes-amber flex h-[65%] flex-col items-center justify-between gap-0 -space-y-[0.35em] py-1.5 font-bold tracking-widest lg:h-[70%]">
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2.5rem,10vh,9.5rem)]">
            {t("festival.line1")}
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2.5rem,10vh,9.5rem)]">
            {t("festival.line2")}
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2.5rem,10vh,9.5rem)]">
            {t("festival.line3")}
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2.5rem,10vh,9.5rem)]">
            {t("festival.line4")}
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2.5rem,10vh,9.5rem)]">
            {t("festival.line5")}
          </p>
          <p className="text-[clamp(2rem,7vh,7.5rem)] xl:text-[clamp(2.5rem,10vh,9.5rem)]">
            {t("festival.line6")}
          </p>
        </div>
        <img
          src="/disco.svg"
          alt="Disco Dekoration"
          className="mt-4 h-[clamp(50px,4vh,160px)] w-auto xl:mt-0"
        />
      </div>
    </div>
  );
};
export default SectionOne;

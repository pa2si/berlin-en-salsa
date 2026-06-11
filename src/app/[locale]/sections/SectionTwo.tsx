"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import IntegratedGallery from "@/components/Gallery/IntegratedGallery";

const SectionTwo = () => {
  const t = useTranslations("Sections.SectionTwo");
  const locale = useLocale();
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);

  // 1. Increased md:gap-y from 3 to 4 to utilize the extra vertical space
  const dynamicGapClasses = isLandscapeMobile
    ? "gap-y-2 sm:gap-y-2 md:gap-y-4"
    : "gap-y-5 sm:gap-y-7 md:gap-y-6 lg:gap-y-8";

  // 2. Increased md: container height from 85% to 90% to let the bigger elements breathe
  const layoutClasses = isLandscapeMobile
    ? "justify-center h-full sm:h-[85%] md:h-[90%]"
    : "justify-between h-auto sm:h-[65%] md:h-[85%] md:justify-center xl:h-[65%] xl:justify-center";

  useEffect(() => {
    const checkLandscapeMobile = () => {
      const landscapeMobile = window.matchMedia(
        "(min-width: 640px) and (max-width: 1023px) and (max-height: 600px)",
      ).matches;
      setIsLandscapeMobile(landscapeMobile);
    };

    checkLandscapeMobile();
    window.addEventListener("resize", checkLandscapeMobile);

    return () => window.removeEventListener("resize", checkLandscapeMobile);
  }, []);

  // 3. Bumped md:max-h from 18vh to 22vh so the logo scales up nicely, and increased mb-4 to mb-5
  const imageClasses = isLandscapeMobile
    ? "mb-3 sm:mb-3 md:mb-5 h-auto max-h-[16vh] min-h-14 md:max-h-[22vh] md:min-h-16 w-auto px-4 sm:px-8"
    : "mb-10 h-auto max-h-[5vh] min-h-28 w-auto px-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 sm:max-h-[18vh] sm:px-8 md:min-h-20 md:max-h-[12vh] lg:max-h-[15vh] xl:max-h-[18vh]";

  // 4. Increased the md: clamp minimum, preferred vh, and maximum values for bolder text
  const textClasses = isLandscapeMobile
    ? "text-[clamp(0.8rem,3.5vh,1rem)] sm:text-[clamp(0.9rem,4vh,1.15rem)] md:text-[clamp(1.05rem,4.5vh,1.35rem)] leading-[1.2]"
    : "text-[clamp(1.25rem,2.7vh,2.25rem)] leading-[1.35] md:text-[clamp(1.4rem,2.5vh,2.2rem)] lg:text-[clamp(1.6rem,3vh,2.6rem)] xl:text-[clamp(1.2rem,4vh,3.4rem)]";

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:h-svh">
      <IntegratedGallery />

      <div className="bg-bes-amber flex overflow-hidden sm:h-svh sm:w-1/2 sm:items-center sm:justify-center">
        <motion.div
          className="flex h-full w-full flex-col items-center justify-evenly py-8 sm:h-[95%] sm:py-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="sr-only">{t("title")}</h2>
          <motion.img
            src={
              locale === "de"
                ? "/was-ist-berlin-en-salsa.svg"
                : "/que-es-berlin-en-salsa.svg"
            }
            alt={t("title")}
            className={imageClasses}
          />

          <div
            className={`text-bes-red mx-auto flex w-full max-w-[96%] flex-col px-2 text-center font-semibold sm:max-w-[95%] sm:px-6 ${layoutClasses} ${dynamicGapClasses}`}
          >
            <p className={textClasses}>{t("description1")}</p>
            <p className={textClasses}>{t("description2")}</p>
            <p className={textClasses}>{t("description3")}</p>
            <p className={textClasses}>{t("description4")}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionTwo;

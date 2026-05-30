"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import IntegratedGallery from "@/components/Gallery/IntegratedGallery";

const SectionTwo = () => {
  const t = useTranslations("Sections.SectionTwo");
  const locale = useLocale();
  const [isShortMdLandscape, setIsShortMdLandscape] = useState(false);

  const mdParagraphGapClass = isShortMdLandscape ? "md:gap-y-3" : "md:gap-y-7";

  useEffect(() => {
    const checkShortMdLandscape = () => {
      const shortMdLandscape = window.matchMedia(
        "(min-width: 768px) and (max-width: 1023px) and (max-height: 520px)",
      ).matches;
      setIsShortMdLandscape(shortMdLandscape);
    };

    checkShortMdLandscape();
    window.addEventListener("resize", checkShortMdLandscape);

    return () => window.removeEventListener("resize", checkShortMdLandscape);
  }, []);

  // Section content (gallery is provided by IntegratedGallery)

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:h-svh">
      <IntegratedGallery />
      <div className="bg-bes-amber flex h-auto overflow-hidden sm:h-svh sm:w-1/2 sm:items-center sm:justify-center">
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
            className="mb-6 h-auto max-h-[5vh] min-h-24 w-auto px-4 sm:mb-0 sm:max-h-[18vh] sm:px-8 xl:max-h-[18vh]"
          />

          <div
            className={`text-bes-red mx-auto flex h-auto w-full max-w-[96%] flex-col justify-between gap-y-5 px-2 text-center font-semibold sm:h-[65%] sm:max-w-[95%] sm:gap-y-7 sm:px-6 ${mdParagraphGapClass} xl:justify-center xl:gap-y-6`}
          >
            <p className="text-[clamp(1rem,2.55vh,1.95rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1.2rem,4vh,3.4rem)]">
              {t("description1")}
            </p>
            <p className="text-[clamp(1rem,2.55vh,1.95rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1.2rem,4vh,3.4rem)]">
              {t("description2")}
            </p>
            <p className="text-[clamp(1rem,2.55vh,1.95rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1.2rem,4vh,3.4rem)]">
              {t("description3")}
            </p>
            <p className="text-[clamp(1rem,2.55vh,1.95rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1.2rem,4vh,3.4rem)]">
              {t("description4")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionTwo;

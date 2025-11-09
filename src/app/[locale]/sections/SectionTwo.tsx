"use client";

// React hooks not required in this file; gallery logic moved to IntegratedGallery
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import IntegratedGallery from "@/components/Gallery/IntegratedGallery";

const SectionTwo = () => {
  const t = useTranslations("Sections.SectionTwo");
  const locale = useLocale();

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
            className="mb-4 h-auto max-h-[4vh] min-h-[80px] w-auto px-8 sm:mb-0 sm:max-h-[18vh] xl:max-h-[15vh]"
          />

          <div className="text-bes-red mx-auto flex h-auto w-full max-w-[90%] flex-col justify-between gap-y-5 px-4 text-center font-semibold sm:h-[65%] sm:max-w-[95%] sm:gap-y-7 sm:px-6 xl:gap-y-3">
            <p className="text-[clamp(1rem,2.8vh,2.2rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1rem,3.5vh,3rem)]">
              {t("description1")}
            </p>
            <p className="text-[clamp(1rem,2.8vh,2.2rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1rem,3.5vh,3rem)]">
              {t("description2")}
            </p>
            <p className="text-[clamp(1rem,2.8vh,2.2rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1rem,3.5vh,3rem)]">
              {t("description3")}
            </p>
            <p className="text-[clamp(1rem,2.8vh,2.2rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1rem,3.5vh,3rem)]">
              {t("description4")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionTwo;

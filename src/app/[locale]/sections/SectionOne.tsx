"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";

const SectionOne = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const t = useTranslations("Sections.SectionOne");
  const locale = useLocale();
  const dateImageSrc = locale.startsWith("de")
    ? "/date-de.svg"
    : "/date-es.svg";
  const claimImageSrc = locale.startsWith("de")
    ? "/claim-de.svg"
    : "/claim-es.svg";

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:h-svh">
      <div
        ref={sectionRef}
        className="flex h-svh items-center justify-center bg-black sm:w-1/2"
      >
        <div className="flex flex-col items-center">
          <h1 className="sr-only">{t("h1")}</h1>
          <img
            src="/bes-logo-color_2026.webp"
            alt="Berlin en Salsa Logo"
            className="h-auto max-h-[60vh] min-h-[150px] w-full max-w-[90%] object-contain md:max-w-[70%] lg:max-h-[72vh] lg:max-w-[110%] lg:min-w-[60%]"
          />
          <motion.img
            src={dateImageSrc}
            alt={
              locale.startsWith("de")
                ? "Festival Datum Deutsch"
                : "Festival fecha en Espanol"
            }
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            className="-mt-2 w-full max-w-[330px] object-contain sm:mb-2 md:mb-4 md:w-[92%] xl:w-full xl:max-w-[390px]"
          />
        </div>
      </div>

      <div
        className="flex h-svh flex-col items-center justify-center gap-10 bg-cover sm:w-1/2 sm:gap-4 sm:bg-size-[130%_130%] lg:gap-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.45)), url("/bes-section-1-bg.webp")',
          backgroundPosition: "100% 40%",
        }}
      >
        <div className="flex h-[80%] w-[60%] items-center justify-center">
          <img
            src={claimImageSrc}
            alt="Festival claim"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
export default SectionOne;

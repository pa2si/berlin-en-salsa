"use client";

import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { useRef } from "react";
import { preload } from "react-dom"; // Keeps desktop LCP fast
import Image from "next/image"; // 1. Imported Next.js Image

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

  // Preload background for desktop performance
  preload("/bes-section-1-bg.webp", { as: "image", fetchPriority: "low" });

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
            alt="Berlin en Salsa Festival Vol. 2 @ Neulich Biergarten am THF"
            className="h-auto max-h-[60vh] min-h-[150px] w-full max-w-[90%] object-contain md:max-w-[70%] lg:max-h-[72vh] lg:max-w-[110%] lg:min-w-[60%]"
            fetchPriority="high"
            decoding="async"
          />
          <motion.img
            src={dateImageSrc}
            alt={
              locale.startsWith("de")
                ? "Festival Datum Deutsch"
                : "Festival fecha en Espanol"
            }
            initial={{ opacity: 0.01, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 12,
            }}
            className="-mt-2 w-full max-w-[330px] object-contain sm:mb-2 md:mb-4 md:w-[92%] xl:w-full xl:max-w-[390px]"
            decoding="async"
          />
        </div>
      </div>

      {/* 2. Added 'relative' and 'overflow-hidden' to lock down the background bounds */}
      <div className="relative flex h-svh flex-col items-center justify-center gap-10 overflow-hidden sm:w-1/2 sm:gap-4 lg:gap-10">
        {/* 3. Next.js Image component replacing the background asset */}
        <Image
          src="/bes-section-1-bg.webp"
          alt="Festival background"
          fill
          unoptimized // Keeps original path intact so your custom preload hook doesn't break
          className="-z-10 object-cover object-[100%_40%] sm:scale-[1.3]"
        />

        {/* 4. Overlay div handling your specific linear gradient layer */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.45))",
          }}
        />

        {/* 5. Placed foreground content into a relative container to stack perfectly over the image */}
        <div className="relative z-10 flex h-[80%] w-[60%] items-center justify-center">
          <img
            src={claimImageSrc}
            alt="Festival claim"
            className="h-full w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};
export default SectionOne;

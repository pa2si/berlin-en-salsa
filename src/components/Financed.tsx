"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export const Financed = () => {
  const locale = useLocale();
  const fundingTitle = locale === "de" ? "Gefördert durch" : "Financiado por";

  return (
    <section id="footer-funding" className="w-full">
      {/* Centered the title */}
      <h3 className="mb-4 text-center text-2xl font-semibold tracking-wide">
        {fundingTitle}
      </h3>
      {/* Removed xl:justify-start so it centers perfectly */}
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-nowrap sm:gap-8">
        <a
          href="https://www.musicboard-berlin.de/"
          target="_blank"
          rel="noopener noreferrer"
          className="contents"
        >
          <motion.img
            src="/musicbboard-w-text.webp"
            alt="Musicboard Berlin"
            className="h-auto w-[78%] max-w-[380px] object-contain sm:w-[50%] xl:w-full xl:max-w-[320px] 2xl:max-w-[380px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </a>
        <a
          href="https://www.brot-fuer-die-welt.de/"
          target="_blank"
          rel="noopener noreferrer"
          className="contents"
        >
          <motion.img
            src="/brot-fuer-die-welt-logo.webp"
            alt="Brot fuer die Welt"
            className="h-auto w-[62%] max-w-[280px] object-contain sm:w-[38%] xl:w-full xl:max-w-60 2xl:max-w-[280px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </a>
      </div>
    </section>
  );
};

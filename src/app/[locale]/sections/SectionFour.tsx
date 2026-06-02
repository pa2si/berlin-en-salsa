"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const SectionFour = () => {
  const t = useTranslations("Sections.SectionFour");
  const locale = useLocale();
  const supportEmailHref = "mailto:info@berlinensalsa.de";
  const saborHref = "https://saboramiberlin.com/";
  const saborText =
    locale === "de" ? "Zu bekommen bei" : "Consigue tu favorito aquí:";

  // Generate the 10 gallery images
  const galleryImages = Array.from(
    { length: 10 },
    (_, i) => `/gallery-merch/gallery-merch-${i + 1}.webp`,
  );

  // State to track which pair of images is shown.
  // It increments/decrements by 2 (0, 2, 4, 6, 8)
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => setCurrentIndex((prev) => (prev + 2) % 10);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 2 + 10) % 10);

  const description2WithFundingLink = t.rich("description2", {
    fundingLink: (chunks) => (
      <a
        href="#footer-funding"
        className="hover:text-bes-amber/80 underline decoration-2 underline-offset-4 transition-colors"
      >
        {chunks}
      </a>
    ),
  });

  return (
    <>
      {/* Mobile to Large Layout (Visible below xl) */}
      <div className="bg-bes-purple flex min-h-svh flex-col items-center justify-center gap-6 overflow-x-hidden overflow-y-auto p-4 py-8 xl:hidden">
        {/* 1. Title Image */}
        <h2 className="sr-only">{t("title")}</h2>
        <img
          src={locale === "de" ? "/unser-merch.svg" : "/nuestro-merch.svg"}
          alt={t("title")}
          className="w-[60vw] max-w-sm"
        />

        {/* 2. Descriptions */}
        <div className="flex flex-col items-center gap-3 px-2 md:gap-4 md:px-8">
          <p className="text-bes-amber text-center text-[clamp(1.25rem,5vw,1.8rem)] leading-snug font-semibold">
            {t("description1")}
          </p>
          <p className="text-bes-amber text-center text-[clamp(1.25rem,5vw,1.8rem)] leading-snug font-semibold">
            {description2WithFundingLink}
          </p>
          <p className="text-bes-amber text-center text-[clamp(1.25rem,5vw,1.8rem)] leading-snug font-semibold">
            {t("description3")}
          </p>
        </div>

        {/* 3. Button / Sabor a Mi Logo (Inline) */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-2">
          <p className="text-bes-amber text-center text-[clamp(1rem,3.5vw,1.4rem)] font-semibold">
            {saborText}
          </p>
          <a
            href={saborHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={saborText}
            className="inline-block transition-transform hover:scale-105"
          >
            <img
              src="/sabor-a-mi.webp"
              alt="Sabor a Mi Berlin"
              className="h-12 w-auto object-contain sm:h-16"
            />
          </a>
        </div>

        <a
          href={supportEmailHref}
          aria-label={t("supportTitle")}
          className="block"
        ></a>

        {/* 4. T-Shirts Images with Navigation Arrows */}
        <div className="flex w-full max-w-3xl flex-row items-center justify-around gap-2 pt-4 sm:gap-6">
          <button
            onClick={handlePrev}
            className="text-bes-amber p-1 transition-colors hover:text-white active:scale-95"
            aria-label="Previous images"
          >
            <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
              <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
            </svg>
          </button>

          <motion.img
            key={`mobile-left-${currentIndex}`}
            src={galleryImages[currentIndex]}
            alt={`Merch item ${currentIndex + 1}`}
            className="h-auto max-h-[300px] w-[35vw] max-w-[220px] object-contain"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          />
          <motion.img
            key={`mobile-right-${currentIndex}`}
            src={galleryImages[currentIndex + 1]}
            alt={`Merch item ${currentIndex + 2}`}
            className="h-auto max-h-[300px] w-[35vw] max-w-[220px] object-contain"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          />

          <button
            onClick={handleNext}
            className="text-bes-amber p-1 transition-colors hover:text-white active:scale-95"
            aria-label="Next images"
          >
            <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop layout (xl and above) */}
      <div className="bg-bes-purple hidden h-svh flex-col overflow-x-hidden overflow-y-hidden xl:flex">
        {/* Top Section - Grid Content */}
        <div className="grid flex-1 grid-cols-3 pt-4 xl:pt-2 2xl:pt-4">
          {/* Left Image Column */}
          <div className="flex items-center justify-end pr-4">
            <button
              onClick={handlePrev}
              className="text-bes-amber p-2 transition-colors hover:text-white"
              aria-label="Previous images"
            >
              <svg className="h-12 w-12 fill-current" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </button>
            <motion.img
              key={`desktop-left-${currentIndex}`}
              src={galleryImages[currentIndex]}
              alt={`Merch item ${currentIndex + 1}`}
              className="max-h-[clamp(40vh,55vh,65vh)] max-w-[80%] object-contain px-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
            />
          </div>

          {/* Center Content Column */}
          <div className="flex flex-col items-center justify-center gap-[clamp(1rem,3vh,2.5rem)] px-2 2xl:gap-6">
            <div>
              <img
                src={
                  locale === "de" ? "/unser-merch.svg" : "/nuestro-merch.svg"
                }
                alt={t("title")}
                className="mx-auto w-[clamp(18rem,40vh,38rem)] max-w-full object-contain"
              />
            </div>

            <p className="text-bes-amber text-center leading-snug font-semibold xl:text-[clamp(1.3rem,3.2vh,2rem)]">
              {t("description1")}
            </p>
            <p className="text-bes-amber text-center leading-snug font-semibold xl:text-[clamp(1.3rem,3.2vh,2rem)]">
              {description2WithFundingLink}
            </p>
            <p className="text-bes-amber text-center leading-snug font-semibold xl:text-[clamp(1.3rem,3.2vh,2rem)]">
              {t("description3")}
            </p>

            {/* Button / Sabor a Mi Logo (Inline) */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2">
              <p className="text-bes-amber text-center font-semibold xl:text-[clamp(1.1rem,2.5vh,1.5rem)]">
                {saborText}
              </p>
              <a
                href={saborHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={saborText}
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src="/sabor-a-mi.webp"
                  alt="Sabor a Mi Berlin"
                  className="w-auto object-contain xl:h-[clamp(4.5rem,9vh,6.5rem)]"
                />
              </a>
            </div>

            <a
              href={supportEmailHref}
              aria-label={t("supportTitle")}
              className="block"
            ></a>
          </div>

          {/* Right Image Column */}
          <div className="flex items-center justify-start pl-4">
            <motion.img
              key={`desktop-right-${currentIndex}`}
              src={galleryImages[currentIndex + 1]}
              alt={`Merch item ${currentIndex + 2}`}
              className="max-h-[clamp(40vh,55vh,65vh)] max-w-[80%] object-contain px-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
            />
            <button
              onClick={handleNext}
              className="text-bes-amber p-2 transition-colors hover:text-white"
              aria-label="Next images"
            >
              <svg className="h-12 w-12 fill-current" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Section - Full Width Thumbnail Gallery */}
        <div className="mt-auto w-full bg-black/15 px-8 py-[clamp(1rem,2.5vh,1.5rem)] shadow-inner backdrop-blur-sm">
          <div className="custom-scrollbar mx-auto flex max-w-6xl items-center justify-center gap-4 overflow-x-auto pb-2">
            {galleryImages.map((src, i) => {
              // Pair index calculation
              const pairIndex = Math.floor(i / 2) * 2;
              const isSelected = pairIndex === currentIndex;

              return (
                <button
                  key={src}
                  onClick={() => setCurrentIndex(pairIndex)}
                  className={`relative shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                    isSelected
                      ? "ring-bes-amber scale-105 opacity-100 shadow-lg ring-4"
                      : "hover:ring-bes-amber/50 opacity-40 hover:scale-105 hover:opacity-100 hover:ring-2"
                  }`}
                  aria-label={`View image pair ${pairIndex / 2 + 1}`}
                >
                  <img
                    src={src}
                    alt={`Gallery thumbnail ${i + 1}`}
                    className="object-cover xl:h-[clamp(4.5rem,10vh,7rem)] xl:w-[clamp(4.5rem,10vh,7rem)]"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionFour;

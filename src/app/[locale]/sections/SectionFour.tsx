"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

// Moved outside so it doesn't recreate on every render
const galleryImages = Array.from(
  { length: 10 },
  (_, i) => `/gallery-merch/gallery-merch-${i + 1}.webp`,
);

const SectionFour = () => {
  const t = useTranslations("Sections.SectionFour");
  const locale = useLocale();
  const saborHref = "https://maps.app.goo.gl/xCwN7mBtPpiu2pYZ7";

  const mobileSectionSpacingClass =
    "gap-[clamp(0.5rem,2vh,1.5rem)] py-[clamp(0.5rem,2vh,2rem)] landscape:gap-1 landscape:py-2 lg:landscape:gap-3 lg:landscape:py-0";

  const mobileDescriptionSpacingClass =
    "gap-[clamp(0.4rem,1.2vh,1rem)] md:gap-[clamp(0.6rem,1.5vh,1.1rem)] landscape:gap-1 lg:gap-3 lg:landscape:gap-1.5";

  const descriptionTextClass =
    "text-bes-amber text-center leading-snug font-semibold text-[clamp(1.1rem,5.5vw,2rem)] md:text-[1.75rem] landscape:text-[clamp(0.9rem,4.5vh,1.2rem)] lg:text-[2.5rem] lg:leading-normal lg:landscape:text-[1.35rem] lg:landscape:leading-tight";

  const getItHereButtonClass =
    "inline-flex items-center justify-center rounded-full border-2 border-bes-amber bg-bes-amber/10 px-6 py-2 text-center font-semibold text-bes-amber shadow-[0_0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-bes-amber hover:text-bes-purple hover:shadow-[0_10px_24px_-12px_rgba(255,184,77,0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bes-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bes-purple active:translate-y-0";

  const [currentIndex, setCurrentIndex] = useState(0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // 1. PRELOAD IMAGES
  useEffect(() => {
    galleryImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev + 2) % 10);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 2 + 10) % 10);

  // Fixed the TypeScript implicit 'any' error by adding `: number`
  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleModalNext = () =>
    setModalIndex((prev) => (prev + 1) % galleryImages.length);
  const handleModalPrev = () =>
    setModalIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );

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

  const renderThumbnails = () => (
    <div className="mt-auto w-full bg-black/15 px-8 py-[clamp(0.75rem,1.5vh,1.5rem)] shadow-inner backdrop-blur-sm">
      <div className="custom-scrollbar mx-auto flex max-w-6xl items-center justify-center gap-3 overflow-x-auto pb-1 sm:gap-4">
        {galleryImages.map((src, i) => {
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
                className="h-14 w-14 object-cover xl:h-[clamp(4.5rem,10vh,7rem)] xl:w-[clamp(4.5rem,10vh,7rem)] lg:landscape:h-16 lg:landscape:w-16"
              />
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-bes-purple flex min-h-svh flex-col items-center justify-between overflow-x-hidden overflow-y-auto pt-4 xl:hidden">
        <div
          className={`flex w-full flex-1 flex-col items-center justify-center px-4 ${mobileSectionSpacingClass}`}
        >
          <h2 className="sr-only">{t("title")}</h2>
          <img
            src={locale === "de" ? "/unser-merch.svg" : "/nuestro-merch.svg"}
            alt={t("title")}
            className="w-[55vw] max-w-sm md:w-[45vw] md:max-w-[300px] landscape:h-[clamp(50px,16vh,90px)] landscape:w-auto lg:landscape:mb-4 lg:landscape:h-auto lg:landscape:w-[300px]"
          />

          <div
            className={`flex flex-col items-center px-2 md:px-8 ${mobileDescriptionSpacingClass}`}
          >
            <p className={descriptionTextClass}>{t("description1")}</p>
            <p className={descriptionTextClass}>
              {description2WithFundingLink}
            </p>
            <p className={descriptionTextClass}>{t("description3")}</p>
          </div>

          <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2 pt-2 lg:landscape:pt-1">
            <a
              href={saborHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${getItHereButtonClass} text-[clamp(1rem,3.6vw,1.45rem)] lg:text-[1.35rem] landscape:px-4 landscape:py-1.5 landscape:text-[clamp(0.82rem,3.8vh,1rem)] lg:landscape:text-[1rem]`}
            >
              {t("getItHere")}
            </a>
          </div>

          <div className="flex w-full max-w-3xl flex-row items-center justify-center gap-2 pt-2 sm:gap-6 lg:landscape:pt-2">
            <button
              onClick={handlePrev}
              className="text-bes-amber shrink-0 p-1 transition-colors hover:text-white active:scale-95"
              aria-label="Previous images"
            >
              <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </button>

            {/* Clickable Image (Left) */}
            <div
              className="flex h-[clamp(110px,20vh,250px)] w-[35vw] max-w-[220px] shrink-0 cursor-pointer items-center justify-center transition-transform hover:scale-105 sm:h-[300px] md:h-[260px] md:max-w-[190px] landscape:h-[clamp(70px,25vh,130px)] sm:landscape:h-[28vh] lg:landscape:h-[22vh]"
              onClick={() => openModal(currentIndex)}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={`mobile-left-${currentIndex}`}
                  src={galleryImages[currentIndex]}
                  alt={`Merch item ${currentIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>

            {/* Clickable Image (Right) */}
            <div
              className="flex h-[clamp(110px,20vh,250px)] w-[35vw] max-w-[220px] shrink-0 cursor-pointer items-center justify-center transition-transform hover:scale-105 sm:h-[300px] md:h-[260px] md:max-w-[190px] landscape:h-[clamp(70px,25vh,130px)] sm:landscape:h-[28vh] lg:landscape:h-[22vh]"
              onClick={() => openModal(currentIndex + 1)}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={`mobile-right-${currentIndex}`}
                  src={galleryImages[currentIndex + 1]}
                  alt={`Merch item ${currentIndex + 2}`}
                  className="max-h-full max-w-full object-contain"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>

            <button
              onClick={handleNext}
              className="text-bes-amber shrink-0 p-1 transition-colors hover:text-white active:scale-95"
              aria-label="Next images"
            >
              <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden w-full lg:block">{renderThumbnails()}</div>
      </div>

      <div className="bg-bes-purple hidden h-svh flex-col overflow-x-hidden overflow-y-hidden xl:flex">
        {/* Desktop content (Unchanged) */}
        <div className="grid flex-1 grid-cols-3 pt-4 xl:pt-2 2xl:pt-4">
          <div className="flex items-center justify-end pr-4">
            <button
              onClick={handlePrev}
              className="text-bes-amber p-2 transition-colors hover:text-white"
            >
              <svg className="h-12 w-12 fill-current" viewBox="0 0 24 24">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
              </svg>
            </button>
            <div className="flex h-[clamp(40vh,55vh,65vh)] w-[80%] shrink-0 items-center justify-center px-4">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={`desktop-left-${currentIndex}`}
                  src={galleryImages[currentIndex]}
                  alt={`Merch item ${currentIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
                />
              </AnimatePresence>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-[clamp(1rem,3vh,2.5rem)] px-2 2xl:gap-6">
            <img
              src={locale === "de" ? "/unser-merch.svg" : "/nuestro-merch.svg"}
              alt={t("title")}
              className="mx-auto w-[clamp(18rem,40vh,38rem)] max-w-full object-contain"
            />
            <p className="text-bes-amber text-center leading-snug font-semibold xl:text-[clamp(1.3rem,3.2vh,2rem)]">
              {t("description1")}
            </p>
            <p className="text-bes-amber text-center leading-snug font-semibold xl:text-[clamp(1.3rem,3.2vh,2rem)]">
              {description2WithFundingLink}
            </p>
            <p className="text-bes-amber text-center leading-snug font-semibold xl:text-[clamp(1.3rem,3.2vh,2rem)]">
              {t("description3")}
            </p>
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-2">
              <a
                href={saborHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${getItHereButtonClass} xl:text-[clamp(1rem,2.25vh,1.3rem)]`}
              >
                {t("getItHere")}
              </a>
            </div>
          </div>
          <div className="flex items-center justify-start pl-4">
            <div className="flex h-[clamp(40vh,55vh,65vh)] w-[80%] shrink-0 items-center justify-center px-4">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={`desktop-right-${currentIndex}`}
                  src={galleryImages[currentIndex + 1]}
                  alt={`Merch item ${currentIndex + 2}`}
                  className="max-h-full max-w-full object-contain"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 90 }}
                />
              </AnimatePresence>
            </div>
            <button
              onClick={handleNext}
              className="text-bes-amber p-2 transition-colors hover:text-white"
            >
              <svg className="h-12 w-12 fill-current" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </button>
          </div>
        </div>
        {renderThumbnails()}
      </div>

      {/* FULL SCREEN SLIDABLE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            // Fixed ESLint Warning: changed z-[100] to z-100
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal} // 2. Clicking background closes modal
          >
            {/* Close Button ('X' in red) */}
            <button
              onClick={closeModal}
              // Fixed ESLint Warning: changed z-[110] to z-110
              className="absolute top-4 right-4 z-110 rounded-full bg-black/20 p-2 text-red-500 transition-colors hover:bg-black/40 hover:text-red-400 active:scale-95"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Slidable Gallery Container */}
            <div
              className="relative flex h-[85dvh] w-full max-w-2xl items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()} // 2. Clicking the image area won't close it
            >
              {/* 3. UX Hint: Left Arrow */}
              <button
                // Fixed ESLint Warning: changed z-[105] to z-105
                className="absolute left-0 z-105 p-2 text-white/40 transition-colors hover:text-white sm:left-4"
                onClick={handleModalPrev}
                aria-label="Previous image"
              >
                <svg
                  className="h-10 w-10 fill-current drop-shadow-md"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                </svg>
              </button>

              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={modalIndex}
                  src={galleryImages[modalIndex]}
                  alt={`Merch item ${modalIndex + 1}`}
                  className="max-h-full max-w-full cursor-grab object-contain active:cursor-grabbing"
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  // Swipe logic
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(e, { offset }) => {
                    const swipeThreshold = 50;
                    if (offset.x > swipeThreshold) {
                      handleModalPrev();
                    } else if (offset.x < -swipeThreshold) {
                      handleModalNext();
                    }
                  }}
                />
              </AnimatePresence>

              {/* 3. UX Hint: Right Arrow */}
              <button
                // Fixed ESLint Warning: changed z-[105] to z-105
                className="absolute right-0 z-105 p-2 text-white/40 transition-colors hover:text-white sm:right-4"
                onClick={handleModalNext}
                aria-label="Next image"
              >
                <svg
                  className="h-10 w-10 fill-current drop-shadow-md"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>
            </div>

            {/* Navigation Dots & Text Hint */}
            <div className="absolute bottom-6 flex flex-col items-center gap-3">
              <div className="flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalIndex(index);
                    }}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      modalIndex === index
                        ? "bg-white"
                        : "bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionFour;

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { loadGalleryImages, GALLERY_CONFIG } from "@/config/gallery";
import { ChevronLeft, ChevronRight } from "@/components/GalleryIcons";

const SectionTwo = () => {
  const galleryImages = loadGalleryImages(GALLERY_CONFIG.imageCount);
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [showCaption, setShowCaption] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Sections.SectionTwo");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tGallery: any = useTranslations("Sections.Gallery");
  const locale = useLocale();

  // Navigation functions
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentImage) return;
    setIsAnimating(true);
    setCurrentImage(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Handle drag end for swipe navigation
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50;
    const swipeVelocityThreshold = 500;

    if (
      Math.abs(info.offset.x) > swipeThreshold ||
      Math.abs(info.velocity.x) > swipeVelocityThreshold
    ) {
      if (info.offset.x > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  };

  // Show caption automatically on mobile when slide changes
  useEffect(() => {
    setShowCaption(true);
  }, [currentImage]);

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:h-svh">
      <div
        className="group relative flex h-[50vh] items-center justify-center overflow-hidden sm:h-svh sm:w-1/2"
        ref={slideContainerRef}
        onMouseEnter={() => setIsHoveringImage(true)}
        onMouseLeave={() => setIsHoveringImage(false)}
      >
        {/* Slider with drag support */}
        <motion.div
          className="flex h-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={{
            x: `${-currentImage * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 50,
            mass: 0.5,
          }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className="relative h-full w-full flex-shrink-0"
              onMouseEnter={() => setShowCaption(true)}
              onMouseLeave={() => setShowCaption(false)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />

              {/* Caption Overlay */}
              {index === currentImage && (
                <>
                  {/* Desktop - Hover to show */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: showCaption || isHoveringImage ? 1 : 0,
                      y: showCaption || isHoveringImage ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black/80 via-black/60 to-transparent px-6 pt-12 pb-6 sm:block"
                  >
                    <p className="text-bes-amber text-base leading-relaxed font-medium md:text-lg">
                      {tGallery(`captions.image${index + 1}`)}
                    </p>
                  </motion.div>

                  {/* Mobile - At the top, always shown unless closed */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                      opacity: showCaption ? 1 : 0,
                      y: showCaption ? 0 : -20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent px-4 pt-4 pb-12 sm:hidden"
                    style={{ pointerEvents: showCaption ? "auto" : "none" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-bes-amber flex-1 text-sm leading-relaxed font-medium">
                        {tGallery(`captions.image${index + 1}`)}
                      </p>
                      <button
                        onClick={() => setShowCaption(false)}
                        className="bg-bes-red/90 text-bes-amber hover:bg-bes-red flex-shrink-0 rounded-full p-1 transition-colors"
                        aria-label={tGallery("closeCaption")}
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          ))}
        </motion.div>

        {/* Navigation Arrows - Desktop (on the sides) */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          disabled={isAnimating}
          className="bg-bes-red text-bes-amber absolute top-1/2 left-2 z-30 hidden -translate-y-1/2 rounded-full p-2 shadow-lg disabled:opacity-30 sm:left-4 sm:flex sm:p-2.5"
          aria-label="Previous image"
          animate={{
            opacity: isHoveringImage ? 1 : 0.5,
            scale: isHoveringImage ? 1 : 0.85,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 10,
          }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>

        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          disabled={isAnimating}
          className="bg-bes-red text-bes-amber absolute top-1/2 right-2 z-30 hidden -translate-y-1/2 rounded-full p-2 shadow-lg disabled:opacity-30 sm:right-4 sm:flex sm:p-2.5"
          aria-label="Next image"
          animate={{
            opacity: isHoveringImage ? 1 : 0.5,
            scale: isHoveringImage ? 1 : 0.85,
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>

        {/* Navigation Controls - Mobile & Desktop */}
        <div className="absolute bottom-4 z-10 flex items-center gap-3 sm:gap-2">
          {/* Left Arrow - Mobile only */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            disabled={isAnimating}
            className="bg-bes-red text-bes-amber flex rounded-full p-1.5 opacity-60 shadow-lg disabled:opacity-30 sm:hidden"
            aria-label="Previous image"
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.button>

          {/* Navigation Dots */}
          <div className="flex items-center gap-2">
            {galleryImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isAnimating}
                className="group relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to image ${index + 1}`}
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? "bg-bes-red shadow-bes-red/50 scale-125 shadow-lg"
                      : "bg-bes-red/30 group-hover:bg-bes-red/60"
                  }`}
                />
                {index === currentImage && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="border-bes-amber absolute inset-0 rounded-full border-2"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Arrow - Mobile only */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            disabled={isAnimating}
            className="bg-bes-red text-bes-amber flex rounded-full p-2 opacity-60 shadow-lg disabled:opacity-30 sm:hidden"
            aria-label="Next image"
            whileTap={{ scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
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

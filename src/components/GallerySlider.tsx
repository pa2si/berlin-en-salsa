"use client";

import { motion, PanInfo } from "framer-motion";
import { useGallerySlider } from "@/hooks/useGallerySlider";
import { GALLERY_CONFIG, loadGalleryImages } from "@/config/gallery";
import { ChevronLeft, ChevronRight } from "@/components/GalleryIcons";

/**
 * Innovative Gallery Slider Component
 * Features:
 * - Continuous horizontal slider with smooth transitions
 * - Drag/swipe to navigate (touch & mouse)
 * - Manual navigation via arrows and dots
 * - Responsive design (mobile & desktop)
 * - Corporate design integration (bes-red, bes-amber, bes-purple)
 */

const GallerySlider = () => {
  const originalImages = loadGalleryImages(GALLERY_CONFIG.imageCount);

  // Create infinite loop by duplicating first and last images
  const images = [
    originalImages[originalImages.length - 1], // Clone of last image at start
    ...originalImages,
    originalImages[0], // Clone of first image at end
  ];

  const { currentIndex, isAnimating, nextSlide, prevSlide, goToSlide } =
    useGallerySlider({
      images: originalImages, // Use original images for navigation logic
      autoPlayInterval: GALLERY_CONFIG.autoPlayInterval,
      autoPlay: false, // Disabled auto-play
    });

  // Handle drag end for swipe navigation
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipeThreshold = 50; // Minimum distance to trigger swipe
    const swipeVelocityThreshold = 500; // Minimum velocity for quick swipes

    // Check horizontal swipe distance or velocity
    if (
      Math.abs(info.offset.x) > swipeThreshold ||
      Math.abs(info.velocity.x) > swipeVelocityThreshold
    ) {
      if (info.offset.x > 0) {
        // Swiped right -> go to previous
        prevSlide();
      } else {
        // Swiped left -> go to next
        nextSlide();
      }
    }
  };

  return (
    <section className="bg-bes-amber relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-12 sm:py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="bg-bes-red absolute top-[20%] left-[10%] h-64 w-64 rounded-full blur-[128px]" />
        <div className="bg-bes-purple absolute right-[10%] bottom-[20%] h-96 w-96 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-[90rem] flex-col items-center gap-8 px-4 sm:px-6 lg:gap-12 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-bes-red mb-2 text-[clamp(2rem,6vw,4rem)] font-bold tracking-wide">
            Gallery
          </h2>
          <div className="bg-bes-purple mx-auto h-1 w-24 rounded-full" />
        </motion.div>

        {/* Main Slider Container */}
        <div className="relative w-full">
          {/* Continuous Slider Track */}
          <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-lg sm:aspect-[16/9]">
            <motion.div
              className="flex h-full cursor-grab active:cursor-grabbing"
              drag="x"
              dragElastic={0.2}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              animate={{
                x: `${-((currentIndex + 1) * 100) / images.length}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 50,
                mass: 0.5,
              }}
              style={{
                width: `${images.length * 100}%`,
              }}
            >
              {images.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="relative h-full flex-shrink-0 px-2"
                  style={{
                    width: `${100 / images.length}%`,
                  }}
                >
                  <div
                    className={`relative h-full w-full overflow-hidden rounded-lg shadow-2xl transition-all duration-300 ${
                      index === currentIndex + 1
                        ? "ring-bes-red ring-4"
                        : "ring-bes-purple/30 ring-2"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Navigation Arrows - Desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              disabled={isAnimating}
              className="bg-bes-red/90 hover:bg-bes-red text-bes-amber absolute top-1/2 left-2 z-30 hidden -translate-y-1/2 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 sm:left-4 sm:flex lg:p-4"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 lg:h-8 lg:w-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              disabled={isAnimating}
              className="bg-bes-red/90 hover:bg-bes-red text-bes-amber absolute top-1/2 right-2 z-30 hidden -translate-y-1/2 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50 sm:right-4 sm:flex lg:p-4"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 lg:h-8 lg:w-8" />
            </button>
          </div>

          {/* Controls Section */}
          <div className="mt-8 flex flex-col items-center gap-6 sm:mt-12">
            {/* Navigation Dots */}
            <div className="flex items-center gap-2 sm:gap-3">
              {originalImages.map((_, index) => (
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
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${
                      index === currentIndex
                        ? "bg-bes-red shadow-bes-red/50 scale-125 shadow-lg"
                        : "bg-bes-red/30 group-hover:bg-bes-red/60"
                    }`}
                  />
                  {/* Active indicator ring */}
                  {index === currentIndex && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="border-bes-purple absolute inset-0 rounded-full border-2"
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

            {/* Mobile Navigation Buttons */}
            <div className="flex items-center gap-4 sm:hidden">
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="bg-bes-red/90 hover:bg-bes-red text-bes-amber flex rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="bg-bes-red/90 hover:bg-bes-red text-bes-amber flex rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Image Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-bes-red text-center text-sm font-semibold tracking-wider sm:text-base"
            >
              {currentIndex + 1} / {originalImages.length}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;

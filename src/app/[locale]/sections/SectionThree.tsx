"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { FESTIVAL_CONFIG } from "@/config/festival";

const SectionThree = () => {
  // Define image sets for different screen sizes
  const defaultImages = ["/section-3-image-1.webp"];
  const midSizeImages = ["/section-3-image-1-mobile.webp"];

  const [currentImage, setCurrentImage] = useState(0);
  const [isMidSize, setIsMidSize] = useState(false);
  const [isTabletMd, setIsTabletMd] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const t = useTranslations("Sections.SectionThree");
  const locale = useLocale();
  const promoVideoUrl =
    "https://res.cloudinary.com/dgvreu6b6/video/upload/q_auto/f_auto/v1780437231/260504_BeS_Trailer_2026_final_f0rpfj.mp4";
  const promoButtonText = t("promoButtonText");

  const mdLayoutGapClass = isTabletMd
    ? "md:gap-[clamp(1.8rem,2.8vh,2.8rem)]"
    : "md:gap-[clamp(1.4rem,2.4vh,2.4rem)]";
  const mdImageClass = isTabletMd
    ? "md:-mb-1 md:max-w-[clamp(13.5rem,28vh,19rem)]"
    : "md:-mb-2 md:max-w-[clamp(12rem,25vh,17rem)]";
  const mdTextClass = isTabletMd
    ? "md:gap-[clamp(0.35rem,0.7vh,0.7rem)] md:text-[clamp(1.3rem,2.8vh,2rem)] md:leading-[1.14]"
    : "md:gap-[clamp(0.2rem,0.5vh,0.5rem)] md:text-[clamp(1.15rem,2.4vh,1.75rem)] md:leading-[1.12]";

  // Get the appropriate image set based on screen size
  const images = isMidSize ? midSizeImages : defaultImages;
  const hasMultipleImages = images.length > 1;

  // Check screen size to determine which image set to use
  useEffect(() => {
    // Function to check if screen size is sm, md, or lg (768px to 1279px)
    const checkScreenSize = () => {
      const isSmToLg = window.matchMedia(
        "(min-width: 640px) and (max-width: 1279px)",
      ).matches;
      const isTabletLikeMd = window.matchMedia(
        "(min-width: 768px) and (max-width: 1023px) and (min-height: 900px)",
      ).matches;
      setIsMidSize(isSmToLg);
      setIsTabletMd(isTabletLikeMd);
    };

    // Check on initial load
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-rotate images every 5 seconds (only for multiple images)
  useEffect(() => {
    if (hasMultipleImages) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images.length, hasMultipleImages, isMidSize]);

  useEffect(() => {
    if (!isVideoOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVideoOpen]);

  // Don't render the section if features are not available yet
  // This check must come AFTER all hooks to comply with React rules of hooks
  if (!FESTIVAL_CONFIG.sectionThree.isAvailable) {
    return null;
  }

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:min-h-svh">
      <div className="bg-bes-red flex h-auto items-center justify-center py-12 sm:h-svh sm:w-1/2 sm:justify-start sm:py-0">
        <motion.div
          className={`text-bes-amber flex flex-col gap-10 sm:ml-8 sm:gap-6 ${mdLayoutGapClass} lg:ml-10 lg:gap-10 xl:ml-20 xl:gap-12`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="sr-only">{t("title")}</h2>
          <motion.img
            src={
              locale === "de"
                ? "/berlin-en-salsa-kommt-mit-voller-power.svg"
                : "/berlin-en-salsa-se-viene-con-todo.svg"
            }
            alt={t("title")}
            className={`mx-auto -ml-1 h-auto w-[90%] max-w-[24rem] sm:max-w-[16rem] ${mdImageClass} lg:h-[clamp(6rem,12vh,10rem)] lg:max-w-120 xl:h-[clamp(8rem,15vh,12rem)] 2xl:h-[clamp(9rem,18vh,14rem)]`}
          />
          <div
            className={`flex flex-col gap-1 text-[clamp(1.5rem,4vw,2.5rem)] font-semibold sm:gap-0 sm:text-[clamp(1rem,2vw,1.3rem)] ${mdTextClass} lg:gap-2 lg:text-[clamp(1.2rem,3vh,2.8rem)] xl:gap-2 xl:text-[clamp(1.4rem,3.8vh,3.1rem)] 2xl:gap-3`}
          >
            <p>{t("features.days")}</p>
            <p>{t("features.orchestras")}</p>
            <p>{t("features.shows")}</p>
            <p>{t("features.djs")}</p>
            <p>{t("features.talks")}</p>
            <p>{t("features.workshops")}</p>
            <p>{t("features.vinyl")}</p>
            <p>{t("features.food")}</p>
          </div>
        </motion.div>
      </div>
      <div className="relative flex h-[50vh] items-center justify-center sm:h-svh sm:w-1/2">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center ${
              hasMultipleImages ? "transition-opacity duration-1000" : ""
            } ${
              !hasMultipleImages || index === currentImage
                ? "opacity-100"
                : "opacity-0"
            }`}
            style={{
              backgroundImage: `url("${img}")`,
              backgroundPosition: "50% 50%",
            }}
          />
        ))}

        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

        <button
          type="button"
          onClick={() => setIsVideoOpen(true)}
          className="border-bes-amber bg-bes-amber/20 text-bes-amber hover:bg-bes-amber hover:text-bes-red focus-visible:ring-bes-amber relative z-10 mx-6 w-[min(90%,34rem)] cursor-pointer rounded-2xl border-2 px-6 py-5 text-center text-[clamp(1.25rem,3.6vw,2rem)] font-semibold shadow-[0_20px_50px_-30px_rgba(0,0,0,0.85)] backdrop-blur-[1.5px] transition-all duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
          aria-label={promoButtonText}
        >
          {promoButtonText}
        </button>
      </div>

      {isVideoOpen && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Promo video"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative aspect-9/16 w-[92vw] max-w-[420px] sm:h-[85vh] sm:max-h-[750px] sm:w-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-11 -right-2 cursor-pointer rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              aria-label="Close video"
            >
              Close
            </button>
            <div className="h-full w-full overflow-hidden rounded-xl bg-black shadow-2xl">
              <video
                src={promoVideoUrl}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SectionThree;

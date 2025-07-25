"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SectionThree = () => {
  // Define image sets for different screen sizes
  const defaultImages = ["/section-3-image-1.webp"];
  const midSizeImages = ["/section-3-image-1-mobile.webp"];

  const [currentImage, setCurrentImage] = useState(0);
  const [isMidSize, setIsMidSize] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // Get the appropriate image set based on screen size
  const images = isMidSize ? midSizeImages : defaultImages;
  const hasMultipleImages = images.length > 1;

  // Handle image tap/click to advance to next image (only for multiple images)
  const handleImageClick = () => {
    if (hasMultipleImages) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }
  };

  // Check screen size to determine which image set to use
  useEffect(() => {
    // Function to check if screen size is sm, md, or lg (768px to 1279px)
    const checkScreenSize = () => {
      const isSmToLg = window.matchMedia(
        "(min-width: 640px) and (max-width: 1279px)",
      ).matches;
      setIsMidSize(isSmToLg);
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

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:min-h-svh">
      <div className="bg-bes-red flex h-auto items-center justify-center py-12 sm:h-svh sm:w-1/2 sm:justify-start sm:py-0">
        <motion.div
          className="text-bes-amber flex flex-col gap-10 sm:ml-8 sm:gap-6 md:gap-8 lg:ml-10 lg:gap-10 xl:ml-20 xl:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="sr-only">Berlin en Salsa se viene con todo!</h2>
          <motion.img
            src="/berlin-en-salsa-se-viene-con-todo.svg"
            alt="Berlin en Salsa se viene con todo!"
            className="mx-auto -ml-1 h-auto w-[90%] max-w-[24rem] sm:max-w-[16rem] md:-mb-6 md:max-w-[20rem] lg:h-[clamp(6rem,12vh,10rem)] lg:max-w-[30rem] xl:h-[clamp(8rem,15vh,12rem)] 2xl:h-[clamp(9rem,18vh,14rem)]"
          />
          <div className="flex flex-col gap-1 text-[clamp(1.5rem,4vw,2.5rem)] font-semibold sm:gap-0 sm:text-[clamp(1rem,2vw,1.3rem)] md:gap-1 md:text-[clamp(1.2rem,2.5vw,1.8rem)] lg:gap-2 lg:text-[clamp(1.2rem,3vh,2.8rem)] xl:gap-2 xl:text-[clamp(1.4rem,3.8vh,3.1rem)] 2xl:gap-3">
            <p>2 días de pura salsa!</p>
            <p>6 orquestas en vivo</p>
            <p>5 shows de baile</p>
            <p>20 DJs</p>
            <p>Charlas</p>
            <p>Talleres de musica</p>
            <p>Mercado de vinilos</p>
            <p>Delicias latinas y más!</p>
          </div>
        </motion.div>
      </div>
      <div
        className={`relative flex h-[50vh] sm:h-svh ${hasMultipleImages ? "cursor-pointer" : ""} items-center justify-center sm:w-1/2`}
        ref={slideContainerRef}
        onClick={hasMultipleImages ? handleImageClick : undefined}
      >
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

        {/* Navigation dots - only show for multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 z-10 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImage
                    ? "bg-bes-red"
                    : "bg-opacity-50 bg-white"
                }`}
                onClick={() => setCurrentImage(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SectionThree;

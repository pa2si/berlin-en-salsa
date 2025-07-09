"use client";

import { useState, useEffect, useRef } from "react";

const SectionTwo = () => {
  const images = ["/section-2-image-1.webp"];
  const [currentImage, setCurrentImage] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const hasMultipleImages = images.length > 1;

  // Handle image tap/click to advance to next image (only for multiple images)
  const handleImageClick = () => {
    if (hasMultipleImages) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }
  };

  // Auto-rotate images every 5 seconds (only for multiple images)
  useEffect(() => {
    if (hasMultipleImages) {
      const interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [images.length, hasMultipleImages]);

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:h-svh">
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
                    ? "bg-bes-amber"
                    : "bg-opacity-50 bg-white"
                }`}
                onClick={() => setCurrentImage(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="bg-bes-amber flex h-auto overflow-hidden sm:h-svh sm:w-1/2 sm:items-center sm:justify-center">
        <div className="flex h-full w-full flex-col items-center justify-evenly py-8 sm:h-[95%] sm:py-4">
          <h2 className="sr-only">¿Qué es Berlin en Salsa?</h2>
          <img
            src="/que-es-berlin-en-salsa.svg"
            alt="¿Qué es Berlin en Salsa?"
            className="mb-4 h-auto max-h-[4vh] min-h-[80px] w-auto px-8 sm:mb-0 sm:max-h-[18vh] xl:max-h-[15vh]"
          />

          <div className="text-bes-red mx-auto flex h-auto w-full max-w-[90%] flex-col justify-between gap-y-5 px-4 text-center font-semibold sm:h-[65%] sm:max-w-[95%] sm:gap-y-7 sm:px-6 xl:gap-y-3">
            <p className="text-[clamp(1rem,2.8vh,2.2rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1rem,3.5vh,3rem)]">
              Un fin de semana organizado por y para la comunidad salsera de
              Berlín. ¡Gózatelo!
            </p>
            <p className="text-[clamp(1rem,2.8vh,2.2rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1rem,3.5vh,3rem)]">
              Un espacio donde puedes vivir la diversidad de la cultura de la
              salsa: orquestas en vivo, DJs, baile, talleres, charlas, mercado
              de vinilos y más.
            </p>
            <p className="text-[clamp(1rem,2.8vh,2.2rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1rem,3.5vh,3rem)]">
              Un evento que apuesta por la solidaridad y la cultura en tiempos
              de recortes y avance de las derechas.
            </p>
            <p className="text-[clamp(1rem,2.8vh,2.2rem)] leading-[1.15] md:text-[clamp(1rem,3vh,2.5rem)] xl:text-[clamp(1rem,3.5vh,3rem)]">
              Ven a compartir, apoyar y celebrar con nosotrxs la cultura salsera
              de Berlín.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;

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
        className={`relative flex h-svh ${hasMultipleImages ? "cursor-pointer" : ""} items-center justify-center sm:w-1/2`}
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
      <div className="bg-bes-amber flex h-svh overflow-hidden sm:w-1/2 sm:items-center sm:justify-center">
        <div className="flex h-[95%] w-full flex-col items-center justify-evenly gap-4 py-4">
          <img
            src="/que-es-berlin-en-salsa.svg"
            alt="¿Qué es Berlin en Salsa?"
            className="w-[80vw] max-w-[24rem] min-w-[22rem] px-8 sm:max-w-[18rem] sm:min-w-[17rem] lg:max-w-[24rem] xl:max-w-[30rem]"
          />

          <div className="text-bes-red flex flex-col gap-4 px-6 text-center text-[1.5rem] sm:gap-4 sm:px-2 sm:text-[1.15rem] md:gap-6 lg:gap-8 lg:px-15 lg:text-3xl xl:gap-8 xl:px-16 xl:leading-10 2xl:gap-8 2xl:text-4xl 2xl:leading-14">
            <p>
              Un fin de semana organizado por y para la comunidad salsera de
              Berlín. ¡Gózatelo!
            </p>
            <p>
              donde puedes vivir la diversidad de la cultura de la salsa:
              orquestas en vivo, DJs, baile, talleres, charlas, mercado de
              vinilos y más.
            </p>
            <p>
              Un evento que apuesta por la solidaridad y la cultura en tiempos
              de recortes y avance de las derechas.
            </p>
            <p>
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

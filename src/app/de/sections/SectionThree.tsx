"use client";

import { useState, useEffect, useRef } from "react";

const SectionThree = () => {
  const images = ["/section-3-image-1.webp"];
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
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:min-h-svh">
      <div className="bg-bes-red flex h-svh items-center sm:w-1/2">
        <div className="text-bes-amber ml-3 flex flex-col gap-12 sm:ml-8 sm:gap-2 lg:ml-3 lg:gap-12 xl:ml-20">
          <img
            src="/berlin-en-salsa-kommt-mit-voller-power.png"
            alt="Berlin en Salsa kommt mit allem!"
            className="-ml-1 h-[6rem] w-[24rem] sm:h-[5rem] sm:w-[16rem] lg:ml-1 lg:h-[7rem] lg:w-[30rem]"
          />
          <div className="ml-1 flex flex-col gap-2 text-[2rem] font-medium sm:gap-0 sm:text-2xl lg:ml-6 lg:gap-2 lg:text-5xl xl:gap-3">
            <p>2 Tage voller Salsa!</p>
            <p>6 Live-Orchester</p>
            <p>6 Tanzshows</p>
            <p>16 DJs</p>
            <p>Vorträge</p>
            <p>Musikworkshops</p>
            <p>Vinyl-Markt</p>
            <p>LATAM Spezialitäten und mehr!</p>
          </div>
        </div>
      </div>
      <div
        className={`relative h-svh ${hasMultipleImages ? "cursor-pointer" : ""} sm:w-1/2`}
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
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImage
                    ? "bg-bes-red"
                    : "bg-opacity-50 bg-white"
                }`}
                onClick={() => setCurrentImage(index)}
                aria-label={`Gehe zu Folie ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default SectionThree;

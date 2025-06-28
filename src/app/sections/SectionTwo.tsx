"use client";

import { useState, useEffect, useRef } from "react";

const SectionTwo = () => {
  const images = ["/image-section-2.webp", "/foto-2.webp", "/foto-3.webp"];
  const [currentImage, setCurrentImage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // Check if screen is mobile size (below sm breakpoint)
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;

    // Minimum swipe distance - 50px
    const minSwipeDistance = 50;
    const swipeDistance = touchStart - touchEnd;

    // If the swipe is shorter than minimum, don't do anything
    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    if (swipeDistance > 0) {
      // Swiped left - show next image
      setCurrentImage((prev) => (prev + 1) % images.length);
    } else {
      // Swiped right - show previous image
      setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    }

    // Reset touch coordinates after swipe
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:h-svh">
      <div
        className="relative flex h-svh items-center justify-center sm:w-1/2"
        ref={slideContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url("${img}")`,
              backgroundPosition: "50% 50%",
            }}
          />
        ))}

        {/* Swipe indicator for mobile */}
        {isMobile && (
          <div className="bg-opacity-40 absolute top-4 left-4 rounded-md bg-black px-2 py-1 text-xs text-white">
            ← Desliza →
          </div>
        )}

        {/* Navigation dots */}
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

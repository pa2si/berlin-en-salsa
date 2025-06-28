"use client";

import { useState, useEffect, useRef } from "react";

const SectionThree = () => {
  const images = ["/image-section-3.webp", "/foto-4.webp"];
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
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:min-h-svh">
      <div className="bg-bes-red flex h-svh items-center sm:w-1/2">
        <div className="text-bes-amber ml-3 flex flex-col gap-12 sm:ml-8 sm:gap-2 lg:ml-3 lg:gap-12 xl:ml-20">
          <img
            src="/berlin-en-salsa-se-viene-con-todo.svg"
            alt="Berlin en Salsa se viene con todo!"
            className="-ml-1 w-[24rem] sm:w-[16rem] lg:ml-4 lg:w-[30rem]"
          />
          <div className="ml-1 flex flex-col gap-2 text-[2rem] sm:gap-0 sm:text-2xl lg:ml-6 lg:gap-2 lg:text-5xl xl:gap-3">
            <p>2 días de pura salsa!</p>
            <p>6 orquestas en vivo</p>
            <p>6 shows de baile</p>
            <p>16 DJs</p>
            <p>Charlas</p>
            <p>Talleres musicales</p>
            <p>Mercado de vinilos</p>
            <p>Delicias latinas y más!</p>
          </div>
        </div>
      </div>
      <div
        className="relative h-svh sm:w-1/2"
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
          <div className="bg-opacity-40 absolute top-4 right-4 rounded-md bg-black px-2 py-1 text-xs text-white">
            ← Desliza →
          </div>
        )}

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentImage ? "bg-bes-red" : "bg-opacity-50 bg-white"
              }`}
              onClick={() => setCurrentImage(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SectionThree;

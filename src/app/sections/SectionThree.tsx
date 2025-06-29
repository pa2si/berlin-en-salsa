"use client";

import { useState, useEffect, useRef } from "react";

const SectionThree = () => {
  const images = ["/image-section-3.webp", "/camisetas.webp", "/foto-4.webp"];
  const [currentImage, setCurrentImage] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // Handle image tap/click to advance to next image
  const handleImageClick = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
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
            <p>Talleres de musica</p>
            <p>Mercado de vinilos</p>
            <p>Delicias latinas y más!</p>
          </div>
        </div>
      </div>
      <div
        className="relative h-svh cursor-pointer sm:w-1/2"
        ref={slideContainerRef}
        onClick={handleImageClick}
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

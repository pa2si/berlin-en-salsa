"use client";

import { useState, useEffect, useRef } from "react";

const SectionThree = () => {
  // Define desktop and mobile image paths
  const desktopImage = "/section-3-image-1.webp";
  const mobileImage = "/section-3-image-1-mobile.webp";

  // Start with a default image (will be updated in useEffect)
  const [currentImageSrc, setCurrentImageSrc] = useState(mobileImage);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // Media query effect to switch images based on screen size
  useEffect(() => {
    // Function to set the right image based on screen width
    const handleResize = () => {
      // Check if screen is xl or larger (1280px is Tailwind's xl breakpoint)
      const isXlScreen = window.matchMedia("(min-width: 1280px)").matches;
      setCurrentImageSrc(isXlScreen ? desktopImage : mobileImage);
    };

    // Set initial image
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <div className="relative h-svh sm:w-1/2" ref={slideContainerRef}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${currentImageSrc}")`,
            backgroundPosition: "50% 50%",
          }}
        />
      </div>
    </div>
  );
};
export default SectionThree;

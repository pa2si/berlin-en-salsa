"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useBannerContext } from "@/context/BannerContext";

const ThankYouBanner = () => {
  const { isBannerVisible, setIsBannerVisible } = useBannerContext();
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Set the banner visible by default
  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsBannerVisible]);

  if (!isBannerVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      }}
      className="bg-bes-red bg-opacity-95 fixed top-0 right-0 left-0 z-50 px-4 py-3 text-center shadow-lg backdrop-blur-sm"
    >
      <div className="relative mx-auto max-w-5xl pr-8 sm:max-w-4xl sm:pr-16">
        <motion.button
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, -3, 3, 0],
          }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={() => setIsBannerVisible(false)}
          className="bg-bes-amber hover:bg-opacity-95 group text-bes-red absolute -right-1 -bottom-1 flex items-center space-x-1 rounded-full px-2 py-1.5 font-bold transition-all sm:right-0 sm:bottom-0 sm:px-3 sm:py-2"
          aria-label="Cerrar mensaje de agradecimiento"
        >
          <span className="hidden sm:inline">Close</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            animate={isButtonHovered ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
        </motion.button>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-between space-y-2 lg:flex-row lg:items-center lg:justify-center lg:space-y-0 lg:space-x-6 lg:py-1"
        >
          <div className="flex items-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              className="mr-4 hidden lg:block"
            >
              <img
                src="/bes-logo-habano.png"
                alt="Berlin En Salsa Logo"
                className="h-15 w-auto"
              />
            </motion.div>
            <div className="lg:flex lg:flex-col lg:justify-center">
              <h3 className="text-bes-amber text-xl font-bold lg:text-2xl">
                ¡Gracias por ser parte de Berlin En Salsa!
              </h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-2 text-sm text-white lg:text-base"
              >
                El Festival ha terminado y fue una experiencia increíblemente
                hermosa para todxs nosotrxs. Se soltaron definitamente los
                caballos. Estamos muy emocionadxs por los cálidos y sinceros
                comentarios de todxs ustedes. ¡Muchas gracias por ser parte de
                esto!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-bes-amber mt-2 text-sm font-medium lg:text-base"
              >
                Nos vemos el próximo año con la segunda edición! O quien sabe,
                tal vez antes...
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-bes-amber mt-1 text-sm font-medium italic lg:text-base"
              >
                Salsaludos, su equipo de Berlin En Salsa
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ThankYouBanner;

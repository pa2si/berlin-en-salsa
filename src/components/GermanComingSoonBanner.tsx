"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GermanComingSoonBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      }}
      className="bg-bes-red bg-opacity-90 fixed top-0 right-0 left-0 z-50 px-4 py-3 text-center shadow-lg backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.1, 1] }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto flex max-w-6xl items-center justify-between"
      >
        <div className="flex items-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            className="mr-4 hidden sm:block"
          >
            <img
              src="/bes-logo-habano.png"
              alt="Berlin En Salsa Logo"
              className="h-12 w-12"
            />
          </motion.div>
          <div>
            <h3 className="text-bes-amber text-xl font-bold sm:text-2xl">
              Vollständiges Programm in Kürze!
            </h3>
            <p className="text-sm text-white sm:text-base">
              Das Festivalprogramm wird in den nächsten Tagen angekündigt
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVisible(false)}
          className="text-bes-amber hover:bg-opacity-10 ml-2 rounded-full p-2 hover:bg-white"
          aria-label="Ankündigung schließen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GermanComingSoonBanner;

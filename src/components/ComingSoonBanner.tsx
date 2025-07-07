"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ComingSoonBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Countdown logic moved from ProgramCountdown component
  useEffect(() => {
    if (!isVisible) return;

    // Festival starts on July 19, 2025, at 12:30
    const targetDate = new Date("July 19, 2025 12:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        // Festival has started
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

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
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.1, 1] }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0"
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
              className="h-15 w-auto"
            />
          </motion.div>
          <div>
            <h3 className="text-bes-amber text-xl font-bold sm:text-2xl">
              ¡Cuenta regresiva hasta Berlin En Salsa!
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white sm:justify-start sm:text-base">
              <AnimatePresence>
                {days > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <span className="bg-bes-amber text-bes-red inline-block rounded px-2 py-0.5 font-bold">
                      {days}
                    </span>
                    <span className="mx-1">días</span>
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center"
                >
                  <span className="bg-bes-amber text-bes-red inline-block rounded px-2 py-0.5 font-bold">
                    {hours}
                  </span>
                  <span className="mx-1">h</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center"
                >
                  <span className="bg-bes-amber text-bes-red inline-block rounded px-2 py-0.5 font-bold">
                    {minutes}
                  </span>
                  <span className="mx-1">m</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center"
                >
                  <span className="bg-bes-amber text-bes-red inline-block rounded px-2 py-0.5 font-bold">
                    {seconds}
                  </span>
                  <span className="mx-1">s</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{
            scale: 1.1,
            rotate: [0, -5, 5, -3, 3, 0],
          }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={() => setIsVisible(false)}
          className="bg-bes-amber hover:bg-opacity-95 group text-bes-red flex items-center space-x-1 rounded-full px-3 py-2 font-bold transition-all"
          aria-label="Close announcement"
        >
          <span className="hidden sm:inline">Cerrar</span>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
      </motion.div>
    </motion.div>
  );
};

export default ComingSoonBanner;

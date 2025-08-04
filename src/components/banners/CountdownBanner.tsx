"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBannerContext } from "@/context/BannerContext";
import { AnimatedButton, AnimatedLogo, BannerText, CloseButton } from "@/components/ui";

interface CountdownBannerProps {
  targetDate: Date;
}

const CountdownBanner = ({ targetDate }: CountdownBannerProps) => {
  const { isBannerVisible, setIsBannerVisible } = useBannerContext();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsBannerVisible]);

  useEffect(() => {
    if (!isBannerVisible) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
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
  }, [isBannerVisible, targetDate]);

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
      <div className="relative mx-auto max-w-6xl">
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
          aria-label="Cerrar anuncio"
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
                ¡Cuenta regresiva hasta Berlin En Salsa!
              </h3>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-white lg:justify-start lg:text-base">
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-3 flex items-center justify-center lg:mt-0"
          >
            <motion.a
              href="/timetable"
              initial={{ boxShadow: "0px 0px 0px rgba(183, 37, 232, 0)" }}
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(183, 37, 232, 0)",
                  "0px 0px 18px rgba(183, 37, 232, 0.9)",
                  "0px 0px 8px rgba(183, 37, 232, 0.6)",
                  "0px 0px 0px rgba(183, 37, 232, 0)",
                ],
              }}
              transition={{
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 25px rgba(183, 37, 232, 1.0)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group bg-bes-amber hover:bg-opacity-90 text-bes-red border-bes-purple flex items-center rounded-full border-3 px-5 py-2 font-bold shadow-md transition-all"
            >
              <motion.div
                className="flex items-center"
                initial={{ x: 0 }}
                whileHover={{ x: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1.5 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                Ver programa
              </motion.div>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4 transition-all group-hover:ml-3"
                viewBox="0 0 20 20"
                fill="currentColor"
                initial={{ x: 0 }}
                animate={{ x: [0, 3, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 1.5,
                  repeatDelay: 2,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CountdownBanner;

"use client";

// import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GermanProgramCountdown = () => {
  //   const [days, setDays] = useState(0);
  //   const [hours, setHours] = useState(0);
  //   const [minutes, setMinutes] = useState(0);
  //   const [seconds, setSeconds] = useState(0);

  //   useEffect(() => {
  //     // Set your target date here - adjust as needed
  //     const targetDate = new Date("July 10, 2025 12:00:00").getTime();

  //     const interval = setInterval(() => {
  //       const now = new Date().getTime();
  //       const distance = targetDate - now;

  //       if (distance < 0) {
  //         clearInterval(interval);
  //         return;
  //       }

  //       setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
  //       setHours(
  //         Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  //       );
  //       setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  //       setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, []);

  //   const countdownVariants = {
  //     hidden: { opacity: 0, y: 20 },
  //     visible: (i: number) => ({
  //       opacity: 1,
  //       y: 0,
  //       transition: {
  //         delay: i * 0.1,
  //         duration: 0.5,
  //       },
  //     }),
  //   };

  return (
    <div className="rounded-lg p-8 text-white shadow-lg">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-bes-amber mb-6 text-center text-2xl font-bold sm:text-3xl"
      >
        Bleibe bereit für den Monent der Ankündigung!
      </motion.h3>

      {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={countdownVariants}
          className="flex flex-col items-center"
        >
          <div className="bg-bes-amber text-bes-red mb-2 flex h-16 w-16 items-center justify-center rounded-lg text-2xl font-bold sm:h-20 sm:w-20 sm:text-3xl">
            {days}
          </div>
          <span className="text-bes-amber text-sm font-medium sm:text-base">
            Tage
          </span>
        </motion.div>

        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={countdownVariants}
          className="flex flex-col items-center"
        >
          <div className="bg-bes-amber text-bes-red mb-2 flex h-16 w-16 items-center justify-center rounded-lg text-2xl font-bold sm:h-20 sm:w-20 sm:text-3xl">
            {hours}
          </div>
          <span className="text-bes-amber text-sm font-medium sm:text-base">
            Stunden
          </span>
        </motion.div>

        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={countdownVariants}
          className="flex flex-col items-center"
        >
          <div className="bg-bes-amber text-bes-red mb-2 flex h-16 w-16 items-center justify-center rounded-lg text-2xl font-bold sm:h-20 sm:w-20 sm:text-3xl">
            {minutes}
          </div>
          <span className="text-bes-amber text-sm font-medium sm:text-base">
            Minuten
          </span>
        </motion.div>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={countdownVariants}
          className="flex flex-col items-center"
        >
          <div className="bg-bes-amber text-bes-red mb-2 flex h-16 w-16 items-center justify-center rounded-lg text-2xl font-bold sm:h-20 sm:w-20 sm:text-3xl">
            {seconds}
          </div>
          <span className="text-bes-amber text-sm font-medium sm:text-base">
            Sekunden
          </span>
        </motion.div>
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="mb-4 text-white">
          Wir bereiten ein tolles Programm für dich vor!
        </p>
        {/* <button className="bg-bes-amber text-bes-red hover:bg-bes-amber/90 rounded px-6 py-2 font-semibold transition-all">
          Abonnieren für Benachrichtigungen
        </button> */}
      </motion.div>
    </div>
  );
};

export default GermanProgramCountdown;

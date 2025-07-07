"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProgramCountdown = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
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
  }, []);

  const countdownVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="bg-bes-red rounded-lg p-8 text-white shadow-lg">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-bes-amber mb-6 text-center text-2xl font-bold sm:text-3xl"
      >
        {days === 0 && hours === 0 && minutes === 0 && seconds === 0
          ? "¡El Festival ha comenzado!"
          : "¡Cuenta atrás para Berlin En Salsa!"}
      </motion.h3>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
            Días
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
            Horas
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
            Minutos
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
            Segundos
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="mb-4 text-white">
          {days === 0 && hours === 0 && minutes === 0 && seconds === 0
            ? "¡Estamos en vivo! Ven y celebra con nosotros en Neulich Biergarten."
            : "¡El festival comienza el 19 de julio a las 12:30! No te lo pierdas."}
        </p>
      </motion.div>
    </div>
  );
};

export default ProgramCountdown;

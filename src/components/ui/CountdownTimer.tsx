"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
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
  }, [targetDate]);

  return (
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
  );
};

export default CountdownTimer;

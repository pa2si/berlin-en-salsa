"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useBannerContext } from "@/context/BannerContext";
import { saturdayTimetableData } from "@/data/saturdayTimetable";
import { sundayTimetableData } from "@/data/sundayTimetable";
import { TimeSlot } from "@/types/timetable";
import {
  AnimatedButton,
  AnimatedLogo,
  BannerText,
  CloseButton,
} from "@/components/ui";

const LiveBanner = () => {
  const { isBannerVisible, setIsBannerVisible } = useBannerContext();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [currentEvents, setCurrentEvents] = useState<TimeSlot[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isSunday, setIsSunday] = useState(false);

  // Function to get current events based on time
  const getCurrentEvents = useCallback(() => {
    const now = new Date();

    // Check if today is Sunday (festival day 2)
    const isSundayToday =
      now.getDay() === 0 || now >= new Date("July 20, 2025 00:00:00");
    setIsSunday(isSundayToday);

    const timetableData = isSundayToday
      ? sundayTimetableData
      : saturdayTimetableData;

    // Find events happening now
    const currentSlots: TimeSlot[] = [];

    timetableData.forEach((column) => {
      const matchingSlots = column.slots.filter((slot) => {
        if (!slot.event) return false; // Skip slots without events

        // Parse slot time to get hours and minutes
        const slotHour = parseInt(slot.time.split(":")[0]);
        const slotMinute = parseInt(slot.time.split(":")[1]);

        // Create Date objects for slot time and slot time + 30 minutes for comparison
        const slotDate = new Date(now);
        slotDate.setHours(slotHour, slotMinute, 0, 0);

        // Event end time (slot time + 30 minutes)
        const slotEndDate = new Date(slotDate);
        slotEndDate.setMinutes(slotEndDate.getMinutes() + 30);

        // Check if current time is between slot time and slot time + 30 minutes
        return now >= slotDate && now <= slotEndDate;
      });

      currentSlots.push(...matchingSlots.filter((slot) => slot.event));
    });

    return currentSlots;
  }, []);

  useEffect(() => {
    // Show banner after a short delay
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, [setIsBannerVisible]);

  useEffect(() => {
    if (!isBannerVisible) return;

    // Initial fetch of current events
    const events = getCurrentEvents();
    setCurrentEvents(events);
    setCurrentEventIndex(0);

    // Update every minute
    const eventInterval = setInterval(() => {
      const events = getCurrentEvents();
      setCurrentEvents(events);
      // Reset index if events change to avoid out of bounds error
      if (events.length > 0) {
        setCurrentEventIndex(0);
      }
    }, 60000); // Update every minute

    return () => clearInterval(eventInterval);
  }, [isBannerVisible, getCurrentEvents]);

  // Handle event navigation
  const nextEvent = () => {
    setCurrentEventIndex((prev) =>
      prev === currentEvents.length - 1 ? 0 : prev + 1,
    );
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) =>
      prev === 0 ? currentEvents.length - 1 : prev - 1,
    );
  };

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
      className="bg-bes-red bg-opacity-95 fixed top-0 right-0 left-0 z-50 px-4 py-3 pb-4 text-center shadow-lg backdrop-blur-sm"
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
                ¡Ya estamos gozando Berlin En Salsa!
              </h3>
              {currentEvents.length > 0 ? (
                <div className="mt-2 text-white">
                  <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:space-x-2">
                    <span className="text-bes-amber font-semibold">
                      {isSunday ? "Domingo" : "Sábado"} -{" "}
                      {currentEvents[currentEventIndex].time}
                    </span>
                    <div className="flex flex-wrap items-center justify-center space-x-2">
                      <span className="font-bold">
                        {currentEvents[currentEventIndex].event}
                      </span>
                      {currentEvents[currentEventIndex].actType && (
                        <span className="bg-bes-amber text-bes-red rounded-full px-2 py-0.5 text-xs">
                          {currentEvents[currentEventIndex].actType}
                        </span>
                      )}
                      {!currentEvents[currentEventIndex].actType &&
                        currentEvents[currentEventIndex].type && (
                          <span className="bg-bes-amber text-bes-red rounded-full px-2 py-0.5 text-xs">
                            {currentEvents[currentEventIndex].type ===
                            "workshop"
                              ? "Taller"
                              : currentEvents[currentEventIndex].type === "talk"
                                ? "Charla"
                                : currentEvents[currentEventIndex].type ===
                                    "main"
                                  ? "Principal"
                                  : currentEvents[currentEventIndex].type}
                          </span>
                        )}
                    </div>
                  </div>

                  {currentEvents.length > 1 && (
                    <div className="mt-2 flex items-center justify-center gap-3">
                      <button
                        onClick={prevEvent}
                        className="text-bes-amber transition-colors hover:text-white"
                        aria-label="Evento anterior"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                          />
                        </svg>
                      </button>
                      <span className="text-xs text-white">
                        {currentEventIndex + 1} / {currentEvents.length}
                      </span>
                      <button
                        onClick={nextEvent}
                        className="text-bes-amber transition-colors hover:text-white"
                        aria-label="Siguiente evento"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-2 text-white">
                  No hay eventos actuales. Disfruta de un momento de descanso.
                </div>
              )}
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

export default LiveBanner;

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBannerContext } from "@/context/BannerContext";
import { GermanSaturdayTimetableData } from "@/data/GermanSaturdayTimetable";
import { GermanSundayTimetableData } from "@/data/GermanSundayTimetable";
import { TimeSlot, Column } from "@/types/timetable";

const GermanComingSoonBanner = () => {
  const { isBannerVisible, setIsBannerVisible } = useBannerContext();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  // Will be set to true when the festival starts
  const [festivalStarted, setFestivalStarted] = useState(false);
  // Events that are currently happening
  const [currentEvents, setCurrentEvents] = useState<TimeSlot[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  // Will be set automatically based on the current day
  const [isSunday, setIsSunday] = useState(false);

  // Function to get current events based on time
  const getCurrentEvents = useCallback(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Check if today is Sunday (festival day 2)
    const isSundayToday =
      now.getDay() === 0 || now >= new Date("July 20, 2025 00:00:00");
    setIsSunday(isSundayToday);

    const timetableData = isSundayToday
      ? GermanSundayTimetableData
      : GermanSaturdayTimetableData;

    // Find events happening now
    const currentSlots: TimeSlot[] = [];

    timetableData.forEach((column: Column) => {
      const matchingSlots = column.slots.filter((slot: TimeSlot) => {
        if (!slot.event) return false; // Skip slots without events

        // Get slot time components
        const slotHour = parseInt(slot.time.split(":")[0]);
        const slotMinute = parseInt(slot.time.split(":")[1]);

        // Convert to minutes for easier comparison
        const currentTimeInMinutes = hour * 60 + minute;
        const slotTimeInMinutes = slotHour * 60 + slotMinute;

        // Event is considered current if we're within 30 minutes after its start time
        // This means the event is considered "current" from its start time until 30 minutes later
        return (
          currentTimeInMinutes >= slotTimeInMinutes &&
          currentTimeInMinutes < slotTimeInMinutes + 30
        );
      });

      currentSlots.push(
        ...matchingSlots.filter((slot: TimeSlot) => slot.event),
      );
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

  // Countdown logic
  useEffect(() => {
    if (!isBannerVisible) return;

    // Festival starts on July 19, 2025, at 12:30
    const targetDate = new Date("July 19, 2025 12:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        // Festival has started
        setFestivalStarted(true);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);

        // Get current events
        const events = getCurrentEvents();
        setCurrentEvents(events);
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
  }, [isBannerVisible, getCurrentEvents, currentEvents, festivalStarted]);

  // Update current events every minute when festival is active
  useEffect(() => {
    if (!festivalStarted) return;

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
  }, [festivalStarted, getCurrentEvents]);

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
      className={`bg-bes-red bg-opacity-95 fixed top-0 right-0 left-0 z-50 px-4 py-3 text-center shadow-lg backdrop-blur-sm ${festivalStarted ? "pb-4" : ""}`}
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
          aria-label="Ankündigung schließen"
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
              {!festivalStarted ? (
                <>
                  <h3 className="text-bes-amber text-xl font-bold lg:text-2xl">
                    Countdown bis Berlin En Salsa!
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
                          <span className="mx-1">Tage</span>
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
                        <span className="mx-1">Std</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center"
                      >
                        <span className="bg-bes-amber text-bes-red inline-block rounded px-2 py-0.5 font-bold">
                          {minutes}
                        </span>
                        <span className="mx-1">Min</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center"
                      >
                        <span className="bg-bes-amber text-bes-red inline-block rounded px-2 py-0.5 font-bold">
                          {seconds}
                        </span>
                        <span className="mx-1">Sek</span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-bes-amber text-xl font-bold lg:text-2xl">
                    Berlin En Salsa ist in vollem Gange!
                  </h3>
                  {currentEvents.length > 0 ? (
                    <div className="mt-2 text-white">
                      <div className="flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:space-x-2">
                        <span className="text-bes-amber font-semibold">
                          {isSunday ? "Sonntag" : "Samstag"} -{" "}
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
                                  ? "Workshop"
                                  : currentEvents[currentEventIndex].type ===
                                      "talk"
                                    ? "Vortrag"
                                    : currentEvents[currentEventIndex].type ===
                                        "main"
                                      ? "Hauptprogramm"
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
                            aria-label="Vorheriges Event"
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
                            aria-label="Nächstes Event"
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
                      Kein aktuelles Event. Genieße einen Moment der
                      Entspannung.
                    </div>
                  )}
                </>
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
              href="/de/timetable"
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
              className="group bg-bes-amber hover:bg-opacity-90 text-bes-red border-bes-purple flex items-center rounded-full border-2 px-5 py-2 font-bold shadow-md transition-all"
            >
              <motion.div
                className="flex items-center"
                initial={{ x: 0 }}
                whileHover={{ x: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Program Icon (same as in ProgramDownloadModal) */}
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
                Programm anzeigen
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

export default GermanComingSoonBanner;

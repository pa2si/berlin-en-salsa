"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useBannerContext } from "@/context/BannerContext";
import { useTranslations } from "next-intl";
import { saturdayTimetableData } from "@/data/saturdayTimetable";
import { sundayTimetableData } from "@/data/sundayTimetable";
import { TimeSlot } from "@/types/timetable";
import {
  AnimatedButton,
  AnimatedLogo,
  BannerText,
  CloseButton,
} from "@/components/ui";
import { ProgramIcon } from "@/components/icons";

const LiveBanner = () => {
  const { isBannerVisible, setIsBannerVisible } = useBannerContext();
  const t = useTranslations("Banners.live");
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
        {/* Close button */}
        <CloseButton
          onClose={() => setIsBannerVisible(false)}
          ariaLabel={t("closeLabel")}
        />

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-between space-y-2 lg:flex-row lg:items-center lg:justify-center lg:space-y-0 lg:space-x-6 lg:py-1"
        >
          <div className="flex items-center">
            {/* Logo */}
            <AnimatedLogo
              src="/bes-logo-habano.png"
              alt="Berlin En Salsa Logo"
            />
            <div>
              <BannerText title={t("title")} />
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
                        aria-label={t("previousEvent")}
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
                        aria-label={t("nextEvent")}
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
          {/* Program button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-3 flex items-center justify-center lg:mt-0"
          >
            <AnimatedButton
              href="/timetable"
              icon={<ProgramIcon />}
              text={t("viewProgram")}
              isPrimary={true}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LiveBanner;

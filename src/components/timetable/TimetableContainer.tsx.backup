"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import TimetableGrid from "./TimetableGrid";
import EventModal from "./EventModal/EventModal";
import { useTimetableData } from "./hooks/useTimetableData";
import { useEventModal } from "./hooks/useEventModal";
import { useURLParams } from "./hooks/useURLParams";
import { useSlider } from "./hooks/useSlider";

export default function TimetableContainer() {
  const t = useTranslations("Timetable");

  // URL parameter management
  const { parseDayParam, updateDayInUrl } = useURLParams();
  const [currentDay, setCurrentDay] = useState<"saturday" | "sunday">(
    parseDayParam(),
  );

  // Timetable data
  const { timetableData } = useTimetableData(currentDay);

  // Event modal state
  const { openModal, closeModal, isOpen, selectedEventDetails } =
    useEventModal();

  // Slider functionality for modal
  const { resetSlider } = useSlider();

  // Function to handle day change
  const handleDayChange = (day: "saturday" | "sunday") => {
    setCurrentDay(day);
    updateDayInUrl(day);
  };

  return (
    <div className="container mx-auto">
      {/* Timetable header with day selection */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
        {/* Timetable title on the left */}
        <div className="w-full md:w-1/3">
          <Image
            src="/timetable.svg"
            alt="Festival Timetable"
            width={300}
            height={100}
            className="h-auto w-full max-w-full"
          />
        </div>

        {/* Day selection buttons on the right */}
        <div className="flex w-full flex-col items-center space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4 md:w-2/3">
          <button
            className={`relative w-full cursor-pointer transition-all duration-300 sm:w-40 md:w-48 lg:w-64 ${currentDay === "saturday" ? "scale-105 opacity-100" : "opacity-70 hover:opacity-90"}`}
            onClick={() => handleDayChange("saturday")}
          >
            <Image
              src="/saturday.svg"
              alt={t("navigation.saturday")}
              width={250}
              height={100}
              className="h-auto w-full"
              priority
            />
            {currentDay === "saturday" && (
              <motion.div
                layoutId="activeDay"
                className="bg-bes-red absolute -bottom-1 h-1 w-full rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>

          <button
            className={`relative w-full cursor-pointer transition-all duration-300 sm:w-40 md:w-48 lg:w-64 ${currentDay === "sunday" ? "scale-105 opacity-100" : "opacity-70 hover:opacity-90"}`}
            onClick={() => handleDayChange("sunday")}
          >
            <Image
              src="/sunday.svg"
              alt={t("navigation.sunday")}
              width={250}
              height={100}
              className="h-auto w-full"
              priority
            />
            {currentDay === "sunday" && (
              <motion.div
                layoutId="activeDay"
                className="bg-bes-red absolute -bottom-1 h-1 w-full rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Timetable Grid */}
      <TimetableGrid
        currentDay={currentDay}
        timetableData={timetableData}
        onEventClick={openModal}
        onSlideReset={resetSlider}
      />

      {/* Event Modal */}
      {isOpen && selectedEventDetails && (
        <EventModal
          selectedEventDetails={selectedEventDetails}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

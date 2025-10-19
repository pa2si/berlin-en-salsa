"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Column } from "../../types/timetable";
import { TimelineSlot, TimetableEvent } from "../../types/events";
import { AreaType } from "../../data/timetable/types/area.types";
import { FestivalDay } from "../../config/festival";
import TimetableGrid from "./TimetableGrid";
import EventModal from "./EventModal/EventModal";
import { useURLParams } from "./hooks/useURLParams";
import { useSlider } from "./hooks/useSlider";
import { processEventContinuation } from "./utils/eventProcessing";
import { useColumnTranslation } from "./utils/translationHelpers";

interface TimetableClientProps {
  initialDay: string; // Now accepts any weekday string
  festivalDays: FestivalDay[]; // Array of all festival days
  dataByWeekday: Record<
    string,
    {
      data: Column[];
      events: Record<AreaType, TimelineSlot[]>;
    }
  >; // Data for all days keyed by weekday
  translations: {
    days: Record<string, string>; // Dynamic day translations
  };
}

/**
 * Client component that handles interactive timetable features
 * Receives pre-translated data from the server component
 *
 * PHASE 4: Now supports dynamic number of festival days
 */
export default function TimetableClient({
  initialDay,
  festivalDays,
  dataByWeekday,
  translations,
}: TimetableClientProps) {
  // URL parameter management
  const { parseDayParam, updateDayInUrl } = useURLParams();

  // Validate the parsed day against available festival days
  const parsedDay = parseDayParam();
  const isValidDay = festivalDays.some((day) => day.weekday === parsedDay);
  const validDay = isValidDay ? parsedDay : initialDay;

  const [currentDay, setCurrentDay] = useState<string>(validDay);

  const { translateColumnArea, getOriginalAreaKey } = useColumnTranslation();

  // NEW: Modal state with TimetableEvent
  const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(
    null,
  );

  // Slider functionality for modal
  const { resetSlider } = useSlider();

  // Get current day's data - with fallback to first available day
  let currentDayData = dataByWeekday[currentDay];

  // If current day has no data, fall back to first available day
  if (!currentDayData && festivalDays.length > 0) {
    const firstDay = festivalDays[0].weekday;
    currentDayData = dataByWeekday[firstDay];
    // Update state to first valid day
    if (currentDay !== firstDay) {
      setCurrentDay(firstDay);
      updateDayInUrl(firstDay);
    }
  }

  const currentEvents = currentDayData?.events || {};
  const currentData = currentDayData?.data || [];

  // NEW: Function to find event by area and time
  const findEvent = (
    area: AreaType,
    time: string,
  ): TimetableEvent | undefined => {
    const areaSlots = currentEvents[area];
    if (!areaSlots) return undefined;

    // Find the slot at this time
    const slot = areaSlots.find((s: TimelineSlot) => s.time === time);
    if (!slot || slot.events.length === 0) return undefined;

    // Return the first event (assuming one event per slot for now)
    return slot.events[0];
  };

  // NEW: Handle event click - look up the actual event
  const handleEventClick = (area: AreaType, time: string) => {
    const event = findEvent(area, time);
    if (event) {
      setSelectedEvent(event);
      resetSlider();
    } else {
      console.warn(`Event not found for area: ${area}, time: ${time}`);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedEvent(null);
    resetSlider();
  };

  // Process the data to handle consecutive slots and area translations
  const processData = (rawData: Column[]): Column[] => {
    return processEventContinuation(
      rawData,
      translateColumnArea,
      getOriginalAreaKey,
    );
  };

  // Get current processed data
  const processedCurrentData = processData(currentData);

  // Function to handle day change
  const handleDayChange = (day: string) => {
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

        {/* PHASE 4: Dynamic day selection buttons */}
        <div className="flex w-full flex-col items-center space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4 md:w-2/3">
          {festivalDays.map((day) => (
            <button
              key={day.id}
              className={`relative w-full cursor-pointer transition-all duration-300 sm:w-40 md:w-48 lg:w-64 ${
                currentDay === day.weekday
                  ? "scale-105 opacity-100"
                  : "opacity-70 hover:opacity-90"
              }`}
              onClick={() => handleDayChange(day.weekday)}
            >
              <Image
                src={day.imageSrc}
                alt={translations.days[day.weekday] || day.weekday}
                width={250}
                height={100}
                className="h-auto w-full"
                priority
              />
              {currentDay === day.weekday && (
                <motion.div
                  layoutId="activeDay"
                  className="bg-bes-red absolute -bottom-1 h-1 w-full rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Timetable Grid */}
      <TimetableGrid
        currentDay={currentDay}
        timetableData={processedCurrentData}
        onEventClick={handleEventClick}
        onSlideReset={resetSlider}
      />

      {/* NEW: Event Modal with TimetableEvent */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={closeModal} />
      )}
    </div>
  );
}

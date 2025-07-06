"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { saturdayTimetableData } from "../data/saturdayTimetable";
import { sundayTimetableData } from "../data/sundayTimetable";
import { Column } from "../types/timetable";

export default function FestivalTimetable() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState<"saturday" | "sunday">(
    "saturday",
  );

  // State for the current slide in the modal
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Touch swipe state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // State for the selected event details
  const [selectedEventDetails, setSelectedEventDetails] = useState<{
    event: string;
    time: string;
    endTime?: string;
    timeRange?: string;
    instructor?: string;
    presenter?: string;
    host?: string;
    djs?: string;
    description?: string;
    image?: string;
    slides?: { image?: string; description?: string; djName?: string }[];
    actType?: string;
    hasShow?: boolean;
    danceShow?: string;
  } | null>(null);

  // Helper function to calculate the end time based on start time and duration
  const calculateTimeRange = (startTime: string, durationSlots: number = 1) => {
    // Extract hour and minute from the start time (format: "HH:MM")
    const [startHour, startMinute] = startTime.split(":").map(Number);

    // Calculate end time (each slot is 30 minutes)
    const totalMinutes = startHour * 60 + startMinute + durationSlots * 30;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinute = totalMinutes % 60;

    // Format the end time as "HH:MM"
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;

    // Format the time range in 24h format
    const formattedStartTime = `${startHour.toString().padStart(2, "0")}:${startMinute.toString().padStart(2, "0")}`;
    const formattedEndTime = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;

    // Return the formatted time range
    return {
      endTime,
      timeRange: `${formattedStartTime} - ${formattedEndTime}`,
    };
  };

  // Choose the timetable data based on the selected day
  const timetableData =
    currentDay === "saturday" ? saturdayTimetableData : sundayTimetableData;

  // Process the timetable data to identify consecutive slots with the same event
  const processedTimetableData: Column[] = timetableData.map((column) => {
    // Calculate which slots should be visually merged
    const processedSlots = column.slots.map((slot, idx) => {
      // Check if this slot has the same event as the previous slot
      const prevSlot = idx > 0 ? column.slots[idx - 1] : null;
      const isContinuation = !!(
        prevSlot &&
        prevSlot.event &&
        slot.event === prevSlot.event
      );

      // Mark slot as a continuation if it has the same event as the previous slot
      return {
        ...slot,
        isContinuation,
      };
    });

    return {
      title: column.title,
      slots: processedSlots,
    };
  });

  const getEventStyle = (type?: string, hasShow?: boolean) => {
    // Add a special class for events with dance shows
    const showClass = hasShow ? "border-2 border-bes-purple" : "";

    // Always use rounded corners for all events
    const borderRadiusClass = "rounded-full";

    // Base style depending on event type
    let baseStyle = "";
    switch (type) {
      case "dance-show":
        baseStyle = `bg-bes-purple hover:bg-bes-purple/90 ${showClass}`;
        break;
      case "workshop":
        baseStyle = `bg-bes-red hover:bg-bes-red/90 ${showClass}`;
        break;
      case "talk":
        baseStyle = `bg-bes-red hover:bg-bes-red/90 ${showClass}`;
        break;
      case "main":
        baseStyle = `bg-bes-red hover:bg-bes-red/90 ${showClass}`;
        break;
      default:
        baseStyle = `bg-transparent ${showClass}`;
        break;
    }

    return `${baseStyle} ${borderRadiusClass}`;
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
            priority
          />
        </div>

        {/* Day selection buttons on the right */}
        <div className="flex w-full flex-col items-center space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4 md:w-2/3">
          <button
            className={`relative w-full cursor-pointer transition-all duration-300 sm:w-40 md:w-48 lg:w-64 ${currentDay === "saturday" ? "scale-105 opacity-100" : "opacity-70 hover:opacity-90"}`}
            onClick={() => setCurrentDay("saturday")}
          >
            <Image
              src="/saturday.svg"
              alt="Saturday Schedule"
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
            onClick={() => setCurrentDay("sunday")}
          >
            <Image
              src="/sunday.svg"
              alt="Sunday Schedule"
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {processedTimetableData.map((column, columnIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: columnIndex * 0.1 }}
              className="overflow-visible rounded-xl border border-white/20 bg-white/10 px-3 py-4 shadow-lg backdrop-blur-sm"
            >
              <h3 className="text-bes-red mb-3 text-center text-lg font-black tracking-wide uppercase md:text-xl">
                {column.title}
              </h3>

              <div className="border-lg space-y-1 overflow-visible">
                {/* Small spacing between slots with visible overflow for bubbles */}
                {column.slots.map((slot, slotIndex) => {
                  // Check if this is a continuation slot that should be visually hidden
                  const isContinuation = slot.isContinuation === true;

                  // Find the next slot with the same event (for spanning multiple slots)
                  const nextSlot = column.slots[slotIndex + 1];
                  const nextSlotHasSameEvent =
                    nextSlot && nextSlot.event === slot.event;

                  // We don't need to track whether this is the last slot in a series anymore

                  // We don't need to calculate isFirstInSeries here as it's equivalent to !isContinuation

                  // Alternating background colors for time slots
                  const bgColor =
                    slotIndex % 2 === 0 ? "bg-bes-amber" : "bg-bes-red/10";

                  // Always render the time marker for each slot
                  return (
                    <div
                      key={slotIndex}
                      className={`flex h-[35px] items-start ${bgColor}`}
                    >
                      {
                        <div className="my-auto w-14 flex-shrink-0 pl-2 text-xs font-bold text-gray-700">
                          {slot.time}
                        </div>

                        /* For empty slots, add a subtle background to make them visible */
                      }
                      {!slot.event && (
                        <div className="ml-2 flex-1 rounded-full"></div>
                      )}

                      {/* For slots with events */}
                      {slot.event && (
                        <>
                          {/* Only show the event block for the first occurrence or if it's not a continuation */}
                          {!isContinuation && (
                            <motion.div
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              className={`mx-auto w-[85%] cursor-pointer px-3 py-1 text-center text-xs font-black text-white uppercase shadow-md transition-all duration-200 ${getEventStyle(slot.type, !!slot.hasShow)}`}
                              onClick={() => {
                                setSelectedEvent(slot.event || null);
                                if (slot.event) {
                                  // Calculate how many consecutive slots have the same event
                                  let count = 1;
                                  let currentIdx = slotIndex;
                                  while (
                                    column.slots[currentIdx + 1] &&
                                    column.slots[currentIdx + 1].event ===
                                      slot.event
                                  ) {
                                    count++;
                                    currentIdx++;
                                  }

                                  // Calculate time range based on the number of consecutive slots
                                  const { endTime, timeRange } =
                                    calculateTimeRange(slot.time, count);

                                  // For the modal, use the attributes from the slot with the dance show if it exists
                                  const showSlot =
                                    column.slots
                                      .slice(slotIndex, slotIndex + count)
                                      .find((s) => s.hasShow) || slot;

                                  // Try to find image in any of the slots with the same event
                                  const slotWithImage =
                                    column.slots
                                      .slice(slotIndex, slotIndex + count)
                                      .find((s) => s.image) || showSlot;

                                  // Reset current slide index when opening a new modal
                                  setCurrentSlideIndex(0);

                                  // Generate slides based on slot data
                                  const slides = [];

                                  // Check if the slot has custom slides first
                                  if (
                                    showSlot.slides &&
                                    showSlot.slides.length > 0
                                  ) {
                                    // If we have custom slides, use them exclusively
                                    slides.push(...showSlot.slides);
                                  } else {
                                    // No custom slides, use the main image/description as a single slide
                                    if (
                                      slotWithImage.image ||
                                      showSlot.description
                                    ) {
                                      slides.push({
                                        image:
                                          slotWithImage.image ||
                                          showSlot.image ||
                                          slot.image,
                                        description:
                                          showSlot.description ||
                                          slot.description,
                                      });
                                    }
                                  }

                                  // Check for slides in merged slots too (if this event spans multiple slots)
                                  if (slides.length === 0 || !showSlot.slides) {
                                    // Look for slides in other slots with the same event
                                    column.slots
                                      .slice(slotIndex, slotIndex + count)
                                      .filter(
                                        (s) =>
                                          s.slides &&
                                          s.slides.length > 0 &&
                                          s !== showSlot,
                                      )
                                      .forEach((s) => {
                                        if (s.slides) slides.push(...s.slides);
                                      });
                                  }

                                  setSelectedEventDetails({
                                    event: slot.event,
                                    time: slot.time,
                                    endTime,
                                    timeRange,
                                    instructor:
                                      showSlot.instructor || slot.instructor,
                                    presenter:
                                      showSlot.presenter || slot.presenter,
                                    host: showSlot.host || slot.host,
                                    djs: showSlot.djs || slot.djs,
                                    actType: showSlot.actType || slot.actType,
                                    description:
                                      showSlot.description || slot.description,
                                    image:
                                      slotWithImage.image ||
                                      showSlot.image ||
                                      slot.image,
                                    slides:
                                      slides.length > 0 ? slides : undefined,
                                    hasShow: !!showSlot.hasShow,
                                    danceShow: showSlot.danceShow,
                                  });
                                } else {
                                  setSelectedEventDetails(null);
                                }
                              }}
                              style={{
                                height: nextSlotHasSameEvent
                                  ? // For multi-slot events, calculate the height based on number of slots
                                    (() => {
                                      const slotCount =
                                        column.slots
                                          .slice(slotIndex)
                                          .findIndex(
                                            (s) => s.event !== slot.event,
                                          ) || 1;
                                      // Adjust height for multi-slot events without including spacing between slots
                                      // This ensures each slot in the merged block has the same visual height as individual slots
                                      return `${slotCount * 35}px`;
                                    })()
                                  : // For single-slot events, maintain consistent height
                                    "35px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                position: "relative", // Needed for absolute positioning of dance show bubble
                                top: "2px",
                                overflow: "visible",
                                marginBottom: "auto", // No negative margin to ensure slots don't touch
                                marginTop: "auto", // No negative margin to ensure slots don't touch
                                zIndex: isContinuation ? "10" : "20", // Ensure proper stacking order
                                boxSizing: "border-box", // Ensure padding doesn't affect overall height
                              }}
                            >
                              <div className="text-bes-amber flex items-center justify-center text-xs sm:text-sm">
                                <span title="Click for details">
                                  {slot.event && slot.event.length > 30
                                    ? `${slot.event.substring(0, 30)}...`
                                    : slot.event}
                                </span>
                              </div>
                              {slot.actType && (
                                <div className="text-center text-[10px] font-normal normal-case opacity-90 sm:text-xs">
                                  {slot.actType}
                                </div>
                              )}
                              {slot.instructor && (
                                <div className="text-center text-[10px] font-normal normal-case opacity-90 sm:text-xs">
                                  {slot.instructor}
                                </div>
                              )}

                              {/* If this event spans multiple slots and there's a dance show in a later slot,
                                  we still need to show the dance show bubble but position it on the second half */}
                              {nextSlotHasSameEvent &&
                                column.slots
                                  .slice(slotIndex + 1, slotIndex + 2)
                                  .some((s) => s.hasShow) &&
                                column.slots
                                  .slice(slotIndex + 1, slotIndex + 2)
                                  .map(
                                    (nextSlotWithShow, i) =>
                                      nextSlotWithShow.hasShow &&
                                      nextSlotWithShow.danceShow && (
                                        <div
                                          key={`show-${slotIndex}-${i}`}
                                          className="bg-bes-purple absolute -right-2 z-30 flex items-center justify-center rounded-md px-2 py-1 text-xs font-bold text-white normal-case shadow-lg"
                                          style={{
                                            top: "calc(50% + 16px)", // Position in the second half of the combined slot
                                          }}
                                        >
                                          {nextSlotWithShow.danceShow}
                                        </div>
                                      ),
                                  )}

                              {/* Dance show bubble for slots with dance shows */}
                              {slot.hasShow &&
                                slot.danceShow &&
                                !isContinuation && (
                                  <div className="bg-bes-purple rounded-mdpx-2 absolute -top-2 -right-2 z-30 flex items-center justify-center py-1 text-[13px] font-bold text-white normal-case shadow-lg">
                                    {slot.danceShow}
                                  </div>
                                )}
                            </motion.div>
                          )}

                          {/* For continuation slots, we render a hidden placeholder to maintain the grid structure */}
                          {isContinuation && (
                            <div className="mx-auto w-[85%] opacity-0" />
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* BES Logo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center py-8"
      >
        <Image
          src="/bes-logo-color.webp"
          alt="Berlin En Salsa"
          width={120}
          height={120}
          className="h-auto w-auto"
        />
      </motion.div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && selectedEventDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => {
              setSelectedEvent(null);
              setSelectedEventDetails(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                // Add keyboard navigation for the slider
                if (
                  selectedEventDetails?.slides &&
                  selectedEventDetails.slides.length > 1
                ) {
                  if (e.key === "ArrowLeft") {
                    setCurrentSlideIndex((prev) =>
                      prev === 0
                        ? selectedEventDetails.slides!.length - 1
                        : prev - 1,
                    );
                  } else if (e.key === "ArrowRight") {
                    setCurrentSlideIndex((prev) =>
                      prev === selectedEventDetails.slides!.length - 1
                        ? 0
                        : prev + 1,
                    );
                  }
                }
              }}
              tabIndex={0}
            >
              <div className="flex flex-col">
                {/* Event title */}
                <h3 className="text-bes-red mb-2 text-2xl font-black">
                  {selectedEvent}
                </h3>

                {/* Time and instructor info */}
                <div className="mb-4 flex flex-col">
                  <span className="text-sm font-bold text-gray-700">
                    Time:{" "}
                    {selectedEventDetails.timeRange ||
                      selectedEventDetails.time}
                  </span>
                  {selectedEventDetails.actType && (
                    <span className="text-sm text-gray-700">
                      Type: {selectedEventDetails.actType}
                    </span>
                  )}
                  {selectedEventDetails.instructor && (
                    <span className="text-sm text-gray-700">
                      Instructor: {selectedEventDetails.instructor}
                    </span>
                  )}
                  {selectedEventDetails.djs && (
                    <span className="text-sm text-gray-700">
                      DJs: {selectedEventDetails.djs}
                    </span>
                  )}
                  {selectedEventDetails.presenter && (
                    <span className="text-sm text-gray-700">
                      Presenter: {selectedEventDetails.presenter}
                    </span>
                  )}
                  {selectedEventDetails.host && (
                    <span className="text-sm text-gray-700">
                      Host: {selectedEventDetails.host}
                    </span>
                  )}
                  {selectedEventDetails.hasShow &&
                    selectedEventDetails.danceShow && (
                      <span className="text-bes-purple mt-1 flex items-center text-sm font-bold">
                        <span className="bg-bes-purple mr-2 inline-block h-3 w-3 rounded-full"></span>
                        {selectedEventDetails.danceShow}
                      </span>
                    )}
                </div>

                {/* Slider for images and descriptions */}
                {selectedEventDetails.slides &&
                selectedEventDetails.slides.length > 0 ? (
                  <div className="mb-6">
                    {" "}
                    {/* Current Slide Content with touch swipe support */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlideIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onTouchStart={(e) => {
                          if (
                            selectedEventDetails?.slides &&
                            selectedEventDetails.slides.length > 1
                          ) {
                            setTouchStart(e.targetTouches[0].clientX);
                          }
                        }}
                        onTouchMove={(e) => {
                          if (
                            selectedEventDetails?.slides &&
                            selectedEventDetails.slides.length > 1
                          ) {
                            setTouchEnd(e.targetTouches[0].clientX);
                          }
                        }}
                        onTouchEnd={() => {
                          if (
                            selectedEventDetails?.slides &&
                            selectedEventDetails.slides.length > 1
                          ) {
                            if (
                              touchStart - touchEnd > 50 &&
                              selectedEventDetails.slides
                            ) {
                              // Swipe left
                              setCurrentSlideIndex((prev) =>
                                prev === selectedEventDetails.slides!.length - 1
                                  ? 0
                                  : prev + 1,
                              );
                            }

                            if (
                              touchStart - touchEnd < -50 &&
                              selectedEventDetails.slides
                            ) {
                              // Swipe right
                              setCurrentSlideIndex((prev) =>
                                prev === 0
                                  ? selectedEventDetails.slides!.length - 1
                                  : prev - 1,
                              );
                            }
                          }
                        }}
                      >
                        {/* DJ Name if available */}
                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.djName && (
                          <h4 className="text-bes-red mb-3 text-lg font-bold">
                            {
                              selectedEventDetails.slides[currentSlideIndex]
                                .djName
                            }
                          </h4>
                        )}

                        {/* Image */}
                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.image && (
                          <div className="mb-4 overflow-hidden rounded-lg">
                            <Image
                              src={
                                selectedEventDetails.slides[currentSlideIndex]
                                  .image!
                              }
                              alt={
                                selectedEventDetails.slides[currentSlideIndex]
                                  .djName ||
                                `${selectedEvent} - Slide ${currentSlideIndex + 1}`
                              }
                              width={300}
                              height={400}
                              className="h-auto w-full object-cover"
                            />
                          </div>
                        )}

                        {/* Description */}
                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.description && (
                          <p className="mb-4 text-gray-700">
                            {
                              selectedEventDetails.slides[currentSlideIndex]
                                .description
                            }
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    {/* Slider Navigation (only show if multiple slides) */}
                    {selectedEventDetails.slides.length > 1 && (
                      <div className="mt-4 flex flex-col space-y-3">
                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() =>
                              setCurrentSlideIndex((prev) =>
                                prev === 0
                                  ? selectedEventDetails.slides!.length - 1
                                  : prev - 1,
                              )
                            }
                            className="bg-bes-red hover:bg-bes-red/80 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors"
                            aria-label="Previous slide"
                          >
                            ←
                          </button>

                          <div className="text-xs text-gray-500">
                            {currentSlideIndex + 1} /{" "}
                            {selectedEventDetails.slides.length}
                          </div>

                          <button
                            onClick={() =>
                              setCurrentSlideIndex((prev) =>
                                prev === selectedEventDetails.slides!.length - 1
                                  ? 0
                                  : prev + 1,
                              )
                            }
                            className="bg-bes-red hover:bg-bes-red/80 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors"
                            aria-label="Next slide"
                          >
                            →
                          </button>
                        </div>

                        {/* DJ Navigation Pills */}
                        <div className="flex flex-wrap justify-center gap-2">
                          {selectedEventDetails.slides.map((slide, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlideIndex(index)}
                              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                                currentSlideIndex === index
                                  ? "bg-bes-red text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {slide.djName || `Slide ${index + 1}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Fallback to single image if no slides */}
                    {selectedEventDetails.image && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={selectedEventDetails.image}
                          alt={selectedEvent}
                          width={400}
                          height={300}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    )}

                    {/* Fallback to single description if no slides */}
                    {selectedEventDetails.description && (
                      <p className="mb-6 text-gray-700">
                        {selectedEventDetails.description}
                      </p>
                    )}
                  </>
                )}

                {/* Close button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedEvent(null);
                      setSelectedEventDetails(null);
                    }}
                    className="bg-bes-red hover:bg-bes-red/90 rounded-full px-6 py-2 font-bold text-white shadow-md transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

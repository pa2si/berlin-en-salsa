"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { GermanSaturdayTimetableData } from "../data/GermanSaturdayTimetable";
import { GermanSundayTimetableData } from "../data/GermanSundayTimetable";
import { Column } from "../types/timetable";
import { useSearchParams } from "next/navigation";

export default function GermanFestivalTimetable() {
  const searchParams = useSearchParams();
  const dayParam = searchParams.get("day");

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState<"saturday" | "sunday">(
    dayParam === "sunday" ? "sunday" : "saturday",
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
    instructorTwo?: string; // Second instructor for workshops with multiple teachers
    presenter?: string;
    host?: string;
    djs?: string;
    description?: string;
    bio?: string; // Biographical information for instructors
    bioTwo?: string; // Biographical information for the second instructor
    record?: string; // For Charlas Salseras - information about the record/album being discussed
    artist?: string; // For Charlas Salseras - information about the artist of the record
    text?: string; // For Charlas Salseras - additional explanatory text about the talk
    comment?: string; // For Charlas Salseras - comment from the presenter
    image?: string;
    imageTwo?: string; // Second image for the event
    type?: "main" | "dance-show" | "workshop" | "talk";
    slides?: {
      image?: string;
      description?: string;
      djName?: string;
      dancerName?: string;
      bandName?: string;
      dancerOne?: string;
      dancerTwo?: string;
      dancerOneDescription?: string;
      dancerTwoDescription?: string;
      combinedDancersDescription?: string;
      djOne?: string;
      djTwo?: string;
      djOneDescription?: string;
      djTwoDescription?: string;
      descriptionTwoDjsTogether?: string;
      genreDescription?: string;
    }[];
    actType?: string;
    hasShow?: boolean;
    danceShow?: string;
    dancers?: string;
    // danceShowImage is deprecated but kept for backward compatibility
    danceShowImage?: string;
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
    currentDay === "saturday"
      ? GermanSaturdayTimetableData
      : GermanSundayTimetableData;

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
              <h3 className="text-bes-red mb-3 text-center text-xl font-black tracking-wide uppercase md:text-2xl">
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
                                      .find((s) => s.image || s.imageTwo) ||
                                    showSlot;

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
                                    // If we have both image and imageTwo, create two slides
                                    const hasImage =
                                      slotWithImage.image ||
                                      showSlot.image ||
                                      slot.image;
                                    const hasImageTwo =
                                      slotWithImage.imageTwo ||
                                      showSlot.imageTwo ||
                                      slot.imageTwo;

                                    if (hasImage && hasImageTwo) {
                                      // First slide with the main image
                                      slides.push({
                                        image: hasImage,
                                      });

                                      // Second slide with the second image
                                      slides.push({
                                        image: hasImageTwo,
                                      });
                                    }
                                    // No custom slides and no imageTwo, use the main image/description as a single slide
                                    else if (hasImage || showSlot.description) {
                                      slides.push({
                                        image: hasImage,
                                        // For talk events, NEVER use description in slides to avoid any possibility of duplication
                                        description:
                                          showSlot.type === "talk"
                                            ? undefined // Skip description for ALL talk events
                                            : showSlot.description ||
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

                                  // Add dance show details as a slide if it exists and isn't already included
                                  if (showSlot.hasShow && showSlot.danceShow) {
                                    // Check if the dance show slide is not already in the slides array
                                    const hasDanceShowSlide = slides.some(
                                      (slide) =>
                                        slide.dancerName === showSlot.dancers ||
                                        slide.dancerOne || // Consider any slide with dancer info
                                        (slide.dancerOne && slide.dancerTwo),
                                    );

                                    if (
                                      !hasDanceShowSlide &&
                                      showSlot.dancers
                                    ) {
                                      // We'll create a dance show slide - but only if there isn't already a slide with dancer info
                                      // This should not happen with the new slide structure where dancers info is integrated
                                      slides.push({
                                        // Legacy support - if danceShowImage exists use it, but this is deprecated
                                        image:
                                          showSlot.danceShowImage ||
                                          "/son-cubano.webp",
                                        dancerName: showSlot.dancers, // Keep for backward compatibility
                                      });
                                    }
                                  }

                                  setSelectedEventDetails({
                                    event: slot.event,
                                    time: slot.time,
                                    endTime,
                                    timeRange,
                                    instructor:
                                      showSlot.instructor || slot.instructor,
                                    instructorTwo:
                                      showSlot.instructorTwo ||
                                      slot.instructorTwo,
                                    presenter:
                                      showSlot.presenter || slot.presenter,
                                    host: showSlot.host || slot.host,
                                    djs: showSlot.djs || slot.djs,
                                    actType: showSlot.actType || slot.actType,
                                    type: showSlot.type || slot.type,
                                    description:
                                      showSlot.description || slot.description,
                                    bio: showSlot.bio || slot.bio,
                                    bioTwo: showSlot.bioTwo || slot.bioTwo,
                                    record: showSlot.record || slot.record,
                                    artist: showSlot.artist || slot.artist,
                                    text: showSlot.text || slot.text,
                                    comment: showSlot.comment || slot.comment,
                                    image:
                                      slotWithImage.image ||
                                      showSlot.image ||
                                      slot.image,
                                    imageTwo:
                                      slotWithImage.imageTwo ||
                                      showSlot.imageTwo ||
                                      slot.imageTwo,
                                    slides:
                                      slides.length > 0 ? slides : undefined,
                                    hasShow: !!showSlot.hasShow,
                                    danceShow: showSlot.danceShow,
                                    dancers: showSlot.dancers,
                                    // danceShowImage is kept for backward compatibility but marked for removal
                                    danceShowImage: showSlot.danceShowImage,
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
                              <div className="text-bes-amber flex items-center justify-center text-xs text-[1rem] leading-4">
                                <span title="Click for details">
                                  {slot.event && slot.event.length > 30
                                    ? `${slot.event.substring(0, 30)}...`
                                    : slot.event}
                                </span>
                              </div>
                              {slot.actType && (
                                <div className="mt-0.5 text-center font-serif text-[0.9rem] leading-none font-normal normal-case opacity-90">
                                  {slot.actType}
                                </div>
                              )}
                              {slot.instructor && (
                                <div className="mt-0.5 text-center font-serif text-[0.9rem] leading-none font-normal normal-case opacity-90">
                                  {slot.instructor}
                                  {slot.instructorTwo &&
                                    ` y ${slot.instructorTwo}`}
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
              className="scrollbar-hide mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
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
                  <span className="flex items-center text-lg font-bold text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {selectedEventDetails.timeRange ||
                      selectedEventDetails.time}
                  </span>
                  {selectedEventDetails.actType ? (
                    <span className="text-lg text-gray-700">
                      {selectedEventDetails.actType}
                    </span>
                  ) : selectedEventDetails.type === "workshop" ? (
                    <span className="text-lg text-gray-700">Workshop</span>
                  ) : selectedEventDetails.type === "talk" ? (
                    <span className="text-lg text-gray-700">Talk</span>
                  ) : null}
                  {selectedEventDetails.instructor && (
                    <span className="text-lg text-gray-700">
                      {selectedEventDetails.type === "workshop"
                        ? "Geleitet von:"
                        : "Instructor:"}{" "}
                      {selectedEventDetails.instructor}
                      {selectedEventDetails.instructorTwo &&
                        ` y ${selectedEventDetails.instructorTwo}`}
                    </span>
                  )}
                  {selectedEventDetails.djs && (
                    <span className="text-lg text-gray-700">
                      DJs: {selectedEventDetails.djs}
                    </span>
                  )}

                  {/* For talk events, show Host and Presenter with appropriate labels */}
                  {selectedEventDetails.type === "talk" &&
                    selectedEventDetails.host && (
                      <span className="text-lg text-gray-700">
                        Host: {selectedEventDetails.host}
                      </span>
                    )}
                  {selectedEventDetails.type === "talk" &&
                    selectedEventDetails.presenter && (
                      <span className="text-lg text-gray-700">
                        Präsentiert von: {selectedEventDetails.presenter}
                      </span>
                    )}

                  {/* For non-talk events, use the original presenter display */}
                  {selectedEventDetails.type !== "talk" &&
                    selectedEventDetails.presenter && (
                      <span className="text-lg text-gray-700">
                        Presenter: {selectedEventDetails.presenter}
                      </span>
                    )}
                  {selectedEventDetails.type !== "talk" &&
                    selectedEventDetails.host && (
                      <span className="text-lg text-gray-700">
                        Host: {selectedEventDetails.host}
                      </span>
                    )}

                  {selectedEventDetails.hasShow &&
                    selectedEventDetails.danceShow && (
                      <span className="text-bes-purple mt-1 flex items-center text-base font-bold">
                        <span className="bg-bes-purple mr-2 inline-block h-3 w-3 rounded-full"></span>
                        {selectedEventDetails.danceShow}
                        {selectedEventDetails.dancers
                          ? `: ${selectedEventDetails.dancers}`
                          : ""}
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
                        {/* Band or Dancer Name if available - no DJ names since they're already in the DJs field */}
                        {(selectedEventDetails.slides[currentSlideIndex]
                          ?.dancerName ||
                          selectedEventDetails.slides[currentSlideIndex]
                            ?.bandName ||
                          selectedEventDetails.slides[currentSlideIndex]
                            ?.dancerOne) && (
                          <h4 className="text-bes-red mb-3 text-xl font-bold">
                            {selectedEventDetails.slides[currentSlideIndex]
                              ?.dancerName ||
                              selectedEventDetails.slides[currentSlideIndex]
                                ?.bandName ||
                              (selectedEventDetails.slides[currentSlideIndex]
                                ?.dancerOne
                                ? selectedEventDetails.slides[currentSlideIndex]
                                    ?.dancerTwo
                                  ? `${selectedEventDetails.slides[currentSlideIndex]?.dancerOne} y ${selectedEventDetails.slides[currentSlideIndex]?.dancerTwo}`
                                  : selectedEventDetails.slides[
                                      currentSlideIndex
                                    ]?.dancerOne
                                : null)}
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
                                  .dancerName ||
                                (selectedEventDetails.slides[currentSlideIndex]
                                  .dancerOne
                                  ? selectedEventDetails.slides[
                                      currentSlideIndex
                                    ].dancerTwo
                                    ? `${selectedEventDetails.slides[currentSlideIndex].dancerOne} y ${selectedEventDetails.slides[currentSlideIndex].dancerTwo}`
                                    : selectedEventDetails.slides[
                                        currentSlideIndex
                                      ].dancerOne
                                  : `${selectedEvent} - Slide ${currentSlideIndex + 1}`)
                              }
                              width={600}
                              height={400}
                              className="h-auto w-full object-cover"
                            />
                          </div>
                        )}

                        {/* Description Section */}
                        {/* Regular description */}
                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.description && (
                          <p className="mb-4 text-xl text-gray-700 md:leading-relaxed">
                            {
                              selectedEventDetails.slides[currentSlideIndex]
                                .description
                            }
                          </p>
                        )}

                        {/* Dancer descriptions */}
                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.dancerOne &&
                          selectedEventDetails.slides[currentSlideIndex]
                            ?.dancerOneDescription && (
                            <div className="mb-4">
                              <h5 className="text-bes-red mb-2 text-xl font-bold">
                                {
                                  selectedEventDetails.slides[currentSlideIndex]
                                    ?.dancerOne
                                }
                              </h5>
                              <p className="text-xl text-gray-700 md:leading-relaxed">
                                {
                                  selectedEventDetails.slides[currentSlideIndex]
                                    ?.dancerOneDescription
                                }
                              </p>
                            </div>
                          )}

                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.dancerTwo &&
                          selectedEventDetails.slides[currentSlideIndex]
                            ?.dancerTwoDescription && (
                            <div className="mb-4">
                              <h5 className="text-bes-red mb-2 text-xl font-bold">
                                {
                                  selectedEventDetails.slides[currentSlideIndex]
                                    ?.dancerTwo
                                }
                              </h5>
                              <p className="text-xl text-gray-700 md:leading-relaxed">
                                {
                                  selectedEventDetails.slides[currentSlideIndex]
                                    ?.dancerTwoDescription
                                }
                              </p>
                            </div>
                          )}

                        {/* Combined Dancers Description - only show if individual descriptions aren't available */}
                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.dancerOne &&
                          selectedEventDetails.slides[currentSlideIndex]
                            ?.combinedDancersDescription &&
                          !selectedEventDetails.slides[currentSlideIndex]
                            ?.dancerOneDescription &&
                          (!selectedEventDetails.slides[currentSlideIndex]
                            ?.dancerTwo ||
                            !selectedEventDetails.slides[currentSlideIndex]
                              ?.dancerTwoDescription) && (
                            <div className="mb-4">
                              <h5 className="text-bes-red mb-2 text-xl font-bold">
                                {selectedEventDetails.slides[currentSlideIndex]
                                  ?.dancerTwo
                                  ? `${selectedEventDetails.slides[currentSlideIndex]?.dancerOne} y ${selectedEventDetails.slides[currentSlideIndex]?.dancerTwo}`
                                  : selectedEventDetails.slides[
                                      currentSlideIndex
                                    ]?.dancerOne}
                              </h5>
                              <p className="text-xl text-gray-700 md:leading-relaxed">
                                {
                                  selectedEventDetails.slides[currentSlideIndex]
                                    ?.combinedDancersDescription
                                }
                              </p>
                            </div>
                          )}

                        {/* DJ descriptions */}
                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.djOne &&
                          selectedEventDetails.slides[currentSlideIndex]
                            ?.djOneDescription && (
                            <div className="mb-4">
                              <h5 className="text-bes-red mb-2 text-xl font-bold">
                                {
                                  selectedEventDetails.slides[currentSlideIndex]
                                    ?.djOne
                                }
                              </h5>
                              <p className="text-xl text-gray-700 md:leading-relaxed">
                                {
                                  selectedEventDetails.slides[currentSlideIndex]
                                    ?.djOneDescription
                                }
                              </p>
                            </div>
                          )}

                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.djTwo &&
                          selectedEventDetails.slides[currentSlideIndex]
                            ?.djTwoDescription && (
                            <div className="mb-4">
                              <h5 className="text-bes-red mb-2 text-xl font-bold">
                                {
                                  selectedEventDetails.slides[currentSlideIndex]
                                    ?.djTwo
                                }
                              </h5>
                              <p className="text-xl text-gray-700 md:leading-relaxed">
                                {
                                  selectedEventDetails.slides[currentSlideIndex]
                                    ?.djTwoDescription
                                }
                              </p>
                            </div>
                          )}

                        {/* Combined DJs Description */}
                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.descriptionTwoDjsTogether && (
                          <div className="bg-bes-amber/10 mt-6 mb-4 rounded-lg p-3">
                            <h5 className="text-bes-red mb-2 text-xl font-bold">
                              {selectedEventDetails.slides[currentSlideIndex]
                                ?.djOne &&
                              selectedEventDetails.slides[currentSlideIndex]
                                ?.djTwo
                                ? `${selectedEventDetails.slides[currentSlideIndex]?.djOne} & ${selectedEventDetails.slides[currentSlideIndex]?.djTwo} juntos`
                                : "Colaboración"}
                            </h5>
                            <p className="text-xl text-gray-700 md:leading-relaxed">
                              {
                                selectedEventDetails.slides[currentSlideIndex]
                                  ?.descriptionTwoDjsTogether
                              }
                            </p>
                          </div>
                        )}

                        {/* Genre Description */}
                        {selectedEventDetails.slides[currentSlideIndex]
                          ?.genreDescription && (
                          <div className="bg-bes-amber/10 mt-6 mb-4 rounded-lg p-3">
                            <p className="text-xl text-gray-700 md:leading-relaxed">
                              {
                                selectedEventDetails.slides[currentSlideIndex]
                                  ?.genreDescription
                              }
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    {/* Slider Navigation (only show if multiple slides) */}
                    {selectedEventDetails.slides &&
                      selectedEventDetails.slides.length > 1 && (
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
                              className="bg-bes-red hover:bg-bes-red/80 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:cursor-pointer"
                              aria-label="Previous slide"
                            >
                              ←
                            </button>

                            <div className="text-md text-gray-500">
                              {currentSlideIndex + 1} /{" "}
                              {selectedEventDetails.slides &&
                                selectedEventDetails.slides.length}
                            </div>

                            <button
                              onClick={() =>
                                setCurrentSlideIndex((prev) =>
                                  prev ===
                                  selectedEventDetails.slides!.length - 1
                                    ? 0
                                    : prev + 1,
                                )
                              }
                              className="bg-bes-red hover:bg-bes-red/80 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:cursor-pointer"
                              aria-label="Next slide"
                            >
                              →
                            </button>
                          </div>

                          {/* DJ Navigation Pills */}
                          <div className="flex flex-wrap justify-center gap-2">
                            {selectedEventDetails.slides &&
                              selectedEventDetails.slides.map(
                                (slide, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentSlideIndex(index)}
                                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all hover:cursor-pointer ${
                                      currentSlideIndex === index
                                        ? "bg-bes-red text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                  >
                                    {
                                      // For Charlas Salseras events with presenter/record
                                      selectedEventDetails.type === "talk" &&
                                      selectedEventDetails.presenter &&
                                      selectedEventDetails.record &&
                                      selectedEventDetails.slides &&
                                      selectedEventDetails.slides.length === 2
                                        ? index === 0
                                          ? selectedEventDetails.presenter // First slide shows presenter name
                                          : selectedEventDetails.record // Second slide shows record name
                                        : slide.djName ||
                                          slide.dancerName ||
                                          slide.bandName ||
                                          (slide.dancerOne
                                            ? slide.dancerTwo
                                              ? `${slide.dancerOne} y ${slide.dancerTwo}`
                                              : slide.dancerOne
                                            : slide.djOne && slide.djTwo
                                              ? `${slide.djOne} y ${slide.djTwo}`
                                              : `Slide ${index + 1}`)
                                    }
                                  </button>
                                ),
                              )}
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <>
                    {/* Fallback to single image or image carousel if no slides */}
                    {selectedEventDetails.image && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        {selectedEventDetails.imageTwo ? (
                          /* If we have two images, create a simple image carousel */
                          <div className="relative">
                            {/* Image carousel buttons */}
                            <div className="absolute top-1/2 right-0 left-0 z-10 flex -translate-y-1/2 justify-between px-4">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentSlideIndex(0);
                                }}
                                className="rounded-full bg-black/50 p-2 text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentSlideIndex(1);
                                }}
                                className="rounded-full bg-black/50 p-2 text-white"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Images */}
                            <div className="relative">
                              <div
                                className={`transition-opacity duration-500 ${currentSlideIndex === 0 ? "opacity-100" : "absolute inset-0 opacity-0"}`}
                              >
                                <Image
                                  src={selectedEventDetails.image}
                                  alt={`${selectedEvent} - Image 1`}
                                  width={600}
                                  height={400}
                                  className="h-auto w-full object-cover"
                                />
                              </div>
                              <div
                                className={`transition-opacity duration-500 ${currentSlideIndex === 1 ? "opacity-100" : "absolute inset-0 opacity-0"}`}
                              >
                                <Image
                                  src={selectedEventDetails.imageTwo}
                                  alt={`${selectedEvent} - Image 2`}
                                  width={600}
                                  height={400}
                                  className="h-auto w-full object-cover"
                                />
                              </div>
                            </div>

                            {/* Image indicator dots */}
                            <div className="absolute right-0 bottom-2 left-0">
                              <div className="flex justify-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentSlideIndex(0);
                                  }}
                                  className={`h-2 w-2 rounded-full ${currentSlideIndex === 0 ? "bg-white" : "bg-white/50"}`}
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentSlideIndex(1);
                                  }}
                                  className={`h-2 w-2 rounded-full ${currentSlideIndex === 1 ? "bg-white" : "bg-white/50"}`}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Otherwise, just show the single image */
                          <Image
                            src={selectedEventDetails.image}
                            alt={selectedEvent}
                            width={600}
                            height={400}
                            className="h-auto w-full object-cover"
                          />
                        )}
                      </div>
                    )}

                    {/* Fallback to single description if no slides - but not for talk events which have dedicated description sections */}
                    {selectedEventDetails.description &&
                      selectedEventDetails.type !== "talk" && (
                        <p className="text-xl text-gray-700 md:leading-relaxed">
                          {selectedEventDetails.description}
                        </p>
                      )}
                  </>
                )}

                {/* Bio section */}
                {/* For workshop events */}
                {selectedEventDetails.type === "workshop" && (
                  <>
                    {selectedEventDetails.bio && (
                      <div className="mb-6">
                        <h4 className="text-bes-red mb-2 text-xl font-bold">
                          Biografía de {selectedEventDetails.instructor}
                        </h4>
                        <p className="text-xl text-gray-700 md:leading-relaxed">
                          {selectedEventDetails.bio}
                        </p>
                      </div>
                    )}

                    {selectedEventDetails.bioTwo &&
                      selectedEventDetails.instructorTwo && (
                        <div className="mb-6">
                          <h4 className="text-bes-red mb-2 text-xl font-bold">
                            Biografía de {selectedEventDetails.instructorTwo}
                          </h4>
                          <p className="text-xl text-gray-700 md:leading-relaxed">
                            {selectedEventDetails.bioTwo}
                          </p>
                        </div>
                      )}
                  </>
                )}

                {/* CHARLAS SALSERAS CONTENT */}
                {/* Case 1: Aviatrix hosted events (with host attribute) */}
                {selectedEventDetails.type === "talk" &&
                  selectedEventDetails.host && (
                    <>
                      {/* Record info */}
                      {selectedEventDetails.record && (
                        <div className="mb-6">
                          <h4 className="mb-2 text-lg font-bold text-gray-600">
                            {selectedEventDetails.record}
                            {selectedEventDetails.artist && (
                              <span> de {selectedEventDetails.artist}</span>
                            )}
                          </h4>
                        </div>
                      )}

                      {/* Bio */}
                      {selectedEventDetails.bio && (
                        <div className="mb-6">
                          <h4 className="text-bes-red mb-2 text-xl font-bold">
                            Biografía de {selectedEventDetails.presenter}
                          </h4>
                          <p className="text-xl text-gray-700 md:leading-relaxed">
                            {selectedEventDetails.bio}
                          </p>
                        </div>
                      )}

                      {/* Comment */}
                      {selectedEventDetails.comment && (
                        <div className="mb-6">
                          <h4 className="text-bes-red mb-2 text-xl font-bold">
                            Comentario
                          </h4>
                          <p className="text-xl text-gray-700 md:leading-relaxed">
                            {selectedEventDetails.comment}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                {/* Case 2: Regular talk events (without host) */}
                {selectedEventDetails.type === "talk" &&
                  !selectedEventDetails.host && (
                    <>
                      {/* Bio (if available) */}
                      {selectedEventDetails.bio && (
                        <div className="mb-6">
                          <h4 className="text-bes-red mb-2 text-xl font-bold">
                            Bio de {selectedEventDetails.presenter}
                          </h4>
                          <p className="text-xl text-gray-700 md:leading-relaxed">
                            {selectedEventDetails.bio}
                          </p>
                        </div>
                      )}

                      {/* Description */}
                      {selectedEventDetails.description && (
                        <div className="mb-6">
                          <h4 className="text-bes-red mb-2 text-xl font-bold">
                            {selectedEventDetails.bio ? "Descripción" : ""}
                          </h4>
                          <p className="text-xl text-gray-700 md:leading-relaxed">
                            {selectedEventDetails.description}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                {/* Additional text for Charlas Salseras - always at the end */}
                {selectedEventDetails.type === "talk" &&
                  selectedEventDetails.text && (
                    <div className="border-bes-red mb-6 rounded-lg border-l-4 bg-gray-50 p-4">
                      <p className="text-xl text-gray-700 italic md:leading-relaxed">
                        &quot;{selectedEventDetails.text}&quot;
                      </p>
                    </div>
                  )}

                {/* Close button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedEvent(null);
                      setSelectedEventDetails(null);
                    }}
                    className="bg-bes-red hover:bg-bes-red/90 rounded-full px-6 py-2 font-bold text-white shadow-md transition-colors hover:cursor-pointer"
                  >
                    Schließen
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

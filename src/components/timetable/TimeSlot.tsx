import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TimeSlot as TimeSlotType } from "../../types/timetable";
import { SelectedEventDetails } from "./hooks/useEventModal";
import { getEventStyle } from "./utils/styleHelpers";

interface TimeSlotProps {
  slot: TimeSlotType & { isContinuation?: boolean };
  slotIndex: number;
  columnSlots: (TimeSlotType & { isContinuation?: boolean })[];
  originalAreaKey?: string;
  onEventClick: (eventKey: string, eventDetails: SelectedEventDetails) => void;
  onSlideReset: () => void;
}

export default function TimeSlot({
  slot,
  slotIndex,
  columnSlots,
  originalAreaKey,
  onEventClick,
  onSlideReset,
}: TimeSlotProps) {
  const t = useTranslations("Timetable");

  // Check if this is a continuation slot that should be visually hidden
  const isContinuation = slot.isContinuation === true;

  // Find the next slot with the same event (for spanning multiple slots)
  const nextSlot = columnSlots[slotIndex + 1];
  const nextSlotHasSameEvent = nextSlot && nextSlot.event === slot.event;

  // Alternating background colors for time slots
  const bgColor = slotIndex % 2 === 0 ? "bg-bes-amber" : "bg-bes-red/10";

  const handleEventClick = () => {
    if (!slot.event) return;

    // Reset current slide index when opening a new modal
    onSlideReset();

    // Calculate how many consecutive slots have the same event
    let count = 1;
    let currentIdx = slotIndex;
    while (
      columnSlots[currentIdx + 1] &&
      columnSlots[currentIdx + 1].event === slot.event
    ) {
      count++;
      currentIdx++;
    }

    // For the modal, prioritize the slot with the most complete information
    const showSlot =
      columnSlots.slice(slotIndex, slotIndex + count).find((s) => s.hasShow) ||
      columnSlots
        .slice(slotIndex, slotIndex + count)
        .find((s) => s.description || s.bio) ||
      slot;

    // Try to find image in any of the slots with the same event
    const slotWithImage =
      columnSlots
        .slice(slotIndex, slotIndex + count)
        .find((s) => s.image || s.imageTwo) || showSlot;

    // Generate slides based on slot data
    const slides = [];

    // Check if the slot has custom slides first
    if (showSlot.slides && showSlot.slides.length > 0) {
      // If we have custom slides, use them exclusively
      slides.push(...showSlot.slides);
    } else {
      // If we have both image and imageTwo, create two slides
      const hasImage = slotWithImage.image || showSlot.image || slot.image;
      const hasImageTwo =
        slotWithImage.imageTwo || showSlot.imageTwo || slot.imageTwo;

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
          // For talk, dance-workshop, and music-workshop events, NEVER use description in slides to avoid duplication in modal
          description:
            showSlot.type === "talk" ||
            showSlot.actType === "dance-workshop" ||
            showSlot.actType === "music-workshop"
              ? undefined
              : showSlot.description || slot.description,
        });
      }
    }

    // Check for slides in merged slots too (if this event spans multiple slots)
    if (slides.length === 0 || !showSlot.slides) {
      // Look for slides in other slots with the same event
      columnSlots
        .slice(slotIndex, slotIndex + count)
        .filter((s) => s.slides && s.slides.length > 0 && s !== showSlot)
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

      if (!hasDanceShowSlide && showSlot.dancers) {
        // Legacy fallback - use default image
        slides.push({
          image: "/son-cubano.webp",
          dancerName: showSlot.dancers, // Keep for backward compatibility
        });
      }
    }

    // Calculate end time based on event span
    const calculateEndTime = (
      startTime: string,
      eventCount: number,
    ): string => {
      const [hours, minutes] = startTime.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes + eventCount * 30;
      const endHour = Math.floor(totalMinutes / 60);
      const endMinutes = totalMinutes % 60;
      return `${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
    };

    const eventDetails: SelectedEventDetails = {
      event: slot.event,
      time: slot.time,
      endTime: calculateEndTime(slot.time, count),
      instructor: showSlot.instructor || slot.instructor,
      instructorTwo: showSlot.instructorTwo || slot.instructorTwo,
      presenter: showSlot.presenter || slot.presenter,
      host: showSlot.host || slot.host,
      moderator: showSlot.moderator || slot.moderator,
      guest: showSlot.guest || slot.guest,
      djs: showSlot.djs || slot.djs,
      actType: showSlot.actType || slot.actType,
      type: showSlot.type || slot.type,
      description: showSlot.description || slot.description,
      bio: showSlot.bio || slot.bio,
      bioTwo: showSlot.bioTwo || slot.bioTwo,
      record: showSlot.record || slot.record,
      artist: showSlot.artist || slot.artist,
      text: showSlot.text || slot.text,
      comment: showSlot.comment || slot.comment,
      image: slotWithImage.image || showSlot.image || slot.image,
      imageTwo: slotWithImage.imageTwo || showSlot.imageTwo || slot.imageTwo,
      slides: slides.length > 0 ? slides : undefined,
      hasShow: !!showSlot.hasShow,
      danceShow: showSlot.danceShow,
      dancers: showSlot.dancers,
    };

    onEventClick(slot.event, eventDetails);
  };

  return (
    <div className={`flex h-[35px] items-start ${bgColor}`}>
      <div className="my-auto w-14 flex-shrink-0 pl-2 text-xs font-bold text-gray-700">
        {slot.time}
      </div>

      {/* For empty slots, add a subtle background to make them visible */}
      {!slot.event && <div className="ml-2 flex-1 rounded-full"></div>}

      {/* For slots with events */}
      {slot.event && (
        <>
          {/* Only show the event block for the first occurrence or if it's not a continuation */}
          {!isContinuation && (
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`mx-auto w-[85%] cursor-pointer px-3 py-1 text-center text-xs font-black text-white uppercase shadow-md transition-all duration-200 ${getEventStyle(slot.type, !!slot.hasShow)}`}
              onClick={handleEventClick}
              style={{
                height: nextSlotHasSameEvent
                  ? // For multi-slot events, calculate the height based on number of slots
                    (() => {
                      const slotCount =
                        columnSlots
                          .slice(slotIndex)
                          .findIndex((s) => s.event !== slot.event) || 1;
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
              {/* Only show actType for main stage events */}
              {slot.actType && originalAreaKey === "main-stage" && (
                <div className="mt-0.5 text-center font-serif text-[0.9rem] leading-none font-normal normal-case opacity-90">
                  {slot.actType}
                </div>
              )}
              {slot.instructor && (
                <div className="mt-0.5 text-center font-serif text-[0.9rem] leading-none font-normal normal-case opacity-90">
                  {slot.instructor}
                  {slot.instructorTwo &&
                    ` ${t("modal.and")} ${slot.instructorTwo}`}
                </div>
              )}

              {/* If this event spans multiple slots and there's a dance show in a later slot,
                  we still need to show the dance show bubble but position it on the second half */}
              {nextSlotHasSameEvent &&
                columnSlots
                  .slice(slotIndex + 1, slotIndex + 2)
                  .some((s) => s.hasShow) &&
                columnSlots.slice(slotIndex + 1, slotIndex + 2).map(
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
              {slot.hasShow && slot.danceShow && !isContinuation && (
                <div className="bg-bes-purple rounded-mdpx-2 absolute -top-2 -right-2 z-30 flex items-center justify-center py-1 text-[13px] font-bold text-white normal-case shadow-lg">
                  {slot.danceShow}
                </div>
              )}
            </motion.div>
          )}

          {/* For continuation slots, we render a hidden placeholder to maintain the grid structure */}
          {isContinuation && <div className="mx-auto w-[85%] opacity-0" />}
        </>
      )}
    </div>
  );
}

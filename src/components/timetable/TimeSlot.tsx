import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TimeSlot as TimeSlotType } from "../../types/timetable";
import { AreaType } from "../../data/timetable/types/area.types";
import { getEventStyle } from "./utils/styleHelpers";

interface TimeSlotProps {
  slot: TimeSlotType & { isContinuation?: boolean };
  slotIndex: number;
  columnSlots: (TimeSlotType & { isContinuation?: boolean })[];
  originalAreaKey?: string; // This is the AreaType key
  onEventClick: (area: AreaType, time: string) => void; // CHANGED signature
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
    if (!slot.event || !originalAreaKey) return;

    // Reset current slide index when opening a new modal
    onSlideReset();

    // NEW: Simply pass area and time - TimetableClient will look up the event
    onEventClick(originalAreaKey as AreaType, slot.time);
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
              className={`mx-auto w-[85%] cursor-pointer px-3 py-1 text-center text-xs font-black text-white uppercase shadow-md transition-all duration-200 ${getEventStyle(slot.type)}`}
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

              {/* Dance show bubble for slots with dance shows - REMOVED to prevent duplication */}
              {/* The dance show info is already displayed in the bottom position above */}
            </motion.div>
          )}

          {/* For continuation slots, we render a hidden placeholder to maintain the grid structure */}
          {isContinuation && <div className="mx-auto w-[85%] opacity-0" />}
        </>
      )}
    </div>
  );
}

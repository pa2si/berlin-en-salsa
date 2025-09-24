/**
 * NEW SIMPLIFIED TIME SLOT COMPONENT
 *
 * This component works with the new event-based structure and is much simpler
 * than the original 280-line TimeSlot component. All the complex logic has been
 * moved to the data layer.
 */

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TimetableEvent, TimelineSlot } from "../../types/events";
import { EventUtils } from "../../utils/eventFactory";
import { AreaType } from "../../data/timetable/types/area.types";

interface NewTimeSlotProps {
  slot: TimelineSlot;
  area: AreaType;
  slotIndex: number;
  onEventClick: (event: TimetableEvent) => void;
}

/**
 * Event block component for rendering individual events
 */
function EventBlock({
  event,
  area,
  isFirstSlot,
  slotCount,
  onClick,
}: {
  event: TimetableEvent;
  area: AreaType;
  isFirstSlot: boolean;
  slotCount: number;
  onClick: () => void;
}) {
  const t = useTranslations("Timetable");

  // Determine styling based on event type
  const getEventStyle = () => {
    switch (event.type) {
      case "main-stage":
        return "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800";
      case "dance-workshop":
      case "music-workshop":
        return "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800";
      case "talk":
      case "aviatrix-talk":
        return "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800";
      case "dance-show":
        return "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800";
    }
  };

  // Get display information based on event type
  const getEventDisplayInfo = () => {
    if ("acts" in event) {
      const instructors = EventUtils.getActsByRole(event, "instructor");
      const djs = EventUtils.getActsByRole(event, "dj");
      const presenters = EventUtils.getActsByRole(event, "presenter");

      if (instructors.length > 0) {
        const names = instructors
          .map((p) => p.name)
          .join(` ${t("modal.and")} `);
        return { subtitle: names, type: "instructor" };
      }

      if (djs.length > 0) {
        return { subtitle: "", type: "dj" };
      }

      if (presenters.length > 0) {
        return { subtitle: presenters[0].name, type: "presenter" };
      }
    }

    return { subtitle: "", type: "" };
  };

  // Get performance type for main stage events
  const getPerformanceType = () => {
    if (event.type === "main-stage") {
      return event.performanceType === "live" ? "Live" : "DJ Set";
    }
    return "";
  };

  const displayInfo = getEventDisplayInfo();
  const performanceType = getPerformanceType();

  // Only render the event block in the first slot it appears in
  if (!isFirstSlot) {
    return <div className="mx-auto w-[85%] opacity-0" />;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`mx-auto w-[85%] cursor-pointer px-3 py-1 text-center text-xs font-black text-white uppercase shadow-md transition-all duration-200 ${getEventStyle()}`}
      onClick={onClick}
      style={{
        height: `${slotCount * 35}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        top: "2px",
        overflow: "visible",
        marginBottom: "auto",
        marginTop: "auto",
        zIndex: 20,
        boxSizing: "border-box",
      }}
    >
      {/* Event title */}
      <div className="text-bes-amber flex items-center justify-center text-xs text-[1rem] leading-4">
        <span title="Click for details">
          {event.title && event.title.length > 30
            ? `${event.title.substring(0, 30)}...`
            : event.title}
        </span>
      </div>

      {/* Performance type for main stage events */}
      {performanceType && area === "main-stage" && (
        <div className="mt-0.5 text-center font-serif text-[0.9rem] leading-none font-normal normal-case opacity-90">
          {performanceType}
        </div>
      )}

      {/* Instructor/presenter names */}
      {displayInfo.subtitle && (
        <div className="mt-0.5 text-center font-serif text-[0.9rem] leading-none font-normal normal-case opacity-90">
          {displayInfo.subtitle}
        </div>
      )}

      {/* Dance show overlay (if applicable) */}
      {event.type === "dance-show" && (
        <div className="bg-bes-purple absolute -top-2 -right-2 z-30 flex items-center justify-center rounded-md px-2 py-1 text-[13px] font-bold text-white normal-case shadow-lg">
          {event.showName}
        </div>
      )}
    </motion.div>
  );
}

/**
 * New simplified TimeSlot component
 */
export default function NewTimeSlot({
  slot,
  area,
  slotIndex,
  onEventClick,
}: NewTimeSlotProps) {
  // Alternating background colors for time slots
  const bgColor = slotIndex % 2 === 0 ? "bg-bes-amber" : "bg-bes-red/10";

  return (
    <div className={`flex h-[35px] items-start ${bgColor}`}>
      <div className="my-auto w-14 flex-shrink-0 pl-2 text-xs font-bold text-gray-700">
        {slot.time}
      </div>

      {/* Empty slot */}
      {slot.events.length === 0 && (
        <div className="ml-2 flex-1 rounded-full"></div>
      )}

      {/* Slots with events */}
      {slot.events.map((event, eventIndex) => {
        // Check if this is the first slot where this event appears
        const isFirstSlot = event.startTime === slot.time;
        const slotCount = EventUtils.getSlotCount(event);

        return (
          <EventBlock
            key={`${event.id}-${eventIndex}`}
            event={event}
            area={area}
            isFirstSlot={isFirstSlot}
            slotCount={slotCount}
            onClick={() => onEventClick(event)}
          />
        );
      })}
    </div>
  );
}

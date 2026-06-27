"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSmartTranslation } from "../../data/timetable/utils/smartTranslation";
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
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // URL parameter management
  const { parseDayParam, updateDayInUrl } = useURLParams();
  const t = useTranslations("Timetable");

  // Validate the parsed day against available festival days
  const parsedDay = parseDayParam();
  const isValidDay =
    !!parsedDay && festivalDays.some((day) => day.weekday === parsedDay);
  const validDay = isValidDay && parsedDay ? parsedDay : initialDay;

  const [currentDay, setCurrentDay] = useState<string>(validDay);

  const { translateColumnArea, getOriginalAreaKey } = useColumnTranslation();
  const { translateIfKey } = useSmartTranslation();

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
    eventId?: string,
  ): TimetableEvent | undefined => {
    const areaSlots = currentEvents[area];
    if (!areaSlots) return undefined;

    // Find the slot at this time
    const slot = areaSlots.find((s: TimelineSlot) => s.time === time);
    if (!slot || slot.events.length === 0) return undefined;

    if (eventId) {
      const matchedEvent = slot.events.find((event) => event.id === eventId);
      if (matchedEvent) return matchedEvent;
    }

    // Fallback to first event for non-overlapping slots and backwards compatibility
    return slot.events[0];
  };

  // NEW: Handle event click - look up the actual event
  const handleEventClick = (area: AreaType, time: string, eventId?: string) => {
    const event = findEvent(area, time, eventId);
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
    const processedData = processEventContinuation(
      rawData,
      translateColumnArea,
      getOriginalAreaKey,
    );

    const getEventSubtitle = (event: TimetableEvent): string | undefined => {
      if (event.type === "main-stage") {
        return event.performanceType === "live" ? "Live" : "DJ Set";
      }

      if (event.type === "dance-area" || event.type === "music-workshop") {
        const instructors = event.acts
          .filter((act) => act.role === "instructor")
          .map((act) => translateIfKey(act.name));

        if (instructors.length === 0) return undefined;
        if (instructors.length === 1) return instructors[0];

        return `${instructors[0]} ${t("modal.and")} ${instructors[1]}`;
      }

      return undefined;
    };

    return processedData.map((column) => {
      const areaKey = column.originalAreaKey as AreaType | undefined;
      const timelineSlots = areaKey ? currentEvents[areaKey] : undefined;

      if (!timelineSlots) {
        return column;
      }

      const eventById = new Map<string, TimetableEvent>();
      const overlappingEventIds = new Set<string>();

      timelineSlots.forEach((timelineSlot) => {
        timelineSlot.events.forEach((event) => {
          eventById.set(event.id, event);
        });

        if (timelineSlot.events.length > 1) {
          timelineSlot.events.forEach((event) => {
            overlappingEventIds.add(event.id);
          });
        }
      });

      const overlapEvents = Array.from(overlappingEventIds)
        .map((id) => eventById.get(id))
        .filter((event): event is TimetableEvent => Boolean(event))
        .sort((a, b) => {
          const startDiff =
            timeToMinutes(a.startTime || "00:00") -
            timeToMinutes(b.startTime || "00:00");

          if (startDiff !== 0) return startDiff;
          return a.id.localeCompare(b.id);
        });

      const laneByEventId = new Map<string, number>();

      overlapEvents.forEach((event) => {
        const usedLanes = new Set<number>();

        laneByEventId.forEach((lane, assignedEventId) => {
          const assignedEvent = eventById.get(assignedEventId);
          if (
            !assignedEvent ||
            !assignedEvent.startTime ||
            !assignedEvent.endTime
          )
            return;

          if (!event.startTime || !event.endTime) return;

          const overlaps =
            timeToMinutes(event.startTime) <
              timeToMinutes(assignedEvent.endTime) &&
            timeToMinutes(assignedEvent.startTime) <
              timeToMinutes(event.endTime);

          if (overlaps) {
            usedLanes.add(lane);
          }
        });

        let lane = 0;
        while (usedLanes.has(lane)) {
          lane += 1;
        }

        laneByEventId.set(event.id, lane);
      });

      const maxLane =
        laneByEventId.size > 0
          ? Math.max(...Array.from(laneByEventId.values()))
          : 0;
      const overlapLaneCount =
        laneByEventId.size > 0 ? Math.max(2, maxLane + 1) : 1;

      return {
        ...column,
        slots: column.slots.map((slot) => {
          const timelineSlot = timelineSlots.find((s) => s.time === slot.time);

          if (!timelineSlot || timelineSlot.events.length === 0) {
            return slot;
          }

          const activeEvents = timelineSlot.events
            .map((event) => {
              const isOverlapping = overlappingEventIds.has(event.id);
              return {
                id: event.id,
                title: translateIfKey(event.title),
                subtitle: getEventSubtitle(event),
                isTba: event.isTba,
                lane: isOverlapping ? (laneByEventId.get(event.id) ?? 0) : 0,
                laneCount: isOverlapping ? overlapLaneCount : 1,
                isOverlapping,
              };
            })
            .sort((a, b) => a.lane - b.lane || a.id.localeCompare(b.id));

          return {
            ...slot,
            overlapEvents:
              timelineSlot.events.length > 1
                ? timelineSlot.events.map((event) => ({
                    id: event.id,
                    title: translateIfKey(event.title),
                    isTba: event.isTba,
                  }))
                : undefined,
            activeEvents,
            event: activeEvents[0]?.title ?? slot.event,
            isTba: activeEvents[0]?.isTba ?? slot.isTba,
            originalEvent: timelineSlot.events[0] ?? slot.originalEvent,
            type:
              timelineSlot.events[0]?.type === "talk" ||
              timelineSlot.events[0]?.type === "aviatrix-talk"
                ? "talk"
                : timelineSlot.events[0]?.type === "dance-show"
                  ? "dance-show"
                  : timelineSlot.events[0]?.type === "dance-area" ||
                      timelineSlot.events[0]?.type === "music-workshop"
                    ? "workshop"
                    : "main",
          };
        }),
      };
    });
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
        <div className="flex w-full flex-col items-center -space-y-8 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4 md:w-2/3">
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
                  className="bg-bes-red absolute bottom-3 h-1 w-full rounded-full sm:-bottom-1"
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

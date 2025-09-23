"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SerializableTimelineColumn } from "../../domain/timeline/interfaces/SerializableInterfaces";
import TimelineGrid from "./TimelineGrid";
// import EventModal from "./EventModal/EventModal"; // TODO: Create new modal for timeline
// import { useEventModal } from "./hooks/useEventModal"; // TODO: Adapt for timeline

interface TimelineClientProps {
  initialDay: "saturday" | "sunday";
  saturdayColumns: SerializableTimelineColumn[];
  sundayColumns: SerializableTimelineColumn[];
  translations: {
    days: {
      saturday: string;
      sunday: string;
    };
  };
}

/**
 * New Timeline Client Component
 * Uses our new domain-driven timeline architecture with TimelineColumn and ActType models
 */
export default function TimelineClient({
  initialDay,
  saturdayColumns,
  sundayColumns,
  translations,
}: TimelineClientProps) {
  const [selectedDay, setSelectedDay] = useState<"saturday" | "sunday">(
    initialDay,
  );
  const [isLoading, setIsLoading] = useState(false);

  // Get columns for selected day
  const currentColumns =
    selectedDay === "saturday" ? saturdayColumns : sundayColumns;

  const handleDayChange = async (day: "saturday" | "sunday") => {
    if (day === selectedDay) return;

    setIsLoading(true);
    setSelectedDay(day);

    // Add smooth loading transition
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="bg-bes-amber min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header with day selector */}
        <div className="mb-8 text-center">
          <h1 className="text-bes-red mb-6 text-3xl font-bold md:text-4xl">
            New Timeline System
          </h1>

          {/* Day Toggle */}
          <div className="mb-6 flex justify-center">
            <div className="bg-bes-red rounded-lg p-1">
              <button
                onClick={() => handleDayChange("saturday")}
                className={`rounded-md px-6 py-2 font-medium transition-all ${
                  selectedDay === "saturday"
                    ? "bg-bes-amber text-bes-red shadow-md"
                    : "text-bes-amber hover:bg-bes-red/80"
                }`}
              >
                {translations.days.saturday}
              </button>
              <button
                onClick={() => handleDayChange("sunday")}
                className={`rounded-md px-6 py-2 font-medium transition-all ${
                  selectedDay === "sunday"
                    ? "bg-bes-amber text-bes-red shadow-md"
                    : "text-bes-amber hover:bg-bes-red/80"
                }`}
              >
                {translations.days.sunday}
              </button>
            </div>
          </div>

          {/* Info about the new system */}
          <div className="bg-bes-red/10 mb-6 rounded-lg p-4">
            <p className="text-bes-red">
              🚀 <strong>New Timeline Architecture</strong> - Domain-driven
              design with 30-minute slots
            </p>
            <p className="text-bes-red/80 mt-1 text-sm">
              Columns: {currentColumns.length} | Total Acts:{" "}
              {currentColumns.reduce((sum, col) => sum + col.acts.length, 0)} |
              Using: TimelineColumn + ActType + Artist models
            </p>
          </div>
        </div>

        {/* Timeline Content */}
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="bg-bes-red rounded-full p-4">
                <Image
                  src="/bes-logo-color.webp"
                  alt="Loading..."
                  width={48}
                  height={48}
                  className="animate-spin"
                />
              </div>
            </div>
          ) : (
            <TimelineGrid columns={currentColumns} day={selectedDay} />
          )}
        </motion.div>

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 rounded-lg bg-gray-800 p-4 text-xs text-white">
            <h3 className="mb-2 font-bold">Debug Info:</h3>
            <pre>
              {JSON.stringify(
                {
                  selectedDay,
                  columnsCount: currentColumns.length,
                  columnTitles: currentColumns.map((col) => col.title),
                  totalActs: currentColumns.reduce(
                    (sum, col) => sum + col.acts.length,
                    0,
                  ),
                },
                null,
                2,
              )}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

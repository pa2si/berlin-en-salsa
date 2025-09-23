"use client";

import { useState } from "react";
import {
  SerializableTimelineColumn,
  SerializableAct,
} from "../../domain/timeline/interfaces/SerializableInterfaces";

interface TimelineGridProps {
  columns: SerializableTimelineColumn[];
  day: "saturday" | "sunday";
}

/**
 * TimelineGrid Component
 * Displays the actual timeline grid with 30-minute slots and TimelineColumn data
 */
export default function TimelineGrid({ columns, day }: TimelineGridProps) {
  const [selectedAct, setSelectedAct] = useState<SerializableAct | null>(null);

  // Helper function to find act at specific time slot
  const getActAtTime = (
    column: SerializableTimelineColumn,
    timeSlot: string,
  ): SerializableAct | undefined => {
    return column.acts.find((act) => act.startTime === timeSlot);
  };

  // Generate time slots (30-minute intervals from 12:00 to 03:00)
  const timeSlots = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
  ];

  const handleActClick = (act: SerializableAct) => {
    setSelectedAct(act);
    console.log("Act clicked:", act.title, act);
  };

  if (columns.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="bg-bes-red/20 rounded-lg p-8">
          <h3 className="text-bes-red mb-2 text-xl font-bold">
            No Timeline Data
          </h3>
          <p className="text-bes-red/80">
            No columns loaded for {day}. This is expected since we haven&apos;t
            connected real data yet.
          </p>
          <p className="text-bes-red/60 mt-2 text-sm">
            Timeline service is ready - just need to load MainStageSaturday.ts
            data!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      {/* Column Headers */}
      <div className="bg-bes-red text-bes-amber p-4">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `80px repeat(${columns.length}, 1fr)`,
          }}
        >
          <div className="text-sm font-bold">Time</div>
          {columns.map((column) => (
            <div key={column.id} className="text-center text-sm font-bold">
              <div>{column.title}</div>
              <div className="text-xs opacity-80">
                {column.acts.length} acts
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="max-h-96 overflow-y-auto">
        {timeSlots.map((timeSlot) => (
          <div
            key={timeSlot}
            className="grid min-h-[60px] gap-4 border-b border-gray-200"
            style={{
              gridTemplateColumns: `80px repeat(${columns.length}, 1fr)`,
            }}
          >
            {/* Time Column */}
            <div className="flex items-center justify-center bg-gray-50 p-3 text-center text-sm font-medium">
              {timeSlot}
            </div>

            {/* Act Columns */}
            {columns.map((column) => {
              const act = getActAtTime(column, timeSlot);

              return (
                <div
                  key={`${column.id}-${timeSlot}`}
                  className="relative flex items-center justify-center p-2"
                >
                  {act ? (
                    <button
                      onClick={() => handleActClick(act)}
                      className="bg-bes-red/20 hover:bg-bes-red/30 group h-full min-h-[44px] w-full rounded-md p-2 text-left transition-colors"
                    >
                      <div className="text-bes-red line-clamp-2 text-sm font-medium">
                        {act.title}
                      </div>
                      {act.artistName && (
                        <div className="text-bes-red/70 mt-1 text-xs">
                          {act.artistName}
                        </div>
                      )}
                    </button>
                  ) : (
                    <div className="flex h-full min-h-[44px] w-full items-center justify-center rounded-md bg-gray-50">
                      <span className="text-xs text-gray-400">—</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer with summary */}
      <div className="bg-gray-50 p-4 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <span>
            Showing {timeSlots.length} time slots across {columns.length} areas
          </span>
          <span>
            Total acts: {columns.reduce((sum, col) => sum + col.acts.length, 0)}
          </span>
        </div>
      </div>

      {/* Simple Modal (TODO: Create proper EventModal for timeline) */}
      {selectedAct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="text-bes-red mb-4 text-xl font-bold">
              {selectedAct.title}
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Start:</strong> {selectedAct.startTime}
              </p>
              <p>
                <strong>End:</strong> {selectedAct.endTime}
              </p>
              <p>
                <strong>Category:</strong> {selectedAct.category}
              </p>
              {selectedAct.description && (
                <p>
                  <strong>Description:</strong> {selectedAct.description}
                </p>
              )}
              {selectedAct.artistName && (
                <p>
                  <strong>Artist:</strong> {selectedAct.artistName}
                </p>
              )}
              {selectedAct.bio && (
                <p>
                  <strong>Bio:</strong> {selectedAct.bio}
                </p>
              )}
            </div>
            <button
              onClick={() => setSelectedAct(null)}
              className="bg-bes-red text-bes-amber hover:bg-bes-red/80 mt-4 rounded-md px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

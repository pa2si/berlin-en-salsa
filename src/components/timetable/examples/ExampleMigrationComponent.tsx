/**
 * Example demonstrating how to use the new translation system
 * This file shows the migration path from old to new system
 */

import { ServerTimetableHelper } from "../server/ServerTimetableHelper";
import { Column } from "../../../types/timetable";

/**
 * Example Server Component using the new translation system
 * This gets all data server-side with translations applied
 */
export default async function ExampleServerTimetableComponent({
  day,
}: {
  day: "saturday" | "sunday";
}) {
  // ✅ NEW WAY: Server-side translation with optimal performance
  const timetableData: Column[] =
    await ServerTimetableHelper.getTimetableData(day);
  const availableTimeSlots =
    await ServerTimetableHelper.getAvailableTimeSlots(day);

  return (
    <div className="example-timetable">
      <h2>Timetable for {day}</h2>

      {/* Migration status indicator */}
      <div className="migration-status">
        <p>
          Main Stage Saturday:{" "}
          {ServerTimetableHelper.isAreaMigrated("main-stage", "saturday")
            ? "✅ Migrated"
            : "❌ Legacy"}
        </p>
        <p>
          Main Stage Sunday:{" "}
          {ServerTimetableHelper.isAreaMigrated("main-stage", "sunday")
            ? "✅ Migrated"
            : "❌ Legacy"}
        </p>
      </div>

      {/* Available time slots */}
      <div className="time-slots">
        <h3>Available Times:</h3>
        <div className="time-grid">
          {availableTimeSlots.map((time) => (
            <span key={time} className="time-slot">
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* Timetable areas */}
      <div className="timetable-areas">
        {timetableData.map((column, index) => (
          <div key={index} className="area-column">
            <h3>{column.area}</h3>
            <div className="area-events">
              {column.slots.map((slot, slotIndex) => (
                <div key={slotIndex} className="event-slot">
                  <span className="time">{slot.time}</span>
                  {slot.event && (
                    <div className="event-details">
                      <strong>{slot.event}</strong>
                      {slot.actType && (
                        <span className="act-type">({slot.actType})</span>
                      )}
                      {slot.description && (
                        <p className="description">{slot.description}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Migration Guide for existing components:
 *
 * OLD WAY (Client-side, locale-dependent):
 * ```tsx
 * import { useTimetableData } from "./hooks/useTimetableData";
 *
 * function TimetableComponent({ day }) {
 *   const { timetableData } = useTimetableData(day);
 *   // Data depends on client-side locale detection
 *   // Requires separate German/Spanish data files
 * }
 * ```
 *
 * NEW WAY Option 1 (Server Component - RECOMMENDED):
 * ```tsx
 * import { ServerTimetableHelper } from "./server/ServerTimetableHelper";
 *
 * async function TimetableComponent({ day }) {
 *   const timetableData = await ServerTimetableHelper.getTimetableData(day);
 *   // Data is pre-translated server-side
 *   // Single source of truth with translation keys
 * }
 * ```
 *
 * NEW WAY Option 2 (Client Component when needed):
 * ```tsx
 * import { useEnhancedTimetableData } from "./hooks/useEnhancedTimetableData";
 *
 * function TimetableComponent({ day }) {
 *   const { timetableData, isLoading, error } = useEnhancedTimetableData(day);
 *   // Handles translation client-side with async loading
 *   // Single source of truth with translation keys
 * }
 * ```
 */

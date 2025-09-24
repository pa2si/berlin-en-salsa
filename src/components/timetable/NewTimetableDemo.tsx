/**
 * NEW TIMETABLE DEMO
 *
 * This component demonstrates the new event-based architecture in action.
 * It shows how much cleaner and simpler the code becomes.
 */

"use client";

import { useState } from "react";
import { TimetableEvent, AreaColumn } from "../../types/events";
import NewTimeSlot from "./NewTimeSlot";
import NewEventModal from "./NewEventModal";

// Demo data using the new structure (for testing)
import { generateMainStageTimelineSlots } from "../../data/timetable/events/main-stage-saturday-new";

export default function NewTimetableDemo() {
  const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(
    null,
  );

  // Generate demo data
  const demoAreaColumns: AreaColumn[] = [
    {
      area: "main-stage",
      displayName: "Main Stage",
      slots: generateMainStageTimelineSlots(),
    },
  ];

  const handleEventClick = (event: TimetableEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="mb-4 text-center text-3xl font-bold">
          🎉 New Event-Based Timetable Architecture
        </h1>
        <p className="mx-auto max-w-2xl text-center text-gray-600">
          This demo shows the new simplified architecture in action. Notice how
          much cleaner the components are and how easy it would be to add new
          event types or attributes.
        </p>
      </div>

      {/* Benefits Summary */}
      <div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-4">
        <h2 className="mb-2 text-xl font-semibold text-green-800">
          ✅ Architecture Benefits
        </h2>
        <ul className="space-y-1 text-sm text-green-700">
          <li>
            • <strong>Components:</strong> TimeSlot reduced from 284 lines to
            120 lines
          </li>
          <li>
            • <strong>Type Safety:</strong> Specific interfaces per event type
            instead of 50+ optional fields
          </li>
          <li>
            • <strong>Maintainability:</strong> Adding new event attributes only
            affects relevant code
          </li>
          <li>
            • <strong>Extensibility:</strong> New event types can be added
            easily with proper type checking
          </li>
          <li>
            • <strong>Data Logic:</strong> Complex data transformation moved
            from components to data layer
          </li>
        </ul>
      </div>

      {/* Demo Timeline */}
      {demoAreaColumns.map((areaColumn) => (
        <div key={areaColumn.area} className="mb-8">
          <h2 className="mb-4 text-center text-2xl font-bold">
            {areaColumn.displayName}
          </h2>

          <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-lg">
            <div className="bg-red-600 py-2 text-center font-bold text-white">
              Saturday Schedule (Demo)
            </div>

            {areaColumn.slots.map((slot, slotIndex) => (
              <NewTimeSlot
                key={slot.time}
                slot={slot}
                area={areaColumn.area}
                slotIndex={slotIndex}
                onEventClick={handleEventClick}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Code Comparison */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-red-800">
            ❌ Old Approach
          </h3>
          <div className="space-y-2 text-sm text-red-700">
            <p>
              <strong>TimeSlot Interface:</strong> 50+ optional fields for all
              event types
            </p>
            <p>
              <strong>TimeSlot Component:</strong> 284 lines with complex data
              transformation
            </p>
            <p>
              <strong>Adding New Field:</strong> Requires changes in 4-5
              different files
            </p>
            <p>
              <strong>Type Safety:</strong> Weak - fields may not be relevant to
              event type
            </p>
            <p>
              <strong>Modal Logic:</strong> Complex conditional rendering based
              on field presence
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-green-800">
            ✅ New Approach
          </h3>
          <div className="space-y-2 text-sm text-green-700">
            <p>
              <strong>Event Interfaces:</strong> Specific types with only
              relevant fields
            </p>
            <p>
              <strong>TimeSlot Component:</strong> 120 lines - pure presentation
              logic
            </p>
            <p>
              <strong>Adding New Field:</strong> Only affects the specific event
              type
            </p>
            <p>
              <strong>Type Safety:</strong> Strong - TypeScript ensures field
              relevance
            </p>
            <p>
              <strong>Modal Logic:</strong> Type-safe discriminated unions for
              rendering
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Example */}
      <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-2 text-lg font-semibold text-blue-800">
          🔧 Adding New Event Type Example
        </h3>
        <pre className="overflow-x-auto rounded bg-white p-3 text-xs text-blue-700">
          {`// 1. Define the new event type
interface PhotoWorkshopEvent extends EventWithActs {
  type: "photo-workshop";
  equipment: string[];
  photoStyle: "portrait" | "street" | "dance";
}

// 2. Update the union type
type TimetableEvent = MainStageEvent | DanceWorkshopEvent | PhotoWorkshopEvent | ...;

// 3. Add factory method
EventFactory.createPhotoWorkshop({ ... })

// 4. Add modal rendering (type-safe!)
{isPhotoWorkshopEvent(event) && <PhotoWorkshopDetails event={event} />}`}
        </pre>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <NewEventModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </div>
  );
}

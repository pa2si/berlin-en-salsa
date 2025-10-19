# Time Flow Analysis: How Modal Gets Event Times

## The Question

**Will the modal display work if we remove `startTime` and `endTime` from event definitions?**

## Short Answer

**YES! ✅ It will work perfectly.**

The modal **never uses** the original event times. It always gets times that have been **enriched by the timeline configuration**.

## Complete Data Flow

### 1. Event Definition (No Times Needed)

```typescript
// File: main-stage-saturday.ts
export const mainStageSaturdayEvents: TimetableEvent[] = [
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.rodoElProfe",
    // ❌ These are ignored anyway!
    startTime: "13:00",
    endTime: "13:30",
    // ✅ Only these matter:
    area: "main-stage",
    performanceType: "dj-set",
    acts: [
      /* ... */
    ],
  }),
];
```

### 2. Timeline Configuration (Source of Truth)

```typescript
// File: timelineConfig.ts
export const mainStageSaturdayTimeline: TimelineSlot[] = [
  {
    time: "13:00", // ✅ REAL start time
    duration: 60, // ✅ REAL duration
    eventId: "Timetable.events.mainStage.saturday.rodoElProfe",
  },
];
```

### 3. Timeline Enrichment (Times Added Here!)

```typescript
// File: timelineConfig.ts - createTimelineFromSimpleConfig()

export function createTimelineFromSimpleConfig(
  timelineSlots: TimelineSlot[],
  eventCollection: TimetableEvent[],
): TimetableEvent[] {
  const timeline: TimetableEvent[] = [];

  for (const slot of timelineSlots) {
    const event = eventCollection.find((e) => e.title === slot.eventId);

    if (event) {
      const timelineEvent: TimetableEvent = {
        ...event, // Copy all event properties
        startTime: slot.time, // ⭐ OVERWRITE with timeline time
        endTime: calculateEndTime(
          // ⭐ CALCULATE from timeline
          slot.time,
          slot.duration,
        ),
      };

      timeline.push(timelineEvent);
    }
  }

  return timeline;
}
```

**Key Point**: This function **spreads the event** (`...event`) and then **immediately overwrites** `startTime` and `endTime` with values from the timeline config. So whatever was in the original event is **completely ignored**!

### 4. Service Layer Processing

```typescript
// File: timetable.service.ts - getEventsForArea()

const { timeline, events } = eventMap[day][area];

// This call enriches events with timeline times
const timelineEvents = createTimelineFromSimpleConfig(timeline, events);
                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                       Returns events WITH times from timeline config

// Convert to TimelineSlot[] format (time -> events mapping)
return Array.from(slotsMap.entries()).map(([time, events]) => ({
  time,
  events,  // These events have startTime/endTime from timeline
}));
```

### 5. Component Receives Enriched Data

```typescript
// File: TimetablePage.tsx (Server Component)

const saturdayEvents = TimetableService.getTimetableEventsServer("saturday");
//     ^^^^^^^^^^^^^^^
//     Returns: Record<AreaType, TimelineSlot[]>
//     Where TimelineSlot = { time: string, events: TimetableEvent[] }
//     And each TimetableEvent already has startTime/endTime from timeline!
```

### 6. Client Component Finds Event

```typescript
// File: TimetableClient.tsx

const findEvent = (
  area: AreaType,
  time: string,
): TimetableEvent | undefined => {
  const eventsMap = currentDay === "saturday" ? saturdayEvents : sundayEvents;
  const areaSlots = eventsMap[area];

  // Find the slot at this time
  const slot = areaSlots.find((s) => s.time === time);

  // Return the first event (with times already set!)
  return slot.events[0]; // ⭐ This event HAS startTime/endTime from timeline
};

const handleEventClick = (area: AreaType, time: string) => {
  const event = findEvent(area, time); // Gets enriched event
  if (event) {
    setSelectedEvent(event); // Passes enriched event to modal
  }
};
```

### 7. Adapter Extracts Times

```typescript
// File: adapters/eventAdapter.ts

export function useEventAdapter() {
  const convertTimetableEventToSelectedDetails = (
    event: TimetableEvent, // This event already has times!
  ): SelectedEventDetails => {
    const baseDetails: SelectedEventDetails = {
      event: translateIfKey(event.title),
      time: event.startTime, // ⭐ These are from timeline config
      endTime: event.endTime, // ⭐ These are from timeline config
    };

    // ... rest of conversion

    return baseDetails;
  };

  return { convertTimetableEventToSelectedDetails };
}
```

### 8. Modal Displays Times

```typescript
// File: EventModal/EventDetails.tsx

<span>
  {selectedEventDetails.endTime
    ? `${selectedEventDetails.time} - ${selectedEventDetails.endTime}`
    : selectedEventDetails.time}
</span>
```

## Visual Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│ 1. Event Definition (startTime/endTime IGNORED)         │
│    mainStageSaturdayEvents[]                             │
│    { title, area, acts, ... }                            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 2. Timeline Config (SOURCE OF TRUTH)                     │
│    mainStageSaturdayTimeline[]                           │
│    { time: "13:00", duration: 60, eventId: ... }         │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 3. createTimelineFromSimpleConfig()                      │
│    ✅ Finds event by title                               │
│    ✅ Spreads event: { ...event }                        │
│    ✅ OVERWRITES startTime with timeline.time            │
│    ✅ CALCULATES endTime from timeline.duration          │
│    Returns: TimetableEvent[] WITH TIMES                  │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 4. TimetableService.getEventsForArea()                   │
│    Groups enriched events into TimelineSlot[]            │
│    { time: "13:00", events: [enrichedEvent] }            │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 5. TimetablePage (Server) → TimetableClient (Client)    │
│    Passes: Record<AreaType, TimelineSlot[]>             │
│    Events already have startTime/endTime                 │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 6. User clicks event → findEvent()                       │
│    Returns enriched TimetableEvent                       │
│    setSelectedEvent(event) ← Has times!                  │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 7. NewEventModal → useEventAdapter()                     │
│    Extracts: event.startTime, event.endTime              │
│    Creates: SelectedEventDetails { time, endTime }       │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────┐
│ 8. EventModal → EventDetails                             │
│    Displays: "13:00 - 14:00"                             │
│    ✅ Times from timeline config!                        │
└──────────────────────────────────────────────────────────┘
```

## Proof: Times Are Always Overwritten

Let's trace one specific event:

### Original Event (What we write)

```typescript
EventFactory.createMainStageEvent({
  title: "Timetable.events.mainStage.saturday.rodoElProfe",
  startTime: "13:00", // ← Written in event file
  endTime: "13:30", // ← Written in event file
  // ... other props
});
```

### After createTimelineFromSimpleConfig

```typescript
{
  ...event,
  startTime: "13:00",  // ← From timeline config (overwrites!)
  endTime: "14:00",    // ← From calculateEndTime(13:00, 60) (overwrites!)
  // ... other props
}
```

**Even if timeline times are different, timeline wins!**

Example:

```typescript
// Event says:
startTime: "13:00";
endTime: "13:30";

// Timeline says:
time: "14:00";
duration: 90;

// Result after enrichment:
startTime: "14:00"; // ← Timeline won!
endTime: "15:30"; // ← Timeline won!
```

## Conclusion

### YES, We Can Remove Times from Events! ✅

The modal will work perfectly because:

1. ✅ **Event times are ALWAYS overwritten** by timeline config
2. ✅ **Modal never sees original event times** - only enriched ones
3. ✅ **All time data flows from timeline config** through the enrichment process
4. ✅ **No code depends on event definition times** - everything uses enriched times

### What About `day`?

Similarly, `day` can be moved to timeline config! Currently used for:

1. **ID generation** in `generateEventId(area, day, title)`
2. **File organization** (separate Saturday/Sunday files)

#### Option 1: Remove `day` from Events

```typescript
// Instead of passing day to EventFactory:
EventFactory.createMainStageEvent({
  title: "...",
  day: "saturday", // ← Remove this
  // ...
});

// Pass day when creating timeline:
const enrichedEvents = createTimelineFromSimpleConfig(
  mainStageSaturdayTimeline,
  mainStageSaturdayEvents,
  "saturday", // ← Add day parameter
);
```

#### Option 2: Infer `day` from File Location

```typescript
// In main-stage-saturday.ts
export const DAY = "saturday" as const;

export const mainStageSaturdayEvents = createMainStageEvents(DAY, [
  {
    title: "...",
    // day automatically set from file constant
  },
]);
```

#### Option 3: Include `day` in Timeline Config

```typescript
interface TimelineSlot {
  time: string;
  duration: number;
  eventId: string;
  day: "saturday" | "sunday"; // ← Add day here
}
```

## Recommendation

**Phase 1: Remove startTime/endTime from events** ✅

- Safe, proven to work
- Modal gets times from timeline enrichment
- Zero risk

**Phase 2: Move `day` to timeline config** ✅

- Makes events truly reusable
- Timeline becomes complete source of truth for scheduling
- Event ID generation happens during enrichment

**Phase 3: Simplify event definitions** ✅

- Events become pure content definitions
- No scheduling info at all
- Maximum reusability

## Updated Refactor Plan

### Events Without Scheduling Info

```typescript
// BEFORE
EventFactory.createMainStageEvent({
  title: "Timetable.events.mainStage.saturday.rodoElProfe",
  startTime: "13:00", // ❌ Remove
  endTime: "13:30", // ❌ Remove
  area: "main-stage",
  performanceType: "dj-set",
  day: "saturday", // ❌ Remove (Phase 2)
  acts: [
    /* ... */
  ],
});

// AFTER
EventFactory.createMainStageEvent({
  title: "Timetable.events.mainStage.saturday.rodoElProfe",
  area: "main-stage",
  performanceType: "dj-set",
  acts: [
    /* ... */
  ],
});
```

### Timeline With Complete Scheduling

```typescript
// Timeline has ALL scheduling info
export const mainStageSaturdayTimeline: TimelineSlot[] = [
  {
    time: "13:00", // When it starts
    duration: 60, // How long it lasts
    eventId: "Timetable.events.mainStage.saturday.rodoElProfe",
    day: "saturday", // What day (optional - can infer from file)
    area: "main-stage", // What area (optional - can infer from file)
  },
];
```

### Benefits

✅ Events = Pure content  
✅ Timeline = Pure scheduling  
✅ Clean separation of concerns  
✅ Events can be reused across days/times  
✅ Single source of truth for all timing

## Next Steps

Ready to implement? The changes are:

1. **Update BaseEvent interface** - make startTime/endTime optional
2. **Update EventFactory methods** - make startTime/endTime params optional
3. **Remove startTime/endTime from all event definitions**
4. **Test modal displays** (should work immediately!)
5. **Optional: Move day to timeline config**

Would you like me to start?

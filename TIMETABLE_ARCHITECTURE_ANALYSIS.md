# Timetable Architecture Analysis

## 📋 Document Purpose

This document provides a comprehensive analysis of how the timetable system works in the Berlin En Salsa Festival application, including data flow, component structure, and key architectural decisions.

**Current Status:** October 17, 2025
- Architecture simplified after adapter removal
- Ready for scalability refactor (see TIMETABLE_SCALABILITY_ANALYSIS.md)

---

## Overview

This document provides a comprehensive analysis of how the timetable system works in the Berlin En Salsa Festival application.

## Key Question: Is `generateEventId` Legacy?

**Answer: NO - It's actively used and essential**

The `generateEventId` function in `/src/utils/eventFactory.ts` is **NOT legacy**. It's a core utility function that:

- Is called by all EventFactory static methods to generate unique IDs for events
- Creates consistent event IDs using the pattern: `{area}-{day}-{sanitized-title}`
- Is actively used across all event data files (Saturday/Sunday for all areas)

## Architecture Overview

The timetable system uses a **layered architecture** with clean separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Route Layer                          │
│  /app/[locale]/(content)/timetable/page.tsx            │
│  - Server Component                                      │
│  - Handles metadata generation                          │
│  - Fetches data via TimetableService                    │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│              Component Layer                             │
│  /components/timetable/                                 │
│  ├── TimetablePage.tsx (Server Component)              │
│  ├── TimetableClient.tsx (Client Component)            │
│  ├── TimetableGrid.tsx                                 │
│  ├── EventModal/                                       │
│  │   ├── EventModal.tsx (accepts TimetableEvent)      │
│  │   ├── eventConversion.ts (pure function)           │
│  │   ├── EventDetails.tsx                             │
│  │   ├── EventSlider.tsx                              │
│  │   └── EventNavigation.tsx                          │
│  └── hooks/                                            │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│               Service Layer                              │
│  /data/timetable/services/timetable.service.ts         │
│  - TimetableService class                               │
│  - Bridge between old and new formats                   │
│  - Handles data transformation                          │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│              Data Layer (NEW)                           │
│  /data/timetable/events/                               │
│  ├── main-stage/                                       │
│  │   ├── main-stage-saturday.ts                       │
│  │   └── main-stage-sunday.ts                         │
│  ├── dance-workshops/                                  │
│  ├── music-workshops/                                  │
│  └── salsa-talks/                                      │
│                                                         │
│  Uses EventFactory to create typed events              │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│            Timeline Configuration                       │
│  /utils/timelineConfig.ts                              │
│  - Maps events to time slots                           │
│  - Simple time + eventId references                    │
│  - Generates TimelineSlot[] format                     │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│              Factory Layer                              │
│  /utils/eventFactory.ts                                │
│  - EventFactory class                                  │
│  - Type-safe event creation                            │
│  - Uses generateEventId() ← ACTIVE & ESSENTIAL         │
└─────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Event Creation (Data Definition)

```typescript
// Location: /data/timetable/events/main-stage/main-stage-saturday.ts

export const mainStageSaturdayEvents: TimetableEvent[] = [
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.rodoElProfe",
    startTime: "13:00",
    endTime: "13:30",
    area: "main-stage",
    performanceType: "dj-set",
    day: "saturday", // Used by generateEventId
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "dj",
        bio: "Timetable.events.bios.rodoLeFou",
        image: "/rodo-le-fou.webp",
      }),
      // ... more acts
    ],
  }),
  // ... more events
];
```

**Key Points:**

- Uses `EventFactory` static methods
- Each factory method internally calls `generateEventId()` to create unique IDs
- Events are typed using discriminated unions (`MainStageEvent`, `DanceWorkshopEvent`, etc.)
- All text is stored as translation keys (e.g., `"Timetable.events..."`)

### 2. Timeline Configuration

```typescript
// Location: /utils/timelineConfig.ts

export const mainStageSaturdayTimeline: TimelineSlot[] = [
  {
    time: "13:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.rodoElProfe",
  },
  // ... more slots
];

// This function matches timeline slots to events
export function createTimelineFromSimpleConfig(
  timeline: TimelineSlot[],
  eventCollection: TimetableEvent[],
): TimetableEvent[];
```

**Key Points:**

- Simple configuration: just time, duration, and event reference
- `createTimelineFromSimpleConfig` matches `eventId` (title) to find the event
- Fills in `startTime` and `endTime` based on timeline config
- Returns enriched `TimetableEvent[]`

### 3. Service Layer Processing

```typescript
// Location: /data/timetable/services/timetable.service.ts

// OLD METHOD (Bridge Layer - being phased out)
static getTimetableDataServer(day: "saturday" | "sunday"): Promise<Column[]>

// NEW METHOD (Direct event access)
static getTimetableEventsServer(day: "saturday" | "sunday"): Record<AreaType, TimelineSlot[]>
```

**Current State:**

- **Dual format support**: Both old (`Column[]`) and new (`TimelineSlot[]`) formats
- **Bridge conversion**: `convertNewEventsToTranslatableTimeSlots()` converts new events to old format
- **Migration in progress**: New format will eventually replace the old one

**TimetableService responsibilities:**

1. Aggregate events from all areas
2. Generate 30-minute time slots (12:30 - 22:00)
3. Map events to slots
4. Convert between formats during transition
5. Handle server-side data fetching

### 4. Component Rendering

```typescript
// Location: /components/timetable/TimetablePage.tsx (Server Component)

export default async function TimetablePage({ initialDay }) {
  const t = await getTranslations();

  // Fetch BOTH formats (OLD and NEW)
  const saturdayData = await TimetableService.getTimetableDataServer("saturday");
  const sundayData = await TimetableService.getTimetableDataServer("sunday");

  const saturdayEvents = TimetableService.getTimetableEventsServer("saturday"); // NEW
  const sundayEvents = TimetableService.getTimetableEventsServer("sunday");     // NEW

  return (
    <TimetableClient
      saturdayData={saturdayData}        // OLD format (for grid)
      sundayData={sundayData}            // OLD format (for grid)
      saturdayEvents={saturdayEvents}    // NEW format (for modal)
      sundayEvents={sundayEvents}        // NEW format (for modal)
      translations={...}
    />
  );
}
```

```typescript
// Location: /components/timetable/TimetableClient.tsx (Client Component)

export default function TimetableClient({
  saturdayData,   // Column[] - OLD format for grid display
  sundayData,     // Column[] - OLD format for grid display
  saturdayEvents, // Record<AreaType, TimelineSlot[]> - NEW format for modal
  sundayEvents,   // Record<AreaType, TimelineSlot[]> - NEW format for modal
  translations,
}) {
  const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null);

  // Find event using NEW format
  const findEvent = (area: AreaType, time: string): TimetableEvent | undefined => {
    const eventsMap = currentDay === "saturday" ? saturdayEvents : sundayEvents;
    const areaSlots = eventsMap[area];
    const slot = areaSlots.find((s) => s.time === time);
    return slot?.events[0]; // Return the TimetableEvent
  };

  // Grid uses OLD format (Column[])
  <TimetableGrid
    data={currentData} // Column[]
    onEventClick={handleEventClick}
  />

  // Modal uses NEW format - accepts TimetableEvent directly
  {selectedEvent && (
    <EventModal event={selectedEvent} onClose={closeModal} />
  )}
}
```

### 5. Event Modal (Direct Rendering)

```typescript
// Location: /components/timetable/EventModal/EventModal.tsx

interface EventModalProps {
  event?: TimetableEvent;                    // NEW: Direct TimetableEvent
  selectedEventDetails?: SelectedEventDetails; // OLD: For backward compatibility
  onClose: () => void;
}

export default function EventModal({ event, selectedEventDetails: providedDetails, onClose }) {
  const { translateIfKey } = useSmartTranslation();
  
  // Convert TimetableEvent to SelectedEventDetails internally if needed
  const selectedEventDetails = event
    ? convertTimetableEventToSelectedDetails(event, translateIfKey)
    : providedDetails!;
  
  // Render modal with EventDetails, EventSlider, EventNavigation...
}
```

```typescript
// Location: /components/timetable/EventModal/eventConversion.ts

// Pure function (not a React Hook) for converting event formats
export function convertTimetableEventToSelectedDetails(
  event: TimetableEvent,
  translateIfKey: (key?: string) => string,
): SelectedEventDetails {
  // Converts new TimetableEvent to modal display format
  // Handles all event types: MainStageEvent, DanceWorkshopEvent, etc.

  if (isMainStageEvent(event)) {
    // Extract DJ/band information
    // Map acts to slides
    // Handle dance shows
  }

  if (isDanceWorkshopEvent(event)) {
    // Extract instructor information
    // Map to workshop format
  }

  // ... handles all event types
  
  return selectedEventDetails;
}
```

**Key Change:** The adapter was removed and converted to a pure function inside the EventModal directory. This simplifies the architecture while maintaining the same UI/UX.

---

## Type System

### Event Types Hierarchy

```typescript
// Location: /types/events.ts

BaseEvent (interface)
├── id: string              ← Generated by generateEventId()
├── title: string           ← Translation key
├── startTime: string
├── endTime: string
├── area: AreaType
├── image?: string
└── description?: string

EventWithActs extends BaseEvent
└── acts: Act[]

MainStageEvent extends EventWithActs
├── type: "main-stage"
├── performanceType: "live" | "dj-set"
├── genre?: string
├── slides?: MediaSlide[]
├── hasShow?: boolean
├── danceShow?: string
└── dancers?: string

DanceWorkshopEvent extends EventWithActs
├── type: "dance-workshop"
├── danceStyle: string
├── level?: "beginner" | "intermediate" | "advanced"
└── duration: number

MusicWorkshopEvent extends EventWithActs
TalkEvent extends EventWithActs
AviatrixTalkEvent extends EventWithActs
DanceShowEvent extends EventWithActs
```

### Type Guards

```typescript
export function isMainStageEvent(
  event: TimetableEvent,
): event is MainStageEvent;
export function isDanceWorkshopEvent(
  event: TimetableEvent,
): event is DanceWorkshopEvent;
// ... etc.
```

### Act System

```typescript
interface Act {
  name: string; // Translation key
  role: ActRole; // Their role in the event
  bio?: string; // Translation key
  description?: string; // Translation key
  image?: string;
}

type ActRole =
  | "instructor"
  | "presenter"
  | "moderator"
  | "guest"
  | "dj"
  | "dancer"
  | "band-member"
  | "band";
```

## Translation System

### Smart Translation

```typescript
// Location: /data/timetable/utils/smartTranslation.ts

export function useSmartTranslation() {
  const t = useTranslations();

  const translateIfKey = (value: string | undefined): string => {
    if (!value) return "";

    // Check if it's a translation key (contains dots)
    if (value.includes(".")) {
      return t(value as never);
    }

    // Return as-is if it's plain text
    return value;
  };

  return { translateIfKey };
}
```

**Key Features:**

- Detects translation keys by checking for dots (e.g., `"Timetable.events..."`)
- Falls back to plain text if not a key
- Used throughout the adapter layer to translate event data

### Translation Keys Structure

```
Timetable
├── events
│   ├── mainStage
│   │   ├── saturday
│   │   │   ├── rodoElProfe
│   │   │   └── ecKubaSet
│   │   └── sunday
│   ├── artists
│   │   ├── rodoLeFou
│   │   └── ecKuba
│   └── bios
│       ├── rodoLeFou
│       └── ecKuba
```

## File Structure

```
src/
├── app/
│   └── [locale]/(content)/timetable/
│       └── page.tsx                    # Route entry point (Server Component)
│
├── components/timetable/
│   ├── TimetablePage.tsx               # Server Component wrapper
│   ├── TimetableClient.tsx             # Main client component
│   ├── TimetableGrid.tsx               # Grid display
│   ├── NewEventModal.tsx               # Event details modal
│   ├── adapters/
│   │   └── eventAdapter.ts             # Converts TimetableEvent to modal format
│   ├── hooks/
│   │   ├── useEventModal.ts
│   │   ├── useEnhancedEventModal.ts
│   │   ├── useSlider.ts
│   │   ├── useTimetableData.ts
│   │   └── useURLParams.ts
│   └── utils/
│       ├── eventProcessing.ts          # Handles event continuation
│       ├── styleHelpers.ts
│       └── translationHelpers.ts
│
├── data/timetable/
│   ├── events/                         # NEW event-based data
│   │   ├── main-stage/
│   │   │   ├── main-stage-saturday.ts
│   │   │   └── main-stage-sunday.ts
│   │   ├── dance-workshops/
│   │   │   ├── dance-workshops-saturday.ts
│   │   │   └── dance-workshops-sunday.ts
│   │   ├── music-workshops/
│   │   │   ├── music-workshops-saturday.ts
│   │   │   └── music-workshops-sunday.ts
│   │   └── salsa-talks/
│   │       ├── salsa-talks-saturday.ts
│   │       └── salsa-talks-sunday.ts
│   ├── services/
│   │   └── timetable.service.ts        # Bridge layer & data aggregation
│   ├── types/
│   │   ├── area.types.ts
│   │   ├── event.types.ts
│   │   ├── timetable.types.ts
│   │   └── translatable.types.ts
│   ├── utils/
│   │   ├── smartTranslation.ts         # Translation helper
│   │   └── timetableTranslation.ts
│   └── index.ts
│
├── types/
│   ├── events.ts                       # NEW event type system
│   └── timetable.ts                    # OLD timetable types
│
└── utils/
    ├── eventFactory.ts                 # ⭐ Event creation + generateEventId
    └── timelineConfig.ts               # Timeline slot configuration
```

## Migration Status

### Current State: Dual Format System

**OLD Format (Column[]):**

- Used by TimetableGrid for display
- TranslatableTimeSlot[] structure
- Being phased out

**NEW Format (TimelineSlot[]):**

- Used by modal system
- TimetableEvent structure with full type safety
- Primary format going forward

### Bridge Layer

The `TimetableService` currently maintains both formats:

```typescript
// OLD: Returns Column[] for grid
getTimetableDataServer(day): Promise<Column[]>

// NEW: Returns TimelineSlot[] for modal
getTimetableEventsServer(day): Record<AreaType, TimelineSlot[]>

// BRIDGE: Converts new events to old format
convertNewEventsToTranslatableTimeSlots(events: TimetableEvent[]): TranslatableTimeSlot[]
```

### Migration Areas Completed

✅ Main Stage (Saturday & Sunday)
✅ Dance Workshops (Saturday & Sunday)
✅ Music Workshops (Saturday & Sunday)
✅ Salsa Talks (Saturday & Sunday)

**Status: All areas migrated to new event-based structure!**

## Key Components Explained

### 1. EventFactory (`/utils/eventFactory.ts`)

**Purpose:** Type-safe event creation with validation

**Methods:**

- `createMainStageEvent()` - DJ sets, live bands
- `createDanceWorkshop()` - Dance instruction
- `createMusicWorkshop()` - Music instruction
- `createTalk()` - Regular talks
- `createAviatrixTalk()` - Special record discussion format
- `createDanceShow()` - Performance showcases
- `createAct()` - Individual performer/instructor
- `createSlide()` - Media content

**generateEventId Function:**

```typescript
function generateEventId(area: AreaType, day: string, title: string): string {
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  return `${area}-${day}-${sanitizedTitle}`;
}
```

- Called by every EventFactory method
- Creates unique, consistent IDs
- Format: `{area}-{day}-{sanitized-title}`
- Example: `"main-stage-saturday-rodo-el-profe"`

### 2. TimelineConfig (`/utils/timelineConfig.ts`)

**Purpose:** Map events to time slots

**Structure:**

```typescript
interface TimelineSlot {
  time: string; // "13:00"
  duration: number; // 60 (minutes)
  eventId: string; // Title/key to find event
}
```

**Process:**

1. Define simple timeline configurations (time + eventId)
2. `createTimelineFromSimpleConfig()` matches eventIds to actual events
3. Fills in startTime/endTime based on timeline
4. Returns complete TimetableEvent[] with timing info

### 3. TimetableService (`/data/timetable/services/timetable.service.ts`)

**Purpose:** Central data aggregation and format conversion

**Key Methods:**

**NEW Format (Recommended):**

```typescript
getTimetableEventsServer(day): Record<AreaType, TimelineSlot[]>
  └─ Returns: { "main-stage": [...], "dance-workshops": [...], ... }
```

**OLD Format (Legacy):**

```typescript
getTimetableDataServer(day): Promise<Column[]>
  └─ Returns: Column[] for TimetableGrid
```

**Bridge Methods:**

```typescript
convertNewEventsToTranslatableTimeSlots(): TranslatableTimeSlot[]
  └─ Converts TimetableEvent[] → TranslatableTimeSlot[]
```

### 4. Event Adapter (`/components/timetable/adapters/eventAdapter.ts`)

**Purpose:** Convert TimetableEvent to modal display format

**Process:**

1. Receives TimetableEvent from new format
2. Uses type guards to determine event type
3. Extracts relevant information based on type
4. Translates all text using `smartTranslation`
5. Returns `SelectedEventDetails` for modal

## Benefits of Current Architecture

### 1. Type Safety

- Full TypeScript coverage
- Discriminated unions for event types
- Type guards for safe narrowing
- Compile-time validation

### 2. Maintainability

- Single source of truth for event data
- Consistent event creation via EventFactory
- Clear separation of concerns
- Easy to add new event types

### 3. Internationalization

- All text stored as translation keys
- Smart translation system handles keys vs. plain text
- Server-side translation support
- Consistent across all event types

### 4. Flexibility

- Modal UI adapts automatically to event type
- Easy to add new properties to events
- Acts system works for all event types
- Reusable components

### 5. Performance

- Server-side data fetching
- Pre-translated data
- Efficient event lookup by time/area
- Minimal client-side processing

## Common Patterns

### Creating a New Event

```typescript
// 1. Define the event using EventFactory
const newEvent = EventFactory.createMainStageEvent({
  title: "Timetable.events.mainStage.saturday.newEvent",
  startTime: "15:00",
  area: "main-stage",
  performanceType: "dj-set",
  day: "saturday",
  acts: [
    EventFactory.createAct({
      name: "Timetable.events.artists.djName",
      role: "dj",
      bio: "Timetable.events.bios.djName",
      image: "/dj-image.webp",
    }),
  ],
});

// 2. Add to event collection in respective file
// /data/timetable/events/main-stage/main-stage-saturday.ts

// 3. Add to timeline configuration
// /utils/timelineConfig.ts
export const mainStageSaturdayTimeline: TimelineSlot[] = [
  // ... existing slots
  {
    time: "15:00",
    duration: 60,
    eventId: "Timetable.events.mainStage.saturday.newEvent",
  },
];

// 4. Add translations to message files
// /messages/de.json and /messages/es.json
```

### Finding an Event

```typescript
// In TimetableClient
const findEvent = (
  area: AreaType,
  time: string,
): TimetableEvent | undefined => {
  const eventsMap = currentDay === "saturday" ? saturdayEvents : sundayEvents;
  const areaSlots = eventsMap[area];
  const slot = areaSlots.find((s) => s.time === time);
  return slot?.events[0];
};
```

### Handling Event Click

```typescript
const handleEventClick = (area: AreaType, time: string) => {
  const event = findEvent(area, time);
  if (event) {
    setSelectedEvent(event);
    resetSlider();
  }
};
```

## Future Improvements

### Complete Bridge Layer Removal

**Goal:** Remove dual format support entirely

**Current State:**
- ✅ EventModal accepts TimetableEvent directly
- ✅ Adapter removed (converted to pure function inside EventModal)
- ⏳ Grid still uses old Column[] format
- ⏳ Service layer still maintains both formats

**Steps to Complete:**

1. **Update TimetableGrid** to use TimelineSlot[] format directly
   - Remove dependency on Column[] format
   - Render from TimelineSlot[] → direct UI

2. **Remove getTimetableDataServer()** method
   - Only keep getTimetableEventsServer()
   - Single data format throughout

3. **Remove convertNewEventsToTranslatableTimeSlots()** method
   - No longer needed

4. **Remove old types**
   - Column[]
   - TranslatableTimeSlot[]
   - Keep only TimelineSlot[] and TimetableEvent

5. **Simplify TimetableClient props**
   - Remove saturdayData/sundayData
   - Only pass saturdayEvents/sundayEvents

### Implement Scalability Refactor

**Goal:** Support any number of festival days dynamically

See `TIMETABLE_SCALABILITY_ANALYSIS.md` for complete plan (7 phases, 21-29 hours).

**Key changes:**
- Replace `"saturday" | "sunday"` with dynamic day system
- Generate days from FESTIVAL_CONFIG dates
- Dynamic button generation
- Generic service methods
- Unified timeline configuration

### Simplify Data Flow

**Current:**
```
Events → Timeline → Service (Bridge) → Component (Both formats) → Modal (Conversion)
```

**After Bridge Removal:**
```
Events → Timeline → Service → Component (TimelineSlot only) → Modal (Direct)
```

**After Scalability Refactor:**
```
FESTIVAL_CONFIG (days) → Events → Timeline → Service → Component → Modal
```

---

## Conclusion

The `generateEventId` function is **essential and actively used** throughout the system. It's not legacy at all - it's a core part of the EventFactory that ensures every event has a unique, consistent identifier.

The timetable system is well-architected with:

- ✅ Strong type safety (TypeScript discriminated unions)
- ✅ Clear separation of concerns (layers)
- ✅ Flexible event system (6 event types)
- ✅ Full internationalization support (next-intl)
- ✅ Simplified modal architecture (direct TimetableEvent rendering)
- ⏳ Bridge layer partially removed (modal done, grid remaining)

**Recent Improvements:**
- ✅ Adapter removed - EventModal now accepts TimetableEvent directly
- ✅ Cleaner architecture - TimetableClient → EventModal (direct path)
- ✅ Pure function conversion - easier to test and maintain

**Next Steps:**
1. Complete bridge layer removal (update TimetableGrid)
2. Implement scalability refactor (multi-day support)
3. Optimize event lookup (indexing, caching)

---

## Quick Reference

### Key Files

**Event Creation & Types:**
- `eventFactory.ts` - Event creation & ID generation ⭐
- `events.ts` - Type definitions (TimetableEvent union)
- `/data/timetable/events/` - Event data files (6 event types)

**Timeline & Configuration:**
- `timelineConfig.ts` - Timeline slot definitions (8 arrays: 4 areas × 2 days)
- `festival.ts` - Festival configuration (dates, countdown)

**Service Layer:**
- `timetable.service.ts` - Data aggregation & bridge layer

**Components:**
- `TimetablePage.tsx` - Server component (data fetching)
- `TimetableClient.tsx` - Client component (interactivity)
- `TimetableGrid.tsx` - Grid layout (still uses old Column[] format)
- `EventModal/EventModal.tsx` - Modal (accepts TimetableEvent directly) ✅
- `EventModal/eventConversion.ts` - Pure conversion function ✅
- `EventModal/EventDetails.tsx` - Event details display
- `EventModal/EventSlider.tsx` - Image slider
- `EventModal/EventNavigation.tsx` - Slide navigation

### Key Functions

**Event Management:**
- `generateEventId()` - Creates unique event IDs (`{area}-{day}-{sanitized-title}`)
- `createTimelineFromSimpleConfig()` - Maps timeline to events
- `EventFactory.create*Event()` - Type-safe event creation

**Data Fetching:**
- `getTimetableEventsServer()` - Fetches TimelineSlot[] format (NEW)
- `getTimetableDataServer()` - Fetches Column[] format (OLD, for grid)

**Modal & Display:**
- `convertTimetableEventToSelectedDetails()` - Pure function for format conversion ✅
- `translateIfKey()` - Smart translation system
- `useSmartTranslation()` - Translation hook

### Key Types

**Events:**
- `TimetableEvent` - Union of all 6 event types
- `MainStageEvent` - DJ sets, live bands
- `DanceWorkshopEvent` - Dance instruction
- `MusicWorkshopEvent` - Music instruction
- `TalkEvent` - Regular presentations
- `AviatrixTalkEvent` - Record collection talks
- `DanceShowEvent` - Performance shows

**Data Structures:**
- `TimelineSlot` - Time slot with events array (NEW format)
- `Column` - Grid column format (OLD format, still used by TimetableGrid)
- `Act` - Performer/instructor/presenter/guest
- `AreaType` - Timetable area enum (`"main-stage" | "dance-workshops" | ...`)

**Modal:**
- `SelectedEventDetails` - Display format for modal (40+ optional fields)

---

## Related Documentation

- **TIMETABLE_SCALABILITY_ANALYSIS.md** - Plan for multi-day support (7 phases)
- **ADAPTER_REMOVAL_COMPLETE.md** - Documentation of adapter removal
- **UNIFIED_EVENTS_REFACTOR_COMPLETE.md** - Event system unification
- **TYPE_SYSTEM_REFACTOR_COMPLETE.md** - Type system improvements

---

## Document Information

**Created:** October 2025  
**Last Updated:** October 17, 2025  
**Status:** Current architecture (post-adapter removal)  
**Next Updates:** After bridge layer completion & scalability refactor

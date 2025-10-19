# Timetable Scalability - Improved Implementation Plan

## 📋 Document Purpose

This document provides an **improved and refined** implementation plan for refactoring the timetable system from a hardcoded 2-day system to a truly scalable, config-driven multi-day system.

**Improvements over original plan:**

- ✅ Eliminates ALL hardcoded day references (including in data structures)
- ✅ Array-based timeline configuration (not object-based with weekday keys)
- ✅ Addresses translation key scalability
- ✅ More flexible image path handling
- ✅ Better type safety with computed types
- ✅ Cleaner service layer without hardcoded maps

**Status:** Ready to implement  
**Date:** October 18, 2025  
**Estimated Time:** 23-32 hours (vs. 21-29 in original plan)

---

## Executive Summary

### The Core Goal

Transform the timetable system from:

```typescript
// CURRENT: Hardcoded for exactly 2 days
type Day = "saturday" | "sunday";
const data = currentDay === "saturday" ? saturdayData : sundayData;
```

To:

```typescript
// FUTURE: Config-driven for any number of days
const days = FESTIVAL_CONFIG.days; // Auto-generated from dates
const data = daysData.find((d) => d.day.id === currentDayId);
```

### Key Improvements in This Plan

1. **Timeline Config Uses Arrays**: No hardcoded object keys like `{ saturday: [...], sunday: [...] }`
2. **Translation Scalability**: Adds phase for dynamic translation keys
3. **Type Safety**: Uses computed types where possible
4. **Flexible Images**: Not tied to English weekday names
5. **Cleaner Service Layer**: No hardcoded eventMap object

---

## Architecture Overview

### Current vs. Improved Architecture

| Aspect                 | Current                  | Original Plan                        | **Improved Plan**                                   |
| ---------------------- | ------------------------ | ------------------------------------ | --------------------------------------------------- |
| **Day Type**           | `"saturday" \| "sunday"` | `string`                             | `string` with computed types                        |
| **Timeline Structure** | 8 separate arrays        | `{ saturday: [...], sunday: [...] }` | **`[{ dayWeekday: "saturday", timeline: [...] }]`** |
| **Service Lookup**     | Day-specific methods     | Hardcoded eventMap                   | **Dynamic lookup function**                         |
| **Translations**       | Hardcoded keys           | Not addressed                        | **Dynamic key generation**                          |
| **Images**             | `/saturday.svg`          | `/timetable-days/saturday.svg`       | **`/timetable-days/day1.svg` or custom**            |
| **Adding 3rd Day**     | Modify 10+ files         | Change dates + add timeline key      | **Change dates only**                               |

---

## Detailed Implementation Plan

## Phase 1: Festival Configuration Enhancement (2-3 hours)

### 1.1: Expand FESTIVAL_CONFIG with Dynamic Day Generation

**File:** `src/config/festival.ts`

**Current Code:**

```typescript
export const FESTIVAL_CONFIG = {
  dates: {
    start: new Date("July 19, 2025 12:30:00"),
    end: new Date("July 20, 2025 23:59:59"),
  },
};
```

**New Code:**

```typescript
/**
 * Represents a single day of the festival with all metadata
 */
export interface FestivalDay {
  id: string; // e.g., "day1", "day2", "day3"
  date: Date; // Actual calendar date
  weekday: string; // e.g., "saturday", "sunday", "monday" (lowercase)
  weekdayFull: string; // e.g., "Saturday", "Sunday" (capitalized)
  label: string; // Translation key for display (e.g., "Sections.SectionFive.days.saturday")
  imageSrc: string; // Path to button image
  dateShort: string; // e.g., "Jul 19" for display
  dateISO: string; // ISO date string for technical use
}

export const FESTIVAL_CONFIG = {
  dates: {
    start: new Date("July 19, 2025 12:30:00"),
    end: new Date("July 20, 2025 23:59:59"),
  },

  /**
   * Dynamically generate festival days from start/end dates
   * This is a getter so it's computed on access
   */
  get days(): FestivalDay[] {
    return generateFestivalDays(this.dates.start, this.dates.end);
  },

  /**
   * Get a specific day by its ID
   */
  getDayById(dayId: string): FestivalDay | undefined {
    return this.days.find((day) => day.id === dayId);
  },

  /**
   * Get a specific day by its weekday name
   */
  getDayByWeekday(weekday: string): FestivalDay | undefined {
    return this.days.find((day) => day.weekday === weekday.toLowerCase());
  },
};

/**
 * Generate festival days from date range
 * Each day gets complete metadata for UI rendering and data lookup
 */
function generateFestivalDays(start: Date, end: Date): FestivalDay[] {
  const days: FestivalDay[] = [];
  const current = new Date(start);
  current.setHours(0, 0, 0, 0); // Start at midnight for accurate day counting

  const endDate = new Date(end);
  endDate.setHours(0, 0, 0, 0);

  let dayCounter = 1;

  while (current <= endDate) {
    const weekdayName = current
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const weekdayFull = current.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const dateShort = current.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    days.push({
      id: `day${dayCounter}`,
      date: new Date(current),
      weekday: weekdayName,
      weekdayFull: weekdayFull,
      label: `Sections.SectionFive.days.${weekdayName}`,
      imageSrc: `/timetable-days/day${dayCounter}.svg`,
      dateShort: dateShort,
      dateISO: current.toISOString().split("T")[0],
    });

    current.setDate(current.getDate() + 1);
    dayCounter++;
  }

  return days;
}

/**
 * Computed type for valid day IDs (e.g., "day1", "day2")
 * This provides type safety while remaining dynamic
 */
export type FestivalDayId = `day${number}`;

/**
 * Helper to get all valid weekdays as a union type
 * Usage: "saturday" | "sunday" | "monday" etc.
 */
export type FestivalWeekday = (typeof FESTIVAL_CONFIG.days)[number]["weekday"];
```

**Benefits:**

- ✅ Automatically calculates days from date range
- ✅ Works with any number of days (1 to N)
- ✅ Each day has complete metadata
- ✅ Helper methods for lookups
- ✅ Type-safe with computed types
- ✅ Image paths use day numbers (language-independent)

**Testing Checklist:**

- [ ] Test with 2 days (current: July 19-20)
- [ ] Test with 1 day (same start/end date)
- [ ] Test with 3+ days
- [ ] Test across month boundary (e.g., July 30 - Aug 2)
- [ ] Verify all metadata fields are correct
- [ ] Check helper methods return correct days

---

## Phase 2: Timeline Configuration Refactor (4-5 hours)

### 2.1: Restructure to Array-Based Configuration

**File:** `src/utils/timelineConfig.ts`

**Current Structure (8 separate exports):**

```typescript
export const mainStageSaturdayTimeline: TimelineSlot[] = [...];
export const mainStageSundayTimeline: TimelineSlot[] = [...];
export const danceWorkshopsSaturdayTimeline: TimelineSlot[] = [...];
export const danceWorkshopsSundayTimeline: TimelineSlot[] = [...];
// ... 4 more
```

**New Structure:**

```typescript
import { AreaType } from "../data/timetable/types/area.types";
import { TimetableEvent, RawTimetableEvent } from "../types/events";

/**
 * Timeline slot configuration - time + event reference
 */
export interface TimelineSlot {
  time: string; // Start time (e.g., "15:00")
  duration: number; // Duration in minutes
  eventId: string; // Reference to event by title
}

/**
 * Schedule for a specific area on a specific day
 */
export interface DaySchedule {
  dayWeekday: string; // e.g., "saturday", "sunday"
  timeline: TimelineSlot[]; // Events for this day
}

/**
 * Timeline configuration for a single area
 */
export interface AreaTimelineConfig {
  area: AreaType;
  schedules: DaySchedule[];
}

/**
 * MAIN TIMELINE CONFIGURATION
 * Single source of truth for all timetable schedules
 */
export const TIMELINE_CONFIG: AreaTimelineConfig[] = [
  // Main Stage
  {
    area: "main-stage",
    schedules: [
      {
        dayWeekday: "saturday",
        timeline: [
          {
            time: "13:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.saturday.rodoElProfe",
          },
          {
            time: "14:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.saturday.ecKubaSet",
          },
          {
            time: "15:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.saturday.alfiaConIre",
          },
          {
            time: "16:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.saturday.andrelux",
          },
          {
            time: "17:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.saturday.djFeikes",
          },
          {
            time: "18:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.saturday.burundanga",
          },
          {
            time: "19:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.saturday.tempoHavana",
          },
          {
            time: "20:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.saturday.djBongo",
          },
          {
            time: "21:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.saturday.cayeye",
          },
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          {
            time: "12:30",
            duration: 60,
            eventId: "Timetable.events.mainStage.sunday.floriWilber",
          },
          {
            time: "14:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.sunday.laSonoraBerlin",
          },
          {
            time: "15:00",
            duration: 60,
            eventId: "Timetable.events.mainStage.sunday.elPuma",
          },
          {
            time: "16:30",
            duration: 60,
            eventId: "Timetable.events.mainStage.sunday.burundanga",
          },
          // ... rest of Sunday events
        ],
      },
    ],
  },

  // Dance Workshops
  {
    area: "dance-workshops",
    schedules: [
      {
        dayWeekday: "saturday",
        timeline: [
          // ... Saturday dance workshop events
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          // ... Sunday dance workshop events
        ],
      },
    ],
  },

  // Music Workshops
  {
    area: "music-workshops",
    schedules: [
      {
        dayWeekday: "saturday",
        timeline: [
          /* ... */
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          /* ... */
        ],
      },
    ],
  },

  // Salsa Talks
  {
    area: "salsa-talks",
    schedules: [
      {
        dayWeekday: "saturday",
        timeline: [
          /* ... */
        ],
      },
      {
        dayWeekday: "sunday",
        timeline: [
          /* ... */
        ],
      },
    ],
  },
];

/**
 * Get timeline configuration for a specific area and day
 */
export function getTimelineForAreaAndDay(
  area: AreaType,
  dayWeekday: string,
): TimelineSlot[] {
  const areaConfig = TIMELINE_CONFIG.find((config) => config.area === area);
  if (!areaConfig) {
    console.warn(`No timeline configuration found for area: ${area}`);
    return [];
  }

  const daySchedule = areaConfig.schedules.find(
    (schedule) => schedule.dayWeekday === dayWeekday.toLowerCase(),
  );

  if (!daySchedule) {
    console.warn(`No schedule found for ${area} on ${dayWeekday}`);
    return [];
  }

  return daySchedule.timeline;
}

/**
 * Get all schedules for a specific area (all days)
 */
export function getSchedulesForArea(area: AreaType): DaySchedule[] {
  const areaConfig = TIMELINE_CONFIG.find((config) => config.area === area);
  return areaConfig?.schedules || [];
}

/**
 * Get all areas that have events on a specific day
 */
export function getAreasForDay(dayWeekday: string): AreaType[] {
  return TIMELINE_CONFIG.filter((config) =>
    config.schedules.some(
      (schedule) => schedule.dayWeekday === dayWeekday.toLowerCase(),
    ),
  ).map((config) => config.area);
}

// ... (keep existing helper functions like createTimelineFromSimpleConfig, calculateEndTime, etc.)
```

**Migration Strategy:**

```typescript
/**
 * TEMPORARY BACKWARD COMPATIBILITY EXPORTS
 * These will be removed after full migration
 * @deprecated Use TIMELINE_CONFIG with helper functions instead
 */
export const mainStageSaturdayTimeline = getTimelineForAreaAndDay(
  "main-stage",
  "saturday",
);
export const mainStageSundayTimeline = getTimelineForAreaAndDay(
  "main-stage",
  "sunday",
);
export const danceWorkshopsSaturdayTimeline = getTimelineForAreaAndDay(
  "dance-workshops",
  "saturday",
);
export const danceWorkshopsSundayTimeline = getTimelineForAreaAndDay(
  "dance-workshops",
  "sunday",
);
export const musicWorkshopsSaturdayTimeline = getTimelineForAreaAndDay(
  "music-workshops",
  "saturday",
);
export const musicWorkshopsSundayTimeline = getTimelineForAreaAndDay(
  "music-workshops",
  "sunday",
);
export const salsaTalksSaturdayTimeline = getTimelineForAreaAndDay(
  "salsa-talks",
  "saturday",
);
export const salsaTalksSundayTimeline = getTimelineForAreaAndDay(
  "salsa-talks",
  "sunday",
);
```

**Benefits:**

- ✅ Single source of truth
- ✅ Adding a day = adding one object to schedules array
- ✅ No variable naming issues
- ✅ Easy to query and filter
- ✅ Backward compatible during transition
- ✅ Clear structure for any number of days

**Testing Checklist:**

- [ ] Verify all helper functions work correctly
- [ ] Test backward compatibility exports
- [ ] Verify no events are lost in migration
- [ ] Test with invalid area/day combinations
- [ ] Check performance with multiple areas/days

---

## Phase 2.5: Translation Keys Enhancement (1-2 hours) ⭐ NEW

### 2.5.1: Update Translation Files for Dynamic Days

**Files:** `messages/de.json`, `messages/es.json`

**Current Structure:**

```json
{
  "Sections": {
    "SectionFive": {
      "saturday": "Samstag",
      "sunday": "Sonntag"
    }
  }
}
```

**New Structure:**

```json
{
  "Sections": {
    "SectionFive": {
      "days": {
        "saturday": "Samstag",
        "sunday": "Sonntag",
        "monday": "Montag",
        "tuesday": "Dienstag",
        "wednesday": "Mittwoch",
        "thursday": "Donnerstag",
        "friday": "Freitag"
      }
    }
  }
}
```

**Spanish (messages/es.json):**

```json
{
  "Sections": {
    "SectionFive": {
      "days": {
        "saturday": "Sábado",
        "sunday": "Domingo",
        "monday": "Lunes",
        "tuesday": "Martes",
        "wednesday": "Miércoles",
        "thursday": "Jueves",
        "friday": "Viernes"
      }
    }
  }
}
```

### 2.5.2: Add Fallback Logic

**File:** `src/components/timetable/TimetablePage.tsx`

```typescript
/**
 * Get translation for a day with fallback
 */
function getDayTranslation(
  t: any,
  dayLabel: string,
  weekdayFull: string,
): string {
  try {
    return t(dayLabel as never);
  } catch (error) {
    console.warn(
      `Translation not found for ${dayLabel}, using fallback: ${weekdayFull}`,
    );
    return weekdayFull; // Fallback to English weekday name
  }
}
```

**Benefits:**

- ✅ Supports all 7 weekdays
- ✅ Easy to add more languages
- ✅ Organized under `days` namespace
- ✅ Fallback prevents crashes
- ✅ Future-proof structure

**Testing Checklist:**

- [ ] Test German translations
- [ ] Test Spanish translations
- [ ] Test fallback for missing keys
- [ ] Verify all weekdays render correctly

---

## Phase 3: Service Layer Refactor (4-5 hours)

### 3.1: Remove Hardcoded Event Map

**File:** `src/data/timetable/services/timetable.service.ts`

**Remove the hardcoded eventMap** (lines ~544-579):

```typescript
// ❌ DELETE THIS
const eventMap = {
  saturday: {
    "main-stage": {
      timeline: mainStageSaturdayTimeline,
      events: mainStageEvents,
    },
    // ...
  },
  sunday: {
    // ...
  },
};
```

**Replace with dynamic lookup:**

```typescript
/**
 * Event collection mapping
 * Maps area types to their unified event collections
 */
const EVENT_COLLECTIONS: Record<AreaType, RawTimetableEvent[]> = {
  "main-stage": mainStageEvents,
  "dance-workshops": danceWorkshopEvents,
  "music-workshops": musicWorkshopEvents,
  "salsa-talks": salsaTalksEvents,
};

/**
 * Get event collection for an area
 */
private static getEventCollectionForArea(area: AreaType): RawTimetableEvent[] {
  return EVENT_COLLECTIONS[area] || [];
}
```

### 3.2: Update getEventsForArea Method

**Current:**

```typescript
private static getEventsForArea(
  area: AreaType,
  day: "saturday" | "sunday"
): TimelineSlot[] {
  const eventMap = { /* hardcoded */ };
  const { timeline, events } = eventMap[day][area];
  // ...
}
```

**New:**

```typescript
/**
 * Get events for a specific area and day
 * Returns TimelineSlot[] format with enriched events
 */
private static getEventsForArea(
  area: AreaType,
  dayWeekday: string
): TimelineSlot[] {
  // Get timeline configuration dynamically
  const timeline = getTimelineForAreaAndDay(area, dayWeekday);

  // Get event collection for this area
  const events = this.getEventCollectionForArea(area);

  // Enrich events with scheduling information
  const timelineEvents = createTimelineFromSimpleConfig(
    timeline,
    events,
    dayWeekday
  );

  // Convert to TimelineSlot[] format (time -> events mapping)
  return this.convertToTimelineSlots(timelineEvents);
}

/**
 * Convert enriched events to TimelineSlot[] format
 * Creates 30-minute time slots from 12:30 to 22:00
 */
private static convertToTimelineSlots(
  events: TimetableEvent[]
): TimelineSlot[] {
  const slotsMap = new Map<string, TimetableEvent[]>();

  // Generate 30-minute slots
  const startHour = 12;
  const startMinute = 30;
  const endHour = 22;
  const endMinute = 0;

  for (let hour = startHour; hour <= endHour; hour++) {
    const startMin = (hour === startHour) ? startMinute : 0;
    const endMin = (hour === endHour) ? endMinute : 30;

    for (let minute = startMin; minute <= endMin; minute += 30) {
      if (hour === endHour && minute > endMinute) break;
      const timeStr = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      slotsMap.set(timeStr, []);
    }
  }

  // Assign events to their time slots
  for (const event of events) {
    if (event.startTime && slotsMap.has(event.startTime)) {
      slotsMap.get(event.startTime)!.push(event);
    }
  }

  // Convert to array
  return Array.from(slotsMap.entries()).map(([time, events]) => ({
    time,
    events,
  }));
}
```

### 3.3: Unify Data Methods

**Remove:**

```typescript
// ❌ DELETE
private static getSaturdayTranslatableData()
private static getSundayTranslatableData()
```

**Add:**

```typescript
/**
 * Get translatable data for any day
 * Generic method that works with any weekday
 */
private static getTranslatableDataForDay(
  dayWeekday: string
): Record<AreaType, TranslatableTimeSlot[]> {
  const result: Record<AreaType, TranslatableTimeSlot[]> = {} as Record<
    AreaType,
    TranslatableTimeSlot[]
  >;

  // Loop through all areas
  const areas = Object.keys(AREA_DEFINITIONS) as AreaType[];

  for (const area of areas) {
    const timeline = getTimelineForAreaAndDay(area, dayWeekday);
    const events = this.getEventCollectionForArea(area);
    const enrichedEvents = createTimelineFromSimpleConfig(
      timeline,
      events,
      dayWeekday
    );

    result[area] = this.convertNewEventsToTranslatableTimeSlots(enrichedEvents);
  }

  return result;
}
```

### 3.4: Update Public Methods

**Update:**

```typescript
/**
 * Get timetable data for server-side rendering
 * Returns OLD format (Column[]) - will be deprecated
 */
static async getTimetableDataServer(dayWeekday: string): Promise<Column[]> {
  const areaData = await this.getDataTranslatedForDay(dayWeekday);
  return this.transformToColumns(areaData);
}

/**
 * Get data with translations applied for a specific day
 */
private static async getDataTranslatedForDay(
  dayWeekday: string
): Promise<Record<AreaType, TimeSlot[]>> {
  const rawData = this.getTranslatableDataForDay(dayWeekday);
  return await translateTimeSlotsServer(rawData);
}

/**
 * Get timetable events for client components
 * Returns NEW format (TimelineSlot[]) with full event data
 */
static getTimetableEventsServer(
  dayWeekday: string
): Record<AreaType, TimelineSlot[]> {
  const areas = Object.keys(AREA_DEFINITIONS) as AreaType[];

  return areas.reduce((acc, area) => {
    acc[area] = this.getEventsForArea(area, dayWeekday);
    return acc;
  }, {} as Record<AreaType, TimelineSlot[]>);
}
```

**Benefits:**

- ✅ No hardcoded day-specific methods
- ✅ Works with any weekday string
- ✅ Clean, maintainable code
- ✅ Easy to test
- ✅ Automatic support for new days

**Testing Checklist:**

- [ ] Test data fetching for Saturday
- [ ] Test data fetching for Sunday
- [ ] Test with invalid weekday (should handle gracefully)
- [ ] Compare output with old methods (should be identical)
- [ ] Verify all events appear correctly
- [ ] Check timeline integrity

---

## Phase 4: Component Layer Refactor (5-6 hours)

### 4.1: Update TimetablePage (Server Component)

**File:** `src/components/timetable/TimetablePage.tsx`

**Current:**

```typescript
interface TimetablePageProps {
  initialDay?: "saturday" | "sunday";
}

export default async function TimetablePage({ initialDay = "saturday" }) {
  const saturdayData =
    await TimetableService.getTimetableDataServer("saturday");
  const sundayData = await TimetableService.getTimetableDataServer("sunday");
  // ...
}
```

**New:**

```typescript
import { FESTIVAL_CONFIG, FestivalDay } from "@/config/festival";

interface TimetablePageProps {
  initialDayId?: string; // e.g., "day1", "day2"
}

/**
 * Server component for timetable
 * Fetches data for ALL festival days dynamically
 */
export default async function TimetablePage({
  initialDayId
}: TimetablePageProps) {
  const t = await getTranslations();
  const festivalDays = FESTIVAL_CONFIG.days;

  // Use first day as default if no initialDayId provided
  const defaultDayId = initialDayId || festivalDays[0]?.id || "day1";

  // Fetch data for ALL days in parallel
  const daysData = await Promise.all(
    festivalDays.map(async (day) => ({
      day,
      data: await TimetableService.getTimetableDataServer(day.weekday),
      events: TimetableService.getTimetableEventsServer(day.weekday),
    }))
  );

  // Prepare translations for all days with fallback
  const dayTranslations = festivalDays.reduce((acc, day) => {
    acc[day.id] = getDayTranslation(t, day.label, day.weekdayFull);
    return acc;
  }, {} as Record<string, string>);

  return (
    <TimetableClient
      festivalDays={festivalDays}
      daysData={daysData}
      dayTranslations={dayTranslations}
      initialDayId={defaultDayId}
    />
  );
}

/**
 * Get translation for a day with fallback
 */
function getDayTranslation(t: any, dayLabel: string, weekdayFull: string): string {
  try {
    return t(dayLabel as never);
  } catch (error) {
    console.warn(`Translation not found for ${dayLabel}, using fallback: ${weekdayFull}`);
    return weekdayFull;
  }
}
```

### 4.2: Update TimetableClient (Client Component)

**File:** `src/components/timetable/TimetableClient.tsx`

**New Props Interface:**

```typescript
import { FestivalDay } from "@/config/festival";

interface DayData {
  day: FestivalDay;
  data: Column[];
  events: Record<AreaType, TimelineSlot[]>;
}

interface TimetableClientProps {
  festivalDays: FestivalDay[]; // All festival days
  daysData: DayData[]; // Data for each day
  dayTranslations: Record<string, string>; // Translated day names
  initialDayId: string; // Initial day to display
}
```

**New State and Logic:**

```typescript
export default function TimetableClient({
  festivalDays,
  daysData,
  dayTranslations,
  initialDayId,
}: TimetableClientProps) {
  // URL parameter management
  const { parseDayParam, updateDayInUrl } = useURLParams();

  // State uses generic day ID (not "saturday" | "sunday")
  const [currentDayId, setCurrentDayId] = useState<string>(
    parseDayParam() || initialDayId
  );

  const { translateColumnArea, getOriginalAreaKey } = useColumnTranslation();
  const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null);
  const { resetSlider } = useSlider();

  // Get current day data
  const currentDayData = daysData.find((d) => d.day.id === currentDayId);
  const currentData = currentDayData ? processData(currentDayData.data) : [];
  const currentEvents = currentDayData?.events || {};

  // Handle day change
  const handleDayChange = (newDayId: string) => {
    setCurrentDayId(newDayId);
    updateDayInUrl(newDayId);
    setSelectedEvent(null);
  };

  // Find event by area and time
  const findEvent = (area: AreaType, time: string): TimetableEvent | undefined => {
    const areaSlots = currentEvents[area];
    if (!areaSlots) return undefined;

    const slot = areaSlots.find((s) => s.time === time);
    if (!slot || slot.events.length === 0) return undefined;

    return slot.events[0];
  };

  // Handle event click
  const handleEventClick = (area: AreaType, time: string) => {
    const event = findEvent(area, time);
    if (event) {
      setSelectedEvent(event);
      resetSlider();
    } else {
      console.warn(`Event not found for area: ${area}, time: ${time}`);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    resetSlider();
  };

  // ... (rest of component logic)
```

### 4.3: Dynamic Day Button Rendering

**Replace hardcoded buttons with:**

```typescript
return (
  <div className="min-h-screen w-full">
    {/* Hero Section with Background */}
    <section className="relative h-[50vh] w-full">
      {/* ... background image ... */}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <h1 className="mb-8 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          {t("Sections.SectionFive.title" as never)}
        </h1>

        {/* Dynamic Day Selection Buttons */}
        <div className="flex w-full flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 md:w-2/3">
          {festivalDays.map((day) => (
            <DayButton
              key={day.id}
              day={day}
              isActive={currentDayId === day.id}
              label={dayTranslations[day.id]}
              onClick={() => handleDayChange(day.id)}
            />
          ))}
        </div>
      </div>
    </section>

    {/* Timetable Grid */}
    <section className="w-full px-4 py-8 md:px-8">
      <TimetableGrid
        data={currentData}
        onEventClick={handleEventClick}
        translateAreaName={translateColumnArea}
      />
    </section>

    {/* Event Modal */}
    {selectedEvent && (
      <EventModal event={selectedEvent} onClose={closeModal} />
    )}
  </div>
);
```

### 4.4: Create DayButton Component

**Add to same file or separate:**

```typescript
interface DayButtonProps {
  day: FestivalDay;
  isActive: boolean;
  label: string;
  onClick: () => void;
}

function DayButton({ day, isActive, label, onClick }: DayButtonProps) {
  return (
    <button
      className={`relative w-full cursor-pointer transition-all duration-300 sm:w-40 md:w-48 lg:w-64 ${
        isActive ? "scale-105 opacity-100" : "opacity-70 hover:opacity-90"
      }`}
      onClick={onClick}
      aria-label={`${label} - ${day.dateShort}`}
      aria-pressed={isActive}
    >
      <Image
        src={day.imageSrc}
        alt={label}
        width={250}
        height={100}
        className="h-auto w-full"
        priority
      />

      {/* Optional: Show date below button */}
      <div className="mt-1 text-center text-sm text-white/80">
        {day.dateShort}
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeDay"
          className="bg-bes-red absolute -bottom-1 h-1 w-full rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  );
}
```

**Benefits:**

- ✅ Dynamic button generation
- ✅ Works with any number of days
- ✅ Reusable DayButton component
- ✅ Accessible (ARIA labels)
- ✅ Shows date information
- ✅ Smooth animations

**Testing Checklist:**

- [ ] Test with 2 days (current)
- [ ] Test with 1 day
- [ ] Test with 3+ days
- [ ] Test day switching
- [ ] Test responsive layout
- [ ] Test keyboard navigation
- [ ] Verify animations work
- [ ] Test URL parameter updates

---

## Phase 5: Type System Updates (1-2 hours)

### 5.1: Update Event Types

**File:** `src/types/events.ts`

**Change:**

```typescript
export interface SchedulingInfo {
  startTime: string;
  endTime: string;
  day: "saturday" | "sunday"; // ❌ Too restrictive
}
```

**To:**

```typescript
export interface SchedulingInfo {
  startTime: string;
  endTime: string;
  day: string; // ✅ Flexible - any weekday
}
```

**Optional: Add computed type for better type safety:**

```typescript
import type { FestivalWeekday } from "@/config/festival";

export interface SchedulingInfo {
  startTime: string;
  endTime: string;
  day: string; // Can be typed as FestivalWeekday if desired
}
```

### 5.2: Update Timetable Types

**File:** `src/types/timetable.ts`

No changes needed - already uses generic `string` types.

### 5.3: Add New Type Exports

**File:** `src/config/festival.ts`

```typescript
/**
 * Type exports for use throughout the application
 */
export type FestivalDayId = (typeof FESTIVAL_CONFIG.days)[number]["id"];
export type FestivalWeekday = (typeof FESTIVAL_CONFIG.days)[number]["weekday"];
```

**Benefits:**

- ✅ Type-safe throughout codebase
- ✅ Flexible for any number of days
- ✅ Computed types for better DX
- ✅ Easy to refactor

**Testing Checklist:**

- [ ] Run `npm run build` - no type errors
- [ ] Test TypeScript strict mode
- [ ] Verify all imports resolve
- [ ] Check IDE autocomplete works

---

## Phase 6: Asset Management (1-2 hours)

### 6.1: Reorganize Day Images

**Current Structure:**

```
/public/
  saturday.svg
  sunday.svg
```

**New Structure:**

```
/public/
  timetable-days/
    day1.svg      (Saturday)
    day2.svg      (Sunday)
    day3.svg      (if adding Monday, etc.)
```

**Migration Steps:**

1. Create `/public/timetable-days/` directory
2. Copy `saturday.svg` → `day1.svg`
3. Copy `sunday.svg` → `day2.svg`
4. Verify images load correctly
5. (Optional) Delete old files after verification

### 6.2: Alternative: Keep Weekday Names

If you prefer weekday-based naming:

```
/public/
  timetable-days/
    saturday.svg
    sunday.svg
    monday.svg
```

Then update `festival.ts`:

```typescript
imageSrc: `/timetable-days/${weekdayName}.svg`,
```

**Benefits:**

- ✅ Organized in dedicated folder
- ✅ Scalable to any number of days
- ✅ Clear naming convention
- ✅ Language-independent (if using day numbers)

**Testing Checklist:**

- [ ] Verify all images load in development
- [ ] Test image loading in production build
- [ ] Check responsive image sizing
- [ ] Verify Next.js image optimization works

---

## Phase 7: URL & Navigation Updates (2-3 hours)

### 7.1: Update URL Parameter Hook

**File:** `src/components/timetable/hooks/useURLParams.tsx`

**Current:**

```typescript
const parseDayParam = (): "saturday" | "sunday" | null => {
  const day = searchParams.get("day");
  if (day === "saturday" || day === "sunday") {
    return day;
  }
  return null;
};
```

**New:**

```typescript
import { FESTIVAL_CONFIG } from "@/config/festival";

export function useURLParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * Parse day parameter from URL
   * Returns day ID if valid, null otherwise
   */
  const parseDayParam = useCallback((): string | null => {
    const dayParam = searchParams.get("day");
    if (!dayParam) return null;

    // Check if it's a valid day ID (e.g., "day1", "day2")
    const validDayIds = FESTIVAL_CONFIG.days.map((d) => d.id);
    if (validDayIds.includes(dayParam)) {
      return dayParam;
    }

    // Legacy support: check if it's a weekday name
    const dayByWeekday = FESTIVAL_CONFIG.getDayByWeekday(dayParam);
    if (dayByWeekday) {
      return dayByWeekday.id;
    }

    return null;
  }, [searchParams]);

  /**
   * Update day parameter in URL
   */
  const updateDayInUrl = useCallback(
    (dayId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("day", dayId);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  return { parseDayParam, updateDayInUrl };
}
```

### 7.2: Update Route Page

**File:** `src/app/[locale]/(content)/timetable/page.tsx`

**Update to pass URL param:**

```typescript
import { FESTIVAL_CONFIG } from "@/config/festival";

interface PageProps {
  searchParams: { day?: string };
}

export default async function TimetablePage({ searchParams }: PageProps) {
  const dayParam = searchParams.day;

  // Validate and get initial day ID
  let initialDayId: string | undefined;

  if (dayParam) {
    // Check if it's a valid day ID
    const day = FESTIVAL_CONFIG.getDayById(dayParam) ||
                FESTIVAL_CONFIG.getDayByWeekday(dayParam);
    initialDayId = day?.id;
  }

  return <TimetablePageComponent initialDayId={initialDayId} />;
}
```

**Benefits:**

- ✅ URL parameters work with any day
- ✅ Backward compatible with weekday names
- ✅ Shareable links
- ✅ Browser navigation works
- ✅ SEO-friendly

**Testing Checklist:**

- [ ] Test URL with `?day=day1`
- [ ] Test URL with `?day=saturday` (legacy)
- [ ] Test URL with invalid day (should fallback)
- [ ] Test browser back/forward buttons
- [ ] Test direct navigation via URL
- [ ] Test URL sharing

---

## Phase 8: Testing & Validation (4-6 hours) ⭐ NEW

### 8.1: Functional Testing

**Test Scenarios:**

- [ ] 2-day festival (current: Saturday/Sunday)
- [ ] 1-day festival (same start/end date)
- [ ] 3-day festival (Friday/Saturday/Sunday)
- [ ] 4-day festival (Thursday-Sunday)
- [ ] Festival across month boundary
- [ ] All areas show correct events
- [ ] All events clickable and show modals
- [ ] Day switching updates URL
- [ ] URL parameters work (bookmarking/sharing)
- [ ] Translations work in German and Spanish
- [ ] Images load correctly for all days

### 8.2: Visual Testing

- [ ] Day buttons render correctly (1-7 days)
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Active day indicator animates smoothly
- [ ] Modal opens/closes correctly
- [ ] Timetable grid displays properly
- [ ] All images have correct aspect ratios

### 8.3: Data Integrity Testing

- [ ] No events missing from timetable
- [ ] All events have correct time slots
- [ ] Events appear on correct days
- [ ] No duplicate events
- [ ] All translation keys resolve

### 8.4: Performance Testing

- [ ] Page load time acceptable
- [ ] Day switching is smooth
- [ ] No unnecessary re-renders
- [ ] Production build size reasonable
- [ ] Images lazy-load correctly

### 8.5: Error Handling Testing

- [ ] Invalid day parameter in URL
- [ ] Missing translation keys
- [ ] Missing event images
- [ ] Empty day (no events)
- [ ] Network errors handled gracefully

---

## Migration Checklist

### Files to Create:

- [ ] None (all modifications to existing files)

### Files to Modify:

**Phase 1:**

- [ ] `src/config/festival.ts` - Add FestivalDay interface and dynamic day generation

**Phase 2:**

- [ ] `src/utils/timelineConfig.ts` - Restructure to array-based TIMELINE_CONFIG

**Phase 2.5:**

- [ ] `messages/de.json` - Update translation structure
- [ ] `messages/es.json` - Update translation structure

**Phase 3:**

- [ ] `src/data/timetable/services/timetable.service.ts` - Remove hardcoded methods

**Phase 4:**

- [ ] `src/components/timetable/TimetablePage.tsx` - Dynamic data fetching
- [ ] `src/components/timetable/TimetableClient.tsx` - Dynamic button rendering

**Phase 5:**

- [ ] `src/types/events.ts` - Update day type to string
- [ ] `src/types/timetable.ts` - Verify types (may not need changes)

**Phase 6:**

- [ ] `/public/` - Reorganize day images

**Phase 7:**

- [ ] `src/components/timetable/hooks/useURLParams.tsx` - Generic day handling
- [ ] `src/app/[locale]/(content)/timetable/page.tsx` - Pass URL params

---

## Benefits After Implementation

### 🚀 Scalability:

- ✅ Support **any number** of festival days (1 to N)
- ✅ Automatically calculate days from start/end dates
- ✅ Add/remove days by **changing dates only** (no code changes)
- ✅ Works across different weekdays (not just Saturday/Sunday)
- ✅ Handles multi-week festivals

**Example: Add a 3rd day**

```typescript
// BEFORE: Modify 10+ files, add methods, change types
// AFTER: Just change one line
dates: {
  start: new Date("July 19, 2025 12:30:00"),
  end: new Date("July 21, 2025 23:59:59"), // ← Added one day!
}
// System automatically:
// - Generates 3 days
// - Creates 3 buttons
// - Fetches data for all 3 days
// - Updates URL parameters
// - Translations work
```

### 🎨 Maintainability:

- ✅ Single source of truth (`FESTIVAL_CONFIG` and `TIMELINE_CONFIG`)
- ✅ No code duplication
- ✅ Easy to add features
- ✅ Clear architecture

### 🔧 Flexibility:

- ✅ Easy to customize per-day metadata
- ✅ Support different day naming conventions
- ✅ Support festivals spanning different weekdays
- ✅ Language-independent image paths

### 👨‍💻 Developer Experience:

- ✅ Clear, readable code
- ✅ Type-safe throughout
- ✅ Self-documenting structure
- ✅ Better IDE autocomplete
- ✅ Easier onboarding for new developers

---

## Risk Assessment & Mitigation

### Low Risk:

- ✅ Festival config changes (isolated, getter-based)
- ✅ Type system updates (compile-time safety)
- ✅ Translation updates (fallback logic)
- ✅ Image reorganization (can keep old files temporarily)

### Medium Risk:

- ⚠️ Component prop changes (affects component tree)
- ⚠️ URL parameter handling (affects routing/bookmarking)

**Mitigation:**

- Test thoroughly in development
- Use feature flags if needed
- Keep backward compatibility during transition

### High Risk:

- 🔴 Timeline configuration restructure (affects data flow)
- 🔴 Service layer refactor (extensive changes)

**Mitigation:**

1. Keep old exports working temporarily
2. Implement backward compatibility layer
3. Test each area/day combination
4. Compare old vs new output
5. Incremental rollout

---

## Estimated Implementation Time

| Phase | Task                               | Time      |
| ----- | ---------------------------------- | --------- |
| 1     | Festival Configuration Enhancement | 2-3 hours |
| 2     | Timeline Configuration Refactor    | 4-5 hours |
| 2.5   | Translation Keys Enhancement       | 1-2 hours |
| 3     | Service Layer Refactor             | 4-5 hours |
| 4     | Component Layer Refactor           | 5-6 hours |
| 5     | Type System Updates                | 1-2 hours |
| 6     | Asset Management                   | 1-2 hours |
| 7     | URL & Navigation Updates           | 2-3 hours |
| 8     | Testing & Validation               | 4-6 hours |

**Total: ~23-32 hours** of focused development time

---

## Success Criteria

### Phase 1 Complete:

- [ ] `FESTIVAL_CONFIG.days` returns array of festival days
- [ ] Days auto-calculated from start/end dates
- [ ] Helper methods work correctly
- [ ] Tests pass for 1, 2, 3+ days

### Phase 2 Complete:

- [ ] `TIMELINE_CONFIG` uses array-based structure
- [ ] Helper functions return correct timelines
- [ ] No events lost in migration
- [ ] Old exports still work (backward compatibility)

### Phase 2.5 Complete:

- [ ] Translation files updated for all weekdays
- [ ] Fallback logic works
- [ ] German and Spanish translations correct

### Phase 3 Complete:

- [ ] No hardcoded day methods
- [ ] Generic methods work for any day
- [ ] Data fetching identical to old system
- [ ] All areas return events

### Phase 4 Complete:

- [ ] Day buttons render dynamically
- [ ] Day switching works
- [ ] Modal opens with correct events
- [ ] Responsive layout works

### Phase 5 Complete:

- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] Type safety maintained

### Phase 6 Complete:

- [ ] Images reorganized
- [ ] All images load correctly
- [ ] Production build works

### Phase 7 Complete:

- [ ] URL parameters work with day IDs
- [ ] Legacy weekday URLs work
- [ ] Browser navigation works
- [ ] Shareable links work

### Phase 8 Complete:

- [ ] All functional tests pass
- [ ] Visual tests pass
- [ ] Data integrity verified
- [ ] Performance acceptable
- [ ] Error handling works

---

## Comparison: Original vs. Improved Plan

| Aspect                 | Original Plan                        | Improved Plan                                   | Benefit                           |
| ---------------------- | ------------------------------------ | ----------------------------------------------- | --------------------------------- |
| **Timeline Structure** | `{ saturday: [...], sunday: [...] }` | `[{ dayWeekday: "saturday", timeline: [...] }]` | True scalability - no object keys |
| **Service eventMap**   | Hardcoded nested object              | Dynamic lookup function                         | Eliminates hardcoding             |
| **Translations**       | Not addressed                        | Dedicated phase with fallback                   | Future-proof                      |
| **Images**             | `/timetable-days/saturday.svg`       | `/timetable-days/day1.svg`                      | Language-independent              |
| **Type Safety**        | `day: string`                        | `day: string` with computed types               | Better DX                         |
| **Adding 3rd Day**     | Change dates + add keys              | **Change dates only**                           | Zero code changes                 |
| **Phases**             | 7 phases                             | 8 phases (added translation phase)              | More thorough                     |
| **Time**               | 21-29 hours                          | 23-32 hours                                     | Slightly longer but more complete |

---

## Next Steps

**Ready to implement!**

Recommended approach:

1. **Create feature branch**: `feature/timetable-multi-day-scalability`
2. **Start with Phase 1**: Festival configuration (foundational)
3. **Test after each phase**: Verify before proceeding
4. **Keep old code temporarily**: Backward compatibility during transition
5. **Remove old code**: After full validation

**Suggested Command:**

```bash
git checkout -b feature/timetable-multi-day-scalability
```

**Implementation Order:**
Phase 1 → 2 → 2.5 → 3 → 4 → 5 → 6 → 7 → 8 (testing throughout)

---

## Document Information

**Created:** October 18, 2025  
**Based On:** TIMETABLE_SCALABILITY_ANALYSIS.md (October 17, 2025)  
**Status:** Ready for implementation  
**Estimated Effort:** 23-32 hours  
**Risk Level:** Medium (mitigated through incremental approach)  
**Improvements:** 5 major refinements over original plan

---

## Questions & Answers

### Q: Why array-based timeline config instead of object-based?

**A:** Objects with weekday keys (`{ saturday: [...], sunday: [...] }`) still have hardcoded day names. Arrays (`[{ dayWeekday: "saturday", timeline: [...] }]`) allow adding days without code changes - just push another object.

### Q: Why add a translation phase?

**A:** Current translations have hardcoded `saturday` and `sunday` keys. Without updating this, adding a Monday would crash. The new structure supports all 7 weekdays.

### Q: Why use day numbers for images instead of weekday names?

**A:** Weekday names tie images to English language. `day1.svg`, `day2.svg` is language-independent and clearer (day 1 of festival = Saturday, regardless of language).

### Q: Can we still use weekday names in the code?

**A:** Yes! The system uses weekday names internally for timeline lookups. The key is that it's not hardcoded to just "saturday" | "sunday".

### Q: What if we want to skip a day?

**A:** The current plan generates consecutive days. If you need non-consecutive days (e.g., Saturday + Sunday, skip Monday, then Tuesday), you'd need to manually define `FESTIVAL_CONFIG.days` instead of using the generator.

### Q: How do we handle different start times per day?

**A:** Timeline config already supports this - each day's schedule can have different times. The time slot generator (12:30-22:00) can also be made day-specific if needed.

---

**Ready to start implementation? 🚀**

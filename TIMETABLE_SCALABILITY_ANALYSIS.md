# Timetable Scalability Analysis & Improvement Plan

## 📋 Document Purpose

This document provides a comprehensive plan to refactor the timetable system from a **hardcoded 2-day system** (Saturday/Sunday) to a **config-driven multi-day system** that can support any number of festival days.

**Status:** Ready to implement (7 phases, 21-29 hours estimated)

---

## Current State Analysis

**Tech Stack:**
- Next.js 15.3.1 (App Router)
- TypeScript with strict type checking
- next-intl for internationalization (German/Spanish)
- Framer Motion for animations
- Tailwind CSS for styling

**Current Festival Setup:**
- 2 days: Saturday July 19, 2025 & Sunday July 20, 2025
- 4 areas: main-stage, dance-workshops, music-workshops, salsa-talks
- Event types: DJ sets, live bands, workshops, talks, dance shows

### 1. **Festival Configuration** (`src/config/festival.ts`)

Currently stores only start and end dates:

```typescript
export const FESTIVAL_CONFIG = {
  dates: {
    start: new Date("July 19, 2025 12:30:00"),
    end: new Date("July 20, 2025 23:59:59"),
  },
};
```

**Problems:**

- ❌ Hardcoded to 2 days (Saturday, Sunday)
- ❌ No dynamic day calculation
- ❌ No weekday information
- ❌ No way to reference individual days

### 2. **TimetableClient Component** (`src/components/timetable/TimetableClient.tsx`)

**Hardcoded Elements:**

- ✗ Day type: `"saturday" | "sunday"` (lines 17, 43)
- ✗ Props: `saturdayData`, `sundayData`, `saturdayEvents`, `sundayEvents`
- ✗ Translations: `days.saturday`, `days.sunday`
- ✗ Button components: Two separate button blocks (lines 142-162, 164-184)
- ✗ Image sources: Hardcoded `/saturday.svg`, `/sunday.svg`
- ✗ Data selection: Ternary operator switching between two days (line 121)

**Current Logic Flow:**

```
TimetableClient
  ├── Receives saturdayData & sundayData separately
  ├── currentDay state ("saturday" | "sunday")
  ├── Two hardcoded button components
  │   ├── Saturday button with /saturday.svg
  │   └── Sunday button with /sunday.svg
  └── Ternary selection based on currentDay
      ↓
  EventModal (✅ UPDATED: now accepts TimetableEvent directly)
```

### 3. **TimetablePage Server Component** (`src/components/timetable/TimetablePage.tsx`)

**Hardcoded Elements:**

- ✗ Two separate data fetches for Saturday and Sunday (lines 19-21)
- ✗ Two separate event fetches (lines 24-25)
- ✗ Passing data as separate props

### 4. **TimetableService** (`src/data/timetable/services/timetable.service.ts`)

**Hardcoded Elements:**

- ✗ Separate methods: `getSaturdayTranslatableData()`, `getSundayTranslatableData()`
- ✗ Day parameter as literal: `"saturday" | "sunday"`
- ✗ Event map with hardcoded keys (lines 544-579)

### 5. **Timeline Configuration** (`src/utils/timelineConfig.ts`)

**Hardcoded Elements:**

- ✗ Separate timeline arrays: `mainStageSaturdayTimeline`, `mainStageSundayTimeline`
- ✗ Separate arrays for each area per day (8 total arrays)
- ✗ Day passed as literal string

### 6. **Event Files** (`src/data/timetable/events/*.ts`)

**Good News:**

- ✓ Events are already unified (day-agnostic)
- ✓ Timeline config determines which day they appear on
- ✓ No changes needed here

---

## Architecture Issues

### **Issue #1: String Literal Days**

Days are represented as string literals `"saturday" | "sunday"` throughout the codebase, making it impossible to scale beyond 2 days.

**Example locations:**
```typescript
// TimetableClient.tsx
type Day = "saturday" | "sunday";
const [currentDay, setCurrentDay] = useState<Day>("saturday");

// TimetableService.ts
getSaturdayData() { ... }
getSundayData() { ... }

// timelineConfig.ts
mainStageSaturdayTimeline: TimelineSlot[]
mainStageSundayTimeline: TimelineSlot[]
```

### **Issue #2: Static Data Structures**

Data structures are hardcoded for exactly 2 days:

- Props: `saturdayData`, `sundayData`
- State variables: `currentDay: "saturday" | "sunday"`
- Service methods: `getSaturdayData()`, `getSundayData()`
- Timeline arrays: 8 separate arrays (4 areas × 2 days)

**Example:**
```typescript
// TimetableClient props
interface TimetableClientProps {
  saturdayData: Column[];
  sundayData: Column[];
  saturdayEvents: Record<AreaType, TimelineSlot[]>;
  sundayEvents: Record<AreaType, TimelineSlot[]>;
}

// Data selection
const currentData = currentDay === "saturday" ? saturdayData : sundayData;
```

### **Issue #3: Hardcoded UI Components**

Day selection buttons are manually duplicated in JSX, not generated from config.

**Example:**
```typescript
// Two separate button components hardcoded
<button onClick={() => handleDayChange("saturday")}>
  <Image src="/saturday.svg" alt="Saturday" />
</button>

<button onClick={() => handleDayChange("sunday")}>
  <Image src="/sunday.svg" alt="Sunday" />
</button>
```

To add a 3rd day (Monday), you'd need to:
1. Manually add a third button
2. Change type from `"saturday" | "sunday"` to `"saturday" | "sunday" | "monday"`
3. Add `mondayData` prop
4. Add `getMondayData()` method
5. Create `mainStageMondayTimeline` array
6. Update conditional logic everywhere

This doesn't scale!

### **Issue #4: Missing Day Metadata**

No central place stores:

- Day dates (July 19, July 20)
- Weekday names ("saturday", "sunday")
- Day identifiers ("day1", "day2")
- Button image paths
- Display labels/translations

Each component has to know this information independently.

### **Issue #5: Timeline Configuration Duplication**

Each area has separate timeline arrays per day (e.g., `mainStageSaturdayTimeline`, `mainStageSundayTimeline`), leading to duplication.

**Current structure:**
```typescript
// 8 separate arrays (4 areas × 2 days)
export const mainStageSaturdayTimeline: TimelineSlot[] = [...];
export const mainStageSundayTimeline: TimelineSlot[] = [...];
export const danceWorkshopsSaturdayTimeline: TimelineSlot[] = [...];
export const danceWorkshopsSundayTimeline: TimelineSlot[] = [...];
// ... 4 more arrays
```

This means:
- Variable names grow exponentially with days
- No consistent naming pattern
- Hard to maintain/refactor

---

## Proposed Solution Architecture

### **Core Principle:**

Move from **hardcoded dual-day system** to **config-driven multi-day system** where:

1. `FESTIVAL_CONFIG` defines all days dynamically from start/end dates
2. All components derive days from config (single source of truth)
3. UI elements are generated programmatically, not hardcoded
4. Services use generic methods, not day-specific methods
5. Timeline config uses structured objects, not separate variables

### **New Data Flow:**

```
FESTIVAL_CONFIG (festival.ts)
  ├── dates: { start, end }
  └── days: FestivalDay[] (auto-generated)
      ├── { id: "day1", date: July 19, weekday: "saturday", imageSrc: "/saturday.svg" }
      └── { id: "day2", date: July 20, weekday: "sunday", imageSrc: "/sunday.svg" }
          ↓
TIMELINE_CONFIG (timelineConfig.ts)
  └── [{ area: "main-stage", days: { saturday: [...], sunday: [...] } }]
          ↓
TimetableService
  └── getDataForDay(weekday: string) - generic method for any day
          ↓
TimetablePage (Server Component)
  ├── Fetches data for all days in loop
  └── Passes array of { day, data, events }
          ↓
TimetableClient
  ├── Generates buttons dynamically from festivalDays array
  ├── Manages currentDayId state (generic string)
  └── Selects current day data from array
          ↓
EventModal
  └── Accepts TimetableEvent (works with any day info)
```

### **Key Differences:**

| Aspect | Current (Hardcoded) | Proposed (Config-Driven) |
|--------|---------------------|--------------------------|
| **Days** | `"saturday" \| "sunday"` | `string` (any weekday) |
| **State** | `currentDay: "saturday"` | `currentDayId: string` |
| **Props** | `saturdayData, sundayData` | `daysData: DayData[]` |
| **Service** | `getSaturdayData()` | `getDataForDay(weekday)` |
| **Timeline** | 8 separate arrays | Structured config object |
| **Buttons** | 2 hardcoded buttons | Generated from array |
| **Adding day** | Modify 10+ files | Change config dates only |

---

## Step-by-Step Implementation Plan

**Overview:** 7 phases, estimated 21-29 hours total

Each phase is independent and can be tested before moving to the next.

---

### **Phase 1: Festival Configuration Enhancement** (2-3 hours)

#### **Step 1.1: Expand FESTIVAL_CONFIG**

**File:** `src/config/festival.ts`

**Changes:**

```typescript
export interface FestivalDay {
  id: string; // e.g., "day1", "day2", "day3"
  date: Date; // Actual date
  weekday: string; // e.g., "saturday", "sunday", "monday"
  label: string; // Translation key for display name
  imageSrc: string; // Path to button image
}

export const FESTIVAL_CONFIG = {
  dates: {
    start: new Date("July 19, 2025 12:30:00"),
    end: new Date("July 20, 2025 23:59:59"),
  },
  // New: Generate days dynamically
  get days(): FestivalDay[] {
    return generateFestivalDays(this.dates.start, this.dates.end);
  },
};

function generateFestivalDays(start: Date, end: Date): FestivalDay[] {
  const days: FestivalDay[] = [];
  const current = new Date(start);
  let dayCounter = 1;

  while (current <= end) {
    const weekdayName = current
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    days.push({
      id: `day${dayCounter}`,
      date: new Date(current),
      weekday: weekdayName,
      label: `Sections.SectionFive.${weekdayName}`, // Translation key
      imageSrc: `/timetable-days/${weekdayName}.svg`,
    });

    current.setDate(current.getDate() + 1);
    dayCounter++;
  }

  return days;
}
```

**Benefits:**

- ✅ Days are calculated from start/end dates
- ✅ Can handle any number of days (1 to N)
- ✅ Each day has complete metadata
- ✅ Central source of truth

**Testing:**
- Test with 2 days (current)
- Test with 1 day
- Test with 3+ days
- Verify date calculations across months/years

---

### **Phase 2: Timeline Configuration Refactor** (3-4 hours)

#### **Step 2.1: Restructure Timeline Arrays**

**File:** `src/utils/timelineConfig.ts`

**Current Structure:**

```typescript
mainStageSaturdayTimeline: TimelineSlot[]
mainStageSundayTimeline: TimelineSlot[]
danceWorkshopsSaturdayTimeline: TimelineSlot[]
danceWorkshopsSundayTimeline: TimelineSlot[]
// ... 8 total arrays
```

**New Structure:**

```typescript
export interface AreaTimeline {
  area: AreaType;
  days: Record<string, TimelineSlot[]>; // key: day.id or day.weekday
}

export const TIMELINE_CONFIG: AreaTimeline[] = [
  {
    area: "main-stage",
    days: {
      saturday: [...],
      sunday: [...],
    },
  },
  {
    area: "dance-workshops",
    days: {
      saturday: [...],
      sunday: [...],
    },
  },
  // ... etc
];

// Helper to get timeline for specific area and day
export function getTimelineForAreaAndDay(
  area: AreaType,
  dayWeekday: string
): TimelineSlot[] {
  const areaConfig = TIMELINE_CONFIG.find(c => c.area === area);
  return areaConfig?.days[dayWeekday] || [];
}
```

**Benefits:**

- ✅ Single source per area
- ✅ Easy to add new days (just add to days object)
- ✅ No variable name duplication
- ✅ Helper function provides clean API

**Testing:**
- Verify all existing events still appear
- Check timeline integrity for both days
- Test helper function with valid/invalid inputs

---

### **Phase 3: Service Layer Refactor** (4-5 hours)

#### **Step 3.1: Unify TimetableService Methods**

**File:** `src/data/timetable/services/timetable.service.ts`

**Remove:**

- ❌ `getSaturdayTranslatableData()`
- ❌ `getSundayTranslatableData()`

**Add:**

```typescript
private static getTranslatableDataForDay(dayWeekday: string): Record<AreaType, TranslatableTimeSlot[]> {
  const result: Record<AreaType, TranslatableTimeSlot[]> = {} as Record<AreaType, TranslatableTimeSlot[]>;

  // Loop through all areas
  for (const areaType of Object.keys(AREA_DEFINITIONS) as AreaType[]) {
    const timeline = getTimelineForAreaAndDay(areaType, dayWeekday);
    const events = getEventCollectionForArea(areaType);
    const enrichedEvents = createTimelineFromSimpleConfig(timeline, events, dayWeekday);
    result[areaType] = this.convertNewEventsToTranslatableTimeSlots(enrichedEvents);
  }

  return result;
}
```

**Update:**

```typescript
static async getTimetableDataServer(dayWeekday: string): Promise<Column[]> {
  const areaData = await this.getDataTranslatedForDay(dayWeekday);
  // ... rest of logic
}

static getTimetableEventsServer(dayWeekday: string): Record<AreaType, TimelineSlot[]> {
  const areas = Object.keys(AREA_DEFINITIONS) as AreaType[];
  return areas.reduce((acc, area) => {
    acc[area] = this.getEventsForArea(area, dayWeekday);
    return acc;
  }, {} as Record<AreaType, TimelineSlot[]>);
}
```

**Benefits:**
- ✅ Generic methods work for any day
- ✅ Loop through areas dynamically
- ✅ No day-specific methods needed
- ✅ Easier to add new areas or days

**Testing:**
- Test data fetching for both existing days
- Verify event collections are correct
- Test with invalid weekday (should handle gracefully)
- Compare output with old methods (should be identical)

---

### **Phase 4: Component Refactor** (4-5 hours)

#### **Step 4.1: Update TimetablePage (Server Component)**

**File:** `src/components/timetable/TimetablePage.tsx`

**New Props:**

```typescript
interface TimetablePageProps {
  initialDayId?: string; // Instead of "saturday" | "sunday"
}
```

**New Data Fetching:**

```typescript
export default async function TimetablePage({ initialDayId }: TimetablePageProps) {
  const t = await getTranslations();
  const festivalDays = FESTIVAL_CONFIG.days;

  // Fetch data for ALL days
  const daysData = await Promise.all(
    festivalDays.map(async (day) => ({
      day,
      data: await TimetableService.getTimetableDataServer(day.weekday),
      events: TimetableService.getTimetableEventsServer(day.weekday),
    }))
  );

  // Prepare translations for all days
  const dayTranslations = festivalDays.reduce((acc, day) => {
    acc[day.id] = t(day.label as never);
    return acc;
  }, {} as Record<string, string>);

  return (
    <TimetableClient
      festivalDays={festivalDays}
      daysData={daysData}
      dayTranslations={dayTranslations}
      initialDayId={initialDayId || festivalDays[0].id}
    />
  );
}
```

**✅ Note:** EventModal already accepts `TimetableEvent` directly (no additional changes needed)

#### **Step 4.2: Update TimetableClient**

**File:** `src/components/timetable/TimetableClient.tsx`

**New Props:**

```typescript
interface DayData {
  day: FestivalDay;
  data: Column[];
  events: Record<AreaType, TimelineSlot[]>;
}

interface TimetableClientProps {
  festivalDays: FestivalDay[];
  daysData: DayData[];
  dayTranslations: Record<string, string>;
  initialDayId: string;
}
```

**New State:**

```typescript
const [currentDayId, setCurrentDayId] = useState<string>(initialDayId);
```

**Dynamic Button Rendering:**

```typescript
<div className="flex w-full flex-col items-center space-y-2 sm:flex-row sm:justify-end sm:space-y-0 sm:space-x-4 md:w-2/3">
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
```

**New DayButton Component:**

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
    >
      <Image
        src={day.imageSrc}
        alt={label}
        width={250}
        height={100}
        className="h-auto w-full"
        priority
      />
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

**Data Selection:**

```typescript
const currentDayData = daysData.find((d) => d.day.id === currentDayId);
const currentData = currentDayData ? processData(currentDayData.data) : [];
const currentEvents = currentDayData?.events || {};
```

**Modal Rendering:**

```typescript
{/* EventModal accepts TimetableEvent directly */}
{selectedEvent && (
  <EventModal event={selectedEvent} onClose={closeModal} />
)}
```

**Benefits:**
- ✅ Dynamic button generation (works with any number of days)
- ✅ No hardcoded day logic in components
- ✅ Easier to style/customize per-day buttons
- ✅ EventModal supports dynamic days (no modal changes needed)

**Testing:**
- Test day switching UI
- Verify all buttons render correctly
- Test responsive layout with 1, 2, 3+ buttons
- Test URL parameter updates
- Verify modal opens with correct event data

---

### **Phase 5: Type System Updates** (1-2 hours)

#### **Step 5.1: Update Type Definitions**

**Files to update:**

- `src/types/events.ts`
- `src/types/timetable.ts`

**Changes:**

```typescript
// Replace all instances of "saturday" | "sunday" with string
export interface SchedulingInfo {
  startTime: string;
  endTime: string;
  day: string; // Changed from "saturday" | "sunday"
}

// Add new types
export interface FestivalDay {
  id: string;
  date: Date;
  weekday: string;
  label: string;
  imageSrc: string;
}
```

**Benefits:**
- ✅ Type-safe throughout codebase
- ✅ TypeScript catches errors at compile time
- ✅ Better IDE autocomplete
- ✅ Self-documenting types

**Testing:**
- Run `npm run build` to verify no type errors
- Test with TypeScript strict mode
- Verify all type imports resolve correctly

---

### **Phase 6: Image Assets** (1 hour)

#### **Step 6.1: Reorganize Button Images**

**Current:** `/public/saturday.svg`, `/public/sunday.svg`

**New Structure:**

```
/public/
  timetable-days/
    saturday.svg
    sunday.svg
    monday.svg
    friday.svg
    ... (add as needed)
```

**Benefits:**

- ✅ Organized structure
- ✅ Easy to add new day images
- ✅ Clear naming convention
- ✅ Follows Next.js public folder best practices

**Testing:**
- Verify all images load correctly
- Test image paths in development and production
- Check responsive image sizing

---

### **Phase 7: URL & Navigation Updates** (2-3 hours)

#### **Step 7.1: Update URL Parameter Handling**

**File:** `src/components/timetable/hooks/useURLParams.tsx`

**Current:** Uses `"saturday" | "sunday"`

**New:** Use day IDs or weekdays

```typescript
export function useURLParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const parseDayParam = useCallback((): string | null => {
    return searchParams.get("day");
  }, [searchParams]);

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

**Benefits:**
- ✅ URL parameters work with any day
- ✅ Shareable links to specific days
- ✅ Browser back/forward navigation works
- ✅ SEO-friendly URLs

**Testing:**
- Test URL parameter setting/reading
- Test browser back/forward buttons
- Test direct navigation with ?day=saturday
- Test invalid day parameter (should fallback gracefully)
- Test URL sharing between users

---

## Migration Checklist

### Files to Create:
- [ ] None (all changes are modifications to existing files)

### Files to Modify:

**Phase 1:**
- [ ] `src/config/festival.ts` - Add `FestivalDay` interface and `days` getter

**Phase 2:**
- [ ] `src/utils/timelineConfig.ts` - Restructure to `TIMELINE_CONFIG` with helper function

**Phase 3:**
- [ ] `src/data/timetable/services/timetable.service.ts` - Replace day-specific methods with generic ones

**Phase 4:**
- [ ] `src/components/timetable/TimetablePage.tsx` - Dynamic data fetching for all days
- [ ] `src/components/timetable/TimetableClient.tsx` - Dynamic button rendering
- [ ] `src/components/timetable/EventModal/*` - No changes needed (already accepts TimetableEvent)

**Phase 5:**
- [ ] `src/types/events.ts` - Change `day: "saturday" | "sunday"` to `day: string`
- [ ] `src/types/timetable.ts` - Update related types

**Phase 6:**
- [ ] `/public/saturday.svg` - Move to `/public/timetable-days/saturday.svg`
- [ ] `/public/sunday.svg` - Move to `/public/timetable-days/sunday.svg`

**Phase 7:**
- [ ] `src/components/timetable/hooks/useURLParams.tsx` - Generic day parameter handling

### Testing Requirements:

- [ ] `src/config/festival.ts` - Add day generation
- [ ] `src/utils/timelineConfig.ts` - Restructure timelines
- [ ] `src/data/timetable/services/timetable.service.ts` - Unify methods
- [ ] `src/components/timetable/TimetablePage.tsx` - Dynamic data fetching
- [ ] `src/components/timetable/TimetableClient.tsx` - Dynamic rendering
- [ ] `src/components/timetable/hooks/useURLParams.tsx` - Generic day handling
- [ ] `src/types/events.ts` - Update day types
- [ ] `src/types/timetable.ts` - Update day types
- [ ] `/public/` - Reorganize images

### Testing Requirements:

**Functional Testing:**
- [ ] Test with 2 days (current scenario - Saturday/Sunday)
- [ ] Test with 1 day (single-day festival)
- [ ] Test with 3+ days (multi-day festival)
- [ ] Test URL parameters (bookmarking, sharing)
- [ ] Test translations (German/Spanish)
- [ ] Test event modal navigation
- [ ] Test responsive layout with many days
- [ ] Test browser back/forward buttons
- [ ] Test day switching animation

**Visual Testing:**
- [ ] Verify button styling with 1, 2, 3+ buttons
- [ ] Check responsive breakpoints
- [ ] Verify active day indicator
- [ ] Check image loading

**Data Integrity:**
- [ ] Verify all events appear on correct days
- [ ] Check timeline consistency
- [ ] Verify event modal data is correct
- [ ] Test with missing/empty data

**Performance:**
- [ ] Check page load time with multiple days
- [ ] Verify no unnecessary re-renders
- [ ] Test production build size

---

## Benefits After Implementation

### Scalability:

- ✅ Support any number of festival days (1 to N)
- ✅ Automatically calculate days from start/end dates
- ✅ Add/remove days by changing config only (no code changes)
- ✅ Works across different weekdays (not just Saturday/Sunday)
- ✅ Handles multi-week festivals (if needed)

**Example:** To change from 2-day to 3-day festival:
```typescript
// Before: Modify 10+ files with hardcoded logic
// After: Just change the dates
dates: {
  start: new Date("July 19, 2025"),
  end: new Date("July 21, 2025"), // ← Only change needed!
}
// System automatically generates 3 days
```

### Maintainability:

- ✅ Single source of truth for day configuration
- ✅ No code duplication for day-specific logic
- ✅ Easier to add new features

### Flexibility:

- ✅ Easy to customize per-day metadata (images, labels)
- ✅ Support different day naming conventions
- ✅ Support festivals spanning different weekdays

### Developer Experience:

- ✅ Clear, readable code
- ✅ Type-safe throughout
- ✅ Self-documenting structure

---

## Risk Assessment

### Low Risk:

- Type system updates (compile-time safety)
- Config file changes (isolated)

### Medium Risk:

- Service layer refactor (extensive testing needed)
- Component prop changes (affects component tree)

### High Risk:

- Timeline configuration restructure (affects data flow)
- URL parameter handling (affects routing/bookmarking)

### Mitigation Strategies:

1. **Incremental implementation** - One phase at a time
2. **Backward compatibility layer** - Keep old methods during transition
3. **Comprehensive testing** - Test each phase before proceeding
4. **Feature flags** - Allow switching between old/new system

---

## Estimated Implementation Time

- Phase 1 (Config): 2-3 hours
- Phase 2 (Timeline): 3-4 hours
- Phase 3 (Service): 4-5 hours
- Phase 4 (Components): 4-5 hours
- Phase 5 (Types): 1-2 hours
- Phase 6 (Images): 1 hour
- Phase 7 (URL/Nav): 2-3 hours
- Testing & Debugging: 4-6 hours

**Total: ~21-29 hours** of focused development time

---

## Summary: What Changes and What Stays

### What Changes:

**Data Structures:**
- `"saturday" | "sunday"` → `string` (any weekday)
- Separate props → Unified arrays
- Hardcoded methods → Generic methods

**UI Components:**
- 2 hardcoded buttons → Dynamic button generation
- Ternary selection → Array lookup

**Configuration:**
- Static day info → Calculated from dates
- 8 timeline arrays → 1 structured config

### What Stays the Same:

**✅ Zero UI/UX Changes:**
- All styling identical (Tailwind classes preserved)
- All animations identical (Framer Motion settings preserved)
- All translations identical (keys preserved)
- Modal appearance identical
- Button appearance identical (just generated vs hardcoded)
- Event rendering identical

**✅ Data Integrity:**
- All events stay in same files
- Timeline configurations preserve event order
- Translations remain unchanged
- Event types unchanged (DJ sets, workshops, talks, shows)

**✅ User Experience:**
- Same timetable layout
- Same interaction patterns
- Same modal behavior
- Same responsive design
- Same performance

---

## Next Steps

**Ready to begin!**

Recommended approach:

1. **Start with Phase 1 (Festival Configuration)** ⭐ Recommended first step
   - Add day generation logic to `festival.ts`
   - Create `FestivalDay` interface
   - Dynamic day calculation from start/end dates
   - Low risk, foundational change

2. **Create a feature branch for this refactor**
   - Keep scalability work separate
   - Easy to test and review

3. **Implement a proof-of-concept first**
   - Test the approach with minimal risk
   - Validate before full implementation

4. **Create utility functions/helpers**
   - Build supporting infrastructure
   - Makes main refactor smoother

**Suggested implementation order:** Phases 1 → 2 → 3 → 4 → 5 → 6 → 7, testing after each phase.

---

## Document Information

**Created:** October 2025  
**Last Updated:** October 17, 2025  
**Status:** Ready for implementation  
**Estimated Effort:** 21-29 hours  
**Risk Level:** Medium (mitigated through incremental approach)

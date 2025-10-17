# Timetable Scalability Analysis & Improvement Plan

## Current State Analysis

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

### **Issue #2: Static Data Structures**

Data structures are hardcoded for exactly 2 days:

- Props: `saturdayData`, `sundayData`
- State variables
- Service methods

### **Issue #3: Hardcoded UI Components**

Day selection buttons are manually duplicated in JSX, not generated from config.

### **Issue #4: Missing Day Metadata**

No central place stores:

- Day dates
- Weekday names
- Day identifiers
- Button images

### **Issue #5: Timeline Configuration Duplication**

Each area has separate timeline arrays per day (e.g., `mainStageSaturdayTimeline`, `mainStageSundayTimeline`), leading to duplication.

---

## Proposed Solution Architecture

### **Core Principle:**

Move from **hardcoded dual-day system** to **config-driven multi-day system** where:

1. `FESTIVAL_CONFIG` defines all days dynamically
2. All components derive days from config
3. UI elements are generated, not hardcoded

### **New Data Flow:**

```
FESTIVAL_CONFIG
  ↓ (generates day metadata)
Day Objects Array [{ id, date, weekday, label, image }, ...]
  ↓ (used by)
TimetablePage (fetches data for all days dynamically)
  ↓ (passes)
TimetableClient (renders buttons & data dynamically)
```

---

## Step-by-Step Implementation Plan

### **Phase 1: Festival Configuration Enhancement**

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
- ✅ Can handle any number of days
- ✅ Each day has complete metadata
- ✅ Central source of truth

---

### **Phase 2: Timeline Configuration Refactor**

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
- ✅ Easy to add new days
- ✅ No duplication of variable names

---

### **Phase 3: Service Layer Refactor**

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

---

### **Phase 4: Component Refactor**

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

---

### **Phase 5: Type System Updates**

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

---

### **Phase 6: Image Assets**

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

---

### **Phase 7: URL & Navigation Updates**

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

---

## Migration Checklist

### Files to Modify:

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

- [ ] Test with 2 days (current scenario)
- [ ] Test with 1 day
- [ ] Test with 3+ days
- [ ] Test URL parameters
- [ ] Test translations
- [ ] Test event modal navigation
- [ ] Test responsive layout with many days

---

## Benefits After Implementation

### Scalability:

- ✅ Support any number of festival days (1 to N)
- ✅ Automatically calculate days from start/end dates
- ✅ Add/remove days by changing config only

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
- Phase 4 (Components): 5-6 hours
- Phase 5 (Types): 1-2 hours
- Phase 6 (Images): 1 hour
- Phase 7 (URL/Nav): 2-3 hours
- Testing & Debugging: 4-6 hours

**Total: ~22-30 hours** of focused development time

---

## Next Steps

Would you like me to:

1. Start with Phase 1 (Festival Configuration)?
2. Create a feature branch for this refactor?
3. Implement a proof-of-concept for one component first?
4. Create utility functions/helpers before main implementation?

Let me know which approach you prefer!

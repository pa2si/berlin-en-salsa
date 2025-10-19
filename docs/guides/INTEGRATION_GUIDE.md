# 🎯 Event-Based Timetable Architecture - Integration Guide

**Status**: ⚠️ HISTORICAL REFERENCE - Phase 2 Complete (October 9, 2025)  
**Note**: This guide describes an attempted architecture that was partially implemented but not fully adopted.

## ⚠️ Current Status

The timetable system has been successfully cleaned up in Phase 2, but this integration guide describes files that have been **removed** as unused:

### ❌ Files Removed (October 9, 2025)

1. ~~`src/services/timetableAdapter.ts`~~ - DELETED (was never used)
2. ~~`src/utils/dataTransformer.ts`~~ - DELETED (was never used)
3. ~~`getTimetableDataServerNew()` method~~ - DELETED (was never called)

### ✅ Current Architecture (Active)

The system currently uses:

- **Event Files**: `TimetableEvent[]` format (main-stage, workshops, talks)
- **Timeline Config**: `timelineConfig.ts` for schedule generation
- **Bridge Layer**: `convertNewEventsToTranslatableTimeSlots()` (KEPT - actively used)
- **Modal System**: `EventModal.tsx` with `SelectedEventDetails` (old system, still active)
- **New Modal**: `NewEventModal.tsx` (available but not integrated)

For current architecture details, see:

- `CLEANUP_PHASE2_COMPLETE.md` - What was removed and why
- `BRIDGE_LAYER_ASSESSMENT.md` - Future migration planning
- `TIMETABLE_ANALYSIS.md` - Architecture analysis

---

## 📋 What Was Attempted (Historical Context)

This guide describes a compatibility layer approach that was created but never integrated into production:

### ~~Files Created~~ (No Longer Exist)

1. ~~**`src/utils/dataTransformer.ts`**~~ - Utilities to convert existing data to new format
2. ~~**`src/services/timetableAdapter.ts`**~~ - Compatibility layer for gradual migration

### ✅ Files That Exist (Current)

1. **`src/types/events.ts`** - Event-based type system (IN USE ✅)
2. **`src/utils/eventFactory.ts`** - Factory functions (IN USE ✅)
3. **`src/components/timetable/NewEventModal.tsx`** - New modal (AVAILABLE, not integrated)
4. **Event data files** - All migrated to new format (IN USE ✅)

---

## 🚫 This Migration Path Was Not Used

The following migration strategy was proposed but **NOT ADOPTED**:

### ~~Phase 1: Add New System Alongside Existing~~ (Not Used)

```typescript
// This code references DELETED files and will not work:
import { TimetableAdapterService } from "@/services/timetableAdapter"; // ❌ DELETED

const areaColumns = await TimetableAdapterService.getTimetableData("saturday"); // ❌ DOESN'T EXIST
const legacyFormat = TimetableAdapterService.convertToLegacyFormat(areaColumns); // ❌ DOESN'T EXIST
```

### ~~Phase 2: Migrate Data Files~~ (Already Complete via Different Path)

- ✅ **All data files** - Migrated to `TimetableEvent[]` format via different approach
- ✅ **Event factories** - Using `eventFactory.ts`
- ✅ **Timeline config** - Using `timelineConfig.ts`

### ~~Phase 3: Update Components~~ (Not Pursued)

- ❌ Did not switch to NewTimeSlot (doesn't exist)
- ❌ Did not switch to NewEventModal (exists but not integrated)
- ✅ Current components work with bridge layer

---

## 🎨 Architecture Comparison

### Before: Monolithic TimeSlot Interface

```typescript
interface TimeSlot {
  time: string;
  event?: string;
  instructor?: string;
  instructorTwo?: string;
  presenter?: string;
  host?: string;
  moderator?: string;
  guest?: string;
  djs?: string;
  actType?: string;
  type?: "main" | "dance-show" | "workshop" | "talk";
  // ... 40+ more optional fields
}
```

### After: Type-Safe Event Interfaces

```typescript
interface MainStageEvent extends EventWithPeople {
  type: "main-stage";
  performanceType: "live" | "dj-set";
  genre?: string;
  slides?: MediaSlide[];
}

interface DanceWorkshopEvent extends EventWithPeople {
  type: "dance-workshop";
  danceStyle: string;
  level?: "beginner" | "intermediate" | "advanced";
  duration: number;
}
// Each event type only has relevant fields!
```

## 📈 Scalability Example: Adding New Event Type

With the new architecture, adding a photo workshop is incredibly simple:

```typescript
// 1. Define the interface (only relevant fields)
interface PhotoWorkshopEvent extends EventWithPeople {
  type: "photo-workshop";
  equipment: string[];
  photoStyle: "portrait" | "street" | "dance";
  outdoorLocation?: string;
}

// 2. Update union type
type TimetableEvent =
  | MainStageEvent
  | DanceWorkshopEvent
  | PhotoWorkshopEvent  // ← Just add here
  | ...;

// 3. Add factory method
EventFactory.createPhotoWorkshop({
  title: "Street Photography Basics",
  area: "workshops",
  equipment: ["Camera", "Lens"],
  photoStyle: "street",
  // TypeScript ensures all required fields are provided
});

// 4. Add type-safe modal rendering
function PhotoWorkshopDetails({ event }: { event: PhotoWorkshopEvent }) {
  // TypeScript knows exactly what fields are available
  return (
    <div>
      <h3>{event.title}</h3>
      <p>Style: {event.photoStyle}</p>
      <p>Equipment: {event.equipment.join(", ")}</p>
      {event.outdoorLocation && <p>Location: {event.outdoorLocation}</p>}
    </div>
  );
}
```

**That's it!** No changes needed in 5+ different files like before.

---

## ⚠️ IMPORTANT: This Integration Path Was Not Adopted

The testing and integration examples below reference **DELETED files** that no longer exist. This section is kept for historical reference only.

## ~~🧪 Testing the New System~~ (Historical - Not Applicable)

~~You can test the new architecture right now:~~ ❌ The adapter files have been removed.

1. ~~**Add the demo route**~~ - NewTimetableDemo may not exist or work

```typescript
// ❌ This may not work - NewTimetableDemo was for demonstration only
import NewTimetableDemo from "@/components/timetable/NewTimetableDemo";

export default function DemoPage() {
  return <NewTimetableDemo />;
}
```

2. ~~**Or integrate gradually**~~ - Adapter has been deleted ❌

```typescript
// ❌ THIS CODE WILL NOT WORK - TimetableAdapterService was deleted
import { TimetableAdapterService } from "@/services/timetableAdapter"; // DELETED FILE

const areaColumns = await TimetableAdapterService.getTimetableData(day); // DOESN'T EXIST
const legacyData = TimetableAdapterService.convertToLegacyFormat(areaColumns); // DOESN'T EXIST
```

## 🚀 Actual Benefits Achieved

1. **Type Safety**: ✅ `TimetableEvent` discriminated unions work great
2. **Maintainability**: ✅ Event data files well-organized in domain folders
3. **Clarity**: ✅ Each event type has exactly the fields it needs
4. **Extensibility**: ✅ New event types are trivial to add
5. **Working System**: ✅ Bridge layer provides stable functionality
6. **Clean Codebase**: ✅ ~300+ lines of unused code removed

## 📚 Current Documentation

For up-to-date information about the timetable system:

1. **`CLEANUP_PHASE2_COMPLETE.md`** - What was removed and current state
2. **`BRIDGE_LAYER_ASSESSMENT.md`** - Current architecture and future migration path
3. **`TIMETABLE_ANALYSIS.md`** - Comprehensive analysis and recommendations
4. **`src/types/events.ts`** - Current event type definitions (IN USE)
5. **`src/utils/eventFactory.ts`** - Event creation utilities (IN USE)

---

## 🎯 Conclusion

This integration guide described an adapter-based migration path that was **not adopted**. The actual timetable refactoring took a different approach:

- ✅ Event data migrated to new `TimetableEvent[]` format
- ✅ Bridge layer kept for compatibility
- ✅ Unused adapter/transformer files removed
- ✅ System is stable and production-ready

**This document is kept for historical reference only.**

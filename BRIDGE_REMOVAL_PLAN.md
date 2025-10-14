# Bridge Layer Removal - Migration Plan

**Date**: October 14, 2025  
**Status**: Ready for Implementation  
**Estimated Time**: 4-6 hours  
**Risk Level**: Medium-High

---

## 🎯 Objective

Remove the bridge layer (`convertNewEventsToTranslatableTimeSlots()`) and migrate the entire timetable system to use `TimetableEvent[]` directly with the `NewEventModal`.

---

## 📋 Pre-Migration Checklist

### ✅ Preparations Complete

- [x] NewEventModal.tsx exists and supports all event types
- [x] originalEvent field exists in TimeSlot type
- [x] TimetableEvent discriminated unions are well-defined
- [x] EventFactory pattern is fully implemented
- [x] All 8 areas migrated to new event format (Saturday + Sunday)

### ⚠️ Pre-Migration Tests

Before starting, let's verify:

1. **Current system works** - Navigate to /timetable and test:

   - [ ] Saturday main-stage shows events
   - [ ] Sunday main-stage shows events
   - [ ] All 4 workshop/talk areas work
   - [ ] Modal opens with complete data
   - [ ] Slides work correctly
   - [ ] No console errors

2. **NewEventModal is functional**:
   - [ ] Check if NewEventModal has been tested independently
   - [ ] Verify it handles all event types properly
   - [ ] Test translation system integration

---

## 🔄 Migration Steps

### Step 1: Update TimetableService to Return Events (Low Risk)

**File**: `src/data/timetable/services/timetable.service.ts`

**Changes**:

```typescript
// ADD NEW METHOD - Return raw events with timeline
static getEventsForArea(
  area: AreaType,
  day: "saturday" | "sunday"
): TimelineSlot[] {
  // Map of area -> events
  const eventMap = {
    "main-stage": day === "saturday"
      ? { timeline: mainStageSaturdayTimeline, events: mainStageSaturdayEvents }
      : { timeline: mainStageSundayTimeline, events: mainStageSundayEvents },
    "dance-workshops": day === "saturday"
      ? { timeline: danceWorkshopsSaturdayTimeline, events: danceWorkshopSaturdayEvents }
      : { timeline: danceWorkshopsSundayTimeline, events: danceWorkshopSundayEvents },
    // ... etc for all areas
  };

  const { timeline, events } = eventMap[area];
  return createTimelineFromSimpleConfig(timeline, events);
}

// ADD NEW METHOD - Server version that returns events
static async getTimetableEventsServer(
  day: "saturday" | "sunday"
): Promise<Record<AreaType, TimelineSlot[]>> {
  return {
    "main-stage": this.getEventsForArea("main-stage", day),
    "dance-workshops": this.getEventsForArea("dance-workshops", day),
    "music-workshops": this.getEventsForArea("music-workshops", day),
    "salsa-talks": this.getEventsForArea("salsa-talks", day),
  };
}
```

**Test**: Verify no compilation errors

---

### Step 2: Update TimetablePage to Pass Events (Low Risk)

**File**: `src/components/timetable/TimetablePage.tsx`

**Changes**:

```typescript
// REPLACE getTimetableDataServer with getTimetableEventsServer
const saturdayEvents = await TimetableService.getTimetableEventsServer("saturday");
const sundayEvents = await TimetableService.getTimetableEventsServer("sunday");

return (
  <TimetableClient
    initialDay={initialDay}
    saturdayEvents={saturdayEvents}  // NEW
    sundayEvents={sundayEvents}      // NEW
    translations={...}
  />
);
```

**Test**: Check TypeScript errors, don't deploy yet

---

### Step 3: Update TimetableClient Props (Medium Risk)

**File**: `src/components/timetable/TimetableClient.tsx`

**Changes**:

```typescript
interface TimetableClientProps {
  initialDay: "saturday" | "sunday";
  saturdayEvents: Record<AreaType, TimelineSlot[]>;  // CHANGED
  sundayEvents: Record<AreaType, TimelineSlot[]>;    // CHANGED
  translations: {...};
}
```

**Temporary compatibility layer**:

```typescript
// Convert events to old Column format temporarily
const convertEventsToColumns = (
  eventsMap: Record<AreaType, TimelineSlot[]>,
): Column[] => {
  return Object.entries(eventsMap).map(([area, slots]) => ({
    area: AREA_DEFINITIONS[area as AreaType].spanishName,
    slots: slots.map((slot) => ({
      time: slot.startTime,
      event: slot.event?.title,
      // ... convert TimelineSlot to TimeSlot
    })),
  }));
};

// Use temporarily
const currentData =
  currentDay === "saturday"
    ? processData(convertEventsToColumns(saturdayEvents))
    : processData(convertEventsToColumns(sundayEvents));
```

**Test**: System should still work with this temporary conversion

---

### Step 4: Update TimetableGrid to Accept Events (Medium Risk)

**File**: `src/components/timetable/TimetableGrid.tsx`

**Current signature**:

```typescript
interface TimetableGridProps {
  timetableData: Column[];
  onEventClick: (key: string, details: SelectedEventDetails) => void;
  // ...
}
```

**New signature**:

```typescript
interface TimetableGridProps {
  eventsData: Record<AreaType, TimelineSlot[]>; // CHANGED
  onEventClick: (event: TimetableEvent) => void; // CHANGED
  // ...
}
```

**Test**: Update all usages, check for errors

---

### Step 5: Update AreaColumn Component (Medium Risk)

**File**: `src/components/timetable/AreaColumn.tsx`

**Changes**:

- Accept `TimelineSlot[]` instead of processed `TimeSlot[]`
- Pass `TimetableEvent` to onClick handlers
- Remove SelectedEventDetails construction

---

### Step 6: Replace EventModal with NewEventModal (High Risk)

**File**: `src/components/timetable/TimetableClient.tsx`

**Changes**:

```typescript
// REMOVE old modal state
// const { openModal, closeModal, selectedEventDetails } = useEventModal();

// ADD new modal state
const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null);

const openModal = (event: TimetableEvent) => {
  setSelectedEvent(event);
};

const closeModal = () => {
  setSelectedEvent(null);
};

// REPLACE EventModal with NewEventModal
{selectedEvent && (
  <NewEventModal
    event={selectedEvent}
    onClose={closeModal}
  />
)}
```

**Test**: This is the critical change - test thoroughly

---

### Step 7: Remove Bridge Layer Code (Final Cleanup)

**Files to modify**:

1. **`timetable.service.ts`**:

   - ❌ Remove `convertNewEventsToTranslatableTimeSlots()` (~300 lines)
   - ❌ Remove `getSaturdayTranslatableData()`
   - ❌ Remove `getSundayTranslatableData()`
   - ❌ Remove `getSaturdayDataTranslated()`
   - ❌ Remove `getSundayDataTranslated()`
   - ❌ Remove `getTimetableDataServer()` (old version)

2. **`translatable.types.ts`**:

   - ❌ Remove `TranslatableTimeSlot` interface
   - ❌ Remove related types

3. **`timetableTranslation.ts`**:

   - ⚠️ Check if still needed for anything
   - ❌ Remove if obsolete

4. **`TimeSlot.tsx`**:

   - ❌ Remove `SelectedEventDetails` construction logic
   - ✅ Simplify to just display and forward events

5. **`useEventModal.ts`**:

   - ❌ Remove `SelectedEventDetails` interface
   - ❌ Remove old modal logic

6. **`EventModal/` directory**:
   - ❌ Delete entire directory (EventModal.tsx, EventDetails.tsx, etc.)

---

## 🧪 Testing Strategy

### Unit Testing Checklist

After each step:

- [ ] TypeScript compiles with no errors
- [ ] ESLint passes with no warnings
- [ ] Run dev server and check console for errors

### Integration Testing Checklist

After Step 6 (before cleanup):

- [ ] Test Saturday main-stage - all events display
- [ ] Test Sunday main-stage - all events display
- [ ] Test dance workshops (both days)
- [ ] Test music workshops (both days)
- [ ] Test salsa talks (both days)
- [ ] Click on events - modal opens correctly
- [ ] Test all event types in modal:
  - [ ] DJ sets (main-stage)
  - [ ] Live bands (main-stage)
  - [ ] Dance workshops
  - [ ] Music workshops
  - [ ] Regular talks
  - [ ] Aviatrix talks
- [ ] Test modal features:
  - [ ] Slides navigation
  - [ ] Images load correctly
  - [ ] Descriptions display
  - [ ] Bios display
  - [ ] Close button works
  - [ ] Click outside to close
  - [ ] ESC key to close
- [ ] Test translations:
  - [ ] Switch to German - all text translates
  - [ ] Switch to Spanish - all text translates
  - [ ] Event titles translate
  - [ ] Descriptions translate
  - [ ] Area names translate

### Visual Regression Testing

- [ ] Compare screenshots before/after
- [ ] Check mobile view (responsive)
- [ ] Check tablet view
- [ ] Check desktop view
- [ ] Test different browsers (Chrome, Firefox, Safari)

---

## 🔙 Rollback Strategy

If something goes wrong:

### Quick Rollback (Git)

```bash
# If changes are committed
git revert HEAD

# If changes are not committed
git restore .
```

### Partial Rollback

If only certain steps fail:

1. Keep Steps 1-2 (new methods, old ones still exist)
2. Revert Steps 3-6
3. System will work with old bridge layer

### Emergency Hotfix

If production is broken:

1. Deploy previous commit immediately
2. Investigate issues in development
3. Fix and re-test before re-deploying

---

## 📊 Success Metrics

✅ **Migration Complete When**:

- [ ] All TypeScript errors resolved
- [ ] All tests pass
- [ ] No console errors in browser
- [ ] All event types display correctly
- [ ] All modal features work
- [ ] Translations work in all languages
- [ ] ~600+ lines of legacy code removed:
  - ~300 lines from convertNewEventsToTranslatableTimeSlots
  - ~80 lines from translatable.types.ts
  - ~341 lines from EventModal directory
  - ~50-100 lines from various utilities

✅ **Performance Improvements**:

- Simpler data flow (fewer transformations)
- Type safety (discriminated unions)
- Better maintainability
- Cleaner architecture

---

## 🚀 Execution Timeline

**Phase 1: Preparation (30 minutes)**

- [ ] Run all current tests
- [ ] Take screenshots of working system
- [ ] Create new branch: `feature/remove-bridge-layer`
- [ ] Document current behavior

**Phase 2: New Methods (1 hour)**

- [ ] Steps 1-2: Add new methods alongside old ones
- [ ] Test that new methods return correct data
- [ ] Commit: "Add event-based timetable methods"

**Phase 3: Component Updates (2-3 hours)**

- [ ] Steps 3-5: Update components to use events
- [ ] Test incrementally
- [ ] Commit: "Update components to use events"

**Phase 4: Modal Replacement (1-2 hours)**

- [ ] Step 6: Replace EventModal with NewEventModal
- [ ] Test thoroughly
- [ ] Commit: "Replace EventModal with NewEventModal"

**Phase 5: Cleanup (30 minutes)**

- [ ] Step 7: Remove all bridge layer code
- [ ] Final testing
- [ ] Commit: "Remove bridge layer and legacy code"

**Phase 6: Final Verification (30 minutes)**

- [ ] Full regression testing
- [ ] Check all areas and event types
- [ ] Verify translations
- [ ] Performance check

---

## ⚠️ Risk Mitigation

### High Risk Areas

1. **Modal Replacement** (Step 6)

   - **Risk**: NewEventModal might not handle all edge cases
   - **Mitigation**: Keep EventModal as backup, test extensively first
   - **Fallback**: Can quickly switch back to old modal

2. **Event Data Structure** (Steps 3-5)

   - **Risk**: Missing fields or incorrect mapping
   - **Mitigation**: Use temporary conversion layer, test incrementally
   - **Fallback**: Temporary conversion can stay until verified

3. **Translation System** (All steps)
   - **Risk**: Translation keys might not work with new structure
   - **Mitigation**: Test in all 3 languages before cleanup
   - **Fallback**: Can add compatibility layer if needed

### Medium Risk Areas

1. **Type Definitions**

   - **Risk**: Breaking changes to interfaces
   - **Mitigation**: TypeScript will catch most issues
   - **Fallback**: Can add compatibility types temporarily

2. **Event Processing Logic**
   - **Risk**: Lost functionality in conversion
   - **Mitigation**: Document all transformations, test edge cases
   - **Fallback**: Can recreate logic in new format

---

## 📝 Notes

- Do NOT skip testing steps
- Commit after each phase
- Keep old code until final verification
- Document any unexpected issues
- Take breaks between phases for fresh perspective

---

## 🎯 Ready to Start?

Before beginning:

1. ✅ Read this entire document
2. ✅ Ensure you have time (4-6 hours)
3. ✅ Backup current code
4. ✅ Create feature branch
5. ✅ Run current tests to establish baseline

**Then execute steps 1-7 sequentially, testing after each step.**

Good luck! 🚀

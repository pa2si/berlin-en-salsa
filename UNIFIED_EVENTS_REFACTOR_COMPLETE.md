# UNIFIED EVENT COLLECTIONS REFACTOR - COMPLETE

## Overview

Successfully refactored the timetable event system to use unified, day-agnostic event collections. Events are no longer split by day at the file level - instead, the timeline configuration determines which events appear on which day.

## Architectural Change

### Before

- Separate files for each day:
  - `main-stage-saturday.ts` / `main-stage-sunday.ts`
  - `dance-workshops-saturday.ts` / `dance-workshops-sunday.ts`
  - `music-workshops-saturday.ts` / `music-workshops-sunday.ts`
  - `salsa-talks-saturday.ts` / `salsa-talks-sunday.ts`
- Day separation was implicit in file structure
- Difficult to move events between days

### After

- Single unified file per area:
  - `main-stage.ts` (all main stage events)
  - `dance-workshops.ts` (all dance workshop events)
  - `music-workshops.ts` (all music workshop events)
  - `salsa-talks.ts` (all salsa talks events)
- Day separation happens in timeline configuration
- Easy to move events between days - just update the timeline config

## Benefits

1. **Flexibility**: Moving an event from Saturday to Sunday is now as simple as referencing it in the Sunday timeline instead of the Saturday timeline
2. **Single Source of Truth**: Each event is defined once, not duplicated across files
3. **Cleaner Architecture**: Events are pure content definitions, timeline config handles scheduling
4. **Easier Maintenance**: Less duplication means fewer places to update when event details change

## How It Works

### Event Definition (Day-Agnostic)

Events are defined without any day information in the source files:

```typescript
// In dance-workshops.ts
export const danceWorkshopEvents: DanceWorkshopEvent[] = [
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.saturday.afroCubanDance",
    area: "dance-workshops",
    danceStyle: "Afro-Cuban",
    acts: [...],
    description: "...",
    image: "...",
  }),
  // More events...
];
```

### Timeline Configuration (Determines Day)

Timeline configurations reference events and assign them to time slots on specific days:

```typescript
// In timelineConfig.ts
export const danceWorkshopsSaturdayTimeline: TimelineSlot[] = [
  {
    time: "13:00",
    duration: 60,
    eventId: "Timetable.events.danceWorkshops.saturday.afroCubanDance",
  },
  // More Saturday slots...
];

export const danceWorkshopsSundayTimeline: TimelineSlot[] = [
  {
    time: "12:30",
    duration: 60,
    eventId: "Timetable.events.danceWorkshops.sunday.newYorkOn2",
  },
  // More Sunday slots...
];
```

### Service Layer (Combines Them and Adds Day)

The TimetableService uses both unified collections and timeline configs, and adds the day during enrichment:

```typescript
private static getSaturdayTranslatableData() {
  const danceWorkshopsTimelineEvents = createTimelineFromSimpleConfig(
    danceWorkshopsSaturdayTimeline,  // Saturday timeline
    danceWorkshopEvents,              // Unified collection
    "saturday",                       // Day is added during enrichment
  );
  // ...
}

private static getSundayTranslatableData() {
  const danceWorkshopsTimelineEvents = createTimelineFromSimpleConfig(
    danceWorkshopsSundayTimeline,     // Sunday timeline
    danceWorkshopEvents,              // Same unified collection
    "sunday",                         // Day is added during enrichment
  );
  // ...
}
```

### How Day Information Works

The day is determined at **runtime during enrichment**, not at the event definition level:

1. **Event Definition**: Events are stored in unified files without day property
2. **Timeline Configuration**: Separate Saturday and Sunday timelines reference events
3. **Enrichment Process**: When `createTimelineFromSimpleConfig()` is called, it:
   - Takes a timeline config (Saturday or Sunday)
   - Takes the unified event collection
   - Takes a day parameter (`"saturday"` or `"sunday"`)
   - Returns enriched events with `startTime`, `endTime`, `duration`, and `day` properties

This means the same event object can be enriched differently depending on which timeline references it.

## Files Changed

### Created New Unified Files

- `/src/data/timetable/events/main-stage/main-stage.ts`
- `/src/data/timetable/events/dance-workshops/dance-workshops.ts`
- `/src/data/timetable/events/music-workshops/music-workshops.ts`
- `/src/data/timetable/events/salsa-talks/salsa-talks.ts`

### Updated Imports and References

- `/src/data/timetable/index.ts` - Updated to export unified collections
- `/src/utils/timelineConfig.ts` - Updated imports to use unified collections
- `/src/data/timetable/services/timetable.service.ts` - Updated to use unified collections

### Deleted Old Split Files

- All `*-saturday.ts` and `*-sunday.ts` files from each event directory

## Moving Events Between Days

To move an event from Saturday to Sunday (or vice versa):

1. Open `/src/utils/timelineConfig.ts`
2. Remove the event from the Saturday timeline array
3. Add it to the Sunday timeline array with the desired time slot
4. Done! No need to touch the event definition file

Example:

```typescript
// Move Afro-Cuban Dance from Saturday to Sunday
// Just change this in timelineConfig.ts:

// Remove from Saturday
export const danceWorkshopsSaturdayTimeline: TimelineSlot[] = [
  // Remove this entry
];

// Add to Sunday
export const danceWorkshopsSundayTimeline: TimelineSlot[] = [
  {
    time: "14:00", // New time slot
    duration: 60,
    eventId: "Timetable.events.danceWorkshops.saturday.afroCubanDance",
  },
  // Other Sunday events...
];
```

Note: The event's title still has `.saturday.` in it for i18n key purposes, but that doesn't affect which day it appears on.

## Type Safety Maintained

- All TypeScript types remain intact
- No compilation errors after refactor
- Type guards added where startTime/endTime might be undefined
- Full type safety for event collections and timeline slots

## Testing Required

The only remaining task is to test the application to ensure:

- ✅ No TypeScript compilation errors
- [ ] Timetable displays correctly for all areas
- [ ] Both Saturday and Sunday tabs work properly
- [ ] Event modals show correct information and timing
- [ ] All 4 areas (main-stage, dance-workshops, music-workshops, salsa-talks) load correctly

## Next Steps

1. Run `npm run dev` to start the development server
2. Navigate to `/timetable` page
3. Test both Saturday and Sunday tabs for all 4 areas
4. Verify event modals display correctly
5. Confirm times and event details are accurate

## Conclusion

This refactor significantly improves the flexibility and maintainability of the timetable system. Events can now be easily moved between days, and the architecture clearly separates content (events) from scheduling (timeline config).

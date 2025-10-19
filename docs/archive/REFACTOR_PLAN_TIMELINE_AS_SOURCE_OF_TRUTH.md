# Refactor Plan: Timeline Configuration as Single Source of Truth for Event Timing

## Goal

Make events **independent of scheduling** by removing `startTime` and `endTime` from event definitions. The timeline configuration (`timelineConfig.ts`) should be the **only place** where event timing is defined.

## Current State Analysis

### What's Already Working ✅

The `generateTimeSlotsFromTimeline` function in `timelineConfig.ts` **already overrides** event times:

```typescript
slots.push({
  time: timeString,
  events: [
    {
      ...event,
      startTime: activeTimelineSlot.time, // ← Overwrites event's startTime
      endTime: calculateEndTime(
        // ← Overwrites event's endTime
        activeTimelineSlot.time,
        activeTimelineSlot.duration,
      ),
    },
  ],
});
```

So the infrastructure is **already in place**! We just need to clean up the event definitions.

## Benefits of This Refactor

1. **Single Source of Truth**: Timing only defined in one place (timeline config)
2. **Reusable Events**: Same event could be scheduled at different times
3. **Less Redundancy**: No need to specify time twice (in event + timeline)
4. **Cleaner Code**: Event definitions focus on content, not scheduling
5. **Easier Maintenance**: Change timing in one place only

## Changes Required

### 1. Type System Changes

**File: `/src/types/events.ts`**

Make `startTime` and `endTime` optional in `BaseEvent`:

```typescript
export interface BaseEvent {
  id: string;
  title: string;
  startTime?: string; // ← Make optional
  endTime?: string; // ← Make optional
  area: AreaType;
  image?: string;
  description?: string;
}
```

**Reasoning**: Events don't need timing until they're placed on the timeline.

### 2. EventFactory Changes

**File: `/src/utils/eventFactory.ts`**

Remove `startTime` and `endTime` from all factory method parameters (make them optional or remove entirely):

**Option A: Make them optional** (safer, backward compatible)

```typescript
static createMainStageEvent(params: {
  title: string;
  startTime?: string;  // ← Optional
  endTime?: string;    // ← Optional
  area: AreaType;
  performanceType: "live" | "dj-set";
  acts: Act[];
  // ... rest of params
}): MainStageEvent {
  return {
    type: "main-stage",
    id: generateEventId(params.area, params.day || "unknown", params.title),
    title: params.title,
    ...(params.startTime && { startTime: params.startTime }), // Only include if provided
    ...(params.endTime && { endTime: params.endTime }),       // Only include if provided
    area: params.area,
    // ... rest of return
  };
}
```

**Option B: Remove them completely** (cleaner, but breaking change)

```typescript
static createMainStageEvent(params: {
  title: string;
  // startTime removed
  // endTime removed
  area: AreaType;
  performanceType: "live" | "dj-set";
  acts: Act[];
  // ... rest of params
}): MainStageEvent {
  return {
    type: "main-stage",
    id: generateEventId(params.area, params.day || "unknown", params.title),
    title: params.title,
    // startTime not set
    // endTime not set
    area: params.area,
    // ... rest of return
  };
}
```

**Recommendation**: Use **Option A** for safer migration, then move to Option B later.

### 3. Event Definitions Changes

**Files to update** (all event definition files):

- `/src/data/timetable/events/main-stage/main-stage-saturday.ts`
- `/src/data/timetable/events/main-stage/main-stage-sunday.ts`
- `/src/data/timetable/events/dance-workshops/dance-workshops-saturday.ts`
- `/src/data/timetable/events/dance-workshops/dance-workshops-sunday.ts`
- `/src/data/timetable/events/music-workshops/music-workshops-saturday.ts`
- `/src/data/timetable/events/music-workshops/music-workshops-sunday.ts`
- `/src/data/timetable/events/salsa-talks/salsa-talks-saturday.ts`
- `/src/data/timetable/events/salsa-talks/salsa-talks-sunday.ts`

**Change from:**

```typescript
EventFactory.createMainStageEvent({
  title: "Timetable.events.mainStage.saturday.rodoElProfe",
  startTime: "13:00",  // ← REMOVE
  endTime: "13:30",    // ← REMOVE
  area: "main-stage",
  performanceType: "dj-set",
  day: "saturday",
  acts: [/* ... */],
}),
```

**Change to:**

```typescript
EventFactory.createMainStageEvent({
  title: "Timetable.events.mainStage.saturday.rodoElProfe",
  // No startTime
  // No endTime
  area: "main-stage",
  performanceType: "dj-set",
  day: "saturday",
  acts: [/* ... */],
}),
```

### 4. Timeline Config (No Changes Needed!)

**File: `/src/utils/timelineConfig.ts`**

This already works perfectly:

```typescript
export const mainStageSaturdayTimeline: TimelineSlot[] = [
  {
    time: "13:00", // ← Single source of truth for start time
    duration: 60, // ← Single source of truth for duration
    eventId: "Timetable.events.mainStage.saturday.rodoElProfe",
  },
  // ...
];
```

The `createTimelineFromSimpleConfig` function will fill in the timing.

### 5. Update Helper Functions

**File: `/src/utils/eventFactory.ts`**

The `calculateEndTime` helper can stay but won't be used in the factory anymore:

```typescript
/**
 * Helper function to calculate end time based on start time and duration
 * Now only used internally by timelineConfig, not by event creation
 */
function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHour = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}
```

Consider moving this to `timelineConfig.ts` since that's where it's actually used.

## Migration Steps

### Phase 1: Make Types Optional ✅

1. Update `BaseEvent` interface to make `startTime` and `endTime` optional
2. Run TypeScript compiler to check for issues
3. Fix any type errors

### Phase 2: Update EventFactory

1. Make `startTime` and `endTime` optional in all factory methods
2. Update return statements to conditionally include timing
3. Test with existing event definitions

### Phase 3: Update All Event Definitions

For each event file:

1. Remove `startTime` parameter
2. Remove `endTime` parameter
3. Keep `day` parameter (needed for ID generation)
4. Verify timeline config has matching entry

### Phase 4: Verification

1. Run the app and check all timetable areas
2. Verify modals show correct timing
3. Verify grid displays correctly
4. Check that all events match their timeline slots

### Phase 5: Documentation Updates

1. Update `TIMETABLE_ARCHITECTURE_ANALYSIS.md`
2. Update code comments
3. Update README if needed

## Detailed File Changes

### File: `/src/types/events.ts`

```typescript
/**
 * Base interface for all events - contains common fields
 * Note: startTime and endTime are optional because they're set by the timeline configuration
 */
export interface BaseEvent {
  id: string; // Unique identifier for the event
  title: string; // Event title (translatable key)
  startTime?: string; // Set by timeline config, not event definition
  endTime?: string; // Set by timeline config, not event definition
  area: AreaType; // Which area this event belongs to
  image?: string; // Primary image
  description?: string; // Event description (translatable key)
}
```

### File: `/src/utils/eventFactory.ts`

Update each factory method. Example for `createMainStageEvent`:

```typescript
static createMainStageEvent(params: {
  title: string;
  startTime?: string; // Optional - will be set by timeline config
  endTime?: string; // Optional - will be set by timeline config
  area: AreaType;
  performanceType: "live" | "dj-set";
  acts: Act[];
  genre?: string;
  image?: string;
  description?: string;
  slides?: MediaSlide[];
  hasShow?: boolean;
  danceShow?: string;
  dancers?: string;
  day?: string;
}): MainStageEvent {
  const id = generateEventId(
    params.area,
    params.day || "unknown",
    params.title,
  );

  return {
    type: "main-stage",
    id,
    title: params.title,
    // Only include startTime/endTime if provided
    ...(params.startTime && { startTime: params.startTime }),
    ...(params.endTime && { endTime: params.endTime }),
    area: params.area,
    performanceType: params.performanceType,
    acts: params.acts,
    genre: params.genre,
    image: params.image,
    description: params.description,
    slides: params.slides,
    hasShow: params.hasShow,
    danceShow: params.danceShow,
    dancers: params.dancers,
  };
}
```

Repeat for:

- `createDanceWorkshop`
- `createMusicWorkshop`
- `createTalk`
- `createAviatrixTalk`
- `createDanceShow`

### File: `/src/data/timetable/events/main-stage/main-stage-saturday.ts`

```typescript
export const mainStageSaturdayEvents: TimetableEvent[] = [
  // Rodo & El Profe DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.rodoElProfe",
    // startTime removed - defined in timeline config
    // endTime removed - defined in timeline config
    area: "main-stage",
    performanceType: "dj-set",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.rodoLeFou",
        role: "dj",
        bio: "Timetable.events.bios.rodoLeFou",
        image: "/rodo-le-fou.webp",
      }),
      EventFactory.createAct({
        name: "Timetable.events.artists.elProfe",
        role: "dj",
        bio: "Timetable.events.bios.elProfe",
        image: "/el-profe.webp",
      }),
    ],
    slides: [
      EventFactory.createSlide({
        type: "image",
        image: "/rodo-le-fou.webp",
      }),
      EventFactory.createSlide({
        type: "image",
        image: "/el-profe.webp",
      }),
    ],
  }),

  // EC Kuba DJ Set
  EventFactory.createMainStageEvent({
    title: "Timetable.events.mainStage.saturday.ecKubaSet",
    // startTime removed
    // endTime removed
    area: "main-stage",
    performanceType: "dj-set",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.ecKuba",
        role: "dj",
        bio: "Timetable.events.bios.ecKuba",
        image: "/ec-kuba.webp",
      }),
    ],
    image: "/ec-kuba.webp",
  }),

  // ... continue for all events
];
```

### File: `/src/data/timetable/events/dance-workshops/dance-workshops-saturday.ts`

```typescript
export const danceWorkshopSaturdayEvents: TimetableEvent[] = [
  EventFactory.createDanceWorkshop({
    title: "Timetable.events.danceWorkshops.saturday.leidianaRogerPartnerwork",
    // startTime removed
    // endTime removed (was calculated from duration anyway)
    duration: 90, // Keep duration - it's about the event, not the schedule
    area: "dance-workshops",
    danceStyle: "Cuban Salsa",
    day: "saturday",
    acts: [
      EventFactory.createAct({
        name: "Timetable.events.artists.leidiana",
        role: "instructor",
        bio: "Timetable.events.bios.leidiana",
        image: "/leidiana.webp",
      }),
      // ...
    ],
  }),
  // ...
];
```

**Note**: Keep `duration` in workshop events - it's an intrinsic property of the workshop itself, not just scheduling.

## Testing Checklist

After making changes, verify:

- [ ] TypeScript compiles without errors
- [ ] App runs without runtime errors
- [ ] Timetable grid displays all events correctly
- [ ] All event times match timeline configuration
- [ ] Event modals show correct start/end times
- [ ] All 4 timetable areas work (main-stage, dance-workshops, music-workshops, salsa-talks)
- [ ] Both Saturday and Sunday timetables work
- [ ] Event click handlers work correctly
- [ ] URL parameters work for deep linking to events
- [ ] Translation system still works for all event data

## Potential Issues & Solutions

### Issue 1: Type Errors with Optional startTime/endTime

**Solution**: Update any code that assumes these fields always exist to handle undefined:

```typescript
// Before
const duration = calculateDuration(event.startTime, event.endTime);

// After
if (event.startTime && event.endTime) {
  const duration = calculateDuration(event.startTime, event.endTime);
}
```

### Issue 2: Grid Display Assumes Times Exist

**Solution**: The grid receives events from `generateTimeSlotsFromTimeline` which **always sets** startTime/endTime, so this shouldn't be an issue.

### Issue 3: Modal Displays Need Times

**Solution**: Same as above - by the time events reach the modal, they have times from the timeline.

### Issue 4: EventAdapter Expects Times

**Solution**: The adapter receives events from `findEvent` which gets them from `TimelineSlot[]` - times are already set.

## Future Enhancements

### 1. Remove `day` Parameter Too

Once this refactor is complete, consider removing the `day` parameter from events as well. The day could be inferred from which timeline file it's in:

```typescript
// Current
EventFactory.createMainStageEvent({
  title: "...",
  area: "main-stage",
  day: "saturday", // ← Could be removed
  // ...
});

// Future - day inferred from file location
// In main-stage-saturday.ts, day is implicitly "saturday"
EventFactory.createMainStageEvent({
  title: "...",
  area: "main-stage",
  // day removed - inferred from file
  // ...
});
```

Then update `generateEventId` to either:

- Accept day as a parameter from timeline config
- Generate IDs without day (just `{area}-{title}`)
- Use timeline config to enrich events with day info

### 2. Event Reusability

With timing removed, the same event could be scheduled multiple times:

```typescript
// Define event once
const workshopEvent = EventFactory.createDanceWorkshop({
  title: "Popular Beginner Workshop",
  area: "dance-workshops",
  // ... other props
});

// Schedule multiple times
export const saturdayTimeline = [
  { time: "14:00", duration: 90, eventId: workshopEvent.title },
  { time: "18:00", duration: 90, eventId: workshopEvent.title }, // Same workshop, different time!
];
```

### 3. Dynamic Scheduling

Could load timeline configurations from CMS or database:

```typescript
// Timeline from API instead of hardcoded
const timeline = await fetchTimelineFromCMS("saturday", "main-stage");
```

## Conclusion

This refactor will:

1. ✅ Make events independent of scheduling
2. ✅ Establish timeline config as single source of truth
3. ✅ Reduce code duplication
4. ✅ Improve maintainability
5. ✅ Enable future features (event reusability, dynamic scheduling)

The infrastructure is already in place - we just need to clean up the event definitions!

## Ready to Proceed?

The changes are **backward compatible** if we make startTime/endTime optional. We can migrate incrementally:

1. Update types (breaking: optional fields)
2. Update EventFactory (non-breaking: optional params)
3. Update event definitions file by file
4. Test each area as we go

Would you like me to start implementing these changes?

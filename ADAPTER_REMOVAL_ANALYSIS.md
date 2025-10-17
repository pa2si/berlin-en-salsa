# Event Adapter Removal Analysis

## Executive Summary

**YES, removing the adapter would be SIGNIFICANTLY less complex!**

The adapter system exists solely as a **temporary bridge** between:

- **New data format**: `TimetableEvent` (clean, type-safe event structure)
- **Old modal format**: `SelectedEventDetails` (legacy interface with 40+ optional fields)

Removing it would:

- ✅ Eliminate 221 lines of adapter code
- ✅ Remove an entire file (`NewEventModal.tsx`)
- ✅ Delete the complex `SelectedEventDetails` interface
- ✅ Simplify the entire modal component tree
- ✅ Reduce translation calls (currently translating twice in some cases)
- ✅ Make the code more maintainable and easier to understand

---

## Current Architecture (With Adapter)

```
TimetableClient
  ↓ (stores TimetableEvent)
  selectedEvent: TimetableEvent | null
  ↓ (passes to)
NewEventModal (wrapper)
  ↓ (uses)
useEventAdapter()
  ↓ (converts + translates)
SelectedEventDetails (40+ optional fields)
  ↓ (passes to)
EventModal
  ↓ (renders)
  ├── EventDetails
  ├── EventSlider
  └── EventNavigation
```

**Problems:**

1. **Double wrapping**: `NewEventModal` exists only to call adapter
2. **Complex conversion**: 221 lines mapping between formats
3. **Type bloat**: `SelectedEventDetails` has 40+ optional fields
4. **Translation duplication**: Some fields translated in adapter, some in UI
5. **Maintenance burden**: Changes require updates in multiple places

---

## Proposed Architecture (Without Adapter)

```
TimetableClient
  ↓ (stores TimetableEvent)
  selectedEvent: TimetableEvent | null
  ↓ (passes directly to)
EventModal (refactored to accept TimetableEvent)
  ↓ (renders based on event.type)
  ├── MainStageDetails (for main-stage events)
  ├── WorkshopDetails (for workshop events)
  ├── TalkDetails (for talk events)
  └── DanceShowDetails (for dance-show events)
```

**Benefits:**

1. **Single source of truth**: `TimetableEvent` all the way through
2. **Type safety**: TypeScript discriminated unions for event types
3. **Simpler logic**: Render based on `event.type` directly
4. **Better performance**: No unnecessary format conversion
5. **Easier maintenance**: One format, one path

---

## Files to Remove

### 1. `/src/components/timetable/adapters/eventAdapter.ts` (221 lines)

Entire file can be deleted.

### 2. `/src/components/timetable/NewEventModal.tsx` (30 lines)

Entire file can be deleted - was just a wrapper.

### 3. `/src/components/timetable/hooks/useEventModal.ts` (77 lines)

The `SelectedEventDetails` interface can be deleted.
The modal state management is already in `TimetableClient`.

**Total deletion: ~328 lines of code**

---

## Files to Refactor

### 1. `TimetableClient.tsx`

**Before:**

```tsx
import NewEventModal from "./NewEventModal";

const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null);

{
  selectedEvent && <NewEventModal event={selectedEvent} onClose={closeModal} />;
}
```

**After:**

```tsx
import EventModal from "./EventModal/EventModal";

const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null);

{
  selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />;
}
```

**Change: 1 line** (import path)

---

### 2. `EventModal/EventModal.tsx`

**Current Props:**

```tsx
interface EventModalProps {
  selectedEventDetails: SelectedEventDetails;
  onClose: () => void;
}
```

**New Props:**

```tsx
interface EventModalProps {
  event: TimetableEvent;
  onClose: () => void;
}
```

**Refactoring Strategy:**
Instead of one monolithic `EventDetails` component that handles all types,
create specialized components for each event type.

**New Structure:**

```tsx
export default function EventModal({ event, onClose }: EventModalProps) {
  const t = useTranslations("Timetable");
  const { translateIfKey } = useSmartTranslation();

  // Modal wrapper, keyboard handlers, etc. (unchanged)

  return (
    <motion.div {...modalProps}>
      <h3 className="text-bes-red mb-2 text-2xl font-black">
        {translateIfKey(event.title)}
      </h3>

      {/* Render appropriate detail component based on event type */}
      {isMainStageEvent(event) && <MainStageDetails event={event} />}
      {isDanceWorkshopEvent(event) && (
        <WorkshopDetails event={event} type="dance" />
      )}
      {isMusicWorkshopEvent(event) && (
        <WorkshopDetails event={event} type="music" />
      )}
      {isTalkEvent(event) && <TalkDetails event={event} />}
      {isAviatrixTalkEvent(event) && <AviatrixTalkDetails event={event} />}
      {isDanceShowEvent(event) && <DanceShowDetails event={event} />}
    </motion.div>
  );
}
```

---

### 3. Create New Detail Components

#### `MainStageDetails.tsx` (NEW)

```tsx
interface MainStageDetailsProps {
  event: MainStageEvent;
}

export default function MainStageDetails({ event }: MainStageDetailsProps) {
  const { translateIfKey } = useSmartTranslation();
  const t = useTranslations("Timetable");

  const djCount = event.acts.filter((act) => act.role === "dj").length;
  const actTypeLabel =
    event.performanceType === "dj-set"
      ? djCount > 1
        ? "DJ Sets"
        : "DJ Set"
      : "Live Band";

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        <p>
          <strong>{t("modal.timeLabel")}</strong> {event.startTime} -{" "}
          {event.endTime}
        </p>
        <p>
          <strong>{t("modal.actTypeLabel")}</strong> {actTypeLabel}
        </p>
        {event.hasShow && (
          <p>
            <strong>{t("modal.danceShowLabel")}</strong>{" "}
            {translateIfKey(event.danceShow)}
          </p>
        )}
      </div>

      {/* Slider for DJs/Band members */}
      <EventSlider
        slides={event.acts.map((act) => ({
          image: act.image,
          name: translateIfKey(act.name),
          bio: translateIfKey(act.bio || act.description),
        }))}
      />
    </>
  );
}
```

#### `WorkshopDetails.tsx` (NEW)

```tsx
interface WorkshopDetailsProps {
  event: DanceWorkshopEvent | MusicWorkshopEvent;
  type: "dance" | "music";
}

export default function WorkshopDetails({ event, type }: WorkshopDetailsProps) {
  const { translateIfKey } = useSmartTranslation();
  const t = useTranslations("Timetable");
  const instructors = event.acts.filter((act) => act.role === "instructor");

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        <p>
          <strong>{t("modal.timeLabel")}</strong> {event.startTime} -{" "}
          {event.endTime}
        </p>
        <p>
          <strong>{t("modal.typeLabel")}</strong>{" "}
          {type === "dance"
            ? t("modal.danceWorkshop")
            : t("modal.musicWorkshop")}
        </p>
        {event.level && (
          <p>
            <strong>{t("modal.levelLabel")}</strong>{" "}
            {t(`modal.level.${event.level}`)}
          </p>
        )}
      </div>

      {/* Instructors */}
      {instructors.map((instructor, index) => (
        <div key={index} className="mb-4">
          {instructor.image && (
            <img
              src={instructor.image}
              alt={translateIfKey(instructor.name)}
              className="mb-2 w-full rounded-lg"
            />
          )}
          <h4 className="font-bold">{translateIfKey(instructor.name)}</h4>
          <p className="text-sm">{translateIfKey(instructor.bio)}</p>
        </div>
      ))}

      {event.description && (
        <p className="mt-4 text-sm">{translateIfKey(event.description)}</p>
      )}
    </>
  );
}
```

#### `TalkDetails.tsx` (NEW)

```tsx
interface TalkDetailsProps {
  event: TalkEvent;
}

export default function TalkDetails({ event }: TalkDetailsProps) {
  const { translateIfKey } = useSmartTranslation();
  const t = useTranslations("Timetable");

  const presenter = event.acts.find((act) => act.role === "presenter");
  const moderator = event.acts.find((act) => act.role === "moderator");
  const guests = event.acts.filter((act) => act.role === "guest");

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        <p>
          <strong>{t("modal.timeLabel")}</strong> {event.startTime} -{" "}
          {event.endTime}
        </p>
        {presenter && (
          <p>
            <strong>{t("modal.presenterLabel")}</strong>{" "}
            {translateIfKey(presenter.name)}
          </p>
        )}
        {moderator && (
          <p>
            <strong>{t("modal.moderatorLabel")}</strong>{" "}
            {translateIfKey(moderator.name)}
          </p>
        )}
        {guests.length > 0 && (
          <p>
            <strong>{t("modal.guestsLabel")}</strong>{" "}
            {guests.map((g) => translateIfKey(g.name)).join(", ")}
          </p>
        )}
      </div>

      {/* Slides if available */}
      {event.slides && event.slides.length > 0 && (
        <EventSlider
          slides={event.slides.map((slide) => ({
            image: slide.image,
            caption: translateIfKey(slide.caption),
            bio: translateIfKey(slide.bio),
            description: translateIfKey(slide.content),
          }))}
        />
      )}

      {event.description && (
        <p className="mt-4 text-sm">{translateIfKey(event.description)}</p>
      )}
    </>
  );
}
```

#### `AviatrixTalkDetails.tsx` (NEW)

```tsx
interface AviatrixTalkDetailsProps {
  event: AviatrixTalkEvent;
}

export default function AviatrixTalkDetails({
  event,
}: AviatrixTalkDetailsProps) {
  const { translateIfKey } = useSmartTranslation();
  const t = useTranslations("Timetable");

  const moderator = event.acts.find((act) => act.role === "moderator");
  const guest = event.acts.find((act) => act.role === "guest");

  return (
    <>
      <div className="mb-4 text-sm text-gray-600">
        <p>
          <strong>{t("modal.timeLabel")}</strong> {event.startTime} -{" "}
          {event.endTime}
        </p>
        <p className="text-bes-red font-bold">Aviatrix Session</p>
        {moderator && (
          <p>
            <strong>{t("modal.moderatorLabel")}</strong>{" "}
            {translateIfKey(moderator.name)}
          </p>
        )}
        {guest && (
          <p>
            <strong>{t("modal.guestLabel")}</strong>{" "}
            {translateIfKey(guest.name)}
          </p>
        )}
      </div>

      {/* Featured Record Section */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <h3 className="text-bes-red mb-2 text-xl font-bold">
          {t("modal.featuredRecordLabel")}
        </h3>
        <h4 className="mb-1 text-lg font-bold text-gray-600">
          {t("modal.artistLabel")} {translateIfKey(event.artistDiscussed)}
        </h4>
        <h4 className="mb-1 text-lg font-bold text-gray-600">
          {t("modal.recordLabel")} {translateIfKey(event.recordDiscussed)}
        </h4>
      </div>

      {/* Slides */}
      {event.slides && event.slides.length > 0 && (
        <EventSlider slides={event.slides} />
      )}

      {/* Guest bio */}
      {guest?.bio && (
        <div className="mt-4">
          <h4 className="mb-2 font-bold">{t("modal.aboutGuestLabel")}</h4>
          <p className="text-sm">{translateIfKey(guest.bio)}</p>
        </div>
      )}

      {/* Moderator comment */}
      {event.moderatorComment && (
        <div className="mt-4 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
          <p className="text-sm italic">
            {translateIfKey(event.moderatorComment)}
          </p>
        </div>
      )}
    </>
  );
}
```

---

## Complexity Comparison

### Current System (With Adapter)

```
Files: 8
Lines: ~1,000
Data transformations: 3
  1. TimetableEvent → SelectedEventDetails (adapter)
  2. SelectedEventDetails → UI props (EventDetails)
  3. Translation happens in multiple places

Type definitions:
  - TimetableEvent (7 variants)
  - SelectedEventDetails (40+ optional fields)
  - Bridge layer mappings

Maintenance points:
  - Adding new event type: 4 files to modify
  - Changing event structure: 3+ files to modify
```

### Proposed System (Without Adapter)

```
Files: 8 (same count but simpler)
Lines: ~700 (30% reduction)
Data transformations: 1
  1. TimetableEvent → UI (direct rendering)

Type definitions:
  - TimetableEvent (7 variants) - Single source of truth
  - Component props mirror event types exactly

Maintenance points:
  - Adding new event type: 2 files to modify
    1. Add type to events.ts
    2. Create DetailComponent.tsx
  - Changing event structure: 1 file to modify
```

---

## Migration Steps

### Step 1: Create Detail Components (New Files)

- [ ] `EventModal/MainStageDetails.tsx`
- [ ] `EventModal/WorkshopDetails.tsx`
- [ ] `EventModal/TalkDetails.tsx`
- [ ] `EventModal/AviatrixTalkDetails.tsx`
- [ ] `EventModal/DanceShowDetails.tsx`

**Time: 3-4 hours** (most are simple, just restructuring existing UI)

### Step 2: Refactor EventModal.tsx

- [ ] Change props from `SelectedEventDetails` to `TimetableEvent`
- [ ] Replace `EventDetails` with type-specific components
- [ ] Keep slider/navigation logic (can be reused)

**Time: 1-2 hours**

### Step 3: Update TimetableClient.tsx

- [ ] Change import from `NewEventModal` to `EventModal`
- [ ] Update prop passing

**Time: 5 minutes**

### Step 4: Delete Files

- [ ] Delete `adapters/eventAdapter.ts`
- [ ] Delete `NewEventModal.tsx`
- [ ] Delete `hooks/useEventModal.ts` (or remove `SelectedEventDetails` interface)

**Time: 5 minutes**

### Step 5: Testing

- [ ] Test each event type in modal
- [ ] Test slider functionality
- [ ] Test translations
- [ ] Test responsive layout

**Time: 1-2 hours**

**Total Time: 5-8 hours**

---

## Risk Assessment

### Low Risk ✅

- **Type safety**: TypeScript will catch any issues at compile time
- **UI preservation**: We're keeping the same UI components (EventSlider, etc.)
- **No data changes**: Event data structure stays the same
- **Isolated change**: Modal system is self-contained

### Medium Risk ⚠️

- **Translation keys**: Need to verify all translation keys still work
- **Slider logic**: Need to ensure slides work with new structure
- **Edge cases**: Events with missing data need handling

### Mitigation

1. **Incremental approach**: Create new components alongside old ones
2. **Feature flag**: Keep adapter temporarily, switch via prop
3. **Comprehensive testing**: Test each event type thoroughly
4. **Rollback plan**: Keep deleted files in git history

---

## Recommendation

**Remove the adapter!** Here's why:

### For Scalability Refactor

If you're already refactoring for scalability (multi-day support), this is the **perfect time** to remove the adapter:

- You're already touching the modal system
- Combined effort will be more efficient
- Cleaner codebase for future days

### Benefits Align with Goals

Both refactors share the same goal: **config-driven, scalable architecture**

- Multi-day: Config-driven day rendering
- Adapter removal: Type-driven modal rendering

### Technical Debt

The adapter is explicitly labeled as **temporary** in comments:

```typescript
// "This adapter allows us to use the original EventModal UI with new TimetableEvent data"
```

Now is the time to complete the migration.

---

## Combined Refactor Plan

If you want to do **both refactors together**, here's the recommended order:

### Phase A: Remove Adapter (5-8 hours)

Do this FIRST - it's simpler and has less risk

### Phase B: Multi-Day Scalability (22-30 hours)

Do this SECOND - cleaner codebase makes this easier

### Phase C: Testing & Polish (4-6 hours)

Test everything together

**Total: 31-44 hours** (vs. 35-50 hours if done separately)

---

## Decision Point

**Option 1: Remove adapter NOW** ✅ Recommended

- Clean slate for scalability refactor
- Better code quality
- Easier maintenance

**Option 2: Remove adapter AFTER scalability refactor**

- Less complexity up front
- But adapter complicates day refactor
- Two separate testing cycles

**Option 3: Keep adapter indefinitely**

- ❌ Not recommended - it's technical debt
- Makes future changes harder
- Confuses future developers

---

## My Recommendation

**Remove the adapter FIRST**, then tackle scalability. Here's why:

1. **Simpler mental model**: One type system throughout
2. **Better TypeScript support**: Full type inference without conversions
3. **Easier debugging**: Direct path from data to UI
4. **Cleaner scalability refactor**: Won't have to work around adapter
5. **Faster iteration**: Changes require fewer file modifications

Would you like me to start removing the adapter? I can do it incrementally to minimize risk!

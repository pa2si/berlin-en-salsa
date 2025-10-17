# Adapter Removal with 100% UI Fidelity - Strategy

## Critical Insight

You're absolutely right - we need to **preserve the exact UI/UX** including:

- ✅ All class names (text-2xl, text-bes-red, mb-2, etc.)
- ✅ Font sizes (text-lg, text-xl, etc.)
- ✅ All spacing (mb-4, mb-6, p-4, etc.)
- ✅ Slider interface and touch handlers
- ✅ Navigation pills with exact styling
- ✅ Animation timings (duration: 0.2, spring stiffness: 300, etc.)
- ✅ Conditional rendering logic order
- ✅ Translation key handling

## Why Previous Attempt Failed

The UI changed because we tried to **create new components from scratch**, which inevitably led to:

- Different class names
- Different ordering of elements
- Different conditional logic
- Missing edge cases
- Different translation handling

## New Strategy: Surgical Refactor

Instead of creating new components, we'll:

1. **Keep EventModal.tsx exactly as-is** (just change prop type)
2. **Keep EventDetails.tsx exactly as-is** (just change prop type)
3. **Keep EventSlider.tsx exactly as-is** (no changes needed)
4. **Keep EventNavigation.tsx exactly as-is** (no changes needed)
5. **Move the adapter logic INSIDE EventModal/EventDetails** instead of external file

This guarantees **100% UI fidelity** because we're not touching the JSX at all!

---

## The Key Realization

Looking at the adapter code (`eventAdapter.ts`), it's doing ONE thing:

```
TimetableEvent → SelectedEventDetails (format conversion)
```

And then `EventModal`/`EventDetails` renders `SelectedEventDetails`.

**New approach:**
Make `EventModal`/`EventDetails` accept EITHER:

- `TimetableEvent` (new)
- `SelectedEventDetails` (old - for backward compatibility)

Then internally convert `TimetableEvent` → `SelectedEventDetails` using the **exact same logic** from the adapter.

This way:

- ✅ Zero JSX changes
- ✅ Zero UI changes
- ✅ Zero styling changes
- ✅ Same rendering logic
- ✅ Same translation handling

---

## Implementation Steps

### Step 1: Make Props Accept Both Types

**File: `EventModal/EventModal.tsx`**

```tsx
import { TimetableEvent } from "../../types/events";
import { SelectedEventDetails } from "../hooks/useEventModal";

interface EventModalProps {
  // Accept EITHER format
  event?: TimetableEvent;
  selectedEventDetails?: SelectedEventDetails;
  onClose: () => void;
}

export default function EventModal({
  event,
  selectedEventDetails: providedDetails,
  onClose,
}: EventModalProps) {
  // If TimetableEvent provided, convert it
  const selectedEventDetails = event
    ? convertTimetableEventToSelectedDetails(event)
    : providedDetails!;

  // REST OF THE CODE STAYS EXACTLY THE SAME
  const t = useTranslations("Timetable");
  const { currentSlideIndex, goToSlide, ... } = useSlider();
  // ... exact same code ...
}

// Add conversion function at bottom of file (copy from adapter)
function convertTimetableEventToSelectedDetails(event: TimetableEvent): SelectedEventDetails {
  // EXACT SAME CODE from eventAdapter.ts
  // Just copy-paste the entire function body
}
```

### Step 2: Update TimetableClient

**File: `TimetableClient.tsx`**

```tsx
// Change import
import EventModal from "./EventModal/EventModal";

// Keep state exactly the same
const [selectedEvent, setSelectedEvent] = useState<TimetableEvent | null>(null);

// Update modal rendering
{
  selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />;
}
```

### Step 3: Delete Old Files

- ❌ Delete `adapters/eventAdapter.ts`
- ❌ Delete `NewEventModal.tsx`

---

## Detailed Conversion Function Location

### Option A: Inside EventModal.tsx (Recommended)

**Pros:**

- Self-contained
- Easy to find
- Clear dependency

**Cons:**

- Makes file longer (~450 lines)

### Option B: Separate utility file

Create `EventModal/eventConversion.ts`:

```tsx
import { TimetableEvent, ... } from "../../types/events";
import { SelectedEventDetails } from "../hooks/useEventModal";
import { useSmartTranslation } from "../../data/timetable/utils/smartTranslation";

export function convertTimetableEventToSelectedDetails(
  event: TimetableEvent,
  translateIfKey: (key?: string) => string
): SelectedEventDetails {
  // EXACT SAME CODE from eventAdapter.ts
  // No changes to logic
}
```

Then in `EventModal.tsx`:

```tsx
import { convertTimetableEventToSelectedDetails } from "./eventConversion";

export default function EventModal({
  event,
  selectedEventDetails: providedDetails,
  onClose,
}) {
  const { translateIfKey } = useSmartTranslation();

  const selectedEventDetails = event
    ? convertTimetableEventToSelectedDetails(event, translateIfKey)
    : providedDetails!;

  // REST STAYS EXACTLY THE SAME
}
```

**This is safer because:**

- EventModal JSX stays untouched
- No risk of changing UI accidentally
- Conversion is a pure function

---

## Complete Migration Path

### Phase 1: Add Backward Compatibility (30 min)

1. Create `EventModal/eventConversion.ts`
2. Copy entire conversion logic from `eventAdapter.ts` (no changes)
3. Update `EventModal.tsx` to accept both prop types
4. Test with OLD system (pass `selectedEventDetails`)
5. Verify UI is identical

### Phase 2: Switch to New System (10 min)

1. Update `TimetableClient.tsx` to pass `event` instead
2. Test with NEW system
3. Verify UI is identical

### Phase 3: Cleanup (5 min)

1. Delete `adapters/eventAdapter.ts`
2. Delete `NewEventModal.tsx`
3. Remove old prop from `EventModal` (make `event` required)

---

## Testing Checklist

For **every event type**, verify:

### Main Stage Events

- [ ] DJ Set (single DJ)
- [ ] DJ Sets (multiple DJs)
- [ ] Live Band
- [ ] Live Band with Dance Show
- [ ] Slide navigation with arrows
- [ ] Slide navigation with pills
- [ ] Touch swipe left/right
- [ ] Keyboard arrows left/right

### Workshop Events

- [ ] Dance workshop (single instructor)
- [ ] Dance workshop (two instructors)
- [ ] Music workshop
- [ ] Description text
- [ ] Bio text
- [ ] Image display

### Talk Events (Regular)

- [ ] Presenter display
- [ ] Moderator display
- [ ] Guest display
- [ ] Description
- [ ] Bio
- [ ] Comment section
- [ ] Multiple slides

### Talk Events (Aviatrix)

- [ ] "Aviatrix Session" header
- [ ] "Hosted by" label (not "Moderator")
- [ ] Featured Record section
- [ ] Artist name
- [ ] Record name
- [ ] Guest bio below slides
- [ ] Moderator comment
- [ ] Slide navigation with record as pill label

### Dance Show Events

- [ ] Show name
- [ ] Dancers display
- [ ] Multiple dancers
- [ ] Slides

### UI Elements (All Events)

- [ ] Title: `text-2xl font-black text-bes-red mb-2`
- [ ] Time: `text-lg font-bold text-gray-700` with clock icon
- [ ] Labels: `text-lg text-gray-700`
- [ ] Section headers: `text-xl font-bold text-bes-red mb-2`
- [ ] Body text: `text-xl text-gray-700 md:leading-relaxed`
- [ ] Close button: `bg-bes-red hover:bg-bes-red/90 rounded-full px-6 py-2`
- [ ] Modal: `max-w-md rounded-xl bg-white p-6 shadow-2xl`
- [ ] Animations: opacity transitions 0.2s, spring stiffness 300

### Edge Cases

- [ ] Events without images
- [ ] Events without bio
- [ ] Events without description
- [ ] Single slide (no navigation)
- [ ] Translation key handling (starts with "Timetable.")
- [ ] Events with all optional fields empty

---

## Risk Mitigation

### Keep Adapter Temporarily

We can use a **feature flag** during migration:

```tsx
// EventModal.tsx
const USE_NEW_FORMAT = true; // Toggle this for testing

export default function EventModal({ event, selectedEventDetails, onClose }) {
  let details: SelectedEventDetails;

  if (USE_NEW_FORMAT && event) {
    details = convertTimetableEventToSelectedDetails(event, translateIfKey);
  } else if (selectedEventDetails) {
    details = selectedEventDetails;
  } else {
    throw new Error("Must provide either event or selectedEventDetails");
  }

  // Rest of code uses `details`
}
```

This allows **instant rollback** if any issues are found.

---

## Exact Code Changes

### File 1: `src/components/timetable/EventModal/eventConversion.ts` (NEW)

```tsx
/**
 * Converts TimetableEvent to SelectedEventDetails format
 * This function contains the EXACT logic from the original adapter
 * to ensure 100% UI fidelity
 */

import {
  TimetableEvent,
  isMainStageEvent,
  isDanceWorkshopEvent,
  isMusicWorkshopEvent,
  isTalkEvent,
  isAviatrixTalkEvent,
  isDanceShowEvent,
} from "../../../types/events";
import { SelectedEventDetails } from "../hooks/useEventModal";

export function convertTimetableEventToSelectedDetails(
  event: TimetableEvent,
  translateIfKey: (key?: string) => string,
): SelectedEventDetails {
  // COPY ENTIRE FUNCTION BODY FROM eventAdapter.ts
  // Lines 25-220 - NO CHANGES
  const baseDetails: SelectedEventDetails = {
    event: translateIfKey(event.title),
    time: event.startTime || "",
    endTime: event.endTime,
  };

  // ... rest of the exact same code ...

  return baseDetails;
}
```

### File 2: `src/components/timetable/EventModal/EventModal.tsx` (MODIFIED)

```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { TimetableEvent } from "../../../types/events"; // ADD
import { SelectedEventDetails } from "../hooks/useEventModal";
import { useSlider } from "../hooks/useSlider";
import { useSmartTranslation } from "../../../data/timetable/utils/smartTranslation"; // ADD
import { convertTimetableEventToSelectedDetails } from "./eventConversion"; // ADD
import EventDetails from "./EventDetails";
import EventSlider from "./EventSlider";
import EventNavigation from "./EventNavigation";

interface EventModalProps {
  event?: TimetableEvent; // ADD - new prop
  selectedEventDetails?: SelectedEventDetails; // CHANGE to optional
  onClose: () => void;
}

export default function EventModal({
  event, // ADD
  selectedEventDetails: providedDetails, // RENAME
  onClose,
}: EventModalProps) {
  const t = useTranslations("Timetable");
  const { translateIfKey } = useSmartTranslation(); // ADD

  // ADD: Convert if TimetableEvent provided
  const selectedEventDetails = event
    ? convertTimetableEventToSelectedDetails(event, translateIfKey)
    : providedDetails!;

  // REST OF FILE STAYS EXACTLY THE SAME - NO CHANGES
  const {
    currentSlideIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSlider();

  // ... exact same code for 235 lines ...
}
```

### File 3: `src/components/timetable/TimetableClient.tsx` (MODIFIED)

```tsx
// Line 10: CHANGE import
import EventModal from "./EventModal/EventModal"; // CHANGE from NewEventModal

// Lines 50-90: No changes needed to state/handlers

// Line 194-196: CHANGE modal rendering
{
  selectedEvent && (
    <EventModal event={selectedEvent} onClose={closeModal} /> // CHANGE prop name
  );
}
```

---

## Guarantee of UI Fidelity

By following this approach:

1. **All JSX stays identical** - We're not creating new components
2. **All class names stay identical** - No JSX changes = no class changes
3. **All styling stays identical** - Same classes = same styles
4. **All logic stays identical** - Copy-paste from adapter
5. **All translations stay identical** - Same translation handling
6. **All animations stay identical** - No animation code changed
7. **All conditional rendering stays identical** - Same conditions

The ONLY changes are:

- Where props come from (new source)
- Where conversion happens (moved inside modal folder)

---

## Summary

**Old approach (that changed UI):**

- Create new components → Different JSX → Different UI ❌

**New approach (preserves UI):**

- Keep all components → Move logic only → Same UI ✅

This is essentially **refactoring, not rewriting**, which is much safer.

Would you like me to proceed with this surgical approach? I can start by creating the `eventConversion.ts` file with the exact adapter logic, then make minimal changes to the existing files.

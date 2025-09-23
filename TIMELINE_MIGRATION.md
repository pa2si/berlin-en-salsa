# Timeline System Migration Guide

## Overview

This guide shows how to migrate from your current timetable system to the new class-based architecture using `Artist`, `ActType`, and `TimelineColumn` classes.

## Current vs New Architecture

### Current System (src/components/timetable)

```
TimetablePage
  ├── TimetableClient
  ├── TimetableGrid
  ├── EventModal
  └── TimetableService
```

**Data Flow:**

- Static data files (saturday.ts, sunday.ts) per area
- TimeSlot interface with 25+ optional fields
- Complex conditional rendering in modal
- Manual type checking everywhere

### New System (src/domain/timeline)

```
Timeline Domain
  ├── models/
  │   ├── Artist.ts
  │   ├── ActType.ts
  │   ├── TimelineColumn.ts
  │   └── types.ts
  ├── services/
  │   └── TimelineService.ts
  └── examples/
      └── example-data.ts
```

**Benefits:**

- Type-safe classes with methods
- Automatic modal content generation
- Built-in validation and error handling
- Scalable to new event types
- Translation key support maintained

## Phase 1: Setup Domain Models ✅

**Status: COMPLETED**

- ✅ Created `Artist` class with translation support
- ✅ Created `ActType` class handling all event types
- ✅ Created `TimelineColumn` class with 30-min slots
- ✅ Analyzed all 8 data files for patterns
- ✅ Built working example with real data

## Phase 2: Parallel Implementation (NEXT)

### Step 1: Create New Data Files

Convert your current data files to use new classes:

```typescript
// src/data/timeline/main-stage-saturday.ts
import { ActType } from "@/domain/timeline/models/ActType";
import { ActCategory, EventType } from "@/domain/timeline/models/types";

export const mainStageSaturday: ActType[] = [
  new ActType({
    id: "rodo-le-fou-1430",
    title: "Timetable.events.mainStage.saturday.rodoElProfe",
    category: ActCategory.PERFORMANCE,
    type: EventType.DJ_SET,
    startTime: "14:30",
    duration: 30,
    djs: "Timetable.events.artists.rodoLeFou",
    description: "Timetable.events.descriptions.rodoElProfe",
    primaryImage: "/rodo-le-fou.webp",
  }),
  // ... more acts
];
```

### Step 2: Create Timeline Service

```typescript
// src/domain/timeline/services/TimelineService.ts
export class TimelineService {
  private columns: Map<string, TimelineColumn> = new Map();

  loadData(day: "saturday" | "sunday"): void {
    // Load all area data for the day
    // Create columns and populate with acts
  }

  getColumn(columnId: string): TimelineColumn | undefined {
    return this.columns.get(columnId);
  }

  getActsAtTime(timeSlot: string): Map<string, ActType[]> {
    const result = new Map();
    this.columns.forEach((column, id) => {
      const acts = column.getActsInTimeSlot(timeSlot);
      if (acts.length > 0) {
        result.set(id, acts);
      }
    });
    return result;
  }

  // Methods for modal content, filtering, etc.
}
```

### Step 3: Create New Components

#### TimelineGrid Component

```typescript
// src/components/timeline/TimelineGrid.tsx
interface TimelineGridProps {
  day: 'saturday' | 'sunday';
  onActClick: (act: ActType) => void;
}

export function TimelineGrid({ day, onActClick }: TimelineGridProps) {
  const timelineService = useTimelineService();
  const columns = timelineService.getColumnsForDay(day);

  return (
    <div className="timeline-grid">
      {/* Time column */}
      <TimeColumn />

      {/* Event columns */}
      {columns.map(column => (
        <EventColumn
          key={column.id}
          column={column}
          onActClick={onActClick}
        />
      ))}
    </div>
  );
}
```

#### EventColumn Component

```typescript
interface EventColumnProps {
  column: TimelineColumn;
  onActClick: (act: ActType) => void;
}

export function EventColumn({ column, onActClick }: EventColumnProps) {
  const timeSlots = column.getAllTimeSlots();

  return (
    <div className="event-column">
      <ColumnHeader column={column} />

      {timeSlots.map(timeSlot => {
        const acts = column.getActsInTimeSlot(timeSlot);
        return (
          <TimeSlotCell
            key={timeSlot}
            timeSlot={timeSlot}
            acts={acts}
            onActClick={onActClick}
          />
        );
      })}
    </div>
  );
}
```

#### Universal Modal Component

```typescript
interface ActModalProps {
  act: ActType | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActModal({ act, isOpen, onClose }: ActModalProps) {
  if (!act) return null;

  const content = act.getModalContent();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <h2>{t(content.event)}</h2>
        <span>{content.time} - {content.endTime}</span>
      </ModalHeader>

      <ModalContent>
        {/* Automatically adapts based on act type */}
        {content.type === 'workshop' && (
          <WorkshopContent content={content} />
        )}

        {content.type === 'main' && (
          <PerformanceContent content={content} />
        )}

        {content.type === 'talk' && (
          <TalkContent content={content} />
        )}

        {/* Universal elements */}
        {content.image && <ActImage src={content.image} />}
        {content.slides && <SlideCarousel slides={content.slides} />}
      </ModalContent>
    </Modal>
  );
}
```

## Phase 3: Gradual Migration

### Week 1: Parallel Development

- Build new components alongside existing ones
- Test with sample data
- Ensure modal content matches current behavior

### Week 2: Feature Parity

- Implement all current features in new system
- Add URL routing for acts
- Mobile responsiveness
- Translation integration

### Week 3: Testing & Refinement

- A/B test both systems
- Performance comparison
- User feedback collection
- Bug fixes and optimizations

### Week 4: Cutover

- Switch to new system
- Remove old components
- Update all data files
- Documentation update

## Data Migration Examples

### Current Workshop Data

```typescript
// OLD: dance-workshops/saturday.ts
export const danceWorkshopsSaturday = {
  "15:00": {
    event: "Timetable.events.danceWorkshops.saturday.leidianaRoger",
    time: "15:00",
    type: "workshop" as const,
    instructor: "Timetable.events.artists.leidiana",
    instructorTwo: "Timetable.events.artists.roger",
    bio: "Timetable.events.bios.leidiana",
    bioTwo: "Timetable.events.bios.roger",
    image: "/leidiana-roger.webp",
  },
};
```

### New Workshop Data

```typescript
// NEW: data/timeline/dance-workshops-saturday.ts
export const danceWorkshopsSaturday = [
  new ActType({
    id: "leidiana-roger-workshop-1500",
    title: "Timetable.events.danceWorkshops.saturday.leidianaRoger",
    category: ActCategory.WORKSHOP,
    type: EventType.DANCE_WORKSHOP,
    startTime: "15:00",
    duration: 60,
    instructor: "Timetable.events.artists.leidiana",
    instructorTwo: "Timetable.events.artists.roger",
    bio: "Timetable.events.bios.leidiana",
    bioTwo: "Timetable.events.bios.roger",
    primaryImage: "/leidiana-roger.webp",
    level: SkillLevel.INTERMEDIATE,
    capacity: 30,
  }),
];
```

## Benefits After Migration

### For Developers

- **Type Safety**: No more optional field guessing
- **Maintainability**: Clear class structure
- **Extensibility**: Easy to add new event types
- **Testing**: Methods can be unit tested

### For Content Management

- **Validation**: Built-in data validation
- **Consistency**: Standardized data format
- **Flexibility**: Easy to add new fields
- **Translation**: Built-in i18n support

### For Users

- **Performance**: Better caching and optimization
- **Reliability**: Fewer runtime errors
- **Features**: Richer interactions possible
- **Mobile**: Better responsive behavior

## File Organization After Migration

```
src/
├── domain/
│   └── timeline/           # Domain logic
│       ├── models/
│       ├── services/
│       └── types/
├── data/
│   └── timeline/          # Static data
│       ├── main-stage-saturday.ts
│       ├── main-stage-sunday.ts
│       ├── dance-workshops-saturday.ts
│       └── ...
├── components/
│   └── timeline/          # UI components
│       ├── TimelineGrid.tsx
│       ├── EventColumn.tsx
│       ├── ActModal.tsx
│       └── ...
└── pages/
    └── timetable/         # Page components
        ├── page.tsx
        └── layout.tsx
```

## Next Steps

1. **Review the example data** in `src/domain/timeline/examples/example-data.ts`
2. **Test the classes** with your actual data patterns
3. **Plan the migration timeline** based on your release schedule
4. **Start with one area** (e.g., main-stage) as a pilot
5. **Gather feedback** before full migration

The new system maintains full backward compatibility with your translation keys and visual design while providing a much more maintainable and scalable foundation for future development.

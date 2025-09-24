/\*\*

- BENEFITS OF THE NEW ARCHITECTURE
  \*/

## 🎯 **Key Benefits**

### 1. **Type Safety & Scalability**

- **Before**: One massive `TimeSlot` interface with 50+ optional fields
- **After**: Specific interfaces per event type with only relevant fields
- **Result**: Adding a new field to workshops only affects workshop-related code

### 2. **Simplified Component Logic**

- **Before**: 200+ line event handler in `TimeSlot.tsx`
- **After**: Simple event object passed directly to modal
- **Result**: Components become presentation-focused, logic moves to data layer

### 3. **Clear Separation of Concerns**

- **Timeline Structure**: Fixed 30-min slots (never changes)
- **Event Data**: Self-contained event objects with all needed info
- **Component Logic**: Pure rendering logic without data transformation

### 4. **Extensibility**

```typescript
// Adding a new event type is simple:
interface PhotoWorkshopEvent extends EventWithPeople {
  type: "photo-workshop";
  equipment: string[];
  level: SkillLevel;
  // Only fields relevant to photo workshops
}

// Update the union type:
type TimetableEvent =
  | MainStageEvent
  | DanceWorkshopEvent
  | PhotoWorkshopEvent  // ← Just add here
  | ...;
```

### 5. **Internationalization**

- All text fields are translation keys by design
- No complex translation logic in components
- Server-side translation before data reaches client

## 🏗️ **Implementation Strategy**

### Phase 1: Create New Type System

1. Define the new event interfaces
2. Create factory functions for type-safe event creation
3. Build data transformation utilities

### Phase 2: Migrate Data Files

1. Convert existing area files to use new event structure
2. One area at a time (starting with main-stage)
3. Maintain backward compatibility during transition

### Phase 3: Update Components

1. Simplify `TimeSlot.tsx` to just render event objects
2. Refactor `EventModal` to use discriminated unions for type-specific rendering
3. Remove complex data transformation logic

### Phase 4: Optimize & Clean

1. Remove old interfaces and unused code
2. Add comprehensive tests for new structure
3. Documentation and developer guidelines

## 📝 **Example Usage**

```typescript
// Creating a dance workshop:
const workshop = EventFactory.createDanceWorkshop({
  id: "saturday-son-workshop",
  title: "Timetable.events.danceWorkshops.saturday.sonCubano",
  startTime: "16:00",
  endTime: "17:30",
  area: "dance-workshops",
  danceStyle: "Son Cubano",
  level: "intermediate",
  duration: 90,
  people: [
    {
      name: "Timetable.events.artists.helen",
      role: "instructor",
      bio: "Timetable.events.bios.helen",
      image: "/helen.webp",
    },
    {
      name: "Timetable.events.artists.yago",
      role: "instructor",
      bio: "Timetable.events.bios.yago",
    },
  ],
  image: "/yago-helen.webp",
  description: "Timetable.events.descriptions.sonCubano",
});

// The timeline slot just contains the event:
const timeSlot: TimelineSlot = {
  time: "16:00",
  events: [workshop], // Could have multiple events in same slot
};
```

## 🎨 **Component Simplification**

```typescript
// New simplified TimeSlot component:
function TimeSlot({ slot, area, onEventClick }: TimeSlotProps) {
  return (
    <div className="time-slot">
      <div className="time">{slot.time}</div>
      {slot.events.map(event => (
        <EventBlock
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
        />
      ))}
    </div>
  );
}

// New type-safe modal:
function EventModal({ event, onClose }: EventModalProps) {
  return (
    <div className="modal">
      <EventHeader event={event} />
      {event.type === "dance-workshop" && <WorkshopDetails event={event} />}
      {event.type === "aviatrix-talk" && <AviatrixDetails event={event} />}
      {/* Type-safe rendering per event type */}
    </div>
  );
}
```

This architecture dramatically reduces complexity while improving maintainability and type safety!

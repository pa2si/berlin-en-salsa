/**
 * NEW PROPOSED ARCHITECTURE: Event-Based Timetable System
 *
 * This approach separates concerns by event type and uses interface inheritance
 * for better type safety and maintainability.
 */

// ===========================
// 1. BASE EVENT INTERFACES
// ===========================

/**
 * Base interface for all events - contains common fields
 */
interface BaseEvent {
  id: string; // Unique identifier for the event
  title: string; // Event title (translatable)
  startTime: string; // e.g., "13:30"
  endTime: string; // e.g., "14:00"
  area: AreaType; // Which area this event belongs to
  image?: string; // Primary image
  description?: string; // Event description (translatable)
}

/**
 * Base interface for events with people (instructors, presenters, etc.)
 */
interface EventWithPeople extends BaseEvent {
  people: Person[]; // Array of people involved in the event
}

/**
 * Person interface - reusable for all types of people
 */
interface Person {
  name: string; // Translatable
  role: PersonRole; // Their role in this specific event
  bio?: string; // Translatable
  image?: string;
}

type PersonRole =
  | "instructor"
  | "presenter"
  | "moderator"
  | "guest"
  | "dj"
  | "dancer"
  | "band-member";

// ===========================
// 2. SPECIFIC EVENT TYPES
// ===========================

/**
 * Main stage events (live music, DJ sets)
 */
interface MainStageEvent extends EventWithPeople {
  type: "main-stage";
  performanceType: "live" | "dj-set";
  genre?: string; // Music genre
  slides?: MediaSlide[]; // For image galleries
}

/**
 * Dance workshop events
 */
interface DanceWorkshopEvent extends EventWithPeople {
  type: "dance-workshop";
  danceStyle: string; // e.g., "Salsa Cubana", "Son", "Afro-Cuban"
  level?: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
}

/**
 * Music workshop events
 */
interface MusicWorkshopEvent extends EventWithPeople {
  type: "music-workshop";
  instrument?: string; // e.g., "Conga", "Piano"
  level?: "beginner" | "intermediate" | "advanced";
  duration: number;
}

/**
 * Regular talk events
 */
interface TalkEvent extends EventWithPeople {
  type: "talk";
  format: "presentation" | "interview" | "panel";
  topic?: string;
}

/**
 * Aviatrix format talk events (special format with record discussion)
 */
interface AviatrixTalkEvent extends EventWithPeople {
  type: "aviatrix-talk";
  artistDiscussed: string; // The artist being discussed
  recordDiscussed: string; // The record/album being discussed
  moderatorComment?: string; // Comment from the moderator
  backgroundInfo?: string; // Additional context
}

/**
 * Dance show events (overlapping with other events)
 */
interface DanceShowEvent extends EventWithPeople {
  type: "dance-show";
  showName: string; // e.g., "TANZSHOW 1"
  overlapsWithEvent?: string; // ID of the event this overlaps with
}

// ===========================
// 3. UNION TYPE FOR ALL EVENTS
// ===========================

type TimetableEvent =
  | MainStageEvent
  | DanceWorkshopEvent
  | MusicWorkshopEvent
  | TalkEvent
  | AviatrixTalkEvent
  | DanceShowEvent;

// ===========================
// 4. TIMELINE SLOT STRUCTURE
// ===========================

/**
 * Fixed 30-minute time slots that make up the timeline
 */
interface TimelineSlot {
  time: string; // e.g., "13:30"
  events: TimetableEvent[]; // Multiple events can occur in the same slot
}

/**
 * Area column structure
 */
interface AreaColumn {
  area: AreaType;
  displayName: string; // Translated area name
  slots: TimelineSlot[];
}

// ===========================
// 5. MEDIA AND SLIDES
// ===========================

interface MediaSlide {
  type: "image" | "text" | "mixed";
  image?: string;
  caption?: string; // Translatable
  content?: string; // For text-only or mixed slides (translatable)
}

// ===========================
// 6. EVENT FACTORY FUNCTIONS
// ===========================

/**
 * Factory functions to create specific event types with proper type safety
 */
class EventFactory {
  static createMainStageEvent(
    data: Omit<MainStageEvent, "type">,
  ): MainStageEvent {
    return { ...data, type: "main-stage" };
  }

  static createDanceWorkshop(
    data: Omit<DanceWorkshopEvent, "type">,
  ): DanceWorkshopEvent {
    return { ...data, type: "dance-workshop" };
  }

  static createTalk(data: Omit<TalkEvent, "type">): TalkEvent {
    return { ...data, type: "talk" };
  }

  static createAviatrixTalk(
    data: Omit<AviatrixTalkEvent, "type">,
  ): AviatrixTalkEvent {
    return { ...data, type: "aviatrix-talk" };
  }

  // ... other factory methods
}

// ===========================
// 7. COMPONENT INTERFACES
// ===========================

/**
 * Props for the event modal - now strongly typed per event type
 */
interface EventModalProps {
  event: TimetableEvent;
  onClose: () => void;
}

/**
 * Props for time slot rendering - simplified
 */
interface TimeSlotProps {
  slot: TimelineSlot;
  area: AreaType;
  onEventClick: (event: TimetableEvent) => void;
}

export type {
  TimetableEvent,
  MainStageEvent,
  DanceWorkshopEvent,
  MusicWorkshopEvent,
  TalkEvent,
  AviatrixTalkEvent,
  DanceShowEvent,
  TimelineSlot,
  AreaColumn,
  Person,
  PersonRole,
  MediaSlide,
  EventModalProps,
  TimeSlotProps,
};

export { EventFactory };

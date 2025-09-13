/**
 * Domain models for timetable business logic
 * Pure data structures representing business entities
 */

export interface EventDomain {
  readonly id: string;
  readonly title: string;
  readonly startTime: Date;
  readonly endTime: Date;
  readonly duration: number; // in minutes
  readonly area: AreaType;
  readonly type: EventType;
  readonly instructors: Instructor[];
  readonly presenters: Presenter[];
  readonly hosts: Host[];
  readonly djs: DJ[];
  readonly status: EventStatus;
  readonly capacity?: number;
  readonly currentAttendees?: number;
  readonly metadata: EventMetadata;
}

export interface Instructor {
  readonly id: string;
  readonly name: string;
  readonly bio?: string;
  readonly expertise: string[];
  readonly image?: string;
}

export interface Presenter {
  readonly id: string;
  readonly name: string;
  readonly bio?: string;
  readonly topics: string[];
  readonly image?: string;
}

export interface Host {
  readonly id: string;
  readonly name: string;
  readonly bio?: string;
  readonly image?: string;
}

export interface DJ {
  readonly id: string;
  readonly name: string;
  readonly bio?: string;
  readonly genres: string[];
  readonly image?: string;
}

export interface DanceShow {
  readonly id: string;
  readonly title: string;
  readonly dancers: Dancer[];
  readonly description?: string;
  readonly duration: number;
  readonly eventId: string;
}

export interface Dancer {
  readonly id: string;
  readonly name: string;
  readonly bio?: string;
  readonly style: string[];
  readonly image?: string;
}

export interface EventMetadata {
  readonly description?: string;
  readonly images: string[];
  readonly slides: SlideData[];
  readonly tags: string[];
  readonly difficulty?: DifficultyLevel;
  readonly language: string[];
  readonly requirements?: string[];
}

export interface SlideData {
  readonly id: string;
  readonly image?: string;
  readonly title?: string;
  readonly description?: string;
  readonly order: number;
  readonly type: SlideType;
}

export type AreaType =
  | "main-stage"
  | "dance-workshops"
  | "music-workshops"
  | "salsa-talks";

export type EventType =
  | "main"
  | "dance-show"
  | "workshop"
  | "talk"
  | "performance"
  | "social";

export type EventStatus =
  | "scheduled"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "postponed";

export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "all-levels";

export type SlideType =
  | "image"
  | "dancer-profile"
  | "dj-profile"
  | "event-info"
  | "description";

/**
 * Business value objects
 */
export class TimeRange {
  constructor(
    public readonly start: Date,
    public readonly end: Date,
  ) {
    if (start >= end) {
      throw new Error("Start time must be before end time");
    }
  }

  get duration(): number {
    return this.end.getTime() - this.start.getTime();
  }

  get durationInMinutes(): number {
    return Math.floor(this.duration / (1000 * 60));
  }

  overlaps(other: TimeRange): boolean {
    return this.start < other.end && this.end > other.start;
  }

  contains(time: Date): boolean {
    return time >= this.start && time <= this.end;
  }

  toString(): string {
    const formatTime = (date: Date) =>
      date.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

    return `${formatTime(this.start)} - ${formatTime(this.end)}`;
  }
}

export class EventCapacity {
  constructor(
    public readonly max: number,
    public readonly current: number = 0,
  ) {
    if (max < 0) throw new Error("Maximum capacity cannot be negative");
    if (current < 0) throw new Error("Current attendees cannot be negative");
    if (current > max)
      throw new Error("Current attendees cannot exceed maximum capacity");
  }

  get available(): number {
    return this.max - this.current;
  }

  get isFull(): boolean {
    return this.current >= this.max;
  }

  get utilizationRate(): number {
    return this.max === 0 ? 0 : (this.current / this.max) * 100;
  }

  canAccommodate(additional: number): boolean {
    return this.current + additional <= this.max;
  }
}

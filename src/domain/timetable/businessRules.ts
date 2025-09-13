import {
  EventDomain,
  EventType,
  AreaType,
  TimeRange,
  DifficultyLevel,
} from "./models";

/**
 * Business rules engine for timetable domain logic
 * Contains pure business logic without dependencies
 */
export class TimetableBusinessRules {
  /**
   * Event scheduling rules
   */
  static canScheduleEvent(
    event: EventDomain,
    existingEvents: EventDomain[],
    area: AreaType,
  ): { canSchedule: boolean; reason?: string } {
    // Rule: No two events in the same area can overlap
    const conflictingEvents = existingEvents.filter(
      (existing) =>
        existing.area === area &&
        existing.status === "scheduled" &&
        new TimeRange(event.startTime, event.endTime).overlaps(
          new TimeRange(existing.startTime, existing.endTime),
        ),
    );

    if (conflictingEvents.length > 0) {
      return {
        canSchedule: false,
        reason: `Conflicts with existing event: ${conflictingEvents[0].title}`,
      };
    }

    // Rule: Minimum 15 minutes between events for setup
    const bufferTime = 15 * 60 * 1000; // 15 minutes in milliseconds
    const hasInsufficientBuffer = existingEvents.some((existing) => {
      if (existing.area !== area || existing.status !== "scheduled")
        return false;

      const timeBetween = Math.min(
        Math.abs(event.startTime.getTime() - existing.endTime.getTime()),
        Math.abs(existing.startTime.getTime() - event.endTime.getTime()),
      );

      return timeBetween < bufferTime;
    });

    if (hasInsufficientBuffer) {
      return {
        canSchedule: false,
        reason:
          "Insufficient buffer time between events (minimum 15 minutes required)",
      };
    }

    // Rule: Workshop maximum duration is 2 hours
    if (event.type === "workshop" && event.duration > 120) {
      return {
        canSchedule: false,
        reason: "Workshop duration cannot exceed 2 hours",
      };
    }

    // Rule: Dance shows must be attached to main events
    if (event.type === "dance-show") {
      const parentEvent = existingEvents.find(
        (existing) =>
          existing.area === "main-stage" &&
          existing.status === "scheduled" &&
          new TimeRange(existing.startTime, existing.endTime).contains(
            event.startTime,
          ),
      );

      if (!parentEvent) {
        return {
          canSchedule: false,
          reason: "Dance shows must be scheduled during a main stage event",
        };
      }
    }

    return { canSchedule: true };
  }

  /**
   * Event compatibility rules
   */
  static areEventsCompatible(
    event1: EventDomain,
    event2: EventDomain,
  ): boolean {
    // Same instructor cannot teach overlapping workshops
    const sharedInstructors = event1.instructors.filter((instructor1) =>
      event2.instructors.some(
        (instructor2) => instructor1.id === instructor2.id,
      ),
    );

    if (sharedInstructors.length > 0) {
      const timeRange1 = new TimeRange(event1.startTime, event1.endTime);
      const timeRange2 = new TimeRange(event2.startTime, event2.endTime);

      if (timeRange1.overlaps(timeRange2)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Event difficulty progression rules
   */
  static validateDifficultyProgression(
    events: EventDomain[],
    targetAudience: DifficultyLevel,
  ): { isValid: boolean; suggestions?: string[] } {
    const workshops = events.filter((e) => e.type === "workshop");
    const suggestions: string[] = [];

    // Rule: Should have progression from beginner to advanced
    const beginnerCount = workshops.filter(
      (w) => w.metadata.difficulty === "beginner",
    ).length;
    const intermediateCount = workshops.filter(
      (w) => w.metadata.difficulty === "intermediate",
    ).length;
    const advancedCount = workshops.filter(
      (w) => w.metadata.difficulty === "advanced",
    ).length;

    if (beginnerCount === 0 && (intermediateCount > 0 || advancedCount > 0)) {
      suggestions.push(
        "Consider adding beginner-level workshops for newcomers",
      );
    }

    if (intermediateCount === 0 && advancedCount > 0) {
      suggestions.push(
        "Consider adding intermediate workshops to bridge skill levels",
      );
    }

    // Rule: Balance between difficulty levels
    const totalWorkshops = workshops.length;
    if (totalWorkshops > 0) {
      const beginnerRatio = beginnerCount / totalWorkshops;
      const advancedRatio = advancedCount / totalWorkshops;

      if (beginnerRatio < 0.3 && targetAudience === "beginner") {
        suggestions.push("Increase beginner workshops for target audience");
      }

      if (advancedRatio > 0.5 && targetAudience !== "advanced") {
        suggestions.push(
          "Consider balancing with more beginner/intermediate content",
        );
      }
    }

    return {
      isValid: suggestions.length === 0,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    };
  }

  /**
   * Event capacity management rules
   */
  static calculateOptimalCapacity(
    event: EventDomain,
    historicalData?: { averageAttendance: number; peakAttendance: number },
  ): number {
    const baseCapacity = this.getBaseCapacityByType(event.type, event.area);

    if (!historicalData) {
      return baseCapacity;
    }

    // Adjust based on historical data
    const adjustmentFactor = Math.min(
      historicalData.peakAttendance / historicalData.averageAttendance,
      2.0, // Cap at 2x increase
    );

    return Math.round(baseCapacity * adjustmentFactor);
  }

  private static getBaseCapacityByType(
    type: EventType,
    area: AreaType,
  ): number {
    const capacityMatrix: Record<AreaType, Record<EventType, number>> = {
      "main-stage": {
        main: 500,
        "dance-show": 500,
        performance: 500,
        workshop: 100,
        talk: 200,
        social: 300,
      },
      "dance-workshops": {
        main: 50,
        "dance-show": 50,
        performance: 50,
        workshop: 30,
        talk: 40,
        social: 50,
      },
      "music-workshops": {
        main: 40,
        "dance-show": 40,
        performance: 40,
        workshop: 25,
        talk: 35,
        social: 40,
      },
      "salsa-talks": {
        main: 80,
        "dance-show": 80,
        performance: 80,
        workshop: 50,
        talk: 60,
        social: 70,
      },
    };

    return capacityMatrix[area]?.[type] || 50;
  }

  /**
   * Event timing optimization rules
   */
  static optimizeEventTiming(events: EventDomain[]): EventDomain[] {
    // Sort by start time
    const sortedEvents = [...events].sort(
      (a, b) => a.startTime.getTime() - b.startTime.getTime(),
    );

    // Apply timing rules
    return sortedEvents.map((event, index) => {
      // Rule: Popular events should be scheduled at peak times
      if (
        this.isPopularEventType(event.type) &&
        this.isOffPeakTime(event.startTime)
      ) {
        // Suggest better timing (this would be handled by scheduling system)
        console.warn(
          `Event ${event.title} might benefit from peak time scheduling`,
        );
      }

      // Rule: Workshops should have adequate breaks
      if (event.type === "workshop" && index > 0) {
        const previousEvent = sortedEvents[index - 1];
        const timeBetween =
          event.startTime.getTime() - previousEvent.endTime.getTime();
        const minimumBreak = 30 * 60 * 1000; // 30 minutes

        if (timeBetween < minimumBreak) {
          console.warn(`Insufficient break time before ${event.title}`);
        }
      }

      return event;
    });
  }

  private static isPopularEventType(type: EventType): boolean {
    return ["main", "dance-show", "performance"].includes(type);
  }

  private static isOffPeakTime(time: Date): boolean {
    const hour = time.getHours();
    return hour < 10 || hour > 22; // Before 10 AM or after 10 PM
  }

  /**
   * Resource allocation rules
   */
  static validateResourceAllocation(
    events: EventDomain[],
    availableResources: {
      instructors: string[];
      equipment: string[];
      venues: string[];
    },
  ): { isValid: boolean; conflicts: string[] } {
    const conflicts: string[] = [];

    // Check instructor availability
    const instructorSchedule = new Map<string, TimeRange[]>();

    events.forEach((event) => {
      event.instructors.forEach((instructor) => {
        if (!availableResources.instructors.includes(instructor.id)) {
          conflicts.push(
            `Instructor ${instructor.name} is not available for ${event.title}`,
          );
          return;
        }

        const eventTimeRange = new TimeRange(event.startTime, event.endTime);
        const existingSlots = instructorSchedule.get(instructor.id) || [];

        const hasConflict = existingSlots.some((slot) =>
          slot.overlaps(eventTimeRange),
        );
        if (hasConflict) {
          conflicts.push(
            `Instructor ${instructor.name} has conflicting schedule for ${event.title}`,
          );
        } else {
          instructorSchedule.set(instructor.id, [
            ...existingSlots,
            eventTimeRange,
          ]);
        }
      });
    });

    return {
      isValid: conflicts.length === 0,
      conflicts,
    };
  }
}

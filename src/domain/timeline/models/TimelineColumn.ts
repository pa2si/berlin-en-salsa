import { ActType } from "./ActType";
import { ActCategory, ColumnConfig, TimeSlotConfig, EventType } from "./types";

/**
 * TimelineColumn - Represents a vertical column in the timetable
 * Each column corresponds to an area (main-stage, dance-workshops, etc.)
 * and manages its own 30-minute time slots
 */
export class TimelineColumn {
  readonly id: string;
  readonly title: string;
  readonly category: ActCategory;
  readonly color?: string;
  readonly icon?: string;
  readonly order: number;

  private acts: Map<string, ActType> = new Map();
  private timeSlots: Map<string, TimeSlotConfig> = new Map();

  constructor(config: ColumnConfig) {
    this.id = config.id;
    this.title = config.title;
    this.category = config.category;
    this.color = config.color;
    this.icon = config.icon;
    this.order = config.order;

    this.initializeTimeSlots();
  }

  /**
   * Initialize 30-minute time slots for the day
   * Based on your festival schedule: 12:00 - 03:00
   */
  private initializeTimeSlots(): void {
    const slots = [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
      "22:30",
      "23:00",
      "23:30",
      "00:00",
      "00:30",
      "01:00",
      "01:30",
      "02:00",
      "02:30",
      "03:00",
    ];

    for (let i = 0; i < slots.length; i++) {
      const startTime = slots[i];
      const endTime = slots[i + 1] || "03:30";

      this.timeSlots.set(startTime, {
        startTime,
        duration: 30,
        endTime,
      });
    }
  }

  /**
   * Add an act to this column
   */
  addAct(act: ActType): boolean {
    // Check if the time slots are available
    const requiredSlots = act.getTimeSlots();

    for (const slot of requiredSlots) {
      if (this.acts.has(slot)) {
        console.warn(`Time slot ${slot} is already occupied in ${this.id}`);
        return false;
      }
    }

    // Add the act to all required slots
    for (const slot of requiredSlots) {
      this.acts.set(slot, act);
    }

    return true;
  }

  /**
   * Remove an act from this column
   */
  removeAct(actId: string): boolean {
    let removed = false;

    for (const [slot, act] of Array.from(this.acts.entries())) {
      if (act.id === actId) {
        this.acts.delete(slot);
        removed = true;
      }
    }

    return removed;
  }

  /**
   * Get the act at a specific time slot
   */
  getActAtTime(timeSlot: string): ActType | undefined {
    return this.acts.get(timeSlot);
  }

  /**
   * Get all acts in this column
   */
  getAllActs(): ActType[] {
    const uniqueActs = new Set<ActType>();
    for (const act of Array.from(this.acts.values())) {
      uniqueActs.add(act);
    }
    return Array.from(uniqueActs);
  }

  /**
   * Get available time slots
   */
  getAvailableSlots(): string[] {
    const allSlots = Array.from(this.timeSlots.keys());
    const occupiedSlots = Array.from(this.acts.keys());
    return allSlots.filter((slot) => !occupiedSlots.includes(slot));
  }

  /**
   * Check if a time range is available
   */
  isTimeRangeAvailable(startTime: string, duration: number): boolean {
    const act = new ActType({
      id: "temp",
      title: "temp",
      category: this.category,
      type: EventType.DJ_SET,
      startTime,
      duration,
    });

    const requiredSlots = act.getTimeSlots();
    return requiredSlots.every((slot) => !this.acts.has(slot));
  }

  /**
   * Get column summary for debugging
   */
  getSummary(): ColumnSummary {
    return {
      id: this.id,
      title: this.title,
      category: this.category,
      totalSlots: this.timeSlots.size,
      occupiedSlots: this.acts.size,
      availableSlots: this.getAvailableSlots().length,
      acts: this.getAllActs().map((act) => ({
        id: act.id,
        title: act.title,
        startTime: act.startTime,
        duration: act.duration,
        slots: act.getTimeSlots(),
      })),
    };
  }

  /**
   * Convert to legacy format for backward compatibility
   */
  toLegacyFormat(): TimelineColumnData {
    const data: TimelineColumnData = {};

    for (const [timeSlot, act] of Array.from(this.acts.entries())) {
      // Only add the first slot of each act to avoid duplicates
      if (act.startTime === timeSlot) {
        data[timeSlot] = {
          event: act.title,
          time: act.startTime,
          duration: act.duration,
          category: act.category,
          type: act.type,
          description: act.description,
          image: act.primaryImage,
        };
      }
    }

    return data;
  }
}

// Helper interfaces
interface ColumnSummary {
  id: string;
  title: string;
  category: ActCategory;
  totalSlots: number;
  occupiedSlots: number;
  availableSlots: number;
  acts: Array<{
    id: string;
    title: string;
    startTime: string;
    duration: number;
    slots: string[];
  }>;
}

interface TimelineColumnData {
  [timeSlot: string]: LegacyActData;
}

interface LegacyActData {
  event: string;
  time: string;
  duration: number;
  category: ActCategory;
  type: string;
  description?: string;
  image?: string;
}

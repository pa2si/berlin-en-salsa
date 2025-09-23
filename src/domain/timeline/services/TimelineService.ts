import { TimelineColumn } from "../models/TimelineColumn";
import { ActType } from "../models/ActType";
import { AreaType, DayType, ActCategory, ColumnConfig } from "../models/types";

/**
 * TimelineService - Manages the timeline data and business logic
 * Provides a clean interface for loading and manipulating timeline data
 */
export class TimelineService {
  private columns: Map<string, TimelineColumn> = new Map();

  /**
   * Load timeline data from data files
   */
  async loadTimelineData(day: DayType): Promise<TimelineColumn[]> {
    const areas = [
      AreaType.MAIN_STAGE,
      AreaType.DANCE_WORKSHOPS,
      AreaType.MUSIC_WORKSHOPS,
      AreaType.SALSA_TALKS,
    ];

    const columns: TimelineColumn[] = [];

    for (const area of areas) {
      try {
        const columnConfig: ColumnConfig = {
          id: area,
          title: this.getAreaTitle(area),
          category: this.getAreaCategory(area),
          order: this.getAreaOrder(area),
        };

        const column = new TimelineColumn(columnConfig);
        const acts = await this.loadActsForArea(area, day);

        // Add acts to column
        for (const act of acts) {
          column.addAct(act);
        }

        this.columns.set(area, column);
        columns.push(column);
      } catch (error) {
        console.error(`Failed to load data for ${area}:`, error);
      }
    }

    return columns;
  }

  /**
   * Load data for a specific column/area
   */
  private async loadColumnData(area: AreaType, day: DayType): Promise<unknown> {
    // This would load from your data files
    // e.g., import(`../data/${day}/${area}.ts`)
    try {
      const dataModule = await import(
        `../data/examples/${this.getDataFileName(area, day)}`
      );
      return dataModule.default || dataModule;
    } catch (error) {
      console.warn(`No data file found for ${area} ${day}`);
      return null;
    }
  }

  /**
   * Load acts for a specific area and day
   */
  private async loadActsForArea(
    area: AreaType,
    day: DayType,
  ): Promise<ActType[]> {
    try {
      // Load data from our data files
      const dataFileName = this.getDataFileName(area, day);

      // For now, let's create some example acts using our MainStageSaturday data structure
      if (area === AreaType.MAIN_STAGE && day === DayType.SATURDAY) {
        // Import and use the example data
        const exampleData = await import("../examples/example-data");
        const acts = Object.values(exampleData.EXAMPLE_ACTS);
        return acts.slice(0, 3); // Just show first 3 acts for testing
      }

      return [];
    } catch (error) {
      console.warn(`Could not load acts for ${area} ${day}:`, error);
      return [];
    }
  }

  /**
   * Get column for a specific area
   */
  getColumn(area: AreaType): TimelineColumn | undefined {
    return this.columns.get(area);
  }

  /**
   * Get all columns
   */
  getAllColumns(): TimelineColumn[] {
    return Array.from(this.columns.values());
  }

  /**
   * Get columns for a specific day
   */
  getColumnsForDay(day: DayType): TimelineColumn[] {
    // Note: TimelineColumn doesn't have a day property yet - would need to be added to ColumnConfig
    // For now, return all columns
    return Array.from(this.columns.values());
  }

  /**
   * Check if a time slot is available across all columns
   */
  isTimeSlotAvailable(timeSlot: string): boolean {
    for (const column of Array.from(this.columns.values())) {
      const availableSlots = column.getAvailableSlots();
      if (!availableSlots.includes(timeSlot)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Find an act by ID across all columns
   */
  findAct(actId: string): ActType | undefined {
    for (const column of Array.from(this.columns.values())) {
      const acts = column.getAllActs();
      const act = acts.find((a: ActType) => a.id === actId);
      if (act) {
        return act;
      }
    }
    return undefined;
  }

  /**
   * Get all acts across all columns
   */
  getAllActs(): ActType[] {
    const columns = Array.from(this.columns.values());
    return columns.flatMap((column) => column.getAllActs());
  }

  /**
   * Validate timeline data
   */
  validateTimeline(): ValidationResult[] {
    const results: ValidationResult[] = [];

    for (const column of Array.from(this.columns.values())) {
      const summary = column.getSummary();
      // Add validation logic here
      results.push({
        columnId: column.id,
        isValid: true,
        warnings: [],
        errors: [],
      });
    }

    return results;
  }

  /**
   * Export timeline in legacy format for backward compatibility
   */
  exportLegacyFormat(day: DayType): LegacyTimelineData[] {
    const results: LegacyTimelineData[] = [];

    for (const column of Array.from(this.columns.values())) {
      const legacyData = column.toLegacyFormat();
      results.push({
        area: column.id as AreaType,
        title: column.title,
        data: legacyData,
      });
    }

    return results;
  }

  // Helper methods
  private getAreaTitle(area: AreaType): string {
    const titles = {
      [AreaType.MAIN_STAGE]: "Main Stage",
      [AreaType.DANCE_WORKSHOPS]: "Dance Workshops",
      [AreaType.MUSIC_WORKSHOPS]: "Music Workshops",
      [AreaType.SALSA_TALKS]: "Salsa Talks",
    };
    return titles[area];
  }

  private getAreaCategory(area: AreaType): ActCategory {
    const categories = {
      [AreaType.MAIN_STAGE]: ActCategory.PERFORMANCE,
      [AreaType.DANCE_WORKSHOPS]: ActCategory.WORKSHOP,
      [AreaType.MUSIC_WORKSHOPS]: ActCategory.WORKSHOP,
      [AreaType.SALSA_TALKS]: ActCategory.TALK,
    };
    return categories[area];
  }

  private getAreaOrder(area: AreaType): number {
    const orders = {
      [AreaType.MAIN_STAGE]: 1,
      [AreaType.DANCE_WORKSHOPS]: 2,
      [AreaType.MUSIC_WORKSHOPS]: 3,
      [AreaType.SALSA_TALKS]: 4,
    };
    return orders[area];
  }

  private getDataFileName(area: AreaType, day: DayType): string {
    // Convert enum values to file names
    const areaNames = {
      [AreaType.MAIN_STAGE]: "MainStage",
      [AreaType.DANCE_WORKSHOPS]: "DanceWorkshops",
      [AreaType.MUSIC_WORKSHOPS]: "MusicWorkshops",
      [AreaType.SALSA_TALKS]: "SalsaTalks",
    };

    const dayNames = {
      [DayType.SATURDAY]: "Saturday",
      [DayType.SUNDAY]: "Sunday",
    };

    return `${areaNames[area]}${dayNames[day]}.ts`;
  }
}

// Helper interfaces
interface ValidationResult {
  columnId: string;
  isValid: boolean;
  warnings: string[];
  errors: string[];
}

interface LegacyTimelineData {
  area: AreaType;
  title: string;
  data: Record<string, unknown>;
}

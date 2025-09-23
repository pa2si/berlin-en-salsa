import { TimeSlot } from "../types/event.types";
import { AreaType } from "../types/area.types";
import { Column } from "../types/timetable.types";
import { AREA_DEFINITIONS } from "../types/area.types";
import {
  createExampleTimeline,
  EXAMPLE_ACTS,
} from "../../../domain/timeline/examples/example-data";
import { ActType } from "../../../domain/timeline/models/ActType";
import { TimelineColumn } from "../../../domain/timeline/models/TimelineColumn";
import { EventType } from "../../../domain/timeline/models/types";

/**
 * Convert domain model ActType to legacy TimeSlot format for original timetable UX
 */
function convertActToTimeSlot(
  act: ActType,
  t?: (key: string) => string,
): TimeSlot[] {
  const timeSlots: TimeSlot[] = [];

  // Get all time slots this act occupies
  const slots = act.getTimeSlots();

  for (let i = 0; i < slots.length; i++) {
    const time = slots[i];
    const isFirstSlot = i === 0;

    const timeSlot: TimeSlot = {
      time,
      event:
        t && act.title.startsWith("Timetable.")
          ? t(act.title as never)
          : act.title,
      actType:
        act.actType || (act.type === EventType.LIVE_MUSIC ? "Live" : "DJ Set"),
      type: "main",
    };

    // Add additional data only to the first slot to avoid duplication
    if (isFirstSlot) {
      // Add image if available
      if (act.primaryImage) {
        timeSlot.image = act.primaryImage;
      }

      // Add bio from primary artist (translate if it's a key)
      if (act.primaryArtist?.bio) {
        timeSlot.bio =
          t && act.primaryArtist.bio.startsWith("Timetable.")
            ? t(act.primaryArtist.bio as never)
            : act.primaryArtist.bio;
      }

      // Add dance show info if available (translate if needed)
      if (act.hasDanceShow) {
        timeSlot.hasShow = true;
        timeSlot.danceShow =
          t && act.danceShowTitle?.startsWith("Timetable.")
            ? t(act.danceShowTitle as never)
            : act.danceShowTitle || "Dance Show";
        if (act.danceShowDancers && act.danceShowDancers.length > 0) {
          timeSlot.dancers = act.danceShowDancers
            .map((d) =>
              t && d.name.startsWith("Timetable.")
                ? t(d.name as never)
                : d.name,
            )
            .join(" & ");
        }
      }

      // Add slides if available (translate if needed)
      if (act.slides && act.slides.length > 0) {
        timeSlot.slides = act.slides.map((slide) => ({
          title:
            t && slide.title?.startsWith("Timetable.")
              ? t(slide.title as never)
              : slide.title,
          description:
            t && slide.description?.startsWith("Timetable.")
              ? t(slide.description as never)
              : slide.description,
          image: slide.image,
        }));
      }

      // Add artist info as slides for DJ sets (translate if needed)
      if (act.artists && act.artists.length > 0) {
        timeSlot.slides = act.artists.map((artist) => ({
          djName:
            t && artist.name.startsWith("Timetable.")
              ? t(artist.name as never)
              : artist.name,
          image: artist.image,
          bio:
            t && artist.bio?.startsWith("Timetable.")
              ? t(artist.bio as never)
              : artist.bio,
        }));
      }
    }

    timeSlots.push(timeSlot);
  }

  return timeSlots;
}

/**
 * Convert TimelineColumn to legacy Column format for original timetable UX
 */
function convertTimelineColumnToColumn(
  column: TimelineColumn,
  t?: (key: string) => string,
): Column {
  const allTimeSlots: TimeSlot[] = [];

  // Convert all acts in the column to time slots
  const acts = column.getAllActs();
  for (const act of acts) {
    const slots = convertActToTimeSlot(act, t);
    allTimeSlots.push(...slots);
  }

  // Sort by time
  allTimeSlots.sort((a, b) => a.time.localeCompare(b.time));

  // Get area definition for the column
  const areaDefinition = AREA_DEFINITIONS[column.id as AreaType];

  return {
    area:
      areaDefinition?.spanishName ||
      (t && column.title.startsWith("Timetable.")
        ? t(column.title as never)
        : column.title),
    slots: allTimeSlots,
  };
}

/**
 * Service for loading domain model data into the original timetable UX
 */
export class DomainModelTimetableService {
  /**
   * Filter a column to only include acts for a specific day
   */
  private static filterColumnByDay(
    column: TimelineColumn,
    day: "saturday" | "sunday",
  ): TimelineColumn | null {
    // Create a new column with the same config
    const filteredColumn = new TimelineColumn({
      id: column.id,
      title: column.title,
      category: column.category,
      color: column.color,
      icon: column.icon,
      order: column.order,
    });

    // Add only acts that match the day (based on ID pattern)
    const allActs = column.getAllActs();
    for (const act of allActs) {
      if (act.id.includes(`-${day}-`)) {
        filteredColumn.addAct(act);
      }
    }

    return filteredColumn;
  }

  /**
   * Get timetable data from domain models for the original timetable UX
   */
  static async getTimetableDataFromDomainModels(
    day: "saturday" | "sunday",
    t?: (key: string) => string,
  ): Promise<Column[]> {
    // Create example timeline using domain models
    const timeline = createExampleTimeline();

    const columns: Column[] = [];

    // Convert each timeline column to legacy column format
    for (const [, column] of timeline.entries()) {
      // Filter acts by day based on their ID pattern
      const dayFilteredColumn = this.filterColumnByDay(column, day);
      if (dayFilteredColumn) {
        const legacyColumn = convertTimelineColumnToColumn(dayFilteredColumn, t);
        // Only add columns that have acts for this day
        if (legacyColumn.slots.length > 0) {
          columns.push(legacyColumn);
        }
      }
    }

    // Add some additional example data for Saturday to show more content
    if (day === "saturday") {
      // Add more acts to main stage for demonstration
      const mainStageColumn = timeline.get("main-stage");
      if (mainStageColumn) {
        // Add a few more time slots manually for demo
        const additionalSlots: TimeSlot[] = [
          {
            time: "18:00",
            event: "DJ El Vago",
            actType: "DJ Set",
            type: "main",
            image: "/el-vago.webp",
            bio: "DJ y gestor cultural radicado en Berlín, co-host de La Regla Party.",
          },
          {
            time: "18:30",
            event: "DJ El Vago",
            actType: "DJ Set",
            type: "main",
          },
        ];

        // Find main stage in columns and add additional slots
        const mainStageIndex = columns.findIndex(
          (col) => col.area === "Escenario Principal",
        );
        if (mainStageIndex >= 0) {
          columns[mainStageIndex].slots.push(...additionalSlots);
          columns[mainStageIndex].slots.sort((a, b) =>
            a.time.localeCompare(b.time),
          );
        }
      }
    }

    return columns;
  }
}

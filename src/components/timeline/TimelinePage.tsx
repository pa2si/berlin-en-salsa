import { getTranslations } from "next-intl/server";
import { TimelineService } from "../../domain/timeline/services/TimelineService";
import { DayType } from "../../domain/timeline/models/types";
import {
  serializeTimelineColumn,
  SerializableTimelineColumn,
} from "../../domain/timeline/interfaces/SerializableInterfaces";
import TimelineClient from "./TimelineClient";

interface TimelinePageProps {
  initialDay?: "saturday" | "sunday";
}

/**
 * New Timeline Page Server Component
 * Uses our new domain-driven timeline architecture with TimelineService and domain models
 */
export default async function TimelinePage({
  initialDay = "saturday",
}: TimelinePageProps) {
  const t = await getTranslations();

  // Convert string to enum
  const dayType = initialDay === "saturday" ? DayType.SATURDAY : DayType.SUNDAY;
  const otherDay =
    initialDay === "saturday" ? DayType.SUNDAY : DayType.SATURDAY;

  // Initialize timeline service
  const timelineService = new TimelineService();

  try {
    // Fetch both days' data using new domain models
    const saturdayColumns = await timelineService.loadTimelineData(
      DayType.SATURDAY,
    );
    const sundayColumns = await timelineService.loadTimelineData(
      DayType.SUNDAY,
    );

    // Serialize the data for the client component
    const serializedSaturdayColumns = saturdayColumns.map(
      serializeTimelineColumn,
    );
    const serializedSundayColumns = sundayColumns.map(serializeTimelineColumn);

    return (
      <TimelineClient
        initialDay={initialDay}
        saturdayColumns={serializedSaturdayColumns}
        sundayColumns={serializedSundayColumns}
        translations={{
          days: {
            saturday: t("Sections.SectionFive.saturday" as never),
            sunday: t("Sections.SectionFive.sunday" as never),
          },
        }}
      />
    );
  } catch (error) {
    console.error("Failed to load timeline data:", error);

    // Return fallback with empty data
    return (
      <TimelineClient
        initialDay={initialDay}
        saturdayColumns={[]}
        sundayColumns={[]}
        translations={{
          days: {
            saturday: t("Sections.SectionFive.saturday" as never),
            sunday: t("Sections.SectionFive.sunday" as never),
          },
        }}
      />
    );
  }
}

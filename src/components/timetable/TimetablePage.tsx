import { getTranslations } from "next-intl/server";
import { TimetableService } from "../../data/timetable/services/timetable.service";
import { FESTIVAL_CONFIG } from "../../config/festival";
import TimetableClient from "./TimetableClient";
import { AreaType } from "../../data/timetable/types/area.types";
import { TimelineSlot } from "../../types/events";
import { Column } from "../../types/timetable";

interface TimetablePageProps {
  initialDay?: string; // Now accepts any weekday string (e.g., "saturday", "sunday", "monday")
}

/**
 * Server component that fetches timetable data and passes it to client components
 * This allows us to use server-side translation and data fetching
 *
 * PHASE 4: Now dynamically fetches data for ALL festival days from FESTIVAL_CONFIG
 */
export default async function TimetablePage({
  initialDay,
}: TimetablePageProps) {
  const t = await getTranslations();
  const festivalDays = FESTIVAL_CONFIG.days;

  // Default to first day if initialDay not provided or invalid
  const validInitialDay =
    initialDay && festivalDays.some((d) => d.weekday === initialDay)
      ? initialDay
      : festivalDays[0]?.weekday || "saturday";

  // PHASE 4: Fetch data for ALL festival days dynamically
  const daysData = await Promise.all(
    festivalDays.map(async (day) => ({
      day,
      data: await TimetableService.getTimetableDataServer(day.weekday),
      events: TimetableService.getTimetableEventsServer(day.weekday),
    })),
  );

  // Create a map for easy lookup by weekday
  const dataByWeekday = daysData.reduce(
    (acc, { day, data, events }) => {
      acc[day.weekday] = { data, events };
      return acc;
    },
    {} as Record<
      string,
      { data: Column[]; events: Record<AreaType, TimelineSlot[]> }
    >,
  );

  // Get translations for all days dynamically
  const dayTranslations = festivalDays.reduce(
    (acc, day) => {
      // Try the new format first (Sections.SectionFive.days.saturday)
      let translation = t(`Sections.SectionFive.days.${day.weekday}` as never);

      // Fallback to old format if new format doesn't exist
      if (translation === `Sections.SectionFive.days.${day.weekday}`) {
        translation = t(`Sections.SectionFive.${day.weekday}` as never);
      }

      acc[day.weekday] = translation;
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <TimetableClient
      initialDay={validInitialDay}
      festivalDays={festivalDays}
      dataByWeekday={dataByWeekday}
      translations={{
        days: dayTranslations,
      }}
    />
  );
}

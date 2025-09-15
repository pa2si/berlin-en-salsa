import { getTranslations } from "next-intl/server";
import { TimetableService } from "../../data/timetable/services/timetable.service";
import TimetableClient from "./TimetableClient";

interface TimetablePageProps {
  initialDay?: "saturday" | "sunday";
}

/**
 * Server component that fetches timetable data and passes it to client components
 * This allows us to use server-side translation and data fetching
 */
export default async function TimetablePage({
  initialDay = "saturday",
}: TimetablePageProps) {
  const t = await getTranslations();

  // Fetch both days' data server-side
  const saturdayData =
    await TimetableService.getTimetableDataServer("saturday");
  const sundayData = await TimetableService.getTimetableDataServer("sunday");

  return (
    <TimetableClient
      initialDay={initialDay}
      saturdayData={saturdayData}
      sundayData={sundayData}
      translations={{
        days: {
          saturday: t("Sections.SectionFive.saturday" as never),
          sunday: t("Sections.SectionFive.sunday" as never),
        },
      }}
    />
  );
}

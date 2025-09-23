import { getTranslations } from "next-intl/server";
import { DomainModelTimetableService } from "../../data/timetable/services/domainModelTimetableService";
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

  // Create a simple translation wrapper that can handle any string key
  const translateKey = (key: string): string => {
    // Always try to translate if the key looks like a translation key
    if (key.startsWith("Timetable.")) {
      try {
        // Use a more direct approach to get the translated value
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const translatedValue = (t as any)(key);
        console.log(
          `🔍 Translation attempt for key "${key}":`,
          translatedValue,
        );
        return translatedValue || key;
      } catch (error) {
        console.warn(`⚠️ Translation failed for key "${key}":`, error);
        return key;
      }
    }
    return key;
  };

  // 🔥 Use domain model data instead of static data files
  // This combines your original timetable UX with the new domain model classes
  const saturdayData =
    await DomainModelTimetableService.getTimetableDataFromDomainModels(
      "saturday",
      translateKey,
    );
  const sundayData =
    await DomainModelTimetableService.getTimetableDataFromDomainModels(
      "sunday",
      translateKey,
    );

  // Debug: Let's see what data we're actually getting
  console.log(
    "🔥 Saturday data from domain models:",
    JSON.stringify(saturdayData, null, 2),
  );
  console.log(
    "🔥 Sunday data from domain models:",
    JSON.stringify(sundayData, null, 2),
  );

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

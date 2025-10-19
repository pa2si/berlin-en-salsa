import { useTranslations } from "next-intl";

/**
 * Translation helper for column area names
 */
export const useColumnTranslation = () => {
  const t = useTranslations("Timetable");

  const translateColumnArea = (originalArea: string): string => {
    // Spanish areas to translation keys
    switch (originalArea) {
      case "Tarima Principal":
        return t("columns.mainStage");
      case "Talleres de Baile":
        return t("columns.danceWorkshops");
      case "Charlas Salseras":
        return t("columns.salsaTalks");
      case "Talleres de Música":
        return t("columns.musicWorkshops");
      // German areas to translation keys
      case "Hauptbühne":
        return t("columns.mainStage");
      case "Tanz-Workshops":
        return t("columns.danceWorkshops");
      case "Salsa-Talks":
        return t("columns.salsaTalks");
      case "Musik-Workshops":
        return t("columns.musicWorkshops");
      default:
        return originalArea;
    }
  };

  const getOriginalAreaKey = (rawArea: string): string => {
    // Map raw area names to their semantic keys
    switch (rawArea) {
      case "Tarima Principal":
      case "Hauptbühne":
        return "main-stage";
      case "Talleres de Baile":
      case "Tanz-Workshops":
        return "dance-workshops";
      case "Charlas Salseras":
      case "Salsa-Talks":
        return "salsa-talks";
      case "Talleres de Música":
      case "Musik-Workshops":
        return "music-workshops";
      default:
        return rawArea;
    }
  };

  return { translateColumnArea, getOriginalAreaKey };
};

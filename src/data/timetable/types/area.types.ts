export type AreaType =
  | "main-stage"
  | "dance-workshops"
  | "music-workshops"
  | "salsa-talks";

export interface AreaInfo {
  id: AreaType;
  spanishName: string;
  germanName: string;
  translationKey: string;
}

export const AREA_DEFINITIONS: Record<AreaType, AreaInfo> = {
  "main-stage": {
    id: "main-stage",
    spanishName: "Tarima Principal",
    germanName: "Hauptbühne",
    translationKey: "columns.mainStage",
  },
  "dance-workshops": {
    id: "dance-workshops",
    spanishName: "Talleres de Baile",
    germanName: "Tanz-Workshops",
    translationKey: "columns.danceWorkshops",
  },
  "music-workshops": {
    id: "music-workshops",
    spanishName: "Talleres de música",
    germanName: "Musik-Workshops",
    translationKey: "columns.musicWorkshops",
  },
  "salsa-talks": {
    id: "salsa-talks",
    spanishName: "Charlas Salseras",
    germanName: "Salsa-Talks",
    translationKey: "columns.salsaTalks",
  },
};

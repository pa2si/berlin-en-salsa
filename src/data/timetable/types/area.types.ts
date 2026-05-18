export type AreaType =
  | "main-stage"
  | "dance-area"
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
  "dance-area": {
    id: "dance-area",
    spanishName: "Zona de Baile",
    germanName: "Tanz Area",
    translationKey: "columns.danceArea",
  },
  "music-workshops": {
    id: "music-workshops",
    spanishName: "Talleres de Música",
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

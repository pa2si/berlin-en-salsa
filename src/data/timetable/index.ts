// Export all types
export * from "./types/area.types";
export * from "./types/event.types";
export * from "./types/timetable.types";

// Export services
export * from "./services/timetable.service";

// Export area data (expand as we create more files)
export { mainStageSaturday } from "./areas/main-stage/saturday";
export { mainStageSunday } from "./areas/main-stage/sunday";
export { danceWorkshopsSaturday } from "./areas/dance-workshops/saturday";
export { danceWorkshopsSunday } from "./areas/dance-workshops/sunday";
export { musicWorkshopsSaturday } from "./areas/music-workshops/saturday";
export { musicWorkshopsSunday } from "./areas/music-workshops/sunday";
export { salsaTalksSaturday } from "./areas/salsa-talks/saturday";
export { salsaTalksSunday } from "./areas/salsa-talks/sunday";

// Export all types
export * from "./types/area.types";
export * from "./types/event.types";
export * from "./types/timetable.types";

// Export services
export * from "./services/timetable.service";

// Export unified event collections (day-agnostic)
export { mainStageEvents } from "./events/main-stage/main-stage";
export { danceWorkshopEvents } from "./events/dance-workshops/dance-workshops";
export { musicWorkshopEvents } from "./events/music-workshops/music-workshops";
export { salsaTalksEvents } from "./events/salsa-talks/salsa-talks";

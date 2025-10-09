// Export all types
export * from "./types/area.types";
export * from "./types/event.types";
export * from "./types/timetable.types";

// Export services
export * from "./services/timetable.service";

// Export event-based data
export { mainStageSaturdayEvents } from "./events/main-stage/main-stage-saturday";
export { mainStageSundayEvents } from "./events/main-stage/main-stage-sunday";
export { danceWorkshopSaturdayEvents } from "./events/dance-workshops/dance-workshops-saturday";
export { danceWorkshopSundayEvents } from "./events/dance-workshops/dance-workshops-sunday";
export { musicWorkshopSaturdayEvents } from "./events/music-workshops/music-workshops-saturday";
export { musicWorkshopSundayEvents } from "./events/music-workshops/music-workshops-sunday";
export { salsaTalksSaturdayEvents } from "./events/salsa-talks/salsa-talks-saturday";
export { salsaTalksSundayEvents } from "./events/salsa-talks/salsa-talks-sunday";

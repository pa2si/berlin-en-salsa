import { TimeSlot, SlideContent } from "../../../types/timetable";

// Re-export the main types for convenience
export type { TimeSlot, SlideContent };

export interface SlideDetails {
  image?: string;
  djName?: string;
  djOne?: string;
  djTwo?: string;
  djOneDescription?: string;
  djTwoDescription?: string;
  bandName?: string;
  dancerOne?: string;
  dancerTwo?: string;
  dancerOneDescription?: string;
  dancerTwoDescription?: string;
  description?: string;
}

export interface EventDetails {
  event: string;
  time: string;
  instructor?: string;
  presenter?: string;
  host?: string;
  djs?: string;
  description?: string;
  bio?: string;
  record?: string;
  artist?: string;
  text?: string;
  comment?: string;
  image?: string;
  imageTwo?: string;
  type?: "main" | "dance-show" | "workshop" | "talk";
  slides?: SlideContent[];
  actType?: string;
  hasShow?: boolean;
  danceShow?: string;
  dancers?: string;
}

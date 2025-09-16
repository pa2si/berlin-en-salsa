/**
 * Enhanced types for timetable data that support both static content and translation keys
 */

// Re-export existing types for backward compatibility
export type { TimeSlot, SlideContent } from "../../../types/timetable";

/**
 * A value that can be either static text or a translation key
 */
export type TranslatableString = string;

/**
 * Enhanced slide content that supports translation keys
 */
export interface TranslatableSlideContent {
  djName?: TranslatableString;
  djOne?: TranslatableString;
  djTwo?: TranslatableString;
  djOneBio?: TranslatableString;
  djTwoBio?: TranslatableString;
  bandName?: TranslatableString;
  dancer?: TranslatableString; // Single dancer field
  dancerOne?: TranslatableString;
  dancerTwo?: TranslatableString;
  dancerOneBio?: TranslatableString;
  dancerTwoBio?: TranslatableString;
  description?: TranslatableString;
  bio?: TranslatableString; // General bio field for single DJ/artist in slide
  showCombinedDescription?: boolean; // Boolean flags remain static
  image?: string; // Images remain static
}

/**
 * Enhanced time slot that supports translation keys for text content
 */
export interface TranslatableTimeSlot {
  time: string; // Time is always static
  event?: TranslatableString;
  actType?: TranslatableString;
  type?: "main" | "dance-show" | "workshop" | "talk";
  description?: TranslatableString;
  image?: string; // Images remain static
  imageTwo?: string;
  slides?: TranslatableSlideContent[];

  // Additional fields that might need translation
  instructor?: TranslatableString;
  instructorTwo?: TranslatableString;
  presenter?: TranslatableString;
  host?: TranslatableString;
  moderator?: TranslatableString; // Moderator for talks (replaces host)
  guest?: TranslatableString; // Guest for talks
  djs?: TranslatableString;
  bio?: TranslatableString;
  bioTwo?: TranslatableString;
  record?: TranslatableString;
  artist?: TranslatableString;
  text?: TranslatableString;
  comment?: TranslatableString;
  hasShow?: boolean; // Boolean flags remain static
  danceShow?: TranslatableString;
  dancers?: TranslatableString;
  dancer?: TranslatableString;
}

/**
 * Type guard to check if a string is likely a translation key
 */
export function isTranslationKey(value: string): boolean {
  return typeof value === "string" && value.startsWith("Timetable.");
}

/**
 * Helper type for translation parameters (for ICU messages)
 */
export interface TranslationParams {
  [key: string]: string | number;
}

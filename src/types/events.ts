/**
 * NEW EVENT-BASED TYPE SYSTEM
 *
 * This file defines the new architecture with interface inheritance
 * for better type safety and maintainability.
 *
 * IMPORTANT: Events come in two states:
 * 1. Raw Events - defined without scheduling (no startTime, endTime, day)
 * 2. Enriched Events - after timeline enrichment (with startTime, endTime, day)
 */

import { AreaType } from "../data/timetable/types/area.types";

// ===========================
// 1. BASE EVENT INTERFACES
// ===========================

/**
 * Base interface for RAW events (as defined in event files)
 * These events don't have scheduling information yet
 */
export interface BaseEventDefinition {
  id: string; // Unique identifier for the event
  title: string; // Event title (translatable key)
  area: AreaType; // Which area this event belongs to
  image?: string; // Primary image
  description?: string; // Event description (translatable key)
}

/**
 * Scheduling information added during enrichment
 */
export interface SchedulingInfo {
  startTime: string; // Set by timeline config during enrichment
  endTime: string; // Set by timeline config during enrichment
  day: "saturday" | "sunday"; // Set during enrichment
}

/**
 * Base interface for ENRICHED events (after timeline processing)
 * These events have all scheduling information
 */
export interface BaseEvent extends BaseEventDefinition, SchedulingInfo {}

/**
 * Base interface for events with Acts (instructors, presenters, etc.)
 */
export interface EventWithActs extends BaseEvent {
  acts: Act[]; // Array of Acts involved in the event
}

/**
 * Base interface for RAW events with Acts (before enrichment)
 */
export interface RawEventWithActs extends BaseEventDefinition {
  acts: Act[]; // Array of Acts involved in the event
}

/**
 * Act interface - reusable for all types of Acts
 */
export interface Act {
  name: string; // Translatable key
  role: ActRole; // Their role in this specific event
  bio?: string; // Translatable key for bios
  description?: string; // Translatable key for descriptions
  image?: string;
}

export type ActRole =
  | "instructor"
  | "presenter"
  | "moderator"
  | "guest"
  | "dj"
  | "dancer"
  | "band-member"
  | "band";

// ===========================
// 2. SPECIFIC EVENT TYPES (RAW - Before Enrichment)
// ===========================

/**
 * Raw main stage events (without scheduling)
 */
export interface RawMainStageEvent extends RawEventWithActs {
  type: "main-stage";
  performanceType: "live" | "dj-set";
  genre?: string; // Music genre
  slides?: MediaSlide[]; // For image galleries
  // Dance show properties
  hasShow?: boolean; // Flag to indicate if this event has a dance show
  danceShow?: string; // The name/type of the dance show (translation key)
  dancers?: string; // The dancer combination name (translation key)
}

/**
 * Raw dance workshop events (without scheduling)
 */
export interface RawDanceWorkshopEvent extends RawEventWithActs {
  type: "dance-workshop";
  danceStyle: string; // e.g., "Salsa Cubana", "Son", "Afro-Cuban"
  level?: "beginner" | "intermediate" | "advanced";
}

/**
 * Raw music workshop events (without scheduling)
 */
export interface RawMusicWorkshopEvent extends RawEventWithActs {
  type: "music-workshop";
  instrument?: string; // e.g., "Conga", "Piano"
  level?: "beginner" | "intermediate" | "advanced";
}

/**
 * Raw regular talk events (without scheduling)
 */
export interface RawTalkEvent extends RawEventWithActs {
  type: "talk";
  format: "presentation" | "interview" | "panel";
  topic?: string;
  slides?: MediaSlide[]; // For image galleries
}

/**
 * Raw Aviatrix format talk events (without scheduling)
 */
export interface RawAviatrixTalkEvent extends RawEventWithActs {
  type: "aviatrix-talk";
  artistDiscussed: string; // The artist being discussed (translatable key)
  recordDiscussed: string; // The record/album being discussed (translatable key)
  moderatorComment?: string; // Comment from the moderator (translatable key)
  backgroundInfo?: string; // Additional context (translatable key)
  slides?: MediaSlide[]; // For image galleries
}

/**
 * Raw dance show events (without scheduling)
 */
export interface RawDanceShowEvent extends RawEventWithActs {
  type: "dance-show";
  showName: string; // e.g., "TANZSHOW 1" (translatable key)
  overlapsWithEvent?: string; // ID of the event this overlaps with
}

/**
 * Union type for all RAW events (before enrichment)
 */
export type RawTimetableEvent =
  | RawMainStageEvent
  | RawDanceWorkshopEvent
  | RawMusicWorkshopEvent
  | RawTalkEvent
  | RawAviatrixTalkEvent
  | RawDanceShowEvent;

// ===========================
// 3. SPECIFIC EVENT TYPES (ENRICHED - After Timeline Processing)
// ===========================

/**
 * Main stage events (live music, DJ sets)
 */
export interface MainStageEvent extends EventWithActs {
  type: "main-stage";
  performanceType: "live" | "dj-set";
  genre?: string; // Music genre
  slides?: MediaSlide[]; // For image galleries
  // Dance show properties
  hasShow?: boolean; // Flag to indicate if this event has a dance show
  danceShow?: string; // The name/type of the dance show (translation key)
  dancers?: string; // The dancer combination name (translation key)
}

/**
 * Dance workshop events
 */
export interface DanceWorkshopEvent extends EventWithActs {
  type: "dance-workshop";
  danceStyle: string; // e.g., "Salsa Cubana", "Son", "Afro-Cuban"
  level?: "beginner" | "intermediate" | "advanced";
  duration: number; // Set by timeline config during enrichment
}

/**
 * Music workshop events
 */
export interface MusicWorkshopEvent extends EventWithActs {
  type: "music-workshop";
  instrument?: string; // e.g., "Conga", "Piano"
  level?: "beginner" | "intermediate" | "advanced";
  duration: number; // Set by timeline config during enrichment
}

/**
 * Regular talk events
 */
export interface TalkEvent extends EventWithActs {
  type: "talk";
  format: "presentation" | "interview" | "panel";
  topic?: string;
  slides?: MediaSlide[]; // For image galleries
}

/**
 * Aviatrix format talk events (special format with record discussion)
 */
export interface AviatrixTalkEvent extends EventWithActs {
  type: "aviatrix-talk";
  artistDiscussed: string; // The artist being discussed (translatable key)
  recordDiscussed: string; // The record/album being discussed (translatable key)
  moderatorComment?: string; // Comment from the moderator (translatable key)
  backgroundInfo?: string; // Additional context (translatable key)
  slides?: MediaSlide[]; // For image galleries
}

/**
 * Dance show events (overlapping with other events)
 */
export interface DanceShowEvent extends EventWithActs {
  type: "dance-show";
  showName: string; // e.g., "TANZSHOW 1" (translatable key)
  overlapsWithEvent?: string; // ID of the event this overlaps with
}

// ===========================
// 4. UNION TYPE FOR ALL ENRICHED EVENTS
// ===========================

export type TimetableEvent =
  | MainStageEvent
  | DanceWorkshopEvent
  | MusicWorkshopEvent
  | TalkEvent
  | AviatrixTalkEvent
  | DanceShowEvent;

// ===========================
// 5. TIMELINE SLOT STRUCTURE
// ===========================

/**
 * Fixed 30-minute time slots that make up the timeline
 */
export interface TimelineSlot {
  time: string; // e.g., "13:30"
  events: TimetableEvent[]; // Multiple events can occur in the same slot
}

/**
 * Area column structure
 */
export interface AreaColumn {
  area: AreaType;
  displayName: string; // Translated area name
  slots: TimelineSlot[];
}

// ===========================
// 6. MEDIA AND SLIDES
// ===========================

export interface MediaSlide {
  type: "image" | "text" | "mixed";
  image?: string;
  caption?: string; // Translatable key
  content?: string; // For text-only or mixed slides (translatable key)
  // Legacy fields for backward compatibility during migration
  djName?: string;
  dancerName?: string;
  bio?: string;
  djOne?: string;
  djTwo?: string;
  djOneBio?: string;
  djTwoBio?: string;
  bandName?: string;
  dancerOne?: string;
  dancerTwo?: string;
  dancerOneBio?: string;
  dancerTwoBio?: string;
  combinedDancersDescription?: string;
  descriptionTwoDjsTogether?: string;
  genreDescription?: string;
}

// ===========================
// 7. COMPONENT INTERFACES
// ===========================

/**
 * Props for the event modal - now strongly typed per event type
 */
export interface EventModalProps {
  event: TimetableEvent;
  onClose: () => void;
}

/**
 * Props for time slot rendering - simplified
 */
export interface TimeSlotProps {
  slot: TimelineSlot;
  area: AreaType;
  onEventClick: (event: TimetableEvent) => void;
}

// ===========================
// 8. TYPE GUARDS
// ===========================

export function isMainStageEvent(
  event: TimetableEvent,
): event is MainStageEvent {
  return event.type === "main-stage";
}

export function isDanceWorkshopEvent(
  event: TimetableEvent,
): event is DanceWorkshopEvent {
  return event.type === "dance-workshop";
}

export function isMusicWorkshopEvent(
  event: TimetableEvent,
): event is MusicWorkshopEvent {
  return event.type === "music-workshop";
}

export function isTalkEvent(event: TimetableEvent): event is TalkEvent {
  return event.type === "talk";
}

export function isAviatrixTalkEvent(
  event: TimetableEvent,
): event is AviatrixTalkEvent {
  return event.type === "aviatrix-talk";
}

export function isDanceShowEvent(
  event: TimetableEvent,
): event is DanceShowEvent {
  return event.type === "dance-show";
}

/**
 * Domain types for the Timeline system
 * Based on actual data patterns from your timetable files
 */

import { Artist } from "./Artist";

// Enums based on your data analysis
export enum ArtistType {
  DJ = "dj",
  MUSICIAN = "musician",
  BAND = "band",
  BAND_MEMBER = "band-member",
  DANCER = "dancer",
  INSTRUCTOR = "instructor",
  PRESENTER = "presenter",
  MODERATOR = "moderator",
  GUEST = "guest",
  HOST = "host",
  COLLABORATOR = "collaborator",
}

export enum ActCategory {
  PERFORMANCE = "performance", // main-stage
  WORKSHOP = "workshop", // dance-workshops, music-workshops
  TALK = "talk", // salsa-talks
  BREAK = "break", // intervals
  SPECIAL = "special", // special events
}

export enum EventType {
  DJ_SET = "dj-set",
  LIVE_MUSIC = "live-music",
  DANCE_WORKSHOP = "dance-workshop",
  MUSIC_WORKSHOP = "music-workshop",
  TALK = "talk",
  AVIATRIX = "aviatrix",
  DANCE_SHOW = "dance-show",
  BREAK = "break",
  OPENING = "opening",
  CLOSING = "closing",
}

export enum SkillLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  ALL_LEVELS = "all-levels",
  OPEN = "open",
}

export enum SlideType {
  BIO = "bio",
  PERFORMANCE = "performance",
  INFO = "info",
  CREDITS = "credits",
  ARTIST_PROFILE = "artist-profile",
}

export enum AreaType {
  MAIN_STAGE = "main-stage",
  DANCE_WORKSHOPS = "dance-workshops",
  MUSIC_WORKSHOPS = "music-workshops",
  SALSA_TALKS = "salsa-talks",
}

export enum DayType {
  SATURDAY = "saturday",
  SUNDAY = "sunday",
}

export enum ActStatus {
  SCHEDULED = "scheduled",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  POSTPONED = "postponed",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

// Slide data structure (from your actual data)
export interface SlideData {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  artist?: Artist;
  type?: SlideType;
  order?: number;
}

// Constructor data for Artist
export interface ArtistConstructorData {
  id: string;
  name: string;
  type: ArtistType;
  bio?: string;
  image?: string;
  nationality?: string;
  location?: string;
  expertise?: string[];
  genres?: string[];
  styles?: string[];
  experience?: string;
  languages?: string[];
  website?: string;
  instagram?: string;
  spotify?: string;
  soundcloud?: string;
  djGenres?: string[];
  danceStyles?: string[];
  topics?: string[];
  instruments?: string[];
  teachingSpecialties?: string[];
  isHeadliner?: boolean;
  isLocal?: boolean;
  isGuest?: boolean;
  description?: string;
}

// Constructor data for ActType
export interface ActTypeConstructorData {
  id: string;
  title: string;
  category: ActCategory;
  type: EventType;
  startTime: string;
  duration: number;
  endTime?: string;

  // People
  artists?: Artist[];
  primaryArtist?: Artist;
  secondaryArtists?: Artist[];

  // Content
  description?: string;
  shortDescription?: string;
  level?: SkillLevel;
  language?: string[];
  capacity?: number;

  // Media
  images?: string[];
  primaryImage?: string;
  imageTwo?: string;
  slides?: SlideData[];

  // Special features
  hasDanceShow?: boolean;
  danceShowTitle?: string;
  danceShowDancers?: Artist[];
  isExtended?: boolean;
  isContinuation?: boolean;

  // Workshop specific
  instructor?: string;
  instructorTwo?: string;
  bio?: string;
  bioTwo?: string;
  prerequisites?: string[];
  materials?: string[];
  learningObjectives?: string[];

  // Talk specific
  presenter?: string;
  moderator?: string;
  guest?: string;
  host?: string;
  topics?: string[];
  discussedArtist?: string;
  discussedRecord?: string;
  moderatorComments?: string;
  guestComments?: string;
  text?: string;

  // Performance specific
  actType?: string;
  djs?: string;
  setlist?: string[];
  collaborations?: string[];
  specialNotes?: string;

  // Administrative
  status?: ActStatus;
  tags?: string[];
  isHighlight?: boolean;
  requiresRegistration?: boolean;
  price?: number;
}

// Modal content structure (for backward compatibility with your current modal)
export interface ModalContent {
  event: string;
  time: string;
  endTime?: string;
  type: "main" | "dance-show" | "workshop" | "talk";
  actType?: string;
  description?: string;
  image?: string;
  imageTwo?: string;
  slides?: LegacySlideContent[];
  hasShow?: boolean;
  danceShow?: string;
  dancers?: string;

  // Workshop fields
  instructor?: string;
  instructorTwo?: string;
  bio?: string;
  bioTwo?: string;

  // Performance fields
  djs?: string;

  // Talk fields
  presenter?: string;
  moderator?: string;
  guest?: string;
  host?: string;

  // Aviatrix specific
  artist?: string;
  record?: string;
  comment?: string;
}

// Legacy slide content for modal compatibility
export interface LegacySlideContent {
  id: string;
  image?: string;
  description?: string;
  title?: string;
  djName?: string;
  bandName?: string;
  dancer?: string;
  bio?: string;
}

// Legacy slide content for modal compatibility
export interface LegacySlideContent {
  id: string;
  image?: string;
  description?: string;
  title?: string;
  djName?: string;
  bandName?: string;
  dancer?: string;
  bio?: string;
}

// Time slot configuration
export interface TimeSlotConfig {
  startTime: string;
  duration: number; // Always 30 minutes for now
  endTime: string;
}

// Column configuration
export interface ColumnConfig {
  id: string;
  title: string;
  category: ActCategory;
  color?: string;
  icon?: string;
  order: number;
}

export interface SlideContent {
  image?: string;
  description?: string;
  bio?: string; // General bio field for single DJ/artist in slide
  djName?: string; // Legacy field - kept for backward compatibility
  dancer?: string; // Single dancer's name
  dancerName?: string; // Legacy field - kept for backward compatibility
  dancerOne?: string; // First dancer's name
  dancerTwo?: string; // Second dancer's name
  dancerOneBio?: string; // Bio for first dancer
  dancerTwoBio?: string; // Bio for second dancer
  combinedDancersDescription?: string; // Combined description for both dancers when individual descriptions aren't available
  djOne?: string; // First DJ's name
  djTwo?: string; // Second DJ's name
  djOneBio?: string; // Bio for first DJ
  djTwoBio?: string; // Bio for second DJ
  descriptionTwoDjsTogether?: string; // Combined description for both DJs together
  showCombinedDescription?: boolean; // Flag to show combined description with special styling after individual bios
  bandName?: string;
  genreDescription?: string; // Description of the dance genre/style
}

export interface TimeSlot {
  time: string;
  event?: string;
  instructor?: string;
  instructorTwo?: string; // Second instructor for workshops with multiple teachers
  level?: string; // Level for workshops (e.g., "Principiante", "Intermedio", "Avanzado")
  presenter?: string;
  host?: string;
  moderator?: string; // Moderator for talks (replaces host)
  guest?: string; // Guest for talks
  djs?: string;
  actType?: string; // Type of act (e.g., "Live", "DJ Set")
  type?: "main" | "dance-show" | "workshop" | "talk";
  isExtended?: boolean; // Flag to indicate if this slot extends from previous time slot
  durationSlots?: number; // Number of time slots this event spans (for continuous events)
  description?: string; // Detailed description of the event for the modal
  bio?: string; // Biographical information for the instructor, especially for workshop events
  bioTwo?: string; // Biographical information for the second instructor
  image?: string; // Path to the image for the event
  imageTwo?: string; // Path to the second image for the event
  slides?: SlideContent[]; // Multiple images and descriptions for slider
  hasShow?: boolean; // Flag to indicate if this slot has an overlapping dance show
  danceShow?: string; // The name of the dance show (e.g., "TANZSHOW 1")
  dancers?: string; // The names of the dancers in the show (legacy field)
  dancer?: string; // Single dancer name for events with one dancer
  danceShowImage?: string; // @deprecated - No longer needed as images are now stored in slides
  isContinuation?: boolean; // Flag to indicate if this slot is a continuation of the same event from the previous slot
  comment?: string; // For Charlas Salseras - text of the comment from the artist who is presenting
  artist?: string; // For Charlas Salseras - information about the artist being discussed
  record?: string; // For Charlas Salseras - information about the record/album being discussed
  text?: string; // For Charlas Salseras - additional explanatory text about the talk
}

export interface Column {
  area: string;
  originalAreaKey?: string;
  slots: TimeSlot[];
}

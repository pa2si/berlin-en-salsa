export interface SlideContent {
  image?: string;
  description?: string;
  djName?: string; // Legacy field - kept for backward compatibility
  dancerName?: string; // Legacy field - kept for backward compatibility
  dancerOne?: string; // First dancer's name
  dancerTwo?: string; // Second dancer's name
  dancerOneDescription?: string; // Description for first dancer
  dancerTwoDescription?: string; // Description for second dancer
  combinedDancersDescription?: string; // Combined description for both dancers when individual descriptions aren't available
  djOne?: string; // First DJ's name
  djTwo?: string; // Second DJ's name
  djOneDescription?: string; // Description for first DJ
  djTwoDescription?: string; // Description for second DJ
  descriptionTwoDjsTogether?: string; // Combined description for both DJs together
  bandName?: string;
  genreDescription?: string; // Description of the dance genre/style
}

export interface TimeSlot {
  time: string;
  event?: string;
  instructor?: string;
  instructorTwo?: string; // Second instructor for workshops with multiple teachers
  presenter?: string;
  host?: string;
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
  danceShowImage?: string; // @deprecated - No longer needed as images are now stored in slides
  isContinuation?: boolean; // Flag to indicate if this slot is a continuation of the same event from the previous slot
  comment?: string; // For Charlas Salseras - text of the comment from the artist who is presenting
  artist?: string; // For Charlas Salseras - information about the artist being discussed
  record?: string; // For Charlas Salseras - information about the record/album being discussed
  text?: string; // For Charlas Salseras - additional explanatory text about the talk
}

export interface Column {
  title: string;
  slots: TimeSlot[];
}

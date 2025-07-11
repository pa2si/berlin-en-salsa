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
  bandName?: string;
  genreDescription?: string; // Description of the dance genre/style
}

export interface TimeSlot {
  time: string;
  event?: string;
  instructor?: string;
  presenter?: string;
  host?: string;
  djs?: string;
  actType?: string; // Type of act (e.g., "Live", "DJ Set")
  type?: "main" | "dance-show" | "workshop" | "talk";
  isExtended?: boolean; // Flag to indicate if this slot extends from previous time slot
  durationSlots?: number; // Number of time slots this event spans (for continuous events)
  description?: string; // Detailed description of the event for the modal
  image?: string; // Path to the image for the event
  slides?: SlideContent[]; // Multiple images and descriptions for slider
  hasShow?: boolean; // Flag to indicate if this slot has an overlapping dance show
  danceShow?: string; // The name of the dance show (e.g., "TANZSHOW 1")
  dancers?: string; // The names of the dancers in the show (legacy field)
  danceShowImage?: string; // @deprecated - No longer needed as images are now stored in slides
  isContinuation?: boolean; // Flag to indicate if this slot is a continuation of the same event from the previous slot
}

export interface Column {
  title: string;
  slots: TimeSlot[];
}

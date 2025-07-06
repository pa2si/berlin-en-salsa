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
  hasShow?: boolean; // Flag to indicate if this slot has an overlapping dance show
  danceShow?: string; // The name of the dance show (e.g., "TANZSHOW 1")
  isContinuation?: boolean; // Flag to indicate if this slot is a continuation of the same event from the previous slot
}

export interface Column {
  title: string;
  slots: TimeSlot[];
}

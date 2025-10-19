import { useState } from "react";

// Define the event details type
export interface SelectedEventDetails {
  event: string;
  time: string;
  endTime?: string;
  instructor?: string;
  instructorTwo?: string;
  presenter?: string;
  host?: string;
  moderator?: string;
  guest?: string;
  djs?: string;
  description?: string;
  bio?: string;
  bioTwo?: string;
  record?: string;
  artist?: string;
  text?: string;
  comment?: string;
  image?: string;
  imageTwo?: string;
  type?: "main" | "dance-show" | "workshop" | "talk";
  slides?: {
    image?: string;
    description?: string;
    bio?: string;
    djName?: string;
    dancerName?: string;
    bandName?: string;
    dancerOne?: string;
    dancerTwo?: string;
    dancerOneBio?: string;
    dancerTwoBio?: string;
    combinedDancersDescription?: string;
    djOne?: string;
    djTwo?: string;
    djOneBio?: string;
    djTwoBio?: string;
    descriptionTwoDjsTogether?: string;
    genreDescription?: string;
  }[];
  actType?: string;
  hasShow?: boolean;
  danceShow?: string;
  dancers?: string;
  dancer?: string;
}

/**
 * Hook for managing event modal state
 */
export const useEventModal = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedEventDetails, setSelectedEventDetails] =
    useState<SelectedEventDetails | null>(null);

  const openModal = (eventKey: string, eventDetails: SelectedEventDetails) => {
    setSelectedEvent(eventKey);
    setSelectedEventDetails(eventDetails);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setSelectedEventDetails(null);
  };

  return {
    selectedEvent,
    selectedEventDetails,
    openModal,
    closeModal,
    isOpen: selectedEvent !== null,
  };
};

/**
 * ENHANCED EVENT MODAL HOOK
 *
 * This hook can handle both the legacy SelectedEventDetails format
 * and the new TimetableEvent format, allowing for gradual migration
 */

import { useState } from "react";
import { TimetableEvent } from "../../../types/events";

// Keep the original interface for backward compatibility
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
 * Union type for modal content - can be legacy or new format
 */
export type ModalContent = SelectedEventDetails | TimetableEvent;

/**
 * Enhanced hook for managing event modal state with support for both formats
 */
export const useEnhancedEventModal = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  // Legacy method - for backward compatibility
  const openModal = (eventKey: string, eventDetails: SelectedEventDetails) => {
    setSelectedEvent(eventKey);
    setModalContent(eventDetails);
  };

  // New method - for TimetableEvent objects
  const openEventModal = (event: TimetableEvent) => {
    setSelectedEvent(event.id);
    setModalContent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalContent(null);
  };

  // Type guards to determine content type
  const isLegacyContent = (
    content: ModalContent,
  ): content is SelectedEventDetails => {
    return content && "event" in content && typeof content.event === "string";
  };

  const isTimetableEvent = (
    content: ModalContent,
  ): content is TimetableEvent => {
    return content && "type" in content && "id" in content;
  };

  return {
    selectedEvent,
    modalContent,
    openModal, // Legacy method
    openEventModal, // New method
    closeModal,
    isOpen: selectedEvent !== null,
    isLegacyContent,
    isTimetableEvent,
    // For backward compatibility, also expose the legacy interface
    selectedEventDetails:
      modalContent && isLegacyContent(modalContent) ? modalContent : null,
  };
};

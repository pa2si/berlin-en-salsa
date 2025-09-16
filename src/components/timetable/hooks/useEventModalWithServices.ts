import { useState, useCallback } from "react";
import { ModalManagementService } from "../../../services/timetable/ModalManagementService";
import { EventProcessingService } from "../../../services/timetable/EventProcessingService";
import { TimeSlot } from "../../../data/timetable/types/event.types";

// Define the event details type
export interface SelectedEventDetails {
  event: string;
  time: string;
  endTime?: string;
  timeRange?: string;
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
  slides?: {
    image?: string;
    description?: string;
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
}

/**
 * Enhanced hook for managing event modal state using ModalManagementService
 * Maintains compatibility with existing interface while using service layer
 */
export const useEventModalWithServices = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const modalService = ModalManagementService.getInstance();

  const openModalFromSlot = useCallback(
    (
      slot: TimeSlot,
      slots: TimeSlot[] = [],
      slotIndex: number = 0,
      area?: string,
    ) => {
      // Calculate event span and generate event details using the service
      const eventSpan = EventProcessingService.calculateEventSpan(
        slots,
        slotIndex,
      );
      const showSlot = slot;
      const slides = EventProcessingService.generateEventSlides(
        slots,
        slotIndex,
        eventSpan,
        showSlot,
      );

      const eventDetails = EventProcessingService.createEventDetails(
        slot,
        showSlot,
        slides,
        slots,
        slotIndex,
        eventSpan,
      );

      // Generate unique modal ID
      const modalId = ModalManagementService.createModalId(
        slot.event || "unknown",
        slot.time,
        area,
      );

      // Open modal using service
      modalService.openModal(modalId, eventDetails);
      setSelectedEvent(modalId);
    },
    [modalService],
  );

  const openModal = useCallback(
    (eventKey: string, eventDetails: SelectedEventDetails) => {
      // Legacy compatibility method
      modalService.openModal(eventKey, eventDetails);
      setSelectedEvent(eventKey);
    },
    [modalService],
  );

  const closeModal = useCallback(() => {
    const closedModalId = modalService.closeModal();
    if (closedModalId === selectedEvent) {
      setSelectedEvent(null);
    }
  }, [modalService, selectedEvent]);

  const selectedEventDetails = modalService.getCurrentModalData();
  const isOpen = modalService.isModalOpen() && selectedEvent !== null;

  return {
    selectedEvent,
    selectedEventDetails,
    openModal,
    openModalFromSlot,
    closeModal,
    isOpen,
    modalService, // Expose service for advanced use cases
  };
};

/**
 * HYBRID EVENT MODAL COMPONENT
 *
 * This component can render both legacy SelectedEventDetails and new TimetableEvent formats.
 * This allows for gradual migration without breaking existing functionality.
 */

import EventModal from "./EventModal/EventModal"; // Legacy modal
import NewEventModal from "./NewEventModal"; // New modal
import { ModalContent } from "./hooks/useEnhancedEventModal";
import { TimetableEvent } from "../../types/events";

interface HybridEventModalProps {
  modalContent: ModalContent;
  onClose: () => void;
}

// Type guard to check if content is a TimetableEvent
function isTimetableEvent(content: ModalContent): content is TimetableEvent {
  return content && "type" in content && "id" in content;
}

export default function HybridEventModal({
  modalContent,
  onClose,
}: HybridEventModalProps) {
  // If we have a new TimetableEvent, use the new modal
  if (isTimetableEvent(modalContent)) {
    return <NewEventModal event={modalContent} onClose={onClose} />;
  }

  // Otherwise, use the legacy modal
  return <EventModal selectedEventDetails={modalContent} onClose={onClose} />;
}

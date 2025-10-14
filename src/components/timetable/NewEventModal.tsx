/**
 * NEW EVENT MODAL - Wrapper for Original EventModal
 *
 * This component converts TimetableEvent to SelectedEventDetails format
 * and uses the ORIGINAL EventModal component to preserve exact UI/UX
 */

import { TimetableEvent } from "../../types/events";
import { useEventAdapter } from "./adapters/eventAdapter";
import EventModal from "./EventModal/EventModal";

interface NewEventModalProps {
  event: TimetableEvent;
  onClose: () => void;
}

/**
 * Wrapper component that adapts TimetableEvent to work with the original EventModal
 */
export default function NewEventModal({ event, onClose }: NewEventModalProps) {
  // Use the adapter hook to convert and translate the event
  const { convertTimetableEventToSelectedDetails } = useEventAdapter();
  const selectedEventDetails = convertTimetableEventToSelectedDetails(event);

  // Use the original EventModal with converted data
  return (
    <EventModal
      selectedEventDetails={selectedEventDetails}
      onClose={onClose}
    />
  );
}

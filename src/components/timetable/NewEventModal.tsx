/**
 * NEW EVENT MODAL WITH TYPE-SPECIFIC RENDERING
 *
 * This modal uses discriminated unions to render different content based on event type.
 * Much cleaner and more maintainable than the previous approach.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  TimetableEvent,
  isMainStageEvent,
  isDanceWorkshopEvent,
  isMusicWorkshopEvent,
  isTalkEvent,
  isAviatrixTalkEvent,
  isDanceShowEvent,
} from "../../types/events";
import { EventUtils } from "../../utils/eventFactory";

interface NewEventModalProps {
  event: TimetableEvent;
  onClose: () => void;
}

/**
 * Helper function to safely translate strings that might be keys or plain text
 */
function useSafeTranslation() {
  const timetableT = useTranslations("Timetable");

  return (text: string) => {
    // If text doesn't look like a translation key, return as is
    if (!text.includes(".")) {
      return text;
    }

    // Handle Timetable keys specifically
    if (text.startsWith("Timetable.")) {
      const key = text.substring(10); // Remove "Timetable." prefix

      // Try specific known paths
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const translate = (k: string) => (timetableT as any)(k);

        // For events.artists.* keys
        if (key.startsWith("events.artists.")) {
          const artistKey = key.substring(15); // Remove "events.artists."
          const result = translate(`events.artists.${artistKey}`);
          return result || text.split(".").pop() || text;
        }

        // For events.bios.* keys
        if (key.startsWith("events.bios.")) {
          const bioKey = key.substring(12); // Remove "events.bios."
          return (
            translate(`events.bios.${bioKey}`) || text.split(".").pop() || text
          );
        }

        // For events.mainStage.* keys
        if (key.startsWith("events.mainStage.")) {
          const eventKey = key.substring(17); // Remove "events.mainStage."
          const result = translate(`events.mainStage.${eventKey}`);
          return result || text.split(".").pop() || text;
        }

        // For events.descriptions.* keys
        if (key.startsWith("events.descriptions.")) {
          const descKey = key.substring(20); // Remove "events.descriptions."
          return (
            translate(`events.descriptions.${descKey}`) ||
            text.split(".").pop() ||
            text
          );
        }

        // For other timetable keys
        return translate(key) || text.split(".").pop() || text;
      } catch {
        // If translation fails, return just the last part of the key
        return text.split(".").pop() || text;
      }
    }

    // If it's not a Timetable key, return the last part
    return text.split(".").pop() || text;
  };
}

/**
 * Main stage event details component
 */
function MainStageDetails({
  event,
}: {
  event: TimetableEvent & { type: "main-stage" };
}) {
  const translate = useSafeTranslation();
  const djs = EventUtils.getActsByRole(event, "dj");
  const bandMembers = EventUtils.getActsByRole(event, "band-member");

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          {event.performanceType === "live" ? "Live Performance" : "DJ Set"}
        </span>
        <span>
          {event.startTime} - {event.endTime}
        </span>
      </div>

      {event.genre && (
        <div className="text-sm">
          <strong className="text-gray-700">Genre:</strong> {event.genre}
        </div>
      )}

      {djs.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800">DJs:</h4>
          {djs.map((dj, index) => (
            <div key={index} className="ml-4">
              <div className="font-semibold">{translate(dj.name)}</div>
              {dj.bio && (
                <div className="text-sm text-gray-600">{translate(dj.bio)}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {bandMembers.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800">Band:</h4>
          {bandMembers.map((member, index) => (
            <div key={index} className="ml-4">
              <div className="font-semibold">{translate(member.name)}</div>
              {member.bio && (
                <div className="text-sm text-gray-600">
                  {translate(member.bio)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Workshop event details component
 */
function WorkshopDetails({
  event,
}: {
  event: TimetableEvent & { type: "dance-workshop" | "music-workshop" };
}) {
  const translate = useSafeTranslation();
  const instructors = EventUtils.getActsByRole(event, "instructor");

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          {event.type === "dance-workshop"
            ? "Dance Workshop"
            : "Music Workshop"}
        </span>
        <span>
          {event.startTime} - {event.endTime}
        </span>
      </div>

      <div className="text-sm">
        <strong className="text-gray-700">Duration:</strong> {event.duration}{" "}
        minutes
      </div>

      {event.type === "dance-workshop" && (
        <div className="text-sm">
          <strong className="text-gray-700">Dance Style:</strong>{" "}
          {event.danceStyle}
        </div>
      )}

      {event.type === "music-workshop" && event.instrument && (
        <div className="text-sm">
          <strong className="text-gray-700">Instrument:</strong>{" "}
          {event.instrument}
        </div>
      )}

      {event.level && (
        <div className="text-sm">
          <strong className="text-gray-700">Level:</strong> {event.level}
        </div>
      )}

      {instructors.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800">
            Instructor{instructors.length > 1 ? "s" : ""}:
          </h4>
          {instructors.map((instructor, index) => (
            <div key={index} className="ml-4">
              <div className="font-semibold">{translate(instructor.name)}</div>
              {instructor.bio && (
                <div className="text-sm text-gray-600">
                  {translate(instructor.bio)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Regular talk event details component
 */
function TalkDetails({ event }: { event: TimetableEvent & { type: "talk" } }) {
  const translate = useSafeTranslation();
  const presenters = EventUtils.getActsByRole(event, "presenter");
  const moderators = EventUtils.getActsByRole(event, "moderator");
  const guests = EventUtils.getActsByRole(event, "guest");

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Talk ({event.format})</span>
        <span>
          {event.startTime} - {event.endTime}
        </span>
      </div>

      {event.topic && (
        <div className="text-sm">
          <strong className="text-gray-700">Topic:</strong> {event.topic}
        </div>
      )}

      {presenters.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800">
            Presenter{presenters.length > 1 ? "s" : ""}:
          </h4>
          {presenters.map((presenter, index) => (
            <div key={index} className="ml-4">
              <div className="font-semibold">{translate(presenter.name)}</div>
              {presenter.bio && (
                <div className="text-sm text-gray-600">
                  {translate(presenter.bio)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {moderators.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800">Moderator:</h4>
          {moderators.map((moderator, index) => (
            <div key={index} className="ml-4">
              <div className="font-semibold">{translate(moderator.name)}</div>
            </div>
          ))}
        </div>
      )}

      {guests.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800">
            Guest{guests.length > 1 ? "s" : ""}:
          </h4>
          {guests.map((guest, index) => (
            <div key={index} className="ml-4">
              <div className="font-semibold">{translate(guest.name)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Aviatrix talk event details component
 */
function AviatrixTalkDetails({
  event,
}: {
  event: TimetableEvent & { type: "aviatrix-talk" };
}) {
  const translate = useSafeTranslation();
  const moderators = EventUtils.getActsByRole(event, "moderator");
  const guests = EventUtils.getActsByRole(event, "guest");

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Aviatrix Talk</span>
        <span>
          {event.startTime} - {event.endTime}
        </span>
      </div>

      <div className="space-y-2 rounded bg-gray-50 p-3">
        <div className="text-sm">
          <strong className="text-gray-700">Artist Discussed:</strong>{" "}
          {translate(event.artistDiscussed)}
        </div>
        <div className="text-sm">
          <strong className="text-gray-700">Record/Album:</strong>{" "}
          {translate(event.recordDiscussed)}
        </div>
      </div>

      {event.moderatorComment && (
        <div className="space-y-1">
          <h4 className="font-bold text-gray-800">Moderator&apos;s Comment:</h4>
          <div className="rounded bg-blue-50 p-2 text-sm text-gray-600 italic">
            &ldquo;{translate(event.moderatorComment)}&rdquo;
          </div>
        </div>
      )}

      {event.backgroundInfo && (
        <div className="space-y-1">
          <h4 className="font-bold text-gray-800">Background Information:</h4>
          <div className="text-sm text-gray-600">
            {translate(event.backgroundInfo)}
          </div>
        </div>
      )}

      {moderators.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800">Moderator:</h4>
          {moderators.map((moderator, index) => (
            <div key={index} className="ml-4">
              <div className="font-semibold">{translate(moderator.name)}</div>
            </div>
          ))}
        </div>
      )}

      {guests.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800">Guest:</h4>
          {guests.map((guest, index) => (
            <div key={index} className="ml-4">
              <div className="font-semibold">{translate(guest.name)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Dance show event details component
 */
function DanceShowDetails({
  event,
}: {
  event: TimetableEvent & { type: "dance-show" };
}) {
  const translate = useSafeTranslation();
  const dancers = EventUtils.getActsByRole(event, "dancer");

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Dance Show</span>
        <span>
          {event.startTime} - {event.endTime}
        </span>
      </div>

      <div className="text-sm">
        <strong className="text-gray-700">Show:</strong>{" "}
        {translate(event.showName)}
      </div>

      {event.overlapsWithEvent && (
        <div className="text-sm text-orange-600">
          <strong>Note:</strong> This show runs during another event
        </div>
      )}

      {dancers.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold text-gray-800">
            Dancer{dancers.length > 1 ? "s" : ""}:
          </h4>
          {dancers.map((dancer, index) => (
            <div key={index} className="ml-4">
              <div className="font-semibold">{translate(dancer.name)}</div>
              {dancer.bio && (
                <div className="text-sm text-gray-600">
                  {translate(dancer.bio)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Image gallery component
 */
function ImageGallery({ event }: { event: TimetableEvent }) {
  const translate = useSafeTranslation();

  if (!("slides" in event) || !event.slides || event.slides.length === 0) {
    if (event.image) {
      return (
        <div className="mb-4">
          <img
            src={event.image}
            alt={translate(event.title)}
            className="h-48 w-full rounded-lg object-cover shadow-md"
          />
        </div>
      );
    }
    return null;
  }

  // If there are slides, show the first one for now (can be enhanced with a carousel later)
  const firstSlide = event.slides[0];
  if (firstSlide.image) {
    return (
      <div className="mb-4">
        <img
          src={firstSlide.image}
          alt={translate(event.title)}
          className="h-48 w-full rounded-lg object-cover shadow-md"
        />
        {firstSlide.caption && (
          <div className="mt-2 text-sm text-gray-600 italic">
            {translate(firstSlide.caption)}
          </div>
        )}
      </div>
    );
  }

  return null;
}

/**
 * Main modal component
 */
export default function NewEventModal({ event, onClose }: NewEventModalProps) {
  const translate = useSafeTranslation();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          className="scrollbar-hide mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="flex flex-col">
            {/* Close button */}
            <button
              onClick={onClose}
              className="mb-2 self-end text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Event title */}
            <h3 className="text-bes-red mb-4 text-2xl font-black">
              {translate(event.title)}
            </h3>

            {/* Image gallery */}
            <ImageGallery event={event} />

            {/* Event description */}
            {event.description && (
              <div className="mb-4">
                <p className="text-gray-700">{translate(event.description)}</p>
              </div>
            )}

            {/* Type-specific content */}
            {isMainStageEvent(event) && <MainStageDetails event={event} />}
            {(isDanceWorkshopEvent(event) || isMusicWorkshopEvent(event)) && (
              <WorkshopDetails event={event} />
            )}
            {isTalkEvent(event) && <TalkDetails event={event} />}
            {isAviatrixTalkEvent(event) && (
              <AviatrixTalkDetails event={event} />
            )}
            {isDanceShowEvent(event) && <DanceShowDetails event={event} />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

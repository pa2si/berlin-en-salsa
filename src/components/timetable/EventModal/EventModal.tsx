import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { TimetableEvent } from "../../../types/events";
import { SelectedEventDetails } from "../hooks/useEventModal";
import { useSlider } from "../hooks/useSlider";
import { useSmartTranslation } from "../../../data/timetable/utils/smartTranslation";
import { convertTimetableEventToSelectedDetails } from "./eventConversion";
import EventDetails from "./EventDetails";
import EventSlider from "./EventSlider";
import EventNavigation from "./EventNavigation";

interface EventModalProps {
  event?: TimetableEvent; // NEW: Accept TimetableEvent
  selectedEventDetails?: SelectedEventDetails; // OLD: Keep for backward compatibility
  onClose: () => void;
}

export default function EventModal({
  event,
  selectedEventDetails: providedDetails,
  onClose,
}: EventModalProps) {
  const t = useTranslations("Timetable");
  const { translateIfKey } = useSmartTranslation();

  // Convert TimetableEvent to SelectedEventDetails if provided
  const selectedEventDetails = event
    ? convertTimetableEventToSelectedDetails(event, translateIfKey)
    : providedDetails!;
  const {
    currentSlideIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSlider();

  const hasSlides =
    selectedEventDetails.slides && selectedEventDetails.slides.length > 0;
  const maxSlides = hasSlides ? selectedEventDetails.slides!.length : 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hasSlides && maxSlides > 1) {
      if (e.key === "ArrowLeft") {
        prevSlide(maxSlides);
      } else if (e.key === "ArrowRight") {
        nextSlide(maxSlides);
      }
    }
  };

  const handleTouchEndWithSlides = () => {
    if (hasSlides && maxSlides > 1) {
      handleTouchEnd(maxSlides);
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
            {/* Event title */}
            <h3 className="text-bes-red mb-2 text-2xl font-black">
              {selectedEventDetails.event.startsWith("Timetable.")
                ? (() => {
                    try {
                      const key = selectedEventDetails.event.substring(10);
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      return (t as any)(key);
                    } catch {
                      return selectedEventDetails.event;
                    }
                  })()
                : selectedEventDetails.event}
            </h3>

            {/* Event Details */}
            <EventDetails selectedEventDetails={selectedEventDetails} />

            {/* Slider for images and descriptions */}
            {hasSlides ? (
              <div className="mb-6">
                <EventSlider
                  slides={selectedEventDetails.slides!}
                  currentSlideIndex={currentSlideIndex}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEndWithSlides}
                />

                {/* Navigation for multiple slides */}
                {maxSlides > 1 && (
                  <EventNavigation
                    currentSlideIndex={currentSlideIndex}
                    totalSlides={maxSlides}
                    onPrevSlide={() => prevSlide(maxSlides)}
                    onNextSlide={() => nextSlide(maxSlides)}
                    onGoToSlide={goToSlide}
                    slides={selectedEventDetails.slides}
                    eventType={selectedEventDetails.type}
                    presenter={selectedEventDetails.presenter}
                    record={selectedEventDetails.record}
                  />
                )}
              </div>
            ) : (
              /* Single image/description if no slides */
              selectedEventDetails.image && (
                <div className="mb-6">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={selectedEventDetails.image}
                      alt={selectedEventDetails.event}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              )
            )}

            {/* Artist and Record info for talks - displayed right after images */}
            {selectedEventDetails.type === "talk" &&
              (selectedEventDetails.artist || selectedEventDetails.record) && (
                <div className="mb-6">
                  {/* Featured Record Title for Aviatrix */}
                  {selectedEventDetails.actType === "Aviatrix" && (
                    <h3 className="text-bes-red mb-2 text-xl font-bold">
                      {t("modal.featuredRecordLabel")}
                    </h3>
                  )}
                  {selectedEventDetails.artist && (
                    <h4 className="mb-1 text-lg font-bold text-gray-600">
                      {t("modal.artistLabel")} {selectedEventDetails.artist}
                    </h4>
                  )}
                  {selectedEventDetails.record && (
                    <h4 className="mb-1 text-lg font-bold text-gray-600">
                      {t("modal.recordLabel")} {selectedEventDetails.record}
                    </h4>
                  )}
                </div>
              )}

            {/* Comment section for non-Aviatrix talks - shown after artist/record info */}
            {selectedEventDetails.type === "talk" &&
              selectedEventDetails.actType !== "Aviatrix" &&
              selectedEventDetails.comment && (
                <div className="mb-6">
                  <h4 className="text-bes-red mb-2 text-xl font-bold">
                    {t("modal.comment")}
                  </h4>
                  <p className="text-xl text-gray-700 md:leading-relaxed">
                    {selectedEventDetails.comment}
                  </p>
                </div>
              )}

            {/* Talk-specific content */}
            {selectedEventDetails.type === "talk" && (
              <>
                {/* Bio for talks */}
                {selectedEventDetails.bio && (
                  <div className="mb-6">
                    <h4 className="text-bes-red mb-2 text-xl font-bold">
                      {t("modal.about")}{" "}
                      {selectedEventDetails.presenter ||
                        selectedEventDetails.guest}
                    </h4>
                    <p className="text-xl text-gray-700 md:leading-relaxed">
                      {selectedEventDetails.bio}
                    </p>
                  </div>
                )}

                {/* Comment for Aviatrix talks - shown after bio */}
                {selectedEventDetails.comment &&
                  selectedEventDetails.actType === "Aviatrix" && (
                    <div className="mb-6">
                      <h4 className="text-bes-red mb-2 text-xl font-bold">
                        {t("modal.comment")}
                      </h4>
                      <p className="text-xl text-gray-700 md:leading-relaxed">
                        {selectedEventDetails.comment}
                      </p>
                    </div>
                  )}

                {/* Description for talks */}
                {selectedEventDetails.description && (
                  <div className="mb-6">
                    <h4 className="text-bes-red mb-2 text-xl font-bold">
                      {t("modal.description")}
                    </h4>
                    <p className="text-xl text-gray-700 md:leading-relaxed">
                      {selectedEventDetails.description}
                    </p>
                  </div>
                )}

                {/* Additional text for talks */}
                {selectedEventDetails.text && (
                  <div className="border-bes-red mb-6 rounded-lg border-l-4 bg-gray-50 p-4">
                    <p className="text-xl italic text-gray-700 md:leading-relaxed">
                      &quot;{selectedEventDetails.text}&quot;
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-bes-red hover:bg-bes-red/90 rounded-full px-6 py-2 font-bold text-white shadow-md transition-colors hover:cursor-pointer"
              >
                {t("modal.closeButton")}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

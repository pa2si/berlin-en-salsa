import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { isDanceAreaEvent, TimetableEvent } from "../../../types/events";
import { SelectedEventDetails } from "../hooks/useEventModal";
import { useSlider } from "../hooks/useSlider";
import { useSmartTranslation } from "../../../data/timetable/utils/smartTranslation";
import { convertTimetableEventToSelectedDetails } from "./eventConversion";
import EventDetails from "./EventDetails";
import EventSlider from "./EventSlider";
import EventNavigation from "./EventNavigation";
import {
  addDanceClassSubscriber,
  getDanceClassSubscribers,
} from "@/app/actions";
import { Link } from "@/i18n/navigation";

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
  const locale = useLocale();
  const { translateIfKey } = useSmartTranslation();
  const [isClassFormOpen, setIsClassFormOpen] = useState(false);
  const [isClassFormPending, setIsClassFormPending] = useState(false);
  const [classPrivacyChecked, setClassPrivacyChecked] = useState(false);
  const [classSubscribeSuccess, setClassSubscribeSuccess] = useState("");
  const [classSubscribeError, setClassSubscribeError] = useState("");
  const [isSubscriberListModalOpen, setIsSubscriberListModalOpen] =
    useState(false);
  const [subscriberToken, setSubscriberToken] = useState("");
  const [isSubscriberTokenVisible, setIsSubscriberTokenVisible] =
    useState(false);
  const [isSubscriberListPending, setIsSubscriberListPending] = useState(false);
  const [subscriberListError, setSubscriberListError] = useState("");
  const [hasLoadedSubscriberList, setHasLoadedSubscriberList] = useState(false);
  const [subscriberList, setSubscriberList] = useState<
    Array<{
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    }>
  >([]);

  // Convert TimetableEvent to SelectedEventDetails if provided
  const selectedEventDetails = event
    ? convertTimetableEventToSelectedDetails(event, translateIfKey)
    : providedDetails!;

  const eventTitle = useMemo(() => {
    if (!selectedEventDetails.event.startsWith("Timetable.")) {
      return selectedEventDetails.event;
    }

    try {
      const key = selectedEventDetails.event.substring(10);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (t as any)(key) as string;
    } catch {
      return selectedEventDetails.event;
    }
  }, [selectedEventDetails.event, t]);

  const danceAreaEvent = event && isDanceAreaEvent(event) ? event : undefined;
  const danceClassEvent =
    danceAreaEvent?.danceAreaType === "class" ? danceAreaEvent : undefined;

  const canShowClassSubscription = Boolean(danceClassEvent?.enableSubscription);
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
  const [isSingleImageLoading, setIsSingleImageLoading] = useState(false);

  useEffect(() => {
    if (!hasSlides && selectedEventDetails.image) {
      setIsSingleImageLoading(true);
      return;
    }
    setIsSingleImageLoading(false);
  }, [hasSlides, selectedEventDetails.image]);

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

  const handleClassSubscriptionSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!danceClassEvent || !canShowClassSubscription) {
      return;
    }

    if (!classPrivacyChecked) {
      setClassSubscribeError(
        t("modal.classSubscription.validation.privacyRequired"),
      );
      return;
    }

    const formElement = e.currentTarget;

    setIsClassFormPending(true);
    setClassSubscribeSuccess("");
    setClassSubscribeError("");

    try {
      const formData = new FormData(formElement);
      formData.append("classId", danceClassEvent.id);
      formData.append("classTitle", eventTitle);
      formData.append("privacyAccepted", "true");

      const response = await addDanceClassSubscriber(formData, locale);

      if (response.successMessage) {
        setClassSubscribeSuccess(response.successMessage);
        setClassSubscribeError("");
        formElement.reset();
        setClassPrivacyChecked(false);
      } else if (response.errorMessage) {
        setClassSubscribeSuccess("");
        setClassSubscribeError(response.errorMessage);
      }
    } finally {
      setIsClassFormPending(false);
    }
  };

  const openSubscriberListModal = () => {
    setIsSubscriberListModalOpen(true);
    setSubscriberToken("");
    setIsSubscriberTokenVisible(false);
    setSubscriberListError("");
    setSubscriberList([]);
    setHasLoadedSubscriberList(false);
  };

  const handleLoadSubscriberList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!danceClassEvent) {
      return;
    }

    if (!subscriberToken.trim()) {
      setSubscriberListError(
        t("modal.classSubscription.validation.allFieldsRequired"),
      );
      return;
    }

    setIsSubscriberListPending(true);
    setSubscriberListError("");

    const formData = new FormData();
    formData.append("classId", danceClassEvent.id);
    formData.append("token", subscriberToken.trim());

    const response = await getDanceClassSubscribers(formData, locale);

    if (response.errorMessage) {
      setSubscriberListError(response.errorMessage);
      setSubscriberList([]);
      setHasLoadedSubscriberList(false);
    } else {
      setSubscriberList(response.subscribers || []);
      setSubscriberListError("");
      setHasLoadedSubscriberList(true);
    }

    setIsSubscriberListPending(false);
  };

  const formatDateTime = (value: string): string => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year} ${hour}:${minute}`;
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
              {eventTitle}
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
                  <div className="relative mb-4 min-h-[220px] overflow-hidden rounded-lg bg-gray-100">
                    {isSingleImageLoading && (
                      <div className="absolute inset-0 animate-pulse bg-gray-200" />
                    )}
                    <img
                      src={selectedEventDetails.image}
                      alt={selectedEventDetails.event}
                      className={`h-auto w-full object-cover transition-opacity duration-300 ${
                        isSingleImageLoading ? "opacity-0" : "opacity-100"
                      }`}
                      onLoad={() => setIsSingleImageLoading(false)}
                      onError={() => setIsSingleImageLoading(false)}
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
                {/* Description first for regular talks without slides */}
                {selectedEventDetails.actType !== "Aviatrix" &&
                  selectedEventDetails.description && (
                    <div className="mb-6">
                      <h4 className="text-bes-red mb-2 text-xl font-bold">
                        {t("modal.description")}
                      </h4>
                      <p className="text-xl text-gray-700 md:leading-relaxed">
                        {selectedEventDetails.description}
                      </p>
                    </div>
                  )}

                {/* Ordered bios for regular talks without slides */}
                {selectedEventDetails.actType !== "Aviatrix" &&
                  selectedEventDetails.talkBios?.map((talkBio, index) => (
                    <div className="mb-6" key={`${talkBio.name}-${index}`}>
                      <h4 className="text-bes-red mb-2 text-xl font-bold">
                        {t("modal.about")} {talkBio.name}
                      </h4>
                      <p className="text-xl text-gray-700 md:leading-relaxed">
                        {talkBio.bio}
                      </p>
                    </div>
                  ))}

                {/* Fallback bio for legacy talk data */}
                {selectedEventDetails.actType !== "Aviatrix" &&
                  !selectedEventDetails.talkBios?.length &&
                  selectedEventDetails.bio && (
                    <div className="mb-6">
                      <h4 className="text-bes-red mb-2 text-xl font-bold">
                        {t("modal.about")}{" "}
                        {selectedEventDetails.presenter ||
                          selectedEventDetails.guest ||
                          ""}
                      </h4>
                      <p className="text-xl text-gray-700 md:leading-relaxed">
                        {selectedEventDetails.bio}
                      </p>
                    </div>
                  )}

                {/* Bio for Aviatrix talks */}
                {selectedEventDetails.actType === "Aviatrix" &&
                  selectedEventDetails.bio && (
                    <div className="mb-6">
                      <h4 className="text-bes-red mb-2 text-xl font-bold">
                        {t("modal.about")} {selectedEventDetails.guest || ""}
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

                {/* Description for Aviatrix talks */}
                {selectedEventDetails.actType === "Aviatrix" &&
                  selectedEventDetails.description && (
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
                    <p className="text-xl text-gray-700 italic md:leading-relaxed">
                      &quot;{selectedEventDetails.text}&quot;
                    </p>
                  </div>
                )}
              </>
            )}

            {canShowClassSubscription && (
              <div className="mb-6 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  className="bg-bes-red hover:bg-bes-red/90 w-full cursor-pointer rounded-lg px-4 py-2 font-bold text-white transition-colors"
                  onClick={() => setIsClassFormOpen((prev) => !prev)}
                  aria-expanded={isClassFormOpen}
                  aria-controls="dance-class-subscription-form"
                >
                  {isClassFormOpen
                    ? t("modal.classSubscription.cancelButton" as never)
                    : t("modal.classSubscription.subscribeButton")}
                </button>

                {isClassFormOpen && (
                  <div id="dance-class-subscription-form" className="mt-4">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <h4 className="text-bes-red text-lg font-bold">
                        {t("modal.classSubscription.formTitle")}
                      </h4>
                      <button
                        type="button"
                        className="text-bes-purple/60 hover:text-bes-purple text-sm font-semibold underline transition-colors focus:outline-none"
                        onClick={openSubscriberListModal}
                      >
                        {t("modal.classSubscription.seeSubscriberListButton")}
                      </button>
                    </div>

                    <p className="mb-3 text-sm text-gray-700">
                      {t("modal.classSubscription.infoLine")}
                    </p>

                    <form
                      onSubmit={handleClassSubscriptionSubmit}
                      className="flex flex-col gap-3"
                    >
                      <input
                        type="text"
                        name="name"
                        required
                        minLength={2}
                        maxLength={100}
                        className="border-bes-purple text-bes-purple placeholder-bes-purple/70 h-11 w-full rounded-lg border-2 bg-white px-3"
                        placeholder={t(
                          "modal.classSubscription.namePlaceholder",
                        )}
                      />

                      <input
                        type="email"
                        name="email"
                        required
                        maxLength={320}
                        autoComplete="email"
                        spellCheck="false"
                        className="border-bes-purple text-bes-purple placeholder-bes-purple/70 h-11 w-full rounded-lg border-2 bg-white px-3"
                        placeholder={t(
                          "modal.classSubscription.emailPlaceholder",
                        )}
                      />

                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          id="class-privacy-checkbox"
                          name="class-privacy-checkbox"
                          checked={classPrivacyChecked}
                          onChange={(eventTarget) =>
                            setClassPrivacyChecked(eventTarget.target.checked)
                          }
                          className="mt-1 h-4 w-4 shrink-0"
                        />
                        <label
                          htmlFor="class-privacy-checkbox"
                          className="text-bes-purple text-sm font-semibold"
                        >
                          {t("modal.classSubscription.privacyText")}{" "}
                          <Link
                            href="/privacy"
                            className="text-bes-red hover:text-bes-red/80 underline"
                          >
                            {t("modal.classSubscription.privacyLink")}
                          </Link>
                        </label>
                      </div>

                      {!classPrivacyChecked && (
                        <p
                          className="text-bes-red text-sm"
                          role="alert"
                          aria-live="polite"
                        >
                          {t(
                            "modal.classSubscription.validation.privacyRequired",
                          )}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={isClassFormPending || !classPrivacyChecked}
                        className="bg-bes-red hover:bg-bes-red/90 h-11 w-full cursor-pointer rounded-lg text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isClassFormPending
                          ? t("modal.classSubscription.submittingButton")
                          : t("modal.classSubscription.submitButton")}
                      </button>
                    </form>

                    {classSubscribeSuccess && (
                      <p className="bg-bes-purple/10 text-bes-purple mt-3 rounded-lg px-3 py-2 font-bold">
                        {classSubscribeSuccess}
                      </p>
                    )}
                    {classSubscribeError && (
                      <p className="bg-bes-red/10 text-bes-red mt-3 rounded-lg px-3 py-2 font-bold">
                        {classSubscribeError}
                      </p>
                    )}
                  </div>
                )}
              </div>
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

        {isSubscriberListModalOpen && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setIsSubscriberListModalOpen(false)}
          >
            <div
              className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-bes-red mb-3 text-xl font-bold">
                {t("modal.classSubscription.subscriberListTitle")}
              </h4>

              <p className="text-bes-purple/80 mb-3">{eventTitle}</p>

              {!hasLoadedSubscriberList ? (
                <form onSubmit={handleLoadSubscriberList} className="space-y-3">
                  <label
                    className="text-bes-purple font-semibold"
                    htmlFor="subscriber-token-input"
                  >
                    {t("modal.classSubscription.tokenLabel")}
                  </label>
                  <div className="relative">
                    <input
                      id="subscriber-token-input"
                      type={isSubscriberTokenVisible ? "text" : "password"}
                      value={subscriberToken}
                      onChange={(e) => setSubscriberToken(e.target.value)}
                      placeholder={t(
                        "modal.classSubscription.tokenPlaceholder",
                      )}
                      className="border-bes-purple text-bes-purple placeholder-bes-purple/60 h-11 w-full rounded-lg border-2 bg-white px-3 pr-20"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setIsSubscriberTokenVisible((current) => !current)
                      }
                      className="text-bes-purple hover:text-bes-red absolute top-1/2 right-3 -translate-y-1/2"
                      aria-label={
                        isSubscriberTokenVisible
                          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (t as any)(
                              "modal.classSubscription.hideTokenButton",
                            )
                          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (t as any)(
                              "modal.classSubscription.showTokenButton",
                            )
                      }
                    >
                      {isSubscriberTokenVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path d="M3 3l18 18" />
                          <path d="M10.58 10.58a2 2 0 102.83 2.83" />
                          <path d="M9.88 5.09A9.77 9.77 0 0112 4c5 0 9.27 3.11 11 8-1.01 2.84-3.14 5.04-5.88 6.32" />
                          <path d="M6.61 6.61C4.62 8 3.12 9.87 2 12c.72 1.71 1.81 3.23 3.17 4.46" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path d="M2 12s3.5-8 10-8 10 8 10 8-3.5 8-10 8-10-8-10-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {subscriberListError && (
                    <p className="text-bes-red" role="alert" aria-live="polite">
                      {subscriberListError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubscriberListPending}
                    className="bg-bes-red hover:bg-bes-red/90 h-11 w-full cursor-pointer rounded-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubscriberListPending
                      ? t("modal.classSubscription.loadingSubscribersButton")
                      : t("modal.classSubscription.loadSubscribersButton")}
                  </button>
                </form>
              ) : (
                <div>
                  {subscriberList.length > 0 ? (
                    <div className="mb-3 max-h-64 space-y-2 overflow-y-auto pr-1">
                      {subscriberList.map((subscriber, index) => (
                        <div
                          key={`${subscriber.email}-${index}`}
                          className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                        >
                          <div className="mb-1 flex items-start justify-between gap-3">
                            <p className="text-bes-purple font-bold">
                              {subscriber.name}
                            </p>
                            <p className="text-sm whitespace-nowrap text-gray-600">
                              {t("modal.classSubscription.createdAtLabel")}{" "}
                              {formatDateTime(subscriber.createdAt)}
                            </p>
                          </div>
                          <p className="text-gray-700">{subscriber.email}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-bes-purple/80 mb-3 text-sm">
                      {t("modal.classSubscription.emptySubscriberList")}
                    </p>
                  )}

                  {subscriberList.length > 0 && (
                    <p className="text-bes-purple mb-3 text-right text-sm font-semibold">
                      {t("modal.classSubscription.totalSubscribersLabel")}:{" "}
                      {subscriberList.length}
                    </p>
                  )}

                  <button
                    type="button"
                    className="bg-bes-red hover:bg-bes-red/90 h-11 w-full cursor-pointer rounded-lg font-bold text-white"
                    onClick={() => setIsSubscriberListModalOpen(false)}
                  >
                    {t("modal.classSubscription.closeSubscriberListButton")}
                  </button>
                </div>
              )}

              {!hasLoadedSubscriberList &&
                !isSubscriberListPending &&
                !subscriberListError && (
                  <p className="text-bes-purple/70 mt-3 text-sm">
                    {t("modal.classSubscription.subscriberListHint")}
                  </p>
                )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

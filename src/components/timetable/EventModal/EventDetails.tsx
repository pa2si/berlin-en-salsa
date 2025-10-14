import { useTranslations } from "next-intl";
import { SelectedEventDetails } from "../hooks/useEventModal";

interface EventDetailsProps {
  selectedEventDetails: SelectedEventDetails;
}

export default function EventDetails({
  selectedEventDetails,
}: EventDetailsProps) {
  const t = useTranslations("Timetable");

  return (
    <div className="mb-4 flex flex-col">
      <span className="flex items-center text-lg font-bold text-gray-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {selectedEventDetails.endTime
          ? `${selectedEventDetails.time} - ${selectedEventDetails.endTime}`
          : selectedEventDetails.time}
      </span>

      {/* Show actType/format - but skip for Aviatrix (will show host instead) */}
      {selectedEventDetails.actType &&
      selectedEventDetails.actType !== "Aviatrix" ? (
        <span className="text-lg text-gray-700">
          {selectedEventDetails.actType === "dance-workshop"
            ? t("actTypes.dance-workshop")
            : selectedEventDetails.actType === "music-workshop"
              ? t("actTypes.music-workshop")
              : selectedEventDetails.actType === "talk"
                ? t("actTypes.talk")
                : selectedEventDetails.actType}
        </span>
      ) : selectedEventDetails.type === "workshop" ? (
        <span className="text-lg text-gray-700">{t("actTypes.workshop")}</span>
      ) : selectedEventDetails.type === "talk" &&
        selectedEventDetails.actType !== "Aviatrix" ? (
        <span className="text-lg text-gray-700">{t("actTypes.talk")}</span>
      ) : null}

      {selectedEventDetails.instructor &&
        selectedEventDetails.type !== "talk" && (
          <span className="text-lg text-gray-700">
            {selectedEventDetails.type === "workshop"
              ? t("modal.workshopLeaderLabel")
              : t("modal.instructorLabel")}{" "}
            {selectedEventDetails.instructor}
            {selectedEventDetails.instructorTwo &&
              ` & ${selectedEventDetails.instructorTwo}`}
          </span>
        )}

      {/* For talk events, show Moderator and Guest with appropriate labels */}
      {/* Show host for Aviatrix talks */}
      {selectedEventDetails.type === "talk" &&
        selectedEventDetails.actType === "Aviatrix" &&
        selectedEventDetails.host && (
          <span className="text-lg text-gray-700">
            {selectedEventDetails.host}
          </span>
        )}
      {selectedEventDetails.type === "talk" &&
        selectedEventDetails.moderator && (
          <span className="text-lg text-gray-700">
            {selectedEventDetails.actType === "Aviatrix"
              ? t("modal.hostedByLabel")
              : t("modal.moderatorLabel")}{" "}
            {selectedEventDetails.moderator}
          </span>
        )}
      {selectedEventDetails.type === "talk" && selectedEventDetails.guest && (
        <span className="text-lg text-gray-700">
          {t("modal.guestLabel")} {selectedEventDetails.guest}
        </span>
      )}
      {selectedEventDetails.type === "talk" &&
        selectedEventDetails.presenter && (
          <span className="text-lg text-gray-700">
            {t("modal.presenterLabel")} {selectedEventDetails.presenter}
          </span>
        )}

      {/* For non-talk events, use the original presenter display */}
      {selectedEventDetails.type !== "talk" &&
        selectedEventDetails.presenter && (
          <span className="text-lg text-gray-700">
            {t("modal.presenterLabel")} {selectedEventDetails.presenter}
          </span>
        )}
      {selectedEventDetails.type !== "talk" && selectedEventDetails.host && (
        <span className="text-lg text-gray-700">
          {t("modal.hostLabel")} {selectedEventDetails.host}
        </span>
      )}

      {selectedEventDetails.hasShow && selectedEventDetails.danceShow && (
        <span className="text-bes-purple mt-1 flex items-center text-base font-bold">
          <span className="bg-bes-purple mr-2 inline-block h-3 w-3 rounded-full"></span>
          {selectedEventDetails.danceShow}
          {selectedEventDetails.dancers
            ? `: ${selectedEventDetails.dancers}`
            : ""}
        </span>
      )}
    </div>
  );
}

/**
 * Event Adapter - Converts TimetableEvent to SelectedEventDetails
 *
 * This adapter allows us to use the original EventModal UI with new TimetableEvent data
 */

import {
  TimetableEvent,
  isMainStageEvent,
  isDanceWorkshopEvent,
  isMusicWorkshopEvent,
  isTalkEvent,
  isAviatrixTalkEvent,
  isDanceShowEvent,
} from "../../../types/events";
import { SelectedEventDetails } from "../hooks/useEventModal";
import { useSmartTranslation } from "../../../data/timetable/utils/smartTranslation";

/**
 * Converts a TimetableEvent to SelectedEventDetails format for the modal
 * This is a React Hook that must be called from a component
 */
export function useEventAdapter() {
  const { translateIfKey } = useSmartTranslation();

  const convertTimetableEventToSelectedDetails = (
    event: TimetableEvent,
  ): SelectedEventDetails => {
    const baseDetails: SelectedEventDetails = {
      event: translateIfKey(event.title),
      time: event.startTime,
      endTime: event.endTime,
    };

    // Main Stage Events (DJ sets, live bands)
    if (isMainStageEvent(event)) {
      const slides = event.acts.map((act) => ({
        image: act.image,
        djName: act.role === "dj" ? translateIfKey(act.name) : undefined,
        bandName: act.role === "band" ? translateIfKey(act.name) : undefined,
        bio: translateIfKey(act.bio || act.description), // Use bio or description
        description: translateIfKey(act.description || act.bio), // Use description or bio for compatibility
        caption: act.name, // Keep as key for EventNavigation to translate
      }));

      // Determine if it's single or multiple DJs
      const djCount = event.acts.filter((act) => act.role === "dj").length;
      const actTypeLabel =
        event.performanceType === "dj-set"
          ? djCount > 1
            ? "DJ Sets"
            : "DJ Set"
          : "Live Band";

      return {
        ...baseDetails,
        type: "main",
        actType: actTypeLabel,
        djs: event.acts.map((a) => translateIfKey(a.name)).join(" & "),
        slides: slides.length > 0 ? slides : undefined,
        image: slides[0]?.image,
        bio: slides[0]?.bio,
        // Dance show properties
        hasShow: event.hasShow,
        danceShow: translateIfKey(event.danceShow),
        dancers: translateIfKey(event.dancers),
      };
    }

    // Dance Workshop Events
    if (isDanceWorkshopEvent(event)) {
      const instructors = event.acts.filter((act) => act.role === "instructor");
      const slides = instructors.map((act) => ({
        image: act.image,
        description: translateIfKey(event.description),
        bio: translateIfKey(act.bio),
        caption: act.name, // Keep as key for EventNavigation
      }));

      const firstInstructor = instructors[0];
      const secondInstructor =
        instructors.length > 1 ? instructors[1] : undefined;

      return {
        ...baseDetails,
        type: "workshop",
        actType: "dance-workshop",
        instructor: translateIfKey(firstInstructor?.name),
        instructorTwo: translateIfKey(secondInstructor?.name),
        description: translateIfKey(event.description),
        bio: translateIfKey(firstInstructor?.bio),
        bioTwo: translateIfKey(secondInstructor?.bio),
        slides: slides.length > 0 ? slides : undefined,
        image: slides[0]?.image,
      };
    }

    // Music Workshop Events
    if (isMusicWorkshopEvent(event)) {
      const instructors = event.acts.filter((act) => act.role === "instructor");
      const slides = instructors.map((act) => ({
        image: act.image,
        description: translateIfKey(event.description),
        bio: translateIfKey(act.bio),
        caption: act.name, // Keep as key for EventNavigation
      }));

      const firstInstructor = instructors[0];

      return {
        ...baseDetails,
        type: "workshop",
        actType: "music-workshop",
        instructor: translateIfKey(firstInstructor?.name),
        description: translateIfKey(event.description),
        bio: translateIfKey(firstInstructor?.bio),
        slides: slides.length > 0 ? slides : undefined,
        image: slides[0]?.image,
      };
    }

    // Aviatrix Charlas Salseras (Record Collection Talks)
    if (isAviatrixTalkEvent(event)) {
      const moderator = event.acts.find((act) => act.role === "moderator");
      const guest = event.acts.find((act) => act.role === "guest");

      // Use custom slides if provided, otherwise create from guest
      // Slides only change the image, bio stays constant (guest's bio)
      // For Aviatrix: first slide caption should be record name, second slide should be guest name
      const slides = event.slides
        ? event.slides.map((slide, index) => ({
            image: slide.image,
            caption: index === 0 ? event.recordDiscussed : slide.caption, // First slide: record name, others: original caption
            showCombinedDescription: true, // Flag to show bio outside slider
          }))
        : [
            {
              image: guest?.image,
              caption: guest?.name,
              showCombinedDescription: true,
            },
          ];

      return {
        ...baseDetails,
        type: "talk",
        actType: "Aviatrix", // Set actType to "Aviatrix" for special formatting
        host: "Aviatrix Session", // Show "Aviatrix Session" as the host
        moderator: translateIfKey(moderator?.name), // Show moderator (Rodo Le Fou, etc.)
        guest: translateIfKey(guest?.name),
        record: translateIfKey(event.recordDiscussed),
        artist: translateIfKey(event.artistDiscussed),
        comment: translateIfKey(event.moderatorComment),
        bio: translateIfKey(guest?.bio), // Guest bio shown once outside slider
        slides,
        image: slides[0]?.image,
      };
    }

    // Regular Salsa Talks
    if (isTalkEvent(event)) {
      const moderator = event.acts.find((act) => act.role === "moderator");
      const guests = event.acts.filter((act) => act.role === "guest");
      const presenter = event.acts.find((act) => act.role === "presenter");

      // Use custom slides if provided, otherwise generate from acts
      const slides = event.slides
        ? event.slides.map((slide) => ({
            image: slide.image,
            description: translateIfKey(slide.content),
            bio: translateIfKey(slide.bio),
            caption: slide.caption, // Keep as key for EventNavigation
          }))
        : event.acts.map((act) => ({
            image: act.image,
            description: translateIfKey(act.description), // Only act's own description, not event description
            bio: translateIfKey(act.bio),
            caption: act.name, // Keep as key for EventNavigation
          }));

      return {
        ...baseDetails,
        type: "talk",
        presenter: translateIfKey(presenter?.name), // Fixed: was 'host'
        guest: guests.map((g) => translateIfKey(g.name)).join(", "),
        moderator: translateIfKey(moderator?.name),
        description: translateIfKey(event.description),
        slides: slides.length > 0 ? slides : undefined,
        image: slides[0]?.image,
      };
    }

    // Dance Show Events
    if (isDanceShowEvent(event)) {
      const dancers = event.acts.filter((act) => act.role === "dancer");
      const slides = dancers.map((act) => ({
        image: act.image,
        dancerName: translateIfKey(act.name),
        dancerOne: translateIfKey(act.name)?.split(" & ")[0],
        dancerTwo: translateIfKey(act.name)?.split(" & ")[1],
        bio: translateIfKey(act.bio),
        caption: act.name, // Keep as key for EventNavigation
      }));

      return {
        ...baseDetails,
        type: "dance-show",
        danceShow: translateIfKey(event.showName),
        dancers: dancers.map((d) => translateIfKey(d.name)).join(" & "),
        slides: slides.length > 0 ? slides : undefined,
        image: slides[0]?.image,
      };
    }

    // Fallback for unknown event types
    return baseDetails;
  };

  return { convertTimetableEventToSelectedDetails };
}

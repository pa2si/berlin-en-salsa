/**
 * Event Conversion Utility
 *
 * Converts TimetableEvent to SelectedEventDetails format for the modal.
 * This is the EXACT SAME logic from the original adapter to guarantee 100% UI fidelity.
 *
 * The only change: extracted as a pure function instead of a React Hook.
 */

import {
  TimetableEvent,
  isMainStageEvent,
  isDanceAreaEvent,
  isMusicWorkshopEvent,
  isTalkEvent,
  isAviatrixTalkEvent,
  isDanceShowEvent,
} from "../../../types/events";
import { SelectedEventDetails } from "../hooks/useEventModal";

/**
 * Converts a TimetableEvent to SelectedEventDetails format for the modal
 *
 * @param event - The TimetableEvent to convert
 * @param translateIfKey - Translation function from useSmartTranslation()
 * @returns SelectedEventDetails formatted for the modal UI
 */
export function convertTimetableEventToSelectedDetails(
  event: TimetableEvent,
  translateIfKey: (key?: string) => string,
): SelectedEventDetails {
  const baseDetails: SelectedEventDetails = {
    event: translateIfKey(event.title),
    time: event.startTime || "", // Provide default empty string if undefined
    endTime: event.endTime,
  };

  // Main Stage Events (DJ sets, live bands)
  if (isMainStageEvent(event)) {
    const slides = event.acts.map((act) => ({
      image: act.image,
      djName: act.role === "dj" ? translateIfKey(act.name) : undefined,
      bandName: act.role === "band" ? translateIfKey(act.name) : undefined,
      bio: act.bio ? translateIfKey(act.bio) : undefined,
      description: act.description
        ? translateIfKey(act.description)
        : undefined,
      descriptionFromAct: Boolean(act.description),
      caption: act.name, // Keep as key for EventNavigation to translate
      descriptionColectivo: act.descriptionColectivo
        ? translateIfKey(act.descriptionColectivo)
        : undefined,
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
  if (isDanceAreaEvent(event)) {
    const participants = event.acts.filter((act) =>
      event.danceAreaType === "show"
        ? act.role === "dancer"
        : act.role === "instructor",
    );
    const slides = event.slides
      ? event.slides.map((slide) => {
          const matchedParticipant = participants.find(
            (act) => act.name === slide.caption,
          );

          return {
            image: slide.image ?? matchedParticipant?.image,
            description: translateIfKey(
              slide.content ??
                matchedParticipant?.description ??
                event.description,
            ),
            bio: translateIfKey(slide.bio ?? matchedParticipant?.bio),
            caption: slide.caption, // Keep as key for EventNavigation
          };
        })
      : participants.map((act) => ({
          image: act.image,
          description: translateIfKey(act.description ?? event.description),
          bio: translateIfKey(act.bio),
          caption: act.name, // Keep as key for EventNavigation
        }));

    const firstParticipant = participants[0];
    const secondParticipant =
      participants.length > 1 ? participants[1] : undefined;
    const danceAreaActType =
      event.danceAreaType === "show"
        ? "dance-area-show"
        : event.danceAreaType === "class"
          ? "dance-area-class"
          : "dance-area-workshop";

    return {
      ...baseDetails,
      type: "dance-area",
      actType: danceAreaActType,
      instructor:
        event.danceAreaType === "show"
          ? participants
              .map((participant) => translateIfKey(participant.name))
              .join(", ")
          : translateIfKey(firstParticipant?.name),
      instructorTwo:
        event.danceAreaType === "show"
          ? undefined
          : translateIfKey(secondParticipant?.name),
      description: translateIfKey(event.description),
      bio: translateIfKey(firstParticipant?.bio),
      bioTwo: translateIfKey(secondParticipant?.bio),
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
      actType: event.actType ?? "music-workshop",
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
    const host = event.acts.find((act) => act.role === "host");
    const moderator = event.acts.find((act) => act.role === "moderator");
    const authors = event.acts.filter((act) => act.role === "author");
    const guests = event.acts.filter((act) => act.role === "guest");
    const presenter = event.acts.find((act) => act.role === "presenter");
    const isBookPresentation = event.format === "book-presentation";
    const talkBios =
      event.slides && event.slides.length > 0
        ? undefined
        : event.acts
            .filter((act) => Boolean(act.bio))
            .map((act) => ({
              name: translateIfKey(act.name),
              bio: translateIfKey(act.bio),
            }));

    // Only use slides when they were explicitly created on the event.
    const slides = event.slides?.map((slide, index) => {
      const matchedAct = event.acts.find((act) => act.name === slide.caption);

      return {
        image: slide.image,
        description: translateIfKey(
          slide.content ??
            (isBookPresentation && index === 0 ? event.description : undefined),
        ),
        bio: translateIfKey(slide.bio ?? matchedAct?.bio),
        caption: slide.caption, // Keep as key for EventNavigation
      };
    });
    const talkImage =
      event.image ?? presenter?.image ?? moderator?.image ?? guests[0]?.image;

    return {
      ...baseDetails,
      type: "talk",
      actType:
        event.format === "interview"
          ? "interview"
          : event.format === "book-presentation"
            ? "book-presentation"
            : undefined,
      host: translateIfKey(host?.name),
      presenter: translateIfKey(presenter?.name), // Fixed: was 'host'
      guest: (authors.length > 0 ? authors : guests)
        .map((person) => translateIfKey(person.name))
        .join(", "),
      moderator: translateIfKey(moderator?.name),
      description: isBookPresentation
        ? undefined
        : translateIfKey(event.description),
      talkBios: talkBios && talkBios.length > 0 ? talkBios : undefined,
      slides: slides && slides.length > 0 ? slides : undefined,
      image: slides?.[0]?.image ?? talkImage,
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
}

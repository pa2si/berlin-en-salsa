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

/**
 * Converts a TimetableEvent to SelectedEventDetails format for the modal
 */
export function convertTimetableEventToSelectedDetails(
  event: TimetableEvent
): SelectedEventDetails {
  const baseDetails: SelectedEventDetails = {
    event: event.title,
    time: event.startTime,
    endTime: event.endTime,
  };

  // Main Stage Events (DJ sets, live bands)
  if (isMainStageEvent(event)) {
    const slides = event.acts.map((act) => ({
      image: act.image,
      djName: act.role === "dj" ? act.name : undefined,
      bandName: act.role === "band" ? act.name : undefined,
      bio: act.bio,
      description: act.bio, // Use bio as description for compatibility
      caption: act.name,
    }));

    return {
      ...baseDetails,
      type: "main",
      actType: event.performanceType === "dj-set" ? "DJ Set" : "Live Band",
      djs: event.acts.map((a) => a.name).join(" & "),
      slides: slides.length > 0 ? slides : undefined,
      image: slides[0]?.image,
      bio: slides[0]?.bio,
      // Dance show properties
      hasShow: event.hasShow,
      danceShow: event.danceShow,
      dancers: event.dancers,
    };
  }

  // Dance Workshop Events
  if (isDanceWorkshopEvent(event)) {
    const instructors = event.acts.filter((act) => act.role === "instructor");
    const slides = instructors.map((act) => ({
      image: act.image,
      description: event.description,
      bio: act.bio,
      caption: act.name,
    }));

    const firstInstructor = instructors[0];
    const secondInstructor = instructors.length > 1 ? instructors[1] : undefined;

    return {
      ...baseDetails,
      type: "workshop",
      actType: "dance-workshop",
      instructor: firstInstructor?.name,
      instructorTwo: secondInstructor?.name,
      description: event.description,
      bio: firstInstructor?.bio,
      bioTwo: secondInstructor?.bio,
      slides: slides.length > 0 ? slides : undefined,
      image: slides[0]?.image,
    };
  }

  // Music Workshop Events
  if (isMusicWorkshopEvent(event)) {
    const instructors = event.acts.filter((act) => act.role === "instructor");
    const slides = instructors.map((act) => ({
      image: act.image,
      description: event.description,
      bio: act.bio,
      caption: act.name,
    }));

    const firstInstructor = instructors[0];

    return {
      ...baseDetails,
      type: "workshop",
      actType: "music-workshop",
      instructor: firstInstructor?.name,
      description: event.description,
      bio: firstInstructor?.bio,
      slides: slides.length > 0 ? slides : undefined,
      image: slides[0]?.image,
    };
  }

  // Aviatrix Charlas Salseras (Record Collection Talks)
  if (isAviatrixTalkEvent(event)) {
    const presenter = event.acts.find((act) => act.role === "presenter");
    
    const slides = [
      // Slide 1: Presenter info
      {
        image: presenter?.image,
        bio: presenter?.bio,
        djName: presenter?.name,
        caption: presenter?.name,
      },
      // Slide 2: Record info
      {
        image: event.image, // Use event's main image for record
        description: event.moderatorComment,
        caption: event.recordDiscussed,
      },
    ];

    return {
      ...baseDetails,
      type: "talk",
      presenter: presenter?.name,
      record: event.recordDiscussed,
      artist: event.artistDiscussed,
      comment: event.moderatorComment,
      slides,
    };
  }

  // Regular Salsa Talks
  if (isTalkEvent(event)) {
    const moderator = event.acts.find((act) => act.role === "moderator");
    const guests = event.acts.filter((act) => act.role === "guest");
    const presenter = event.acts.find((act) => act.role === "presenter");
    
    const slides = event.acts.map((act) => ({
      image: act.image,
      description: act.description || event.description,
      bio: act.bio,
      caption: act.name,
    }));

    return {
      ...baseDetails,
      type: "talk",
      host: presenter?.name,
      guest: guests.map((g) => g.name).join(", "),
      moderator: moderator?.name,
      description: event.description,
      slides: slides.length > 0 ? slides : undefined,
      image: slides[0]?.image,
    };
  }

  // Dance Show Events
  if (isDanceShowEvent(event)) {
    const dancers = event.acts.filter((act) => act.role === "dancer");
    const slides = dancers.map((act) => ({
      image: act.image,
      dancerName: act.name,
      dancerOne: act.name?.split(" & ")[0],
      dancerTwo: act.name?.split(" & ")[1],
      bio: act.bio,
      caption: act.name,
    }));

    return {
      ...baseDetails,
      type: "dance-show",
      danceShow: event.showName,
      dancers: dancers.map((d) => d.name).join(" & "),
      slides: slides.length > 0 ? slides : undefined,
      image: slides[0]?.image,
    };
  }

  // Fallback for unknown event types
  return baseDetails;
}

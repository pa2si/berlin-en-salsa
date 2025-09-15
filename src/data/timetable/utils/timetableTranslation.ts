import { TimeSlot, SlideContent } from "../../../types/timetable";
import {
  TranslatableTimeSlot,
  TranslatableSlideContent,
} from "../types/translatable.types";
import { useSmartTranslation, translateIfKeyServer } from "./smartTranslation";

/**
 * Hook to transform translatable timetable data into regular timetable data for client components
 */
export function useTimetableTranslation() {
  const { translateIfKey } = useSmartTranslation();

  const translateTimeSlot = (slot: TranslatableTimeSlot): TimeSlot => {
    return {
      ...slot,
      event: translateIfKey(slot.event),
      actType: translateIfKey(slot.actType),
      description: translateIfKey(slot.description),
      danceShow: translateIfKey(slot.danceShow),
      dancers: translateIfKey(slot.dancers),
      instructor: translateIfKey(slot.instructor),
      presenter: translateIfKey(slot.presenter),
      host: translateIfKey(slot.host),
      moderator: translateIfKey(slot.moderator),
      guest: translateIfKey(slot.guest),
      djs: translateIfKey(slot.djs),
      bio: translateIfKey(slot.bio),
      record: translateIfKey(slot.record),
      artist: translateIfKey(slot.artist),
      text: translateIfKey(slot.text),
      comment: translateIfKey(slot.comment),
      slides: slot.slides?.map(translateSlideContent),
    };
  };

  const translateSlideContent = (
    slide: TranslatableSlideContent,
  ): SlideContent => {
    return {
      ...slide,
      djName: translateIfKey(slide.djName),
      djOne: translateIfKey(slide.djOne),
      djTwo: translateIfKey(slide.djTwo),
      djOneDescription: translateIfKey(slide.djOneDescription),
      djTwoDescription: translateIfKey(slide.djTwoDescription),
      bandName: translateIfKey(slide.bandName),
      dancerOne: translateIfKey(slide.dancerOne),
      dancerTwo: translateIfKey(slide.dancerTwo),
      dancerOneDescription: translateIfKey(slide.dancerOneDescription),
      dancerTwoDescription: translateIfKey(slide.dancerTwoDescription),
      description: translateIfKey(slide.description),
    };
  };

  return {
    translateTimeSlot,
    translateTimeSlots: (slots: TranslatableTimeSlot[]) =>
      slots.map(translateTimeSlot),
  };
}

/**
 * Server-side function to transform translatable timetable data
 */
export async function translateTimeSlotsServer(
  slots: TranslatableTimeSlot[],
): Promise<TimeSlot[]> {
  const translatedSlots: TimeSlot[] = [];

  for (const slot of slots) {
    const translatedSlides = slot.slides
      ? await Promise.all(
          slot.slides.map(async (slide) => ({
            ...slide,
            djName: await translateIfKeyServer(slide.djName),
            djOne: await translateIfKeyServer(slide.djOne),
            djTwo: await translateIfKeyServer(slide.djTwo),
            djOneDescription: await translateIfKeyServer(
              slide.djOneDescription,
            ),
            djTwoDescription: await translateIfKeyServer(
              slide.djTwoDescription,
            ),
            bandName: await translateIfKeyServer(slide.bandName),
            dancerOne: await translateIfKeyServer(slide.dancerOne),
            dancerTwo: await translateIfKeyServer(slide.dancerTwo),
            dancerOneDescription: await translateIfKeyServer(
              slide.dancerOneDescription,
            ),
            dancerTwoDescription: await translateIfKeyServer(
              slide.dancerTwoDescription,
            ),
            description: await translateIfKeyServer(slide.description),
          })),
        )
      : undefined;

    translatedSlots.push({
      ...slot,
      event: await translateIfKeyServer(slot.event),
      actType: await translateIfKeyServer(slot.actType),
      description: await translateIfKeyServer(slot.description),
      danceShow: await translateIfKeyServer(slot.danceShow),
      dancers: await translateIfKeyServer(slot.dancers),
      instructor: await translateIfKeyServer(slot.instructor),
      presenter: await translateIfKeyServer(slot.presenter),
      host: await translateIfKeyServer(slot.host),
      moderator: await translateIfKeyServer(slot.moderator),
      guest: await translateIfKeyServer(slot.guest),
      djs: await translateIfKeyServer(slot.djs),
      bio: await translateIfKeyServer(slot.bio),
      record: await translateIfKeyServer(slot.record),
      artist: await translateIfKeyServer(slot.artist),
      text: await translateIfKeyServer(slot.text),
      comment: await translateIfKeyServer(slot.comment),
      slides: translatedSlides,
    });
  }

  return translatedSlots;
}

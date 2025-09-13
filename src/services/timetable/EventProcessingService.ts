import { TimeSlot } from "../../data/timetable/types/event.types";
import { SelectedEventDetails } from "../../components/timetable/hooks/useEventModal";

// Define slide content type
interface SlideContent {
  image?: string;
  description?: string;
  djName?: string;
  dancerName?: string;
  bandName?: string;
  dancerOne?: string;
  dancerTwo?: string;
  dancerOneDescription?: string;
  dancerTwoDescription?: string;
  combinedDancersDescription?: string;
  djOne?: string;
  djTwo?: string;
  djOneDescription?: string;
  djTwoDescription?: string;
  descriptionTwoDjsTogether?: string;
  genreDescription?: string;
}

/**
 * Service for processing complex event logic
 * Handles event continuations, multi-slot events, dance shows, and slide generation
 */
export class EventProcessingService {
  /**
   * Determines if a slot is a continuation of the previous event
   */
  static isEventContinuation(
    slot: TimeSlot,
    previousSlot: TimeSlot | null,
  ): boolean {
    if (!previousSlot || !slot.event || !previousSlot.event) {
      return false;
    }

    return (
      slot.event === previousSlot.event &&
      slot.instructor === previousSlot.instructor &&
      slot.presenter === previousSlot.presenter &&
      slot.host === previousSlot.host
    );
  }

  /**
   * Calculates the number of consecutive slots for an event
   */
  static calculateEventSpan(slots: TimeSlot[], startIndex: number): number {
    if (startIndex >= slots.length) return 1;

    const baseSlot = slots[startIndex];
    let count = 1;

    for (let i = startIndex + 1; i < slots.length; i++) {
      if (this.isEventContinuation(slots[i], baseSlot)) {
        count++;
      } else {
        break;
      }
    }

    return count;
  }

  /**
   * Finds the slot with an image in a sequence of consecutive slots
   */
  static findSlotWithImage(
    slots: TimeSlot[],
    startIndex: number,
    count: number,
  ): TimeSlot {
    return (
      slots
        .slice(startIndex, startIndex + count)
        .find((s) => s.image || s.imageTwo) || slots[startIndex]
    );
  }

  /**
   * Generates slides for an event based on slot data
   */
  static generateEventSlides(
    slots: TimeSlot[],
    startIndex: number,
    count: number,
    showSlot: TimeSlot,
  ): SlideContent[] {
    const slides: SlideContent[] = [];

    // Check if the slot has custom slides first
    if (showSlot.slides && showSlot.slides.length > 0) {
      slides.push(...showSlot.slides);
    } else {
      // Find slot with images
      const slotWithImage = this.findSlotWithImage(slots, startIndex, count);

      const hasImage = slotWithImage.image || showSlot.image;
      const hasImageTwo = slotWithImage.imageTwo || showSlot.imageTwo;

      if (hasImage && hasImageTwo) {
        // Create two slides for dual images
        slides.push({ image: hasImage });
        slides.push({ image: hasImageTwo });
      } else if (hasImage) {
        // Single image slide
        slides.push({ image: hasImage });
      }

      // Add slides from other slots in the sequence
      if (count > 1) {
        slots
          .slice(startIndex, startIndex + count)
          .filter((s) => s.slides && s.slides.length > 0 && s !== showSlot)
          .forEach((s) => {
            if (s.slides) slides.push(...s.slides);
          });
      }
    }

    // Add dance show slide if needed
    if (showSlot.hasShow && showSlot.danceShow) {
      const hasDanceShowSlide = slides.some(
        (slide) =>
          slide.dancerName === showSlot.dancers ||
          slide.dancerOne ||
          (slide.dancerOne && slide.dancerTwo),
      );

      if (!hasDanceShowSlide && showSlot.dancers) {
        slides.push({
          image: "/son-cubano.webp",
          dancerName: showSlot.dancers,
        });
      }
    }

    return slides;
  }

  /**
   * Creates event details object for modal display
   */
  static createEventDetails(
    slot: TimeSlot,
    showSlot: TimeSlot,
    slides: SlideContent[],
    slots?: TimeSlot[],
    slotIndex?: number,
    eventSpan?: number,
  ): SelectedEventDetails {
    const slotWithImage = showSlot.image || showSlot.imageTwo ? showSlot : slot;

    // Calculate end time if we have the necessary data
    let endTime: string | undefined;
    if (slots && slotIndex !== undefined && eventSpan) {
      endTime = this.calculateEndTime(slots, slotIndex, eventSpan);
    }

    return {
      event: slot.event || "",
      time: slot.time,
      endTime,
      instructor: showSlot.instructor || slot.instructor,
      presenter: showSlot.presenter || slot.presenter,
      host: showSlot.host || slot.host,
      djs: showSlot.djs || slot.djs,
      description: showSlot.description || slot.description,
      bio: showSlot.bio || slot.bio,
      record: showSlot.record || slot.record,
      artist: showSlot.artist || slot.artist,
      text: showSlot.text || slot.text,
      comment: showSlot.comment || slot.comment,
      image: slotWithImage.image || showSlot.image || slot.image,
      imageTwo: slotWithImage.imageTwo || showSlot.imageTwo || slot.imageTwo,
      slides: slides.length > 0 ? slides : undefined,
      type: showSlot.type || slot.type,
      actType: showSlot.actType || slot.actType,
      hasShow: !!showSlot.hasShow,
      danceShow: showSlot.danceShow,
      dancers: showSlot.dancers,
    };
  }

  /**
   * Calculates end time for multi-slot events
   */
  static calculateEndTime(
    slots: TimeSlot[],
    startIndex: number,
    count: number,
  ): string | undefined {
    if (startIndex >= slots.length) return undefined;

    const startSlot = slots[startIndex];
    const [hours, minutes] = startSlot.time.split(":").map(Number);

    // Add 30 minutes per slot to get the end time
    const totalMinutes = hours * 60 + minutes + count * 30;
    const endHour = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;

    return `${endHour.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
  }

  /**
   * Formats time range for display
   */
  static formatTimeRange(startTime: string, endTime?: string): string {
    if (!endTime) return startTime;
    return `${startTime} - ${endTime}`;
  }
}

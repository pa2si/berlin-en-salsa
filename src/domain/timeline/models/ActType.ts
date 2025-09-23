import { Artist } from "./Artist";
import {
  ActCategory,
  EventType,
  SkillLevel,
  ActStatus,
  SlideData,
  ActTypeConstructorData,
  ModalContent,
  LegacySlideContent,
} from "./types"; /**
 * ActType class - Unified model for all types of activities/events
 * Based on actual data analysis from your timetable files
 */

export class ActType {
  readonly id: string;
  readonly title: string; // Can be translation key like "Timetable.events.mainStage.saturday.rodoElProfe"
  readonly category: ActCategory;
  readonly type: EventType;

  // Timing
  readonly startTime: string; // "14:30"
  readonly duration: number; // in minutes
  readonly endTime?: string; // calculated or explicit

  // People involved (based on your data patterns)
  readonly artists: Artist[] = [];
  readonly primaryArtist?: Artist;
  readonly secondaryArtists: Artist[] = [];

  // Content (all can be translation keys)
  readonly description?: string; // Can be "Timetable.events.descriptions.xxx"
  readonly shortDescription?: string;
  readonly level?: SkillLevel; // For workshops
  readonly language?: string[]; // Spoken languages
  readonly capacity?: number; // Max attendees

  // Media
  readonly images: string[] = [];
  readonly primaryImage?: string; // Direct image path like "/rodo-le-fou.webp"
  readonly imageTwo?: string; // Found in your data
  readonly slides: SlideData[] = [];

  // Special features (from your data analysis)
  readonly hasDanceShow?: boolean; // hasShow in your data
  readonly danceShowTitle?: string; // danceShow field
  readonly danceShowDancers?: Artist[]; // dancers field
  readonly isExtended?: boolean; // Spans multiple time slots
  readonly isContinuation?: boolean; // Continuation of previous slot

  // Workshop specific (found in your data)
  readonly instructor?: string; // Translation key "Timetable.events.artists.xxx"
  readonly instructorTwo?: string; // For pair instruction
  readonly bio?: string; // Instructor bio translation key
  readonly bioTwo?: string; // Second instructor bio
  readonly prerequisites?: string[];
  readonly materials?: string[];
  readonly learningObjectives?: string[];

  // Talk specific (from your Aviatrix and regular talk data)
  readonly presenter?: string; // Translation key
  readonly moderator?: string; // For Aviatrix format
  readonly guest?: string; // For Aviatrix format
  readonly host?: string; // Alternative to moderator
  readonly topics?: string[];
  readonly discussedArtist?: string; // artist field in Aviatrix
  readonly discussedRecord?: string; // record field in Aviatrix
  readonly moderatorComments?: string; // comment field in Aviatrix
  readonly guestComments?: string;
  readonly text?: string; // Additional text field

  // Performance specific (from main stage data)
  readonly actType?: string; // "DJ Set", "Live" - can be translation key
  readonly djs?: string; // String of DJ names, can be translation key
  readonly setlist?: string[];
  readonly collaborations?: string[];
  readonly specialNotes?: string;

  // Administrative
  readonly status: ActStatus = ActStatus.SCHEDULED;
  readonly tags: string[] = [];
  readonly isHighlight?: boolean;
  readonly requiresRegistration?: boolean;
  readonly price?: number;

  constructor(data: ActTypeConstructorData) {
    this.id = data.id;
    this.title = data.title;
    this.category = data.category;
    this.type = data.type;
    this.startTime = data.startTime;
    this.duration = data.duration;
    this.endTime = data.endTime || this.calculateEndTime();
    this.artists = data.artists || [];
    this.primaryArtist = data.primaryArtist;
    this.secondaryArtists = data.secondaryArtists || [];
    this.description = data.description;
    this.shortDescription = data.shortDescription;
    this.level = data.level;
    this.language = data.language;
    this.capacity = data.capacity;
    this.images = data.images || [];
    this.primaryImage = data.primaryImage || this.images[0];
    this.imageTwo = data.imageTwo;
    this.slides = data.slides || [];
    this.hasDanceShow = data.hasDanceShow;
    this.danceShowTitle = data.danceShowTitle;
    this.danceShowDancers = data.danceShowDancers;
    this.isExtended = data.isExtended;
    this.isContinuation = data.isContinuation;
    this.instructor = data.instructor;
    this.instructorTwo = data.instructorTwo;
    this.bio = data.bio;
    this.bioTwo = data.bioTwo;
    this.prerequisites = data.prerequisites;
    this.materials = data.materials;
    this.learningObjectives = data.learningObjectives;
    this.presenter = data.presenter;
    this.moderator = data.moderator;
    this.guest = data.guest;
    this.host = data.host;
    this.topics = data.topics;
    this.discussedArtist = data.discussedArtist;
    this.discussedRecord = data.discussedRecord;
    this.moderatorComments = data.moderatorComments;
    this.guestComments = data.guestComments;
    this.text = data.text;
    this.actType = data.actType;
    this.djs = data.djs;
    this.setlist = data.setlist;
    this.collaborations = data.collaborations;
    this.specialNotes = data.specialNotes;
    this.status = data.status || ActStatus.SCHEDULED;
    this.tags = data.tags || [];
    this.isHighlight = data.isHighlight;
    this.requiresRegistration = data.requiresRegistration;
    this.price = data.price;
  }

  /**
   * Calculate end time based on start time and duration
   */
  private calculateEndTime(): string {
    const [hours, minutes] = this.startTime.split(":").map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + this.duration;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return `${endHours.toString().padStart(2, "0")}:${endMins.toString().padStart(2, "0")}`;
  }

  /**
   * Get formatted time range
   */
  getTimeRange(): string {
    return `${this.startTime} - ${this.endTime}`;
  }

  /**
   * Get all people involved as formatted string (matches your current djs field)
   */
  getPeopleString(): string {
    if (this.djs) return this.djs; // Direct DJ string from data
    if (this.instructor) {
      return this.instructorTwo
        ? `${this.instructor} & ${this.instructorTwo}`
        : this.instructor;
    }
    if (this.presenter) return this.presenter;
    if (this.moderator && this.guest) return `${this.moderator}, ${this.guest}`;
    return this.artists.map((artist) => artist.name).join(", ");
  }

  /**
   * Get the primary instructor/presenter/DJ
   */
  getPrimaryPerson(): string | undefined {
    return (
      this.instructor ||
      this.presenter ||
      this.moderator ||
      this.primaryArtist?.name
    );
  }

  /**
   * Check if this is an Aviatrix format talk
   */
  isAviatrixTalk(): boolean {
    return this.actType === "aviatrix" || this.actType === "Aviatrix";
  }

  /**
   * Check if this act has specific features
   */
  hasFeature(feature: string): boolean {
    return this.tags.includes(feature);
  }

  /**
   * Get content for modal display based on available data
   * This matches the structure expected by your current modal system
   */
  getModalContent(): ModalContent {
    const content: ModalContent = {
      event: this.title,
      time: this.startTime,
      endTime: this.endTime,
      type: this.getUIType(),
      actType: this.actType,
      description: this.description,
      image: this.primaryImage,
      imageTwo: this.imageTwo,
      slides: this.slides.map((slide) =>
        this.convertSlideToLegacyFormat(slide),
      ),
      hasShow: this.hasDanceShow,
      danceShow: this.danceShowTitle,
      dancers: this.danceShowDancers?.map((d) => d.name).join(", "),
    };

    // Add type-specific content
    if (this.category === ActCategory.WORKSHOP) {
      content.instructor = this.instructor;
      content.instructorTwo = this.instructorTwo;
      content.bio = this.bio;
      content.bioTwo = this.bioTwo;
    } else if (this.category === ActCategory.PERFORMANCE) {
      content.djs = this.djs;
    } else if (this.category === ActCategory.TALK) {
      content.presenter = this.presenter;
      content.moderator = this.moderator;
      content.guest = this.guest;
      content.host = this.host;

      // Aviatrix specific fields
      if (this.isAviatrixTalk()) {
        content.artist = this.discussedArtist;
        content.record = this.discussedRecord;
        content.comment = this.moderatorComments;
        content.bio = this.bio; // Guest bio in Aviatrix
      }
    }

    return content;
  }

  /**
   * Convert internal slide format to legacy format for modal compatibility
   */
  private convertSlideToLegacyFormat(slide: SlideData): LegacySlideContent {
    return {
      id: slide.id,
      image: slide.image,
      description: slide.description,
      title: slide.title,
      // Map artist to appropriate fields based on type
      djName: slide.artist?.type === "dj" ? slide.artist.name : undefined,
      bandName: slide.artist?.type === "band" ? slide.artist.name : undefined,
      dancer: slide.artist?.type === "dancer" ? slide.artist.name : undefined,
      bio: slide.artist?.bio,
    };
  }

  /**
   * Map to UI type for backward compatibility
   */
  private getUIType(): "main" | "dance-show" | "workshop" | "talk" {
    switch (this.category) {
      case ActCategory.PERFORMANCE:
        return "main";
      case ActCategory.WORKSHOP:
        return "workshop";
      case ActCategory.TALK:
        return "talk";
      default:
        return "main";
    }
  }

  /**
   * Check if this act spans multiple time slots
   */
  isMultiSlot(): boolean {
    return this.duration > 30;
  }

  /**
   * Get all time slots this act occupies
   */
  getTimeSlots(): string[] {
    const slots: string[] = [this.startTime];

    if (this.isMultiSlot()) {
      const [hours, minutes] = this.startTime.split(":").map(Number);
      let currentMinutes = hours * 60 + minutes;
      const endMinutes = currentMinutes + this.duration;

      while (currentMinutes + 30 < endMinutes) {
        currentMinutes += 30;
        const slotHours = Math.floor(currentMinutes / 60);
        const slotMins = currentMinutes % 60;
        slots.push(
          `${slotHours.toString().padStart(2, "0")}:${slotMins.toString().padStart(2, "0")}`,
        );
      }
    }

    return slots;
  }

  /**
   * Check if this uses translation keys
   */
  hasTranslationKeys(): boolean {
    return this.title.startsWith("Timetable.");
  }
}

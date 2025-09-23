/**
 * Artist class - Unified model for all types of artists (DJs, dancers, instructors, presenters, etc.)
 * Based on actual data analysis from the timetable files
 */

import { ArtistType, ArtistConstructorData } from "./types";

export class Artist {
  readonly id: string;
  readonly name: string; // Can be translation key like "Timetable.events.artists.rodoLeFou"
  readonly type: ArtistType;

  // Core information
  readonly bio?: string; // Can be translation key like "Timetable.events.bios.rodoLeFou"
  readonly image?: string; // Static path like "/rodo-le-fou.webp"
  readonly nationality?: string;
  readonly location?: string; // Current city/country

  // Professional details
  readonly expertise: string[] = [];
  readonly genres: string[] = [];
  readonly styles: string[] = [];
  readonly experience?: string; // Years or description
  readonly languages: string[] = [];

  // Social/contact
  readonly website?: string;
  readonly instagram?: string;
  readonly spotify?: string;
  readonly soundcloud?: string;

  // Specific role attributes (from your data)
  readonly djGenres?: string[]; // For DJs
  readonly danceStyles?: string[]; // For dancers/instructors
  readonly topics?: string[]; // For presenters/speakers
  readonly instruments?: string[]; // For musicians
  readonly teachingSpecialties?: string[]; // For instructors

  // Festival specific
  readonly isHeadliner?: boolean;
  readonly isLocal?: boolean;
  readonly isGuest?: boolean;

  // Special fields found in your data
  readonly description?: string; // Can be translation key like "Timetable.events.descriptions.artist"

  constructor(data: ArtistConstructorData) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    this.bio = data.bio;
    this.image = data.image;
    this.nationality = data.nationality;
    this.location = data.location;
    this.expertise = data.expertise || [];
    this.genres = data.genres || [];
    this.styles = data.styles || [];
    this.experience = data.experience;
    this.languages = data.languages || [];
    this.website = data.website;
    this.instagram = data.instagram;
    this.spotify = data.spotify;
    this.soundcloud = data.soundcloud;
    this.djGenres = data.djGenres;
    this.danceStyles = data.danceStyles;
    this.topics = data.topics;
    this.instruments = data.instruments;
    this.teachingSpecialties = data.teachingSpecialties;
    this.isHeadliner = data.isHeadliner;
    this.isLocal = data.isLocal;
    this.isGuest = data.isGuest;
    this.description = data.description;
  }

  /**
   * Get the primary image for this artist
   */
  getImage(): string | undefined {
    return this.image;
  }

  /**
   * Get a short description based on available data
   */
  getShortDescription(): string {
    const parts: string[] = [];

    if (this.type === ArtistType.DJ && this.djGenres?.length) {
      parts.push(`DJ (${this.djGenres.join(", ")})`);
    } else if (this.type === ArtistType.DANCER && this.danceStyles?.length) {
      parts.push(`Dancer (${this.danceStyles.join(", ")})`);
    } else if (
      this.type === ArtistType.INSTRUCTOR &&
      this.teachingSpecialties?.length
    ) {
      parts.push(`Instructor (${this.teachingSpecialties.join(", ")})`);
    } else {
      parts.push(this.type);
    }

    if (this.location) {
      parts.push(`from ${this.location}`);
    }

    return parts.join(" ");
  }

  /**
   * Check if this artist has specific expertise
   */
  hasExpertise(expertise: string): boolean {
    return (
      this.expertise.includes(expertise) ||
      this.genres.includes(expertise) ||
      this.styles.includes(expertise) ||
      this.djGenres?.includes(expertise) === true ||
      this.danceStyles?.includes(expertise) === true ||
      this.topics?.includes(expertise) === true ||
      this.teachingSpecialties?.includes(expertise) === true
    );
  }

  /**
   * Get all social media links
   */
  getSocialLinks(): Record<string, string> {
    const links: Record<string, string> = {};
    if (this.website) links.website = this.website;
    if (this.instagram) links.instagram = this.instagram;
    if (this.spotify) links.spotify = this.spotify;
    if (this.soundcloud) links.soundcloud = this.soundcloud;
    return links;
  }

  /**
   * Check if this is a translation key
   */
  hasTranslationKey(): boolean {
    return this.name.startsWith("Timetable.");
  }
}

import { ActType } from "../models/ActType";
import { AreaType, ActCategory } from "../models/types";

/**
 * Serializable interfaces for passing timeline data to client components
 * These interfaces contain only plain objects, no methods or complex classes
 */

export interface SerializableAct {
  id: string;
  title: string;
  artistName: string;
  startTime: string;
  endTime: string;
  description?: string;
  bio?: string;
  category: ActCategory;
}

export interface SerializableTimelineColumn {
  id: AreaType;
  title: string;
  category: ActCategory;
  order: number;
  acts: SerializableAct[];
  color: string;
  icon: string;
}

/**
 * Convert ActType domain model to serializable format
 */
export function serializeAct(act: ActType): SerializableAct {
  return {
    id: act.id,
    title: act.title,
    artistName: act.primaryArtist?.name || act.artists[0]?.name || "",
    startTime: act.startTime,
    endTime: act.endTime || "",
    description: act.description,
    bio: act.primaryArtist?.bio || act.artists[0]?.bio,
    category: act.category,
  };
}

/**
 * Convert TimelineColumn domain model to serializable format
 */
export function serializeTimelineColumn(
  column: import("../models/TimelineColumn").TimelineColumn,
): SerializableTimelineColumn {
  return {
    id: column.id as AreaType,
    title: column.title,
    category: column.category,
    order: column.order,
    acts: column.getAllActs().map(serializeAct),
    color: column.color || "#000000",
    icon: column.icon || "",
  };
}

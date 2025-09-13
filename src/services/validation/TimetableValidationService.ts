import {
  EventDomain,
  TimeRange,
  AreaType,
} from "../../domain/timetable/models";
import { TimetableBusinessRules } from "../../domain/timetable/businessRules";

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  code: string;
  message: string;
  severity: "error" | "warning" | "info";
}

export interface ValidationWarning {
  field: string;
  code: string;
  message: string;
  suggestion?: string;
}

/**
 * Comprehensive validation service for timetable data
 */
export class TimetableValidationService {
  /**
   * Validates a single event
   */
  static validateEvent(event: Partial<EventDomain>): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Required field validations
    if (!event.title?.trim()) {
      errors.push({
        field: "title",
        code: "REQUIRED_FIELD",
        message: "Event title is required",
        severity: "error",
      });
    }

    if (!event.startTime) {
      errors.push({
        field: "startTime",
        code: "REQUIRED_FIELD",
        message: "Start time is required",
        severity: "error",
      });
    }

    if (!event.endTime) {
      errors.push({
        field: "endTime",
        code: "REQUIRED_FIELD",
        message: "End time is required",
        severity: "error",
      });
    }

    if (!event.area) {
      errors.push({
        field: "area",
        code: "REQUIRED_FIELD",
        message: "Event area is required",
        severity: "error",
      });
    }

    if (!event.type) {
      errors.push({
        field: "type",
        code: "REQUIRED_FIELD",
        message: "Event type is required",
        severity: "error",
      });
    }

    // Time range validation
    if (event.startTime && event.endTime) {
      try {
        const timeRange = new TimeRange(event.startTime, event.endTime);

        // Minimum duration check
        if (timeRange.durationInMinutes < 15) {
          warnings.push({
            field: "duration",
            code: "SHORT_DURATION",
            message: "Event duration is very short (less than 15 minutes)",
            suggestion: "Consider extending the event duration",
          });
        }

        // Maximum duration check
        if (timeRange.durationInMinutes > 180) {
          warnings.push({
            field: "duration",
            code: "LONG_DURATION",
            message: "Event duration is very long (more than 3 hours)",
            suggestion: "Consider breaking into multiple sessions",
          });
        }

        // Workshop-specific duration validation
        if (event.type === "workshop" && timeRange.durationInMinutes > 120) {
          errors.push({
            field: "duration",
            code: "WORKSHOP_TOO_LONG",
            message: "Workshop duration cannot exceed 2 hours",
            severity: "error",
          });
        }
      } catch {
        errors.push({
          field: "timeRange",
          code: "INVALID_TIME_RANGE",
          message: "Invalid time range: start time must be before end time",
          severity: "error",
        });
      }
    }

    // Event type specific validations
    this.validateEventTypeSpecificFields(event, errors, warnings);

    // Content validation
    this.validateEventContent(event, errors, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validates multiple events for conflicts and consistency
   */
  static validateEventSchedule(events: EventDomain[]): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Check for overlapping events in same area
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const event1 = events[i];
        const event2 = events[j];

        if (event1.area === event2.area) {
          const range1 = new TimeRange(event1.startTime, event1.endTime);
          const range2 = new TimeRange(event2.startTime, event2.endTime);

          if (range1.overlaps(range2)) {
            errors.push({
              field: "schedule",
              code: "OVERLAPPING_EVENTS",
              message: `Events "${event1.title}" and "${event2.title}" overlap in ${event1.area}`,
              severity: "error",
            });
          }
        }

        // Check instructor conflicts
        if (!TimetableBusinessRules.areEventsCompatible(event1, event2)) {
          errors.push({
            field: "instructors",
            code: "INSTRUCTOR_CONFLICT",
            message: `Instructor conflict between "${event1.title}" and "${event2.title}"`,
            severity: "error",
          });
        }
      }
    }

    // Validate difficulty progression
    const progressionValidation =
      TimetableBusinessRules.validateDifficultyProgression(
        events,
        "beginner", // Default target audience
      );

    if (!progressionValidation.isValid && progressionValidation.suggestions) {
      progressionValidation.suggestions.forEach((suggestion) => {
        warnings.push({
          field: "difficulty",
          code: "DIFFICULTY_PROGRESSION",
          message: "Difficulty progression could be improved",
          suggestion,
        });
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validates time slot data format
   */
  static validateTimeSlotData(data: unknown): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (!data || typeof data !== "object") {
      errors.push({
        field: "data",
        code: "INVALID_FORMAT",
        message: "Invalid data format",
        severity: "error",
      });
      return { isValid: false, errors, warnings };
    }

    const dataObj = data as Record<string, unknown>;

    // Required fields for time slot
    const requiredFields = ["time", "event"];
    requiredFields.forEach((field) => {
      if (!dataObj[field]) {
        errors.push({
          field,
          code: "REQUIRED_FIELD",
          message: `${field} is required`,
          severity: "error",
        });
      }
    });

    // Time format validation
    if (dataObj.time && typeof dataObj.time === "string") {
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(dataObj.time)) {
        errors.push({
          field: "time",
          code: "INVALID_TIME_FORMAT",
          message: "Time must be in HH:MM format",
          severity: "error",
        });
      }
    }

    // Event title validation
    if (dataObj.event && typeof dataObj.event === "string") {
      if (dataObj.event.length > 100) {
        warnings.push({
          field: "event",
          code: "LONG_TITLE",
          message: "Event title is very long",
          suggestion: "Consider shortening for better display",
        });
      }

      if (dataObj.event.length < 3) {
        warnings.push({
          field: "event",
          code: "SHORT_TITLE",
          message: "Event title is very short",
          suggestion: "Consider providing more descriptive title",
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validates event type specific fields
   */
  private static validateEventTypeSpecificFields(
    event: Partial<EventDomain>,
    errors: ValidationError[],
    warnings: ValidationWarning[],
  ): void {
    switch (event.type) {
      case "workshop":
        if (!event.instructors || event.instructors.length === 0) {
          errors.push({
            field: "instructors",
            code: "WORKSHOP_REQUIRES_INSTRUCTOR",
            message: "Workshops must have at least one instructor",
            severity: "error",
          });
        }

        if (!event.metadata?.difficulty) {
          warnings.push({
            field: "difficulty",
            code: "MISSING_DIFFICULTY",
            message: "Workshop difficulty level not specified",
            suggestion: "Add difficulty level for better participant matching",
          });
        }
        break;

      case "talk":
        if (!event.presenters || event.presenters.length === 0) {
          warnings.push({
            field: "presenters",
            code: "TALK_MISSING_PRESENTER",
            message: "Talks should have presenters specified",
            suggestion: "Add presenter information",
          });
        }
        break;

      case "dance-show":
        if (!event.metadata?.description) {
          warnings.push({
            field: "description",
            code: "DANCE_SHOW_MISSING_DESC",
            message: "Dance shows should have descriptions",
            suggestion: "Add description for audience engagement",
          });
        }
        break;

      case "main":
        if (!event.djs || event.djs.length === 0) {
          warnings.push({
            field: "djs",
            code: "MAIN_EVENT_MISSING_DJ",
            message: "Main events typically have DJs",
            suggestion: "Consider adding DJ information",
          });
        }
        break;
    }
  }

  /**
   * Validates event content and metadata
   */
  private static validateEventContent(
    event: Partial<EventDomain>,
    errors: ValidationError[],
    warnings: ValidationWarning[],
  ): void {
    // Description validation
    if (event.metadata?.description) {
      if (event.metadata.description.length > 500) {
        warnings.push({
          field: "description",
          code: "LONG_DESCRIPTION",
          message: "Event description is very long",
          suggestion: "Consider summarizing for better readability",
        });
      }
    }

    // Image validation
    if (event.metadata?.images) {
      event.metadata.images.forEach((image, index) => {
        if (!this.isValidImageUrl(image)) {
          errors.push({
            field: `images[${index}]`,
            code: "INVALID_IMAGE_URL",
            message: `Invalid image URL: ${image}`,
            severity: "error",
          });
        }
      });
    }

    // Slide validation
    if (event.metadata?.slides) {
      event.metadata.slides.forEach((slide, index) => {
        if (!slide.type) {
          errors.push({
            field: `slides[${index}].type`,
            code: "SLIDE_MISSING_TYPE",
            message: `Slide ${index + 1} is missing type`,
            severity: "error",
          });
        }

        if (slide.image && !this.isValidImageUrl(slide.image)) {
          errors.push({
            field: `slides[${index}].image`,
            code: "INVALID_SLIDE_IMAGE",
            message: `Invalid slide image URL: ${slide.image}`,
            severity: "error",
          });
        }
      });
    }
  }

  /**
   * Basic image URL validation
   */
  private static isValidImageUrl(url: string): boolean {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) || url.startsWith("/");
    } catch {
      return url.startsWith("/"); // Allow relative paths
    }
  }

  /**
   * Validates business rules compliance
   */
  static validateBusinessRules(
    event: EventDomain,
    existingEvents: EventDomain[],
    area: AreaType,
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    const scheduleValidation = TimetableBusinessRules.canScheduleEvent(
      event,
      existingEvents,
      area,
    );

    if (!scheduleValidation.canSchedule) {
      errors.push({
        field: "schedule",
        code: "BUSINESS_RULE_VIOLATION",
        message: scheduleValidation.reason || "Cannot schedule event",
        severity: "error",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

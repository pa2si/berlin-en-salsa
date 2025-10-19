import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import {
  isTranslationKey,
  TranslationParams,
} from "../types/translatable.types";

/**
 * Hook for client components that provides smart translation
 * Automatically detects if a string is a translation key or static content
 */
export function useSmartTranslation() {
  // Get translations without a namespace to access the full translation tree
  const t = useTranslations();

  /**
   * Translates a value if it's a translation key, otherwise returns as-is
   * Also handles compound keys separated by " & " or ", "
   */
  const translateIfKey = (
    value: string | undefined,
    params?: TranslationParams,
  ): string => {
    if (!value) return "";

    // Check if this is a compound key with " & " or ", "
    if (
      value.includes("Timetable.") &&
      (value.includes(" & ") || value.includes(", "))
    ) {
      // Determine the separator
      const separator = value.includes(" & ") ? " & " : ", ";
      const parts = value.split(separator);
      const translatedParts: string[] = [];

      for (const part of parts) {
        const trimmedPart = part.trim();
        if (isTranslationKey(trimmedPart)) {
          try {
            const result = params
              ? t(trimmedPart as never, params as never)
              : t(trimmedPart as never);
            translatedParts.push(result);
          } catch (error) {
            console.warn(
              `❌ Client: Translation key not found: ${trimmedPart}`,
              error,
            );
            translatedParts.push(trimmedPart); // Fallback to original value
          }
        } else {
          translatedParts.push(trimmedPart);
        }
      }

      return translatedParts.join(separator);
    }

    if (isTranslationKey(value)) {
      try {
        // Use type assertion for dynamic translation keys until we add the timetable translations
        const result = params
          ? t(value as never, params as never)
          : t(value as never);
        return result;
      } catch (error) {
        console.warn(`❌ Client: Translation key not found: ${value}`, error);
        return value; // Fallback to original value
      }
    }

    return value; // Return static content as-is
  };

  return { translateIfKey };
}

/**
 * Server-side function for translating values in Server Components
 * Automatically detects if a string is a translation key or static content
 * Also handles compound keys separated by " & " or ", "
 */
export async function translateIfKeyServer(
  value: string | undefined,
  params?: TranslationParams,
): Promise<string> {
  if (!value) return "";

  // Check if this is a compound key with " & " or ", "
  if (
    value.includes("Timetable.") &&
    (value.includes(" & ") || value.includes(", "))
  ) {
    // Determine the separator
    const separator = value.includes(" & ") ? " & " : ", ";
    const parts = value.split(separator);
    const translatedParts: string[] = [];

    for (const part of parts) {
      const trimmedPart = part.trim();
      if (isTranslationKey(trimmedPart)) {
        try {
          const t = await getTranslations();
          const result = params
            ? t(trimmedPart as never, params as never)
            : t(trimmedPart as never);
          translatedParts.push(result);
        } catch (error) {
          console.warn(
            `❌ SERVER: Translation key not found: ${trimmedPart}`,
            error,
          );
          translatedParts.push(trimmedPart); // Fallback to original value
        }
      } else {
        translatedParts.push(trimmedPart);
      }
    }

    return translatedParts.join(separator);
  }

  if (isTranslationKey(value)) {
    try {
      // Get translations without a namespace to access the full translation tree
      const t = await getTranslations();
      // Use type assertion for dynamic translation keys until we add the timetable translations
      const result = params
        ? t(value as never, params as never)
        : t(value as never);
      return result;
    } catch (error) {
      console.warn(`❌ SERVER: Translation key not found: ${value}`, error);
      return value; // Fallback to original value
    }
  }

  return value; // Return static content as-is
}

/**
 * Utility to check if any hooks are being used (for determining server vs client component)
 */
export function getTranslationFunction() {
  // This function can be used to determine the appropriate translation approach
  // In practice, you'll use useSmartTranslation() in client components
  // and translateIfKeyServer() in server components
  return {
    client: useSmartTranslation,
    server: translateIfKeyServer,
  };
}

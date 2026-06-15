"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";
import { getTranslations } from "next-intl/server";
import {
  getDanceClassSubscriptions,
  upsertDanceClassSubscription,
} from "@/lib/classSubscriptionsDb";

// Add this interface for Mailchimp error type
interface MailchimpError {
  response: {
    body: {
      title: string;
      status: number;
      detail: string;
    };
  };
}

// Type for the response
interface SubscriptionResponse {
  successMessage?: string;
  errorMessage?: string;
}

interface DanceClassSubscriptionResponse {
  successMessage?: string;
  errorMessage?: string;
}

interface DanceClassSubscriberListItem {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface DanceClassSubscriberListResponse {
  subscribers?: DanceClassSubscriberListItem[];
  errorMessage?: string;
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY as string,
  server: process.env.MAILCHIMP_SERVER_PREFIX as string,
});

const isValidEmail = (email: string): boolean => {
  // Strict email validation requiring proper domain structure
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 320; // Max email length
};

const sanitizeInput = (input: string): string => {
  // Remove any HTML tags, trim whitespace, and limit length to 100 characters
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[^\p{L}\p{N}\s\-'.]/gu, "") // Allow only letters, numbers, spaces, hyphens, apostrophes, and periods
    .trim()
    .slice(0, 100); // Limit length to 100 characters
};

const getClassSubscriptionTokenMap = (): Record<string, string> => {
  const rawMap = process.env.CLASS_SUBSCRIPTION_DOWNLOAD_TOKENS;

  if (!rawMap) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawMap) as unknown;

    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    return Object.entries(parsed).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        if (typeof value === "string" && value.length > 0) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
  } catch {
    return {};
  }
};

export const addSubscriber = async (
  formData: FormData,
  locale: string,
): Promise<SubscriptionResponse> => {
  const t = await getTranslations({
    locale: locale as "de" | "es",
    namespace: "Subscription" as const,
  });

  let email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  // Server-side validation
  if (!email || !firstName || !lastName) {
    return { errorMessage: t("validation.allFieldsRequired") };
  }

  // Clean and validate email
  email = email.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return {
      errorMessage: t("validation.invalidEmail"),
    };
  }

  // Sanitize and validate name fields
  const sanitizedFirstName = sanitizeInput(firstName);
  const sanitizedLastName = sanitizeInput(lastName);

  // Minimum length check
  if (sanitizedFirstName.length < 2 || sanitizedLastName.length < 2) {
    return {
      errorMessage: t("validation.minNameLength"),
    };
  }

  // Maximum length check (should rarely trigger due to sanitizeInput's slice)
  if (sanitizedFirstName.length > 50 || sanitizedLastName.length > 50) {
    return {
      errorMessage: t("validation.maxNameLength"),
    };
  }

  // Check that names aren't just special characters or numbers
  if (!/\p{L}/u.test(sanitizedFirstName) || !/\p{L}/u.test(sanitizedLastName)) {
    return {
      errorMessage: t("validation.nameRequiresLetter"),
    };
  }

  try {
    // Try to add the member to the list
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: "pending" as const, // Use "pending" to force Double Opt-In
        merge_fields: {
          FNAME: sanitizedFirstName,
          LNAME: sanitizedLastName,
        },
      },
    );
    return {
      successMessage: t("success", { email }),
    };
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError;

    if (mailchimpError.response?.body?.title === "Member Exists") {
      try {
        // Member exists, let's check their current status
        const audienceId = process.env.MAILCHIMP_AUDIENCE_ID as string;
        const subscriberHash = crypto
          .createHash("md5")
          .update(email.toLowerCase())
          .digest("hex");

        const memberInfo = await mailchimp.lists.getListMember(
          audienceId,
          subscriberHash,
        );

        // Handle based on the member's status
        if (memberInfo.status === "pending") {
          return {
            errorMessage: t("errors.memberExists.pending", { email }),
          };
        } else if (memberInfo.status === "subscribed") {
          return {
            errorMessage: t("errors.memberExists.subscribed", { email }),
          };
        } else if (memberInfo.status === "unsubscribed") {
          return {
            errorMessage: t("errors.memberExists.unsubscribed", { email }),
          };
        }
      } catch {
        // Silently handle error - will fall back to generic message
      }

      // Fallback message if status check fails
      return {
        errorMessage: t("errors.memberExists.fallback", { email }),
      };
    }

    // Generic error message for other errors
    return {
      errorMessage: t("errors.generic"),
    };
  }
};

export const addDanceClassSubscriber = async (
  formData: FormData,
  locale: string,
): Promise<DanceClassSubscriptionResponse> => {
  const t = await getTranslations({
    locale: locale as "de" | "es",
    namespace: "Timetable.modal.classSubscription" as const,
  });

  const classId = (formData.get("classId") as string | null)?.trim();
  const classTitleRaw = (formData.get("classTitle") as string | null)?.trim();
  const nameRaw = (formData.get("name") as string | null)?.trim();
  const emailRaw = (formData.get("email") as string | null)?.trim();
  const privacyAccepted = formData.get("privacyAccepted") === "true";

  if (!classId || !classTitleRaw || !nameRaw || !emailRaw) {
    return { errorMessage: t("validation.allFieldsRequired") };
  }

  if (!privacyAccepted) {
    return { errorMessage: t("validation.privacyRequired") };
  }

  if (!/^[a-z0-9-]{3,120}$/u.test(classId)) {
    return { errorMessage: t("errors.generic") };
  }

  const sanitizedName = sanitizeInput(nameRaw);
  if (sanitizedName.length < 2 || !/\p{L}/u.test(sanitizedName)) {
    return { errorMessage: t("validation.invalidName") };
  }

  const email = emailRaw.toLowerCase();
  if (!isValidEmail(email)) {
    return { errorMessage: t("validation.invalidEmail") };
  }

  try {
    await upsertDanceClassSubscription({
      classId,
      classTitle: sanitizeInput(classTitleRaw),
      participantName: sanitizedName,
      participantEmail: email,
    });

    return {
      successMessage: t("success", { email }),
    };
  } catch {
    return {
      errorMessage: t("errors.generic"),
    };
  }
};

export const getDanceClassSubscribers = async (
  formData: FormData,
  locale: string,
): Promise<DanceClassSubscriberListResponse> => {
  const t = await getTranslations({
    locale: locale as "de" | "es",
    namespace: "Timetable.modal.classSubscription" as const,
  });

  const classId = (formData.get("classId") as string | null)?.trim();
  const token = (formData.get("token") as string | null)?.trim();

  if (!classId || !token) {
    return { errorMessage: t("validation.allFieldsRequired") };
  }

  if (!/^[a-z0-9-]{3,120}$/u.test(classId)) {
    return { errorMessage: t("errors.generic") };
  }

  const tokenMap = getClassSubscriptionTokenMap();
  const expectedToken = tokenMap[classId];

  if (!expectedToken || token !== expectedToken) {
    return { errorMessage: t("errors.invalidToken") };
  }

  try {
    const rows = await getDanceClassSubscriptions(classId);

    return {
      subscribers: rows.map((row) => ({
        name: row.participant_name,
        email: row.participant_email,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      })),
    };
  } catch {
    return {
      errorMessage: t("errors.generic"),
    };
  }
};

"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";
import { getTranslations } from "next-intl/server";

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

export const addSubscriber = async (
  formData: FormData,
  locale: string,
): Promise<SubscriptionResponse> => {
  const t = await getTranslations({ locale, namespace: "Subscription" });

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

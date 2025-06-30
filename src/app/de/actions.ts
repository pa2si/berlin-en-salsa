"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";

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
): Promise<SubscriptionResponse> => {
  let email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  // Server-side validation
  if (!email || !firstName || !lastName) {
    return { errorMessage: "Bitte fülle alle Felder aus." };
  }

  // Clean and validate email
  email = email.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return {
      errorMessage: "Bitte gib eine gültige E-Mail-Adresse ein.",
    };
  }

  // Sanitize and validate name fields
  const sanitizedFirstName = sanitizeInput(firstName);
  const sanitizedLastName = sanitizeInput(lastName);

  // Minimum length check
  if (sanitizedFirstName.length < 2 || sanitizedLastName.length < 2) {
    return {
      errorMessage: "Vor- und Nachname müssen mindestens 2 Zeichen enthalten.",
    };
  }

  // Maximum length check (should rarely trigger due to sanitizeInput's slice)
  if (sanitizedFirstName.length > 50 || sanitizedLastName.length > 50) {
    return {
      errorMessage: "Vor- und Nachname dürfen maximal 50 Zeichen enthalten.",
    };
  }

  // Check that names aren't just special characters or numbers
  if (!/\p{L}/u.test(sanitizedFirstName) || !/\p{L}/u.test(sanitizedLastName)) {
    return {
      errorMessage:
        "Vor- und Nachname müssen mindestens einen Buchstaben enthalten.",
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
      successMessage: `Fast geschafft! Wir haben eine Bestätigungs-E-Mail an ${email} gesendet. Bitte überprüfe deinen Posteingang und klicke auf den Link, um dein Abonnement abzuschließen.`,
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
            errorMessage: `Wir haben bereits eine Einladungs-E-Mail an ${email} geschickt. Bitte überprüfe deinen Posteingang (und den Spam-Ordner) nach dem Bestätigungslink. Falls du eine neue Einladung benötigst, kontaktiere uns bitte.`,
          };
        } else if (memberInfo.status === "subscribed") {
          return {
            errorMessage: `${email} ist bereits für unseren Newsletter angemeldet. Vielen Dank für dein Interesse!`,
          };
        } else if (memberInfo.status === "unsubscribed") {
          return {
            errorMessage: `${email} wurde bereits von unserem Newsletter abgemeldet. Wenn du dich erneut anmelden möchtest, kontaktiere uns bitte.`,
          };
        }
      } catch {
        // Silently handle error - will fall back to generic message
      }

      // Fallback message if status check fails
      return {
        errorMessage: `Diese E-Mail-Adresse (${email}) existiert bereits in unserem System. Bei Fragen wende dich bitte an uns.`,
      };
    }

    // Generic error message for other errors
    return {
      errorMessage: `Entschuldigung! Bei der Verarbeitung deiner Anfrage ist ein Problem aufgetreten. Bitte versuche es später erneut.`,
    };
  }
};

"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";

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
  // RFC 5322 compliant email regex
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 320; // Max email length
};

const sanitizeInput = (input: string): string => {
  // Remove any HTML tags and trim whitespace
  return input
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, 100); // Limit length to 100 characters
};

export const addSubscriber = async (
  formData: FormData,
): Promise<SubscriptionResponse> => {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  // Server-side validation
  if (!email || !firstName || !lastName) {
    return { errorMessage: "Alle Felder sind erforderlich." };
  }

  if (!isValidEmail(email)) {
    return {
      errorMessage: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    };
  }

  const sanitizedFirstName = sanitizeInput(firstName);
  const sanitizedLastName = sanitizeInput(lastName);

  if (sanitizedFirstName.length < 2 || sanitizedLastName.length < 2) {
    return {
      errorMessage: "Vor- und Nachname müssen mindestens 2 Zeichen lang sein.",
    };
  }

  try {
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
      successMessage: `Fast geschafft! Wir haben eine Bestätigungs-E-Mail an ${email} gesendet. Bitte überprüfen Sie Ihren Posteingang und klicken Sie auf den Link, um Ihr Abonnement abzuschließen.`,
    };
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError;
    console.log(mailchimpError.response);

    if (mailchimpError.response?.body?.title === "Member Exists") {
      return {
        errorMessage: `Hoppla! ${email} ist bereits für unseren Newsletter angemeldet.`,
      };
    }
    return {
      errorMessage: `Hoppla! Beim Abonnieren von ${email} für unseren Newsletter ist ein Problem aufgetreten.`,
    };
  }
};

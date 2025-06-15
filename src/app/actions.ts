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
    return { errorMessage: "All fields are required." };
  }

  if (!isValidEmail(email)) {
    return { errorMessage: "Please enter a valid email address." };
  }

  const sanitizedFirstName = sanitizeInput(firstName);
  const sanitizedLastName = sanitizeInput(lastName);

  if (sanitizedFirstName.length < 2 || sanitizedLastName.length < 2) {
    return {
      errorMessage: "First and last name must be at least 2 characters long.",
    };
  }

  try {
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: "subscribed" as const,
        merge_fields: {
          FNAME: sanitizedFirstName,
          LNAME: sanitizedLastName,
        },
      },
    );
    return {
      successMessage: `Success! ${email} was successfully subscribed to our newsletter!`,
    };
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError;
    console.log(mailchimpError.response);

    if (mailchimpError.response?.body?.title === "Member Exists") {
      return {
        errorMessage: `Oops! ${email} is already subscribed to our newsletter!`,
      };
    }
    return {
      errorMessage: `Oops! There was a problem subscribing ${email} to our newsletter!`,
    };
  }
};

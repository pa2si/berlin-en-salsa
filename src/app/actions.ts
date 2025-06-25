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
    return { errorMessage: "Todos los campos son obligatorios." };
  }

  if (!isValidEmail(email)) {
    return {
      errorMessage:
        "Por favor, introduce una dirección de correo electrónico válida.",
    };
  }

  const sanitizedFirstName = sanitizeInput(firstName);
  const sanitizedLastName = sanitizeInput(lastName);

  if (sanitizedFirstName.length < 2 || sanitizedLastName.length < 2) {
    return {
      errorMessage: "El nombre y apellido deben tener al menos 2 caracteres.",
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
      successMessage: `¡Éxito! ${email} se ha suscrito correctamente a nuestro boletín.`,
    };
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError;
    console.log(mailchimpError.response);

    if (mailchimpError.response?.body?.title === "Member Exists") {
      return {
        errorMessage: `¡Vaya! ${email} ya está suscrito a nuestro boletín.`,
      };
    }
    return {
      errorMessage: `¡Vaya! Hubo un problema al suscribir ${email} a nuestro boletín.`,
    };
  }
};

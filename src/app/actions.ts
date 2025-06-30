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
    return { errorMessage: "Todos los campos son obligatorios." };
  }

  // Clean and validate email
  email = email.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return {
      errorMessage:
        "Por favor, introduce una dirección de correo electrónico válida.",
    };
  }

  // Sanitize and validate name fields
  const sanitizedFirstName = sanitizeInput(firstName);
  const sanitizedLastName = sanitizeInput(lastName);

  // Minimum length check
  if (sanitizedFirstName.length < 2 || sanitizedLastName.length < 2) {
    return {
      errorMessage: "El nombre y apellido deben tener al menos 2 caracteres.",
    };
  }

  // Maximum length check (should rarely trigger due to sanitizeInput's slice)
  if (sanitizedFirstName.length > 50 || sanitizedLastName.length > 50) {
    return {
      errorMessage: "El nombre y apellido no deben exceder los 50 caracteres.",
    };
  }

  // Check that names aren't just special characters or numbers
  if (!/\p{L}/u.test(sanitizedFirstName) || !/\p{L}/u.test(sanitizedLastName)) {
    return {
      errorMessage: "El nombre y apellido deben contener al menos una letra.",
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
      successMessage: `¡Casi listo! Hemos enviado un correo de confirmación a ${email}. Por favor, revisa tu bandeja de entrada y haz clic en el enlace para completar tu suscripción.`,
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
            errorMessage: `Ya hemos enviado un correo de invitación a ${email}. Por favor, revisa tu bandeja de entrada (y la carpeta de spam) para encontrar el enlace de confirmación. Si necesitas que te enviemos la invitación nuevamente, contáctanos.`,
          };
        } else if (memberInfo.status === "subscribed") {
          return {
            errorMessage: `${email} ya está suscrito a nuestro boletín. ¡Gracias por tu interés!`,
          };
        } else if (memberInfo.status === "unsubscribed") {
          return {
            errorMessage: `${email} ya se ha dado de baja de nuestro boletín. Si deseas volver a suscribirte, por favor contáctanos.`,
          };
        }
      } catch {
        // Silently handle error - will fall back to generic message
      }

      // Fallback message if status check fails
      return {
        errorMessage: `Esta dirección de correo (${email}) ya existe en nuestro sistema. Si tienes alguna pregunta, por favor contáctanos.`,
      };
    }

    // Generic error message for other errors
    return {
      errorMessage: `¡Vaya! Hubo un problema al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.`,
    };
  }
};
